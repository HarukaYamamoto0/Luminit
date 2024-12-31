import { app, BrowserWindow } from "electron";
import { resolve } from "node:path";

const __dirname = import.meta.dirname;

const createSettingsWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 1146,
    frame: true,
    useContentSize: true,
  });

  win.loadFile(resolve(__dirname, "../public", "settings.html"));
  win.maximize();
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

export { createSettingsWindow };
