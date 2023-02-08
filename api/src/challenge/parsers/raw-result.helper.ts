export function getLine(rawResult: string, lineNumber: number): string {
  return rawResult.split("\n")[lineNumber - 1];
}

export function findLine(rawResult: string, regex: RegExp): string {
  const foundLine = rawResult.split("\n").find((line) => line.match(regex));

  if (!foundLine) {
    throw new Error(
      `Line matching regex ${regex} not found in "${rawResult}"`
    );
  }

  return foundLine;
}

export function findLines(rawResult: string, regex: RegExp): string[] {
  return rawResult.split("\n").filter((line) => line.match(regex));
}

export function extractData(source: string, regex: RegExp, matchIndex = 1): string {
  const match = source.match(new RegExp(regex, "g"));

  if (!match) {
    throw new Error(`No match with regex ${regex} found in "${source}"`);
  }

  return match[matchIndex - 1];
}

export function countOccurrences(source: string, data: string): number {
  return source.split(data).length - 1;
}