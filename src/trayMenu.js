import { Menu, Notification, shell } from "electron";
import BrightnessController from "./BrightnessController.js";
import { createSettingsWindow } from "./screens/settingsScreen.js";
import { store, schema } from "./store.js";

const controller = new BrightnessController();
const stepLevel = store.get("stepLevel");

// Exibe uma notificação
function showNotification(title, body) {
  new Notification({ title, body }).show();
}

// Verifica os limites de brilho antes de ajustar
async function adjustBrightness(change) {
  const level = await controller.getLevel();
  const maxLevel = store.get("maxLevel");
  const minLevel = store.get("minLevel");

  if (change > 0 && level + change >= maxLevel) {
    showNotification("Calma Lá", "Nível máximo atingido");
  } else if (change < 0 && level + change <= minLevel) {
    showNotification("Calma Lá", "Nível mínimo atingido");
  } else {
    await controller.setLevel(level + change);
  }
}

// Gera submenus de níveis de brilho
function generateLevelsOfLight(onClick, maxLevel, minLevel, step) {
  return Array.from(
    { length: Math.floor((maxLevel - minLevel) / step) + 1 },
    (_, i) => {
      const level = minLevel + i * step;
      return {
        label: `${level}%`,
        type: "radio",
        checked: level == store.get("currentLevel"),
        click: () => onClick(level),
      };
    }
  );
}

// Função para criar o menu
function createContextMenu(tray) {
  return Menu.buildFromTemplate([
    {
      label: `Increase ${store.get("stepLevel")}%`,
      type: "normal",
      click: () => adjustBrightness(store.get("stepLevel")),
    },
    {
      label: `Decrease ${store.get("stepLevel")}%`,
      type: "normal",
      click: () => adjustBrightness(-store.get("stepLevel")),
    },
    {
      label: "Preset Brightness Levels",
      submenu: generateLevelsOfLight(
        (level) => controller.setLevel(level),
        store.get("maxLevel") ?? schema.currentLevel.default,
        store.get("minLevel"),
        store.get("stepLevel")
      ),
    },
    {
      label: "Settings",
      submenu: [
        {
          label: "Open all settings",
          type: "normal",
          click: createSettingsWindow,
        },
        {
          label: "Launch at Startup",
          type: "checkbox",
          checked: store.get("launchAStartup"),
          click: () =>
            store.set("launchAStartup", !store.get("launchAStartup")),
        },
        {
          label: "Enable Notifications",
          type: "checkbox",
          checked: store.get("notifications"),
          click: () => store.set("notifications", !store.get("notifications")),
        },
        {
          label: "Reset to Default",
          type: "normal",
          click: () => store.clear(),
        },
      ],
    },
    { type: "separator" },
    {
      label: "Help",
      submenu: [
        {
          label: "Documentation",
          click: () =>
            shell.openExternal("https://github.com/HarukaYamamoto0/Luminit"),
        },
        {
          label: "Report an Issue",
          click: () =>
            shell.openExternal(
              "https://github.com/HarukaYamamoto0/Luminit/issues"
            ),
        },
      ],
    },
    { type: "separator" },
    {
      label: "Quit",
      role: "quit",
    },
  ]);
}

function trayMenu(tray) {
  const updateMenu = () => {
    const contextMenu = createContextMenu(tray);
    tray.setContextMenu(contextMenu);
  };

  store.onDidChange("currentLevel", updateMenu);
  store.onDidChange("stepLevel", updateMenu);
  store.onDidChange("minLevel", updateMenu);
  store.onDidChange("maxLevel", updateMenu);
  store.onDidChange("launchAStartup", updateMenu);
  store.onDidChange("notifications", updateMenu);

  updateMenu();

  tray.setToolTip("Luminit - Brightness Control");
}

export default trayMenu;
