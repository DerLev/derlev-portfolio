import { Fragment, useState } from 'react'
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import client, { urlFor } from '../components/sanityClient'
import { ClockIcon, CodeIcon, CheckIcon, ArchiveIcon, LockClosedIcon, SelectorIcon } from '@heroicons/react/outline'
import BlockContent from '@sanity/block-content-to-react'
import { Listbox, Dialog, Transition } from '@headlessui/react'
import { NextSeo } from 'next-seo'

const sortings = [
  { type: 'date', variant: 'desc', title: 'Date - New to Old' },
  { type: 'date', variant: 'asc', title: 'Date - Old to New' },
  { type: 'status', variant: 'asc', title: 'Status - Pending to Archived' },
  { type: 'status', variant: 'desc', title: 'Status - Archived to Pending' },
];

const sortDate = (data: any, asc?: boolean) => {
  const sortedData = [...data].sort(function (a:any, b:any) {
    var dateA = new Date(a.publishedAt).getTime();
    var dateB = new Date(b.publishedAt).getTime();
    if(asc === true) return dateA > dateB ? 1 : -1;
    return dateA < dateB ? 1 : -1;
  });
  return sortedData
}

const sortStatus = (data: any, asc?: boolean) => {
  const sortedData = [...data].sort(function (a:any, b:any) {
    function resFunc(a:any) {
      switch (a.status) {
        case 'pending':
          return 0;
        case 'dev':
          return 1;
        case 'done':
          return 2;
        case 'archive':
          return 3;
        default:
          return 4;
      }
    }
    var statusA = resFunc(a);
    var statusB = resFunc(b);
    if(asc === true) return statusA > statusB ? 1 : -1;
    return statusA < statusB ? 1 : -1;
  });
  return sortedData;
}

const Projects: NextPage = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [data, setData] = useState<any>(projects);
  const [sorting, setSorting] = useState<any>(sortings[0]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalObject, setModalObject] = useState(projects[0]);

  const sort = (d:any) => {
    if(d.type === 'date') {
      if(d.variant === 'asc') {
        const sortedData = sortDate(data, true);
        setData(sortedData);
      }
      if(d.variant === 'desc') {
        const sortedData = sortDate(data);
        setData(sortedData);
      }
    }
    if(d.type === 'status') {
      if(d.variant === 'asc') {
        const sortedData = sortStatus(data, true);
        setData(sortedData);
      }
      if(d.variant === 'desc') {
        const sortedData = sortStatus(data);
        setData(sortedData);
      }
    }
    setSorting(d);
  }

  const openModal = (i:number) => {
    setModalObject(data[i]);
    setModalOpen(true);
  }

  return (
    <>
      <NextSeo
        title="Projects"
        description="Here is a list of my projects I am working on, or have been working on"
        openGraph={{
          url: process.env.rootUrl + 'projects'
        }}
      />
      <Transition show={modalOpen} as={Fragment}>
        <Dialog onClose={() => setModalOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" style={{ background: '#0000004c' }} />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative bg-white rounded-lg max-w-md mx-auto text-gray-800 grid w-full transform">
                <div className="bg-img">
                  <Image src={urlFor(modalObject.mainImage).width(800).height(460).url()} width={400} height={230} alt="Project Image" layout="responsive" className="rounded-lg" />
                </div>
                <div className="fg-text z-10 text-white rounded-lg p-2 flex flex-col justify-between" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%)" }}>
                  <div>
                    <h1 className="text-2xl title-shadow">{modalObject.title}</h1>
                    {
                      modalObject.description &&
                      <div className="description-shadow">
                        <BlockContent blocks={modalObject.description[0]} />
                      </div>
                    }
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col justify-end flex-shrink-0">
                      {
                        (() => {
                          switch (modalObject.status) {
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
                        <Image src={urlFor(modalObject.author.image).width(32).height(32).url()} width={16} height={16} className="rounded-full" alt="Author Image" />
                        <span>{modalObject.author.name}</span>
                      </div>
                      {
                        modalObject.url && !modalObject.private &&
                        <div className="text-gray-300 text-shadow">
                          <a href={modalObject.url} rel="noopener noreferrer" target="_blank" className="flex items-center gap-1">
                            <CodeIcon className="w-4 h-4" />
                            <span>Open on GitHub</span>
                          </a>
                        </div>
                      }
                      {
                        modalObject.private &&
                        <div className="text-yellow-300 text-shadow flex items-center gap-1">
                          <LockClosedIcon className="w-4 h-4" />
                          <span>Private project</span>
                        </div>
                      }
                    </div>
                    {
                      modalObject.tags &&
                      <div className="text-right pl-4">
                        {
                          modalObject.tags.map((t:string, i:number) => (
                            <div className="bg-blue-500 px-3 rounded-full inline-block m-px shadow-lg" key={i}>
                              <span>{t}</span>
                            </div>
                          ))
                        }
                      </div>
                    }
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
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
          data && data.map((project:any, i:number) => (
            <div key={project._id} className="w-full relative grid">
              <div className="bg-img">
                <Image src={urlFor(project.mainImage).width(800).height(460).url()} width={400} height={230} className="rounded-lg" alt="Project Image" layout="responsive" />
              </div>
              <div className="fg-text z-10 rounded-lg bg-gray-600 grid p-1 cursor-pointer" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%)", gridTemplateRows: '2fr 1fr' }} onClick={() => openModal(i)}>
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
                      <div className="flex items-center gap-1">
                        <CodeIcon className="w-4 h-4" />
                        <span>Open on GitHub</span>
                      </div>
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


export const getStaticProps: GetStaticProps = async (ctx) => {
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

  const sortedData = sortDate(data);

  return {
    props: {
      projects: sortedData
    },

    revalidate: 60 * 30
  }
}
