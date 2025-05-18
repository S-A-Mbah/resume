import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <ul className="flex justify-center space-x-6">
          <li>
            <Link href="#skills" className="text-gray-700 hover:text-blue-500">
              Skills
            </Link>
          </li>
          <li>
            <Link href="#education" className="text-gray-700 hover:text-blue-500">
              Education
            </Link>
          </li>
          <li>
            <Link href="#experience" className="text-gray-700 hover:text-blue-500">
              Experience
            </Link>
          </li>
          <li>
            <Link href="#projects" className="text-gray-700 hover:text-blue-500">
              Projects
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

