import { nativeImage, Tray } from "electron";
import { join, resolve } from "node:path";
import createMenu from "./createMenu.js";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

export class Luminit {
  constructor() {
    this.icon = this.getIcon();
    this.tray = new Tray(this.icon);

    this.updateMenu();
    this.setInfos();
  }

  getIcon() {
    const path = join(__dirname, "..", "assets/iconTemplate.png");
    const icon = nativeImage.createFromPath(path);
    return icon;
  }

  updateMenu() {
    const contextMenu = createMenu();
    this.tray.setContextMenu(contextMenu);
  }

  setInfos() {
    this.tray.setToolTip("Luminit - Brightness Control");
  }
}
