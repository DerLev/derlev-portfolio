import type { NextPage } from 'next'
import Image from 'next/image'
import bgImg from '../assets/bg.webp'
import { NextSeo } from 'next-seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'

const Home: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Home"
        description="Hi there 👋 my name is DerLev"
      />
      <div className="overflow-hidden rounded-xl shadow-xl relative" style={{ height: '33rem' }}>
        <div className="absolute transform left-1/2 -translate-y-1/2 -translate-x-1/2">
          <Image src={bgImg} width={1248} layout="fixed" />
        </div>
        <div className="absolute z-10 top-0 left-0 bottom-0 right-0 p-4 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl title-shadow mb-2">DerLev</h1>
            <h2 className="text-2xl title-shadow mb-3">Hi there 👋 my name is DerLev</h2>
            <h3 className="text-xl description-shadow mb-1">Social links:</h3>
            <div className="flex justify-center gap-1">
              <a href="https://twitter.com/_derlev_" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-800">
                  <FontAwesomeIcon icon={faTwitter} className="w-6 h-6 transition-all transform group-hover:scale-110" />
                </div>
              </a>
              <a href="https://instagram.com/_derlev_" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-800">
                  <FontAwesomeIcon icon={faInstagram} className="w-6 h-6 transition-all transform group-hover:scale-110" />
                </div>
              </a>
              <a href="https://discord.com/users/377103974081495042" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-800">
                  <FontAwesomeIcon icon={faDiscord} className="w-6 h-6 transition-all transform group-hover:scale-110" />
                </div>
              </a>
              <a href="https://github.com/DerLev" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-800">
                  <FontAwesomeIcon icon={faGithub} className="w-6 h-6 transition-all transform group-hover:scale-110" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
