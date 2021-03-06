import 'tailwindcss/tailwind.css'
import '../styles/default.scss'
import type { AppProps } from 'next/app'
import NavBar from '../components/NavBar'
import moment from 'moment'
import { CodeIcon } from '@heroicons/react/outline'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import SEO from '../seo.config.json'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <link rel="shortcut icon" sizes="16x16 24x24 32x32 48x48 64x64" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <DefaultSeo {...SEO} />
      {
        pathname === '/linktree' &&
        <Component {...pageProps} />
      }
      {
        pathname !== '/linktree' &&
        <div className="flex flex-col items-stretch min-h-screen">
          <NavBar />
          <main className="bg-gray-700 flex-grow flex justify-center">
            <div className="max-w-7xl w-full p-4 relative">
              <Component {...pageProps} />
            </div>
          </main>
          <footer className="bg-gray-900 flex-grow-0 flex items-center justify-center text-gray-400 font-light py-1">
            <div className="max-w-7xl w-full flex justify-between items-center px-4">
              <span>&copy; DerLev { moment().format('yyyy') }</span>
              <a href="https://github.com/DerLev/derlev-portfolio" rel="noopener noreferrer" target="_blank" className="flex items-center gap-1">
                <CodeIcon className="w-5 h-5 inline-block" />
              </a>
            </div>
          </footer>
        </div>
      }
    </>
  )
}
export default MyApp
