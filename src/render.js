import { Menu, shell } from "electron";
import BrightnessController from "./BrightnessController.js";

const controller = new BrightnessController();

function render(tray = tray) {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Increase brightness by 10%",
      type: "normal",
      click: async () => {
        const level = await controller.getLevel();
        await controller.setLevel(level + 10);
      },
    },
    {
      label: "Decrease brightness by 10%",
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
          label: "Open Settings",
          type: "normal",
          click: () => console.log("Opening settings window"),
        },
        {
          label: "Launch at Startup",
          type: "checkbox",
          checked: true,
          click: () => console.log("Toggling startup option"),
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

export default render;
