import Link from 'next/link'

export const Header = () => {
  return (
    <header className="centered-container flex items-center justify-between py-5">
      <div className="flex items-center space-x-10">
        <Link href="/">
          <img
            className="w-40 cursor-pointer sm:w-44"
            src="https://links.papareact.com/yvf"
            alt="logo"
          />
        </Link>
        <ul className="hidden space-x-5 font-semibold md:flex md:items-center">
          <Link href="/about">
            <a className="transition-colors hover:text-green-600">About</a>
          </Link>
          <Link href="/contact">
            <a className="transition-colors hover:text-green-600">Contact</a>
          </Link>
          <Link href="/follow">
            <a className="rounded-full bg-green-600 py-1 px-4 text-white">
              Follow
            </a>
          </Link>
        </ul>
      </div>
      <div className="flex space-x-5 text-sm text-green-600 sm:text-base">
        <button className="border-none font-medium">Sign In</button>
        <button className="block rounded-full border border-green-600 px-2  py-1 font-medium transition-colors hover:bg-green-600 hover:text-white sm:px-4">
          Get Started
        </button>
      </div>
    </header>
  )
}
