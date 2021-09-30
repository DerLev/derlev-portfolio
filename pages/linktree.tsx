import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import avatarImg from '../assets/avatar-1024.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram, faDiscord, faGithub, faFacebook, faYoutube, faReddit, faTwitch } from '@fortawesome/free-brands-svg-icons'
import { LinkIcon, GlobeIcon } from '@heroicons/react/outline'
import client from '../components/sanityClient'

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

const Linktree: NextPage = ({ links }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo
        title="Linktree"
        openGraph={{
          url: process.env.rootUrl + 'linktree'
        }}
      />
      <div className="flex justify-center">
        <div className="max-w-2xl w-full p-4 relative">
          <div className="flex items-center flex-col py-4">
            <div className="w-32 h-32">
              <Image src={avatarImg} layout="responsive" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold">DerLev</h1>
            </div>
            <div className="mt-8 w-full flex flex-col gap-2">
              <a href="https://twitter.com/_derlev_" className="bg-indigo-500 w-full py-2 px-4 text-xl font-semibold rounded hover:bg-transparent border-2 border-indigo-500 transition flex gap-2 items-center justify-center">{icon('faTwitter')}<span>Twitter</span></a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Linktree;

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      links: {}
    }
  }
}