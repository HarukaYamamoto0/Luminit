import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

/**
 * Executes a shell command and returns its output as a Promise.
 * @param cmd {string} The shell command to execute.
 * @returns {Promise<string>} A promise that resolves with the command's stdout or rejects with an error.
 */
async function execShellCommand(cmd) {
  try {
    const { stdout, stderr } = await execAsync(cmd);
    if (stderr) {
      return Promise.reject(new Error(stderr));
    }
    return stdout.trim(); // Remove espaços extras do final
  } catch (error) {
    return Promise.reject(
      new Error(`Failed to execute command "${cmd}": ${error.message}`)
    );
  }
}

export default execShellCommand;
