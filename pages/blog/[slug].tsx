import { NextPage, GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next"
import client, { urlFor } from '../../components/sanityClient'
import { NextSeo } from "next-seo"
import Image from 'next/image'
import moment from "moment"
import BlockContent from '@sanity/block-content-to-react'

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
      <div className="grid">
        <div className="bg-img h-48 overflow-hidden relative rounded-2xl">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image src={urlFor(post.mainImage).width(1280).height(208).url()} width={1280} height={208} layout="fixed" />
          </div>
        </div>
        <div className="fg-text flex flex-col items-center justify-center gap-2 z-10 bg-black bg-opacity-20 rounded-2xl">
          <h1 className="text-4xl font-semibold title-shadow">{post.title}</h1>
          <div className="text-xl flex items-center gap-1 title-shadow">
            <Image src={urlFor(post.author.image).width(96).height(96).url()} width={24} height={24} layout="fixed" className="rounded-full shadow-md" />
            <span>{post.author.name}</span>
          </div>
          <p className="description-shadow">{weekDay(Number(moment(post.publishedAt).format('E')))} {moment(post.publishedAt).format('DD.MM.YYYY')}</p>
        </div>
      </div>
      <BlockContent blocks={post.body[0]} />
    </>
  )
}

export default BlogPost;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data = await client.fetch(`
    *[slug.current == "${ctx.params.slug}"]{
      author->{
        name,
        image
      },
      body,
      mainImage,
      publishedAt,
      title,
      slug,
      _updatedAt
    }
  `);

  return {
    props: {
      post: data[0]
    }
  }
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const posts = await client.fetch(`
    *[_type == "post"] {
      slug
    }
  `);

  const slugs = posts.map((post) => ({
    params: { slug: post.slug.current }
  }))

  return {
    paths: slugs,
    fallback: false
  }
}