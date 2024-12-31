import { Menu, shell } from "electron";

function render(tray = tray) {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Increase brightness by 10%",
      type: "normal",
      click: () => console.log("Increasing brightness"),
    },
    {
      label: "Decrease brightness by 10%",
      type: "normal",
      click: () => console.log("Decreasing brightness"),
    },
    {
      label: "Preset Brightness Levels",
      submenu: generateLevelsOfLight(
        (level) => console.log(`Brightness set to ${level}%`),
        100,
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

function generateLevelsOfLight(onClick, maxLevel, step) {
  const subMenu = [];

  for (let level = 0; level <= maxLevel; level += step) {
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
