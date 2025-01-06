import { Notification } from "electron";

function showNotification(title, body) {
  new Notification({ title, body }).show();
}

export default showNotification;
