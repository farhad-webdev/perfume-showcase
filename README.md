# Dior Sauvage — Scroll Experience

## Run in VS Code

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Deploy to GitHub Pages

This repository is configured to deploy from the `main` branch with GitHub Actions.

1. In the GitHub repository, open **Settings → Pages** and set the source to **GitHub Actions**.
2. Push the project to the `main` branch. The workflow builds and deploys the site automatically.
3. After the workflow succeeds, open `https://farhad-webdev.github.io/perfume-showcase/`.

For an empty repository, run these commands from the project folder in PowerShell:

```powershell
git init
git add .
git commit -m "Deploy Sauvage scroll experience"
git branch -M main
git remote add origin https://github.com/farhad-webdev/perfume-showcase.git
git push -u origin main
```

GitHub may ask you to authenticate during `git push`. Do not put a password or token in the remote URL.

## Important: make the bottle truly 3D

This starter uses the uploaded concept image so it works immediately.

For the final premium version:
1. Put a transparent bottle PNG at `public/assets/sauvage-cutout.png` and replace the hero `<img>` in `ProductVisual`, OR
2. Add a real model at `public/models/sauvage.glb` and replace `ProductVisual` with a React Three Fiber scene.

The scroll architecture, information cards, connector lines, sticky scene and purchase section are already in place.
