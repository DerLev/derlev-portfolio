export default {
  titleTemplate: '%s – DerLev',
  defaultTitle: 'DerLev',
  description: 'Hi there 👋 my name is DerLev',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.rootUrl,
    site_name: 'DerLev',
    images: [
      {
        url: process.env.rootUrl + 'og/main.jpg',
        width: 1920,
        height: 1440,
        alt: 'Snowy Mointains',
      }
    ]
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};