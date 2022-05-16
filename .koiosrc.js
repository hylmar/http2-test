const { name, version } = require("./package.json");

/**
 * Paths
 */

const paths = {
  roots: {
    from: "source",
    to: "build",
  },
  assets: {
    "static/": "static/",
  },
  pages: {
    "templates/pages/**/*.pug": "${dir}/${name}.html",
  },
  parts: {
    "templates/components/**/*.pug": "components/${name}.html",
  },
  scripts: {
    "scripts/*.js": "assets/js/${name}.v${version}.min.js",
    "api/*.js": "functions/${name}.js",
  },
  styles: {
    "styles/*.scss": "assets/css/${name}.v${version}.css",
  },
};

/**
 * HTTPS certificate
 */

const https = {
  key: "cert/localhost-privkey.pem",
  cert: "cert/localhost-cert.pem",
};

/**
 * Parts
 */

const partExtends = {
  file: `/${paths.roots.from}/templates/_component`,
  block: "content",
};

/**
 * Locals
 */

const locals = {
  VERSION: version,

  CSS_PATH: "/assets/css/",
  JS_PATH: "/assets/js/",
  IMG_PATH: "/static/img/",
  FONTS_PATH: "/static/font/",
};

/*
 * Robots.txt to add to destination folder
 */

const robotsTxt = `User-agent: *
Disallow: /
`;

/**
 * Export
 */

module.exports = {
  project: { name, version },
  paths,
  locals,
  partExtends,
  robotsTxt,
  https,
};
