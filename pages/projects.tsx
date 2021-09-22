import { useEffect, useState } from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import Image from 'next/image'
import client, { urlFor } from '../components/sanityClient'
import { ClockIcon, CodeIcon, CheckIcon, ArchiveIcon, LockClosedIcon } from '@heroicons/react/outline'
import BlockContent from '@sanity/block-content-to-react'

const Projects: NextPage = ({ projects }: any) => {
  const [data, setData] = useState<any>(projects);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {
          data && data.map((project:any) => (
            <div key={project._id} className="w-full px-2 py-1 relative grid">
              <div className="bg-img" style={{ marginBottom: -5.40 }}>
                <Image src={urlFor(project.mainImage).width(400).height(230).url()} width={400} height={230} className="rounded-lg" alt="Project Image" />
              </div>
              <div className="fg-text z-10 rounded-lg bg-gray-600 grid p-1 group" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%)", gridTemplateRows: '2fr 1fr' }}>
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
                            <div className="flex items-center gap-1 text-gray-300 italic text-shadow">
                              <ClockIcon className="w-4 h-4" />
                              <span>Planned</span>
                            </div>
                          )
                        case 'dev':
                          return (
                            <div className="flex items-center gap-1 text-white text-shadow">
                              <CodeIcon className="w-4 h-4" />
                              <span>Development</span>
                            </div>
                          )
                        case 'done':
                          return (
                            <div className="flex items-center gap-1 text-green-300 text-shadow">
                              <CheckIcon className="w-4 h-4" />
                              <span>Done (Maintenance)</span>
                            </div>
                          )
                        case 'archive':
                          return (
                            <div className="flex items-center gap-1 text-gray-300 text-shadow">
                              <ArchiveIcon className="w-4 h-4" />
                              <span>Archived</span>
                            </div>
                          )
                      }
                    })()
                  }
                  <div className="flex items-center gap-1 text-shadow">
                    <Image src={urlFor(project.author.image).width(32).height(32).url()} width={16} height={16} className="rounded-full" alt="Author Image" />
                    <span>{project.author.name}</span>
                  </div>
                  {
                    project.url && !project.private &&
                    <div className="text-gray-300 text-shadow">
                      <a href={project.url} rel="noopener noreferrer" target="_blank" className="flex items-center gap-1">
                        <CodeIcon className="w-4 h-4" />
                        <span>Open on GitHub</span>
                      </a>
                    </div>
                  }
                  {
                    project.private &&
                    <div className="text-yellow-300 text-shadow flex items-center gap-1">
                      <LockClosedIcon className="w-4 h-4" />
                      <span>Private project</span>
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


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await client.fetch(`
  *[_type == "project"]{
    _id,
    title,
    status,
    url,
    mainImage,
    description,
    tags,
    publishedAt,
    private,
    author->{
      name,
      image
    }
  }
`);

  const sortedData = data.sort(function (a:any, b:any) {
    var dateA = new Date(a.publishedAt).getTime();
    var dateB = new Date(b.publishedAt).getTime();
    return dateA < dateB ? 1 : -1;
  });

  return {
    props: {
      projects: data
    }
  }
}
