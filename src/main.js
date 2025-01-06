import { app, globalShortcut } from "electron";
import { Luminit } from "./Luminit.js";
import BrightnessController from "./BrightnessController.js";
import { store } from "./store.js";
import toggleAutoLaunch from "./utils/toggleAutoLaunch.js";

app.whenReady().then(async () => {
  await toggleAutoLaunch(store.get("launchAStartup"));
  await BrightnessController.setLevel(store.get("currentLevel"));

  globalShortcut.register("CommandOrControl+Y+B", async () => {
    await BrightnessController.setLevel(100);
  });

  const luminit = new Luminit();

  store.onDidAnyChange(() => {
    luminit.updateMenu();
  });
});
