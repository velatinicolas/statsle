import { defineStore } from "pinia";
import { ref } from "vue";
import { Subject, timer, tap, switchMap } from "rxjs";

export interface ToasterMessage {
  message: string;
  level: string;
}

export const useToasterStore = defineStore("toaster", () => {
  const message = ref<ToasterMessage>();
  const subjectMessage = new Subject<ToasterMessage>();
  subjectMessage
    .pipe(
      switchMap((m) => {
        message.value = m;
        return timer(5000);
      }),
      tap(() => {
        message.value = undefined;
      })
    )
    .subscribe();
  function error(messages: string | string[]) {
    subjectMessage.next({
      message: formatMessages(messages),
      level: "error",
    });
  }
  function info(messages: string | string[]) {
    subjectMessage.next({
      message: formatMessages(messages),
      level: "info",
    });
  }
  function formatMessages(messages: string | string[]): string {
    if (!Array.isArray(messages)) {
      messages = [messages];
    }

    return messages.join("\r\n");
  }

  return { message, error, info };
});
