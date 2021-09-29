const sanityClient = require('@sanity/client');
const urlBuilder = require('@sanity/image-url');
const fs = require('fs');

const config = {
  projectId: '2m1s85es',
  dataset: 'production',
  apiVersion: 'v1',
  useCdn: true,
}

const client = sanityClient(config);

const builder = urlBuilder(client);

const urlFor = (source) => {
  return builder.image(source)
}

const main = async () => {
  const data = await client.fetch(`
    *[_id == 'seoSettings']{
      defaultDescription,
      defaultTitle,
      og,
      titleTemplate
    }
  `);
  
  const newData = {
    titleTemplate: data[0].titleTemplate,
    defaultTitle: data[0].defaultTitle,
    description: data[0].defaultDescription,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://derlev.mc-mineserver.de/',
      site_name: data[0].og.siteName,
      images: [
        {
          url: urlFor(data[0].og.defaultImage).width(1920).height(1440).url(),
          width: 1920,
          height: 1440,
          alt: data[0].og.defaultImageAlt,
        }
      ]
    },
    twitter: {
      cardType: 'summary_large_image',
    },
  }

  console.log('Writing file ./seo.config.json');
  fs.writeFileSync('seo.config.json', JSON.stringify(newData));
  console.log('Done!\n');
}

main();