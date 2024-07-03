import { writable } from 'svelte/store'

type Notification = {
  id: string,
  title: string,
  message: string,
  type: "info" | "success" | "warning" | "error"
}

export const notifications = writable<Notification[]>([])

let id_count = 0;


export function toast(title: string, message: string, type: "success" | "warning" | "error" | "info") {
  const newToast: Notification = {
    id: id_count.toString(), 
    title: title, 
    message: message,
    type: type 
  };

  id_count++;

  notifications.update((state) => [newToast, ...state]);
  setTimeout(removeToast, 3000);
}


function removeToast() {
  notifications.update((state) => {
    return [...state.slice(0, state.length - 1)]
  })
}