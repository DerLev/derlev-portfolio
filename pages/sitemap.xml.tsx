import fs from "fs";
import client from '../components/sanityClient'

const Sitemap = () => {};

export const getServerSideProps = async ({ res }: any) => {
  const baseUrl = {
    development: "http://localhost:3000",
    test: "http://localhost:3000",
    production: "https://derlev.mc-mineserver.de",
  }[process.env.NODE_ENV];

  const staticPages = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "_app.tsx",
        "_document.tsx",
        "_error.tsx",
        "sitemap.xml.tsx",
        "404.tsx",
        "api",
        "index.tsx",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath.substring(0, (staticPagePath.length - 4))}`;
    });

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
        .map((url) => {
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