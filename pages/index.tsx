import type { NextPage } from 'next'
import Image from 'next/image'
import bgImg from '../assets/bg.webp'

const Home: NextPage = () => {
  return (
    <div className="overflow-hidden rounded-xl shadow-xl relative" style={{ height: '33rem' }}>
      <div className="absolute transform left-1/2 -translate-y-1/2 -translate-x-1/2">
        <Image src={bgImg} width={1248} layout="fixed" />
      </div>
      <div className="absolute z-10 top-0 left-0 bottom-0 right-0 p-4 flex items-center justify-center">
        <div>
          <h1 className="text-4xl title-shadow">DerLev</h1>
        </div>
      </div>
    </div>
  )
}

export default Home
