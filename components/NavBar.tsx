import avatar from '../assets/avatar-256.webp'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

function NavBar() {
  const router = useRouter();

  return (
    <nav className="min-h-10 flex justify-center bg-gray-800 py-2 text-white flex-grow-0">
      <div className="max-w-7xl w-full px-4 flex items-center justify-between">
        <div>
          <Link href="/">
            <a className="flex items-center gap-1">
              <Image src={avatar} height={40} width={40} className="block" alt="Avatar" />
              <span className="text-2xl font-semibold hidden sm:block">DerLev</span>
            </a>
          </Link>
        </div>
        <div>
          <Link href="/">
            <a className={`link ${router.pathname == '/' ? 'active' : ''}`}>
              Home
            </a>
          </Link>
          <Link href="/projects">
            <a className={`link ${router.pathname == '/projects' ? 'active' : ''}`}>
              Projects
            </a>
          </Link>
          <Link href="/blog">
            <a className={`link ${router.pathname == '/blog' ? 'active' : ''}`}>
              Blog
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
