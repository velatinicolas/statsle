import { FactoryProvider } from "@nestjs/common";
import { lstatSync, readdirSync } from "fs";
import { TurnFileConstructorInterface } from "./turn-file-constructor.interface";
import { TurnParserInterface } from "./turn-parser.interface";
import { TurnsSorterInterface } from "./turns-sorter.interface";

export function provideTurnParsers(): FactoryProvider<TurnParserInterface[]> {
  return provideTurnFiles<TurnParserInterface>("TURN_PARSERS", "parser.js");
}

export function provideTurnsSorters(): FactoryProvider<TurnsSorterInterface[]> {
  return provideTurnFiles<TurnsSorterInterface>("TURNS_SORTERS", "sorter.js")
}

function provideTurnFiles<T>(
  providerToken: string,
  fileNameEnding: string
): FactoryProvider<T[]> {
  return {
    provide: providerToken,
    useFactory: async () => {
      const parsers: T[] = [];
      // Find every file in the subdirectories of `parsers` directory
      // Check is done on `.js` files because this is done on runtime
      const files = readdirSync(`${__dirname}`).reduce<string[]>(
        (files, current) => {
          if (lstatSync(`${__dirname}/${current}`).isDirectory()) {
            const file = readdirSync(`${__dirname}/${current}`).find((fn) =>
              fn.endsWith(fileNameEnding)
            );

            if (file) {
              files.push(`${__dirname}/${current}/${file}`);
            }
          }

          return files;
        },
        []
      );

      files.forEach(
        async (file) =>
          await import(file).then((importData) => {
            // Extract class name, and assume that is an instance of `TurnFileConstructorInterface<T>`
            // so TypeScript allows the dynamic `new` below.
            const className =
              Object.values<TurnFileConstructorInterface<T>>(importData)[0];
            parsers.push(new className());
          })
      );
      return parsers;
    },
  };
}
