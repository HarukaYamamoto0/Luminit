<p align="center">
  <a href="https://www.tabnews.com.br">
    <img src="https://imgur.com/qmYnQdN.jpg" height="170" width="175" alt="Elaina" />
  </a>
</p>

<h1 align="center">
    <a href="./assets/iconTemplate.png">Luminit</a>
</h1>
<p align="center">A simple tray-based application for controlling screen brightness on Linux. </p>

<div align="center">
  <img src="https://img.shields.io/static/v1?label=license&message=MIT&color=blue&style=for-the-badge"/>
  <img src="https://img.shields.io/static/v1?label=status&message=Finished%20enough&color=blue&style=for-the-badge"/>
</div>

---

# About

Luminit is a lightweight and intuitive Electron application for managing monitor brightness on xrandr-powered systems. I made it simple and user-friendly to control your monitor's brightness levels.

I was going to make it work on Windows but I've had enough headaches, I've had too many problems creating this app, so I'm stopping it here.

## Features

- **Brightness Control**: Adjust brightness levels incrementally or choose from preset levels.
- **Auto-Launch**: Option to launch Luminit on system startup.
- **Notifications**: Enable or disable notifications for brightness adjustments.
- **Customizable**: Modify brightness steps and presets via configuration.
- **Persistent Settings**: Stores user preferences and settings using JSON.
- **Help and Support**: Built-in links to documentation and issue reporting.

## Installation

### Requirements
- Node.js (v18 or later recommended)
- Electron
- Linux system with xrandr installed

### Clone the Repository
```bash
git clone https://github.com/HarukaYamamoto0/Luminit.git
cd Luminit
```

### Install Dependencies
```bash
npm install
```

### Start the Application
```bash
npm start
```

## Usage

### Adjusting Brightness
- **Increment/Decrement**: Use the menu options to increase or decrease brightness by the configured step.
- **Preset Levels**: Select a specific brightness level from the "Preset Brightness Levels" submenu.

### Settings
- **Launch at Startup**: Enable or disable the app’s auto-launch behavior.
- **Notifications**: Toggle notifications for brightness adjustments.
- **Reset to Default**: Restore default settings and brightness levels.

## Configuration
Luminit uses a `config.json` file to store settings.

### Default Schema
```json
{
  "maxLevel": 100,
  "minLevel": 10,
  "stepLevel": 10,
  "currentLevel": 50,
  "launchAStartup": false,
  "notifications": true
}
```

### Modify Configuration
1. Open the settings menu.
2. Click on "Open config.json".
3. Edit the file and save changes.

## Development

### Project Structure
```
Luminit/
├── assets
│   └── iconTemplate.png
├── biome.json
├── forge.config.js
├── LICENSE
├── package.json
├── README.md
├── src
│   ├── BrightnessController.js
│   ├── createMenu.js
│   ├── Luminit.js
│   ├── main.js
│   ├── store.js
│   └── utils
│       ├── execShellCommand.js
│       ├── showNotification.js
│       └── toggleAutoLaunch.js
└── yarn.lock
```

### Scripts
- **Install Dependencies**: `yarn`
- **Start Development**: `yarn dev`
- **Build for Production**: `yarn make`

## Contributions
Contributions are welcome! Follow the steps below to contribute:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit changes: `git commit -m 'Add feature-name'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## Acknowledgments
- <a href="https://www.flaticon.com/free-icons/weather" title="weather icons">Logo created by Freepik - Flaticon</a>

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.
