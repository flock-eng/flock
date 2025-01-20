import Link from "next/link"

export function Sidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r px-6 pb-4">
        <nav className="flex flex-1 flex-col pt-16">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                <li>
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    Home
                  </Link>
                </li>
                {/* Add more navigation items here */}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}