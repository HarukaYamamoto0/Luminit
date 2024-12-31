import { Menu, shell } from "electron";
import BrightnessController from "./BrightnessController.js";
import { createSettingsWindow } from "./screens/settingsScreen.js";

const controller = new BrightnessController();

function trayMenu(tray = tray) {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Increase 10%",
      type: "normal",
      click: async () => {
        const level = await controller.getLevel();
        await controller.setLevel(level + 10);
      },
    },
    {
      label: "Decrease 10%",
      type: "normal",
      click: async () => {
        const level = await controller.getLevel();
        await controller.setLevel(level - 10);
      },
    },
    {
      label: "Preset Brightness Levels",
      submenu: generateLevelsOfLight(
        async (level) => {
          await controller.setLevel(level);
        },
        100,
        10,
        10
      ),
    },
    {
      label: "Settings",
      submenu: [
        {
          label: "Open all settings",
          type: "normal",
          click: () => createSettingsWindow(),
        },
        {
          label: "Launch at Startup",
          type: "checkbox",
          checked: true,
          click: () => console.log("Toggling startup option"),
        },
        {
          label: "Enable Notifications",
          type: "checkbox",
          checked: true,
          click: () => console.log("Enable Notifications"),
        },
        {
          label: "Reset to Default",
          type: "normal",
          checked: true,
          click: () => console.log("Reset to Default"),
        },
      ],
    },
    { type: "separator" },
    {
      label: "Help",
      submenu: [
        {
          label: "Documentation",
          click: async () =>
            await shell.openExternal("https://example.com/docs"),
        },
        {
          label: "Report an Issue",
          click: async () =>
            await shell.openExternal("https://example.com/issues"),
        },
      ],
    },
    { type: "separator" },
    {
      label: "Quit",
      role: "quit",
    },
  ]);

  tray.setToolTip("Luminit - Brightness Control");
  tray.setContextMenu(contextMenu);
}

function generateLevelsOfLight(onClick, maxLevel, minLevel, step) {
  const subMenu = [];

  for (let level = minLevel; level <= maxLevel; level += step) {
    const option = {
      label: `${level}%`,
      type: "radio",
      click: () => onClick(level),
    };

    subMenu.push(option);
  }

  return subMenu;
}

export default trayMenu;
