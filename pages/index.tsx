import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import bgImg from '../assets/bg.webp'
import { NextSeo } from 'next-seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram, faDiscord, faGithub, faFacebook, faYoutube, faReddit, faTwitch } from '@fortawesome/free-brands-svg-icons'
import client from '../components/sanityClient'
import { LinkIcon, GlobeIcon } from '@heroicons/react/outline'

const icon = (icon:string) => {
  switch (icon) {
    case 'faTwitter':
      return <FontAwesomeIcon icon={faTwitter} className="w-6 h-6 transition-all transform group-hover:scale-110" />
    case 'faInstagram':
      return <FontAwesomeIcon icon={faInstagram} className="w-6 h-6 transition-all transform group-hover:scale-110" />
    case 'faDiscord':
      return <FontAwesomeIcon icon={faDiscord} className="w-6 h-6 transition-all transform group-hover:scale-110" />
    case 'faGithub':
      return <FontAwesomeIcon icon={faGithub} className="w-6 h-6 transition-all transform group-hover:scale-110" />
    case 'faFacebook':
      return <FontAwesomeIcon icon={faFacebook} className="w-6 h-6 transition-all transform group-hover:scale-110" />
    case 'faYoutube':
      return <FontAwesomeIcon icon={faYoutube} className="w-6 h-6 transition-all transform group-hover:scale-110" />
    case 'faReddit':
      return <FontAwesomeIcon icon={faReddit} className="w-6 h-6 transition-all transform group-hover:scale-110" />
    case 'faTwitch':
      return <FontAwesomeIcon icon={faTwitch} className="w-6 h-6 transition-all transform group-hover:scale-110" />
    case 'hiLink':
      return <LinkIcon className="w-6 h-6 transition-all transform group-hover:scale-110" />
    case 'hiGlobe':
      return <GlobeIcon className="w-6 h-6 transition-all transform group-hover:scale-110" />
    default:
      return <LinkIcon className="w-6 h-6 transition-all transform group-hover:scale-110" />
  }
}

const Home: NextPage = ({ page }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo
        title="Home"
        description={page.description}
      />
      <div className="overflow-hidden rounded-xl shadow-xl relative" style={{ height: '33rem' }}>
        <div className="absolute transform left-1/2 -translate-y-1/2 -translate-x-1/2">
          <Image src={bgImg} width={1248} layout="fixed" alt="Snowy Mountains" />
        </div>
        <div className="absolute z-10 top-0 left-0 bottom-0 right-0 p-4 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl title-shadow mb-2">DerLev</h1>
            <h2 className="text-2xl title-shadow mb-3">{ page.description }</h2>
            <h3 className="text-xl description-shadow mb-1">Social links:</h3>
            <div className="flex justify-center gap-1">
              {
                page.links.map((link: any) => (
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="group" key={link._key}>
                    <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-800 shadow-md">
                      { icon(link.icon) }
                    </div>
                  </a>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data = await client.fetch(`
    *[_id == 'mainSettings']{
      homePage
    }
  `);

  return {
    props: {
      page: data[0].homePage
    },

    revalidate: 60 * 60
  }
}
