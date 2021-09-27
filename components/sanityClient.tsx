import sanityClient from '@sanity/client'
import urlBuilder from '@sanity/image-url'

const config = {
  projectId: '2m1s85es',
  dataset: 'production',
  apiVersion: 'v1',
  useCdn: true,
}

const client = sanityClient(config);

const builder = urlBuilder(client);

const urlFor = (source:any) => {
  return builder.image(source)
}

export { client as default, urlFor, config }
