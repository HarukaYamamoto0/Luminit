import { app, Tray } from "electron";
import { resolve } from "node:path";
import render from "./render.js";

const __dirname = import.meta.dirname;

app.on("ready", () => {
  const iconPath = resolve(__dirname, "../assets", "iconTemplate.png");
  const tray = new Tray(iconPath);

  render(tray);
});
