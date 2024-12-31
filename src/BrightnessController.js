import { Notification } from "electron";
import { exec as execCallback } from "child_process";
import util from "util";

const exec = util.promisify(execCallback);

class BrightnessController {
  constructor() {
    this.monitors = [];
  }
  detectXrandr() {
    try {
      exec("xrandr --listactivemonitors", (err, stdout) => {
        if (!err && stdout.includes("Monitors")) {
          const monitors = stdout.split("\n\n");
          this.monitors = monitors;
          console.log(this.monitors);
          return "xrandr";
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getLevel() {
    return this.getXrandrBrightness();
  }

  async setLevel(level) {
    return this.setXrandrBrightness(level);
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
          const { stdout, stderr } = await exec(
            `xrandr --output ${monitorName} --brightness ${level / 100}`
          );
          if (stderr) new Error(stderr);

          if (stdout) {
            const NOTIFICATION_TITLE = "Basic Notification";
            const NOTIFICATION_BODY = "Notification from the Main process";

            new Notification({
              title: NOTIFICATION_TITLE,
              body: NOTIFICATION_BODY,
            }).show();
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default BrightnessController;
