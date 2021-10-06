import client from '../components/sanityClient'
import sitemapJSON from '../sitemap.json'

const Sitemap = () => {};

export const getServerSideProps = async ({ res }: any) => {
  const baseUrl = sitemapJSON.baseUrl

  const blogPosts = await client.fetch(`
    *[_type == "post" && publish == true]{
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
      ${sitemapJSON.staticPages
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