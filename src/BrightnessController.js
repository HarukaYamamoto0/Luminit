import { exec as execCallback } from "child_process";
import util from "util";
import { store } from "./store.js";

const exec = util.promisify(execCallback);

class BrightnessController {
  constructor() {
    this.monitors = [];
    this.store = store;

    this.setLevel(store.get("currentLevel"));
  }

  async getLevel() {
    const level = await this.getXrandrBrightness();
    store.set("currentLevel", level);
    return level;
  }

  async setLevel(level) {
    this.setXrandrBrightness(level);
    store.set("currentLevel", level);
  }

  async getXrandrBrightness() {
    const { stdout, stderr } = await exec("xrandr --verbose");
    if (stderr)
      new Error(
        "Nenhum brilho detectado nos monitores ativos." + "\n" + stderr
      );

    const monitors = stdout.split("\n\n");

    for (const monitor of monitors) {
      const brightnessMatch = monitor.match(/Brightness:\s*(\d+\.\d+)/m);
      if (brightnessMatch) {
        return parseFloat(brightnessMatch[1]) * 100;
      }
    }
  }

  async setXrandrBrightness(level) {
    try {
      const { stdout, stderr } = await exec("xrandr --listactivemonitors");
      if (stderr) new Error(stderr);

      const monitors = stdout.split("\n\n");

      for (const monitor of monitors) {
        const monitorName = monitor.match(/^\s*\d+\s*:\s*\+\*?([^\s]+)/m)[1];

        if (monitorName) {
          const { stderr } = await exec(
            `xrandr --output ${monitorName} --brightness ${Math.min(
              level / 100,
              1
            )}`
          );
          if (stderr) new Error(stderr);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default BrightnessController;
