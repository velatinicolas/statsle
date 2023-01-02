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
  function error(message: string) {
    subjectMessage.next({
      message,
      level: "error",
    });
  }
  function info(message: string) {
    subjectMessage.next({
      message,
      level: "info",
    });
  }

  return { message, error, info };
});
