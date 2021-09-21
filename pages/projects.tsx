import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import client, { urlFor } from '../components/sanityClient'

const Projects: NextPage = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    client.fetch(`
      *[_type == "project"]{
        _id,
        title,
        status,
        url,
        mainImage,
        author->{
          name,
          image
        }
      }
    `).then((data) => { setData(data); console.log(data); });
  }, [])

  return (
    <>
      <h1>projects</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {
          data && data.map((project:any) => (
            <div key={project._id} className="w-full px-2 py-1 relative grid">
              <div className="bg-img">
                <Image src={urlFor(project.mainImage).width(400).height(230).url()} width={400} height={230} className="rounded-lg" />
              </div>
              <div className="fg-text z-10 rounded-lg bg-gray-600" style={{ background: "linear-gradient(180deg, rgba(75,85,99,0) 50%, rgba(75,85,99,0.85) 100%)"}}></div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Projects
