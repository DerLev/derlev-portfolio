import { NextPage, GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next"
import client, { urlFor } from '../../components/sanityClient'
import { NextSeo } from "next-seo"
import Image from 'next/image'
import moment from "moment"
import BlockContent from '@sanity/block-content-to-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'

const weekDay = (wd:number) => {
  switch (wd) {
    case 1:
      return 'Monday'
    case 2:
      return 'Tuesday'
    case 3:
      return 'Wednesday'
    case 4:
      return 'Thursday'
    case 5:
      return 'Friday'
    case 6:
      return 'Saturday'
    case 7:
      return 'Sunday'
  }
}

const serializers = (props: any) => {
  const { style = 'normal' } = props.node

  if(/^h\d$/.test(style)) {
    switch (Number(style.replace(/[^\d]/g, ''))) {
      case 1:
        return (
          <h1 className="text-4xl font-semibold mt-1 mb-3">
            {props.children}
          </h1>
        )
      case 2:
        return (
          <h2 className="text-3xl font-semibold mt-1 mb-3">
            {props.children}
          </h2>
        )
      case 3:
        return (
          <h3 className="text-2xl font-semibold mt-1 mb-3">
            {props.children}
          </h3>
        )
      case 4:
        return (
          <h4 className="text-xl font-semibold mt-1 mb-2">
            {props.children}
          </h4>
        )
    }
  }

  if(style === 'blockquote') {
    return (
      <blockquote className="border-l-2 border-gray-500 pl-2 mb-2">
        {props.children}
      </blockquote>
    )
  }

  if(style === 'normal') {
    return (
      <p className="mb-2">
        {props.children}
      </p>
    )
  }

  return BlockContent.defaultSerializers.types.block(props)
}

const linkSerializer = (props: any) => {
  return (
    <a href={props.mark.href} rel="noopener noreferrer" target="_blank" className="transition border-b-2 border-dotted border-indigo-300 hover:border-indigo-200">
      {props.children}
    </a>
  )
}

const listSerializer = (props: any) => {
  return (
    <ul className="list-disc ml-8 mb-2">
      {props.children}
    </ul>
  )
}

const listItemSerializer = (props: any) => {
  return (
    <li className="pl-1">
      {props.children}
    </li>
  )
}

const imageSerializer = (props: any) => {
  console.log(props);
  return (
    <div className="mb-3 mt-1 shadow-md">
      <Image src={urlFor(props.node.asset).width(1920).height(1080).url()} width={1920} height={1080} layout="responsive" className="rounded" alt="Image" />
    </div>
  )
}

const BlogPost: NextPage = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo
        title={post.title}
        openGraph={{
          type: 'article',
          url: process.env.rootUrl + 'blog/' + post.slug.current,
          article: {
            publishedTime: post.publishedAt,
            modifiedTime: post._updatedAt,
          },
          images: [
            {
              url: urlFor(post.mainImage).width(1436).height(1080).url(),
              width: 1436,
              height: 1080,
              alt: post.title
            }
          ]
        }}
      />
      <div className="grid rounded-2xl shadow-lg">
        <div className="bg-img h-48 overflow-hidden relative rounded-2xl">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image src={urlFor(post.mainImage).width(1280).height(208).url()} width={1280} height={208} layout="fixed" alt="Main Image" />
          </div>
        </div>
        <div className="fg-text flex flex-col items-center justify-center gap-2 z-10 bg-black bg-opacity-20 rounded-2xl">
          <h1 className="text-4xl font-semibold title-shadow">{post.title}</h1>
          <p className="description-shadow">{weekDay(Number(moment(post.publishedAt).format('E')))} {moment(post.publishedAt).format('DD.MM.YYYY')}</p>
        </div>
      </div>
      <article className="px-5 py-3">
        <BlockContent blocks={post.body} serializers={{
          types: {block: serializers, image: imageSerializer},
          marks: {link: linkSerializer},
          list: listSerializer,
          listItem: listItemSerializer
        }} />
      </article>
      <div className="mt-4 mb-2 grid md:grid-cols-2 gap-4">
        <div className="bg-gray-800 py-3 px-2 rounded-lg flex justify-between shadow-lg">
          <div className="flex items-center gap-1 text-3xl">
            <Image src={urlFor(post.author.image).width(144).height(144).url()} width={36} height={36} layout="fixed" className="rounded-full shadow-md" alt={`${post.author.name}'s picture'`} />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center">
            {
              post.author.ghUrl &&
              <a href={post.author.ghUrl} rel="noopener noreferrer" target="_blank" className="flex items-center gap-1 text-indigo-300 hover:text-indigo-200 transition">
                <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            }
          </div>
        </div>
        {
          post.project &&
          <div className="grid shadow-lg rounded-lg">
            <div className="bg-img overflow-hidden relative rounded-lg h-16">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Image src={urlFor(post.project.mainImage).width(735).height(70).url()} width={735} height={70} layout="fixed" alt="Project Image" />
              </div>
            </div>
            <div className="fg-text py-3 px-2 flex items-center justify-between rounded-lg z-10">
              <div className="title-shadow">
                <span className="text-3xl">{post.project.title}</span>
              </div>
              <div className="description-shadow">
                {
                  post.project.url && !post.project.private &&
                  <a href={post.project.url} rel="noopener noreferrer" target="_blank" className="flex items-center gap-1 text-indigo-300 hover:text-indigo-200 transition">
                    <FontAwesomeIcon icon={faGithub} className="w-4 h-4 shadow bg-black rounded-full bg-opacity-20" />
                    <span>GitHub</span>
                  </a>
                }
              </div>
            </div>
          </div>
        }
        {
          !post.project &&
          <div className="bg-gray-800 py-3 px-2 rounded-lg shadow-lg">
            <div className="flex items-center">
              <span className="text-3xl">No associated project</span>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default BlogPost;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data = await client.fetch(`
    *[slug.current == "${ctx.params?.slug}" && publish == true]{
      author->{
        name,
        image,
        ghUrl
      },
      body,
      mainImage,
      publishedAt,
      title,
      slug,
      _updatedAt,
      project->{
        mainImage,
        title,
        private,
        url
      }
    }
  `);

  if(!data[0]) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post: data[0]
    },

    revalidate: 60 * 30
  }
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const posts = await client.fetch(`
    *[_type == "post"] {
      slug
    }
  `);

  const slugs = posts.map((post:any) => ({
    params: { slug: post.slug.current }
  }))

  return {
    paths: slugs,
    fallback: 'blocking'
  }
}