const cupr = require('cup-readdir');
const fs = require('fs');

const main = async () => {
  const baseUrl = "https://derlev.mc-mineserver.de";

  const staticPages = await cupr.getAllFilePaths('pages').then((paths) => {
    var arr = []
    paths.forEach((path) => {
      var newPath = path
        .replace(/[\\]/g, '/')
        .replace(/(pages\/)/g, '')
        .replace(/(\/index.tsx)/g, '')
        .replace(/(.tsx)/g, '')
        .replace(/(\w{1,}\/\[\w{1,}\])/g, '');
      if(newPath !== '') arr.push(newPath);
    });
    return arr.filter((staticPage) => {
      return ![
        "_app",
        "_document",
        "_error",
        "sitemap.xml",
        "404",
        "500",
        "api",
        "index",
      ].includes(staticPage);
    }).map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`;
    });
  })

  const data = {
    baseUrl: baseUrl,
    staticPages: staticPages
  }

  console.log('Writing file ./sitemap.json');
  fs.writeFileSync('sitemap.json', JSON.stringify(data));
  console.log('Done!\n');
}

main();