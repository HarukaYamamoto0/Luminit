import { app, Tray, globalShortcut } from "electron";
import { resolve } from "node:path";
import trayMenu from "./trayMenu.js";
import BrightnessController from "./BrightnessController.js";

const __dirname = import.meta.dirname;

const controller = new BrightnessController();

app.on("ready", () => {
  const iconPath = resolve(__dirname, "../assets", "iconTemplate.png");
  const tray = new Tray(iconPath);

  trayMenu(tray);
  globalShortcut.register("CommandOrControl+Y+B", async () => {
    await controller.setLevel(100);
  });
});
