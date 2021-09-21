import 'tailwindcss/tailwind.css'
import '../styles/default.scss'
import type { AppProps } from 'next/app'
import NavBar from '../components/NavBar'
import moment from 'moment'
import { CodeIcon } from '@heroicons/react/outline'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col items-stretch min-h-screen">
      <NavBar />
      <main className="bg-gray-700 flex-grow p-4 relative">
        <Component {...pageProps} />
      </main>
      <footer className="bg-gray-900 flex-grow-0 flex items-center justify-center text-gray-400 font-light py-1">
        <div className="max-w-7xl w-full flex justify-between items-center">
          <span>&copy; { moment().format('yyyy') }</span>
          <a href="https://github.com/" rel="noopener noreferrer" target="_blank" className="flex items-center gap-1">
            <CodeIcon className="w-5 h-5 inline-block" />
            <span>GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  )
}
export default MyApp
