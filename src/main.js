import { app, Tray } from "electron";
import { resolve } from "node:path";
import trayMenu from "./trayMenu.js";

import Store from "electron-store";

const schema = {
  projects: {
    type: "string",
  },
};

const store = new Store(schema);
const storedProjects = store.get("projects");
console.log(storedProjects);

const __dirname = import.meta.dirname;

app.on("ready", () => {
  const iconPath = resolve(__dirname, "../assets", "iconTemplate.png");
  const tray = new Tray(iconPath);

  trayMenu(tray);
});
