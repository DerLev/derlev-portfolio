import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import client, { urlFor } from '../../components/sanityClient'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'

const Blog: NextPage = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo
        title="Blog"
        description="This is my blog. Here I write about my progress of projects and other stuff."
        openGraph={{
          url: process.env.rootUrl + 'blog'
        }}
      />
      <h1 className="text-center text-3xl mb-4 font-semibold">Blog</h1>
      <h2 className="text-center text-xl mb-4 font-medium">This is my blog. Here I write about my progress of projects and other stuff.</h2>
      <div className="grid grid-cols-1 gap-2">
        {
          posts.map((post:any) => (
            <div className="grid shadow-md rounded-lg" key={post._id}>
              <div className="bg-img overflow-hidden relative h-28 md:h-20 rounded-lg">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 filter blur-sm">
                  <Image src={urlFor(post.mainImage).width(1280).height(128).url()} width={1280} height={128} layout="fixed" alt="Post Main Image" />
                </div>
              </div>
              <div className="fg-text z-10 rounded-lg flex flex-col md:flex-row justify-between items-center p-2 group relative bg-black bg-opacity-20">
                <div className="transform md:origin-left group-hover:scale-125 transition-all">
                  <h1 className="text-2xl font-semibold">{post.title}</h1>
                </div>
                <div className="md:text-right transform md:origin-right group-hover:scale-105 transition-all">
                  <div className="flex items-center justify-center md:justify-end gap-1">
                    <Image src={urlFor(post.author.image).width(64).height(64).url()} width={16} height={16} className="rounded-full" alt={`${post.author.name}'s picture'`} />
                    <span>{post.author.name}</span>
                  </div>
                  <p>{moment(post.publishedAt).format('HH:mm DD.MM.YYYY')}</p>
                </div>
                <Link href={`/blog/${post.slug.current}`}>
                  <a className="flex-none absolute top-0 left-0 bottom-0 right-0"></a>
                </Link>
              </div>
            </div>
          ))
        }
        {
          !posts[0] &&
          <div className="grid shadow-md rounded-lg">
            <div className="bg-img overflow-hidden relative h-28 md:h-20 rounded-lg bg-gray-700"></div>
            <div className="fg-text z-10 rounded-lg flex justify-center items-center p-2 group relative bg-black bg-opacity-20">
              <div className="transform group-hover:scale-125 transition-all">
                <h1 className="text-2xl font-semibold">No posts yet</h1>
              </div>
              <Link href="/blog">
                <a className="flex-none absolute top-0 left-0 bottom-0 right-0"></a>
              </Link>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default Blog

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data = await client.fetch(`
    *[_type == "post"]{
      _id,
      author->{
        name,
        image
      },
      body,
      mainImage,
      publishedAt,
      slug,
      title
    }
  `);

  const sortedData = [...data].sort(function (a:any, b:any) {
    var dateA = new Date(a.publishedAt).getTime();
    var dateB = new Date(b.publishedAt).getTime();
    return dateA < dateB ? 1 : -1;
  });

  return {
    props: {
      posts: sortedData
    },

    revalidate: 60 * 15,
  };
}
