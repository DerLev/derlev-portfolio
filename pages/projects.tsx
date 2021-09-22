import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import client, { urlFor } from '../components/sanityClient'
import { ClockIcon, CodeIcon, CheckIcon, ArchiveIcon } from '@heroicons/react/outline'
import BlockContent from '@sanity/block-content-to-react'

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
        description,
        author->{
          name,
          image
        }
      }
    `).then((data) => { setData(data); console.log(data); });
  }, [])

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {
          data && data.map((project:any) => (
            <div key={project._id} className="w-full px-2 py-1 relative grid">
              <div className="bg-img" style={{ marginBottom: -5.40 }}>
                <Image src={urlFor(project.mainImage).width(400).height(230).url()} width={400} height={230} className="rounded-lg" />
              </div>
              <div className="fg-text z-10 rounded-lg bg-gray-600 grid p-1 group" style={{ background: "linear-gradient(180deg, rgba(75,85,99,0) 50%, rgba(75,85,99,1) 100%)", gridTemplateRows: '2fr 1fr' }}>
                <div className="flex justify-center items-center flex-col gap-1">
                  <h1 className="text-3xl title-shadow">{project.title}</h1>
                  {
                    project.description &&
                    <div className="description-shadow">
                      <BlockContent blocks={project.description[0]} />
                    </div>
                  }
                </div>
                <div className="flex-grow-0">
                  {
                    (() => {
                      switch (project.status) {
                        case 'planned':
                          return (
                            <div className="flex items-center gap-1 text-gray-300 italic">
                              <ClockIcon className="w-4 h-4" />
                              <span>Planned</span>
                            </div>
                          )
                        case 'dev':
                          return (
                            <div className="flex items-center gap-1 text-white">
                              <CodeIcon className="w-4 h-4" />
                              <span>Development</span>
                            </div>
                          )
                        case 'done':
                          return (
                            <div className="flex items-center gap-1 text-green-300">
                              <CheckIcon className="w-4 h-4" />
                              <span>Done (Maintenance)</span>
                            </div>
                          )
                        case 'archive':
                          return (
                            <div className="flex items-center gap-1 text-gray-300">
                              <ArchiveIcon className="w-4 h-4" />
                              <span>Archived</span>
                            </div>
                          )
                      }
                    })()
                  }
                  <div className="flex items-center gap-1">
                    <Image src={urlFor(project.author.image).width(32).height(32).url()} width={16} height={16} className="rounded-full" />
                    <span>{project.author.name}</span>
                  </div>
                  {
                    project.url &&
                    <div className="text-gray-300">
                      <a href={project.url} rel="noopener noreferrer" target="_blank" className="flex items-center gap-1">
                        <CodeIcon className="w-4 h-4" />
                        <span>Open on GitHub</span>
                      </a>
                    </div>
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Projects
