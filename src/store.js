import Store from "electron-store";

const schema = {
  currentLevel: {
    type: "number",
    maximum: 100,
    minimum: 1,
    default: 100,
  },
  launchAStartup: {
    type: "boolean",
    default: true,
  },
  isdarkTheme: {
    type: "boolean",
    default: false,
  },
  language: {
    type: "string",
    default: "English",
  },
  shortcutToIncrease: {
    type: "string",
  },
  shortcutToDecrease: {
    type: "string",
  },
  notifications: {
    type: "boolean",
    default: false,
  },
  morningBrightnessLevel: {
    type: "number",
    maximum: 100,
    minimum: 1,
    default: 50,
  },
  eveningBrightnessLevel: {
    type: "number",
    maximum: 100,
    minimum: 1,
    default: 50,
  },
  minLevel: {
    type: "number",
    minimum: 0,
    maximum: 99,
    default: 0,
  },
  maxLevel: {
    type: "number",
    maximum: 100,
    minimum: 1,
    default: 100,
  },
  stepLevel: {
    type: "number",
    maximum: 50,
    minimum: 1,
    default: 10,
  },
};

const store = new Store({ schema });

export { store, schema };
