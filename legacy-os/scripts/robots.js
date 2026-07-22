const { readdirSync, statSync, writeFileSync } = require("fs");
const { extname, join } = require("path");
const { author } = require("../package.json");

const xmlUrls = [];

const buildFileSitemap = (path, excludePaths, callback) => {
  const publicPath = join("public/", path);

  readdirSync(publicPath).forEach((entry) => {
    const entryPath = join(path, entry);
    const urlEntryPath = entryPath.replace(/\\/g, "/");
    const stats = statSync(join(publicPath, entry));

    if (stats.isDirectory()) {
      if (!excludePaths.includes(urlEntryPath)) {
        buildFileSitemap(entryPath, excludePaths, callback);
      }
    } else if (![".ini", ".url"].includes(extname(entry).toLowerCase())) {
      const encodedUrlEntryPath = encodeURI(urlEntryPath).replace(/'/g, "%27");

      xmlUrls.push(
        callback(
          `${author.url}/?url=/${encodedUrlEntryPath}`,
          new Date(stats.mtime - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substring(0, 10),
          `${author.url}/${encodedUrlEntryPath}`
        )
      );
    }
  });
};

// Only public portfolio surfaces are indexed. Other daedalOS processes remain
// implementation details rather than discoverable portfolio destinations.
xmlUrls.push(`<url><loc>${author.url}/?app=GameTour</loc></url>`);

buildFileSitemap(
  "Users/Public/Documents",
  [],
  (path, mtime) => `<url><loc>${path}</loc><lastmod>${mtime}</lastmod></url>`
);

writeFileSync(
  "public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${xmlUrls.join(
    ""
  )}</urlset>`,
  {
    flag: "w",
  }
);

writeFileSync(
  "public/robots.txt",
  `User-agent: *\nAllow: /\n\nSitemap: ${author.url}/sitemap.xml\n`,
  {
    flag: "w",
  }
);
