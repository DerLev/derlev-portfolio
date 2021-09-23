import { Fragment, useState } from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import Image from 'next/image'
import client, { urlFor } from '../components/sanityClient'
import { ClockIcon, CodeIcon, CheckIcon, ArchiveIcon, LockClosedIcon, SelectorIcon } from '@heroicons/react/outline'
import BlockContent from '@sanity/block-content-to-react'
import { Listbox } from '@headlessui/react'

const sortings = [
  { type: 'date', variant: 'desc', title: 'Date - New to Old' },
  { type: 'date', variant: 'asc', title: 'Date - Old to New' },
  { type: 'status', variant: 'asc', title: 'Status - Pending to Archived' },
  { type: 'status', variant: 'desc', title: 'Status - Archived to Pending' },
];

const Projects: NextPage = ({ projects }: any) => {
  const [data, setData] = useState<any>(projects);
  const [sorting, setSorting] = useState<any>(sortings[0]);

  const sort = (d:any) => {
    if(d.type === 'date') {
      if(d.variant === 'asc') {
        const sortedData = [...data].sort(function (a:any, b:any) {
          var dateA = new Date(a.publishedAt).getTime();
          var dateB = new Date(b.publishedAt).getTime();
          return dateA > dateB ? 1 : -1;
        });
        setData(sortedData);
      }
      if(d.variant === 'desc') {
        const sortedData = [...data].sort(function (a:any, b:any) {
          var dateA = new Date(a.publishedAt).getTime();
          var dateB = new Date(b.publishedAt).getTime();
          return dateA < dateB ? 1 : -1;
        });
        setData(sortedData);
      }
    }
    if(d.type === 'status') {
      if(d.variant === 'asc') {
        const sortedData = [...data].sort(function (a:any, b:any) {
          var statusA = 0
          function aFunc() {
            switch (a.status) {
              case 'pending':
                statusA = 0;
                break;
              case 'dev':
                statusA = 1;
                break;
              case 'done':
                statusA = 2;
                break;
              case 'archive':
                statusA = 3;
                break;
            }
          }
          aFunc();
          var statusB = 0
          function bFunc() {
            switch (b.status) {
              case 'pending':
                statusB = 0;
                break;
              case 'dev':
                statusB = 1;
                break;
              case 'done':
                statusB = 2;
                break;
              case 'archive':
                statusB = 3;
                break;
            }
          }
          bFunc();
          return statusA > statusB ? 1 : -1;
        });
        setData(sortedData);
      }
      if(d.variant === 'desc') {
        const sortedData = [...data].sort(function (a:any, b:any) {
          var statusA = 0
          function aFunc() {
            switch (a.status) {
              case 'pending':
                statusA = 0;
                break;
              case 'dev':
                statusA = 1;
                break;
              case 'done':
                statusA = 2;
                break;
              case 'archive':
                statusA = 3;
                break;
            }
          }
          aFunc();
          var statusB = 0
          function bFunc() {
            switch (b.status) {
              case 'pending':
                statusB = 0;
                break;
              case 'dev':
                statusB = 1;
                break;
              case 'done':
                statusB = 2;
                break;
              case 'archive':
                statusB = 3;
                break;
            }
          }
          bFunc();
          return statusA < statusB ? 1 : -1;
        });
        setData(sortedData);
      }
    }
    setSorting(d);
  }

  return (
    <>
      <h1 className="text-center text-3xl mb-6 font-semibold">My projects</h1>
      <div className="flex items-center justify-end gap-2 relative mb-4 px-6">
        <span>Sort by:</span>
        <Listbox value={sorting} onChange={sort}>
          <Listbox.Button className="text-gray-300 bg-gray-800 hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center gap-1"><span>{sorting.title}</span><SelectorIcon className="h-4 w-4" /></Listbox.Button>
          <Listbox.Options className="absolute self-start top-full z-20 p-2 bg-gray-800 text-white rounded-lg border border-gray-900 mt-1">
            {sortings.map((sorting, i) => (
              <Listbox.Option
                key={i}
                value={sorting}
                as={Fragment}
              >
                {({ active, selected }) => (
                  <li
                    className={`${
                      selected ? 'bg-gray-900 text-white' : 'hover:bg-gray-700 hover:text-white bg-transparent text-gray-300'
                    } gap-1 rounded px-2 py-1 grid cursor-pointer`}
                    style={{ gridTemplateColumns: '1rem auto' }}
                  >
                    <div className="flex items-center justify-center">{selected && <CheckIcon className="w-4 h-4" />}</div>
                    <span>{sorting.title}</span>
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4">
        {
          data && data.map((project:any) => (
            <div key={project._id} className="w-full relative grid">
              <div className="bg-img">
                <Image src={urlFor(project.mainImage).width(800).height(460).url()} width={400} height={230} className="rounded-lg" alt="Project Image" layout="responsive" />
              </div>
              <div className="fg-text z-10 rounded-lg bg-gray-600 grid p-1 group" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%)", gridTemplateRows: '2fr 1fr' }}>
                <div className="flex justify-center items-center flex-col gap-1">
                  <h1 className="text-3xl title-shadow text-center">{project.title}</h1>
                  {
                    project.description &&
                    <div className="description-shadow text-center">
                      <BlockContent blocks={project.description[0]} />
                    </div>
                  }
                </div>
                <div className="flex-grow-0 flex flex-col justify-end">
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
