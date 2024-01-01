# Jelo

![e](https://gcdnb.pbrd.co/images/jeBPt90aTc4U.png?o=1)

# **A simple jpeg image compressor**

## Installation

### Linux

Jelo is available via debian:
[jelo_1.0.0_amd64.deb](https://github.com/n3-rd/jelo/releases/download/main/jelo_1.0.0_amd64.deb)

### Windows

Download windows executable below:
[jelo_1.0.0_x64-setup.exe](https://github.com/n3-rd/jelo/releases/download/main/jelo_1.0.0_x64-setup.exe)

### MacOS

Jelo is currently as a `dmg` file, support for Homebrew will be added soon:
[jelo_1.0.0_x64.dmg](https://github.com/n3-rd/jelo/releases/download/main/jelo_1.0.0_x64.dmg)

### Appimage

[Download Appimage](https://github.com/n3-rd/jelo/releases/download/main/jelo_1.0.0_amd64.AppImage)

## Building

Blackprint is built using [Tauri](https://tauri.app), so you will require NodeJS and Rust to build.

#### Developing

Once you've cloned the project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run tauri dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

To create a production version of the app:

```bash
npm run tauri build
```

## Contributing

Contributions are always welcome!
