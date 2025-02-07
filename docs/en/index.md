---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Gloss Mod Manager"
  # text: "A VitePress Site"
  tagline: "A comprehensive modern game mod manager"
  actions:
    - theme: brand
      text: Getting Started
      link: /en/README
    - theme: alt
      text: Install Mod
      link: /en/Install
    - theme: alt
      text: Download
      link: "https://github.com/GlossMod/Gloss-Mod-Manager/releases"
  image:
    src: "https://mod.3dmgame.com/static/upload/mod/202405/MOD663ed1e5509eb.png@webp"
    # width: "200px"
    alt: "Gloss Mod Manager"

features:
  - title: What is this?
    details: "Gloss Mod Manager (GMM) is a comprehensive modern game mod manager. It is a powerful comprehensive game mod manager that provides game players with a simple and easy way to manage and install various game mods."
  - title: Features
    details: "Adaptive language, adaptive theme, simple UI, no unnecessary content and bloated ads, simple installation and download, convenient browsing and downloading mods, comfortable animations, no virus and no bundling, all functions are free and open"
  - title: Supported Languages
    details: "简体中文 <br/>
繁体中文 <br/>
English <br/>
Türkçe by:sinnerclown <br/>
Vietnamese by:TQ34"

---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>