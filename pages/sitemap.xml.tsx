import client from '../components/sanityClient'
import cupr from 'cup-readdir'

const Sitemap = () => {};

export const getServerSideProps = async ({ res }: any) => {
  const baseUrl = {
    development: "http://localhost:3000",
    test: "http://localhost:3000",
    production: "https://derlev.mc-mineserver.de",
  }[process.env.NODE_ENV];

  const staticPages = await cupr.getAllFilePaths('pages').then((paths: any) => {
    var arr: string[] = []
    paths.forEach((path: string) => {
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

  const blogPosts = await client.fetch(`
    *[_type == "post"]{
      slug,
      _updatedAt
    }
  `);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${process.env.buildDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
      ${staticPages
        .map((url: string) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${process.env.buildDate}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
      ${blogPosts
        .map(({slug, _updatedAt}: any) => {
          return `
            <url>
              <loc>${baseUrl}/blog/${slug.current}</loc>
              <lastmod>${_updatedAt}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {
      sitemap: true
    },
  };
};

export default Sitemap;