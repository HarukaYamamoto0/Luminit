import AutoLaunch from "auto-launch";
import config from "../../package.json" with { type: "json" };

const autoLauncher = new AutoLaunch({
  name: config.name,
});

async function toggleAutoLaunch(enable) {
  if (enable) {
    await autoLauncher.enable();
  } else {
    await autoLauncher.disable();
  }
}

export default toggleAutoLaunch;
