import { app, Menu, shell } from "electron";
import { schema, store } from "./store.js";
import BrightnessController from "./BrightnessController.js";
import showNotification from "./utils/showNotification.js";
import toggleAutoLaunch from "./utils/toggleAutoLaunch.js";

const maxLevel = store.get("maxLevel");
const minLevel = store.get("minLevel");
const stepLevel = store.get("stepLevel");

/**
 * Adjusts the brightness of the monitor by a specified change amount.
 *
 * @param {number} change - The amount to increase or decrease the brightness.
 * @returns {Promise<void>} Resolves when the brightness adjustment is complete.
 */
async function adjustBrightness(change) {
  try {
    const currentLevels = await BrightnessController.getLevel();
    const currentLevel = currentLevels[0]; // Assume the first monitor as the reference

    const newLevel = clamp(currentLevel + change, minLevel, maxLevel);

    if (newLevel === currentLevel) {
      const message =
        newLevel >= maxLevel
          ? "Maximum brightness level reached"
          : "Minimum brightness level reached";

      notifyUser("Brightness Adjustment", message);
      return;
    }

    await BrightnessController.setLevel(newLevel);
    notifyUser(
      "Brightness Adjustment",
      `Brightness set to ${Math.round(newLevel)}%`
    );
  } catch (error) {
    handleError("Failed to adjust brightness", error);
  }
}

/**
 * Generates preset brightness level options for the menu.
 *
 * @param {Function} onClick - Callback function to execute on selection.
 * @returns {Array<Electron.MenuItemConstructorOptions>} Preset brightness menu items.
 */
function generateBrightnessPresets(onClick) {
  return Array.from(
    { length: Math.floor((maxLevel - minLevel) / stepLevel) + 1 },
    (_, i) => {
      const level = minLevel + i * stepLevel;
      return {
        label: `${level}%`,
        type: "radio",
        checked: level === store.get("currentLevel"),
        click: () => onClick(level),
      };
    }
  );
}

/**
 * Shows a notification if notifications are enabled.
 *
 * @param {string} title - Notification title.
 * @param {string} message - Notification message.
 */
function notifyUser(title, message) {
  if (store.get("notifications")) {
    showNotification(title, message);
  }
}

/**
 * Clamps a value between a minimum and maximum range.
 *
 * @param {number} value - The value to clamp.
 * @param {number} min - The minimum allowable value.
 * @param {number} max - The maximum allowable value.
 * @returns {number} The clamped value.
 */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Handles errors by logging and optionally notifying the user.
 *
 * @param {string} message - Error message to display.
 * @param {Error} error - The error object.
 */
function handleError(message, error) {
  console.error(message, error.message);
  notifyUser("Error", message);
}

/**
 * Creates the application menu with brightness controls and other settings.
 *
 * @returns {Electron.Menu} The menu built from the specified template.
 */
function createMenu() {
  return Menu.buildFromTemplate([
    {
      label: `Increase by ${stepLevel}%`,
      type: "normal",
      click: () => adjustBrightness(stepLevel),
    },
    {
      label: `Decrease by ${stepLevel}%`,
      type: "normal",
      click: () => adjustBrightness(-stepLevel),
    },
    {
      label: "Preset Brightness Levels",
      submenu: generateBrightnessPresets(async (level) => {
        await BrightnessController.setLevel(level);
        store.set("currentLevel", level);
        notifyUser(
          "Brightness Adjustment",
          `Brightness set to ${Math.round(level)}%`
        );
      }),
    },
    {
      label: "Settings",
      submenu: [
        {
          label: "Launch at Startup",
          type: "checkbox",
          checked:
            store.get("launchAtStartup") ?? schema.launchAStartup.default,
          click: async (menuItem) => {
            console.log(menuItem);
            await toggleAutoLaunch(!store.get("launchAtStartup"));
            store.set("launchAtStartup", !store.get("launchAtStartup"));
          },
        },
        {
          label: "Notifications",
          type: "checkbox",
          checked: store.get("notifications"),
          click: (menuItem) => store.set("notifications", menuItem.checked),
        },
        { type: "separator" },
        {
          label: "Open config.json",
          type: "normal",
          click: () => shell.openPath(`${app.getPath("userData")}/config.json`),
        },
        {
          label: "Reset to Default",
          type: "normal",
          click: async () => {
            store.clear();
            await toggleAutoLaunch(schema.launchAStartup.default);
            await BrightnessController.setLevel(schema.currentLevel.default);
          },
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

export default createMenu;
