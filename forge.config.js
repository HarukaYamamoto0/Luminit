import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { FuseV1Options, FuseVersion } from "@electron/fuses";

export const packagerConfig = {
  asar: true,
  executableName: "luminit",
};
export const rebuildConfig = {};
export const makers = [
  {
    name: "@electron-forge/maker-deb",
    executableName: "luminit",
    config: {
      options: {
        icon: "./assets/iconTemplate.png",
        productName: "Luminit",
        depends: ["x11-xserver-utils"],
      },
    },
  },
];
export const plugins = [
  {
    name: "@electron-forge/plugin-auto-unpack-natives",
    config: {},
  },
  new FusesPlugin({
    version: FuseVersion.V1,
    [FuseV1Options.RunAsNode]: false,
    [FuseV1Options.EnableCookieEncryption]: true,
    [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
    [FuseV1Options.EnableNodeCliInspectArguments]: false,
    [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
    [FuseV1Options.OnlyLoadAppFromAsar]: true,
  }),
];
