import { app, Tray, Menu } from "electron";
import { resolve } from "node:path";

const __dirname = import.meta.dirname;
let tray = {};

function render(tray = tray) {
  const contextMenu = Menu.buildFromTemplate([
    { label: "Item1", type: "radio" },
    { label: "Item2", type: "radio" },
    { label: "Item3", type: "radio", checked: true },
    { label: "Item4", type: "radio" },
    {
      type: "separator",
    },
    {
      type: "normal",
      label: "Quit",
      role: "quit",
      enabled: true,
    },
  ]);

  tray.setToolTip("This is my application.");
  tray.setContextMenu(contextMenu);
}

app.on("ready", () => {
  tray = new Tray(resolve(__dirname, "../assets", "iconTemplate.png"));

  render(tray);
});
