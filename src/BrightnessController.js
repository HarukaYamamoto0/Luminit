import { store } from "./store.js";
import execShellCommand from "./utils/execShellCommand.js";

/**
 * Class responsible for controlling monitor brightness levels.
 */
class BrightnessController {
  /**
   * Retrieves the brightness levels of all connected monitors.
   *
   * @returns {Promise<number[]>} A list containing the brightness levels of each monitor as a percentage (0-100).
   * @throws {Error} Throws an error if no brightness levels are detected for active monitors.
   */
  static async getLevel() {
    try {
      const stdout = await execShellCommand("xrandr --verbose");
      const monitors = stdout.split("\n\n");

      const brightnessValues = [];

      for (const monitor of monitors) {
        const brightnessMatch = monitor.match(/Brightness:\s*(\d+\.\d+)/m);
        if (brightnessMatch) {
          brightnessValues.push(parseFloat(brightnessMatch[1]) * 100);
        }
      }

      if (brightnessValues.length === 0) {
        throw new Error("No brightness levels detected for active monitors.");
      }

      store.set("currentLevel", brightnessValues[0]);

      return brightnessValues;
    } catch (error) {
      console.error(
        "Error retrieving monitor brightness levels:",
        error.message
      );
      throw error;
    }
  }

  /**
   * Sets the brightness level for all connected monitors.
   *
   * @param {number} level - The desired brightness level as a percentage (0-100).
   * @returns {Promise<void>} Resolves when the brightness level is successfully set.
   * @throws {Error} Throws an error if setting the brightness fails.
   */
  static async setLevel(level) {
    try {
      const stdout = await execShellCommand(
        "xrandr | grep -w connected | cut -f '1' -d ' '"
      );

      const monitorNames = stdout.split("\n").filter(Boolean);

      for (const monitorName of monitorNames) {
        // Sets the brightness level for each monitor, ensuring it's clamped between 0 and 1.
        await execShellCommand(
          `xrandr --output ${monitorName} --brightness ${Math.min(
            level / 100,
            1
          )}`
        );
      }

      store.set("currentLevel", level);
    } catch (error) {
      console.error("Error setting monitor brightness levels:", error.message);
      throw error;
    }
  }
}

export default BrightnessController;
