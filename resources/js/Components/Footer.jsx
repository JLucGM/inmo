import { Link } from "@inertiajs/react";

export default function Footer({ setting }) {
  return (
    <footer className="mt-20 pb-16 px-10 text-center text-sm text-black dark:text-white/70">

      <footer className="border-t pt-12 pb-32 px-4 lg:px-0">
      <div> 
      <img src={`${setting.logo_footer}`} alt={setting.logo_footer} className="h-12 w-12" />

      </div>
      <div className="flex flex-wrap ">
        <div className="w-full lg:w-2/5">
          <p className="text-gray-600 hidden lg:block mt-4 p-0 lg:pr-12">
          {setting.description}
          </p>
          <p className="text-gray-600 hidden lg:block mt-4 p-0 lg:pr-12">
          {setting.phone}
          </p>
          <p className="text-gray-600 hidden lg:block mt-4 p-0 lg:pr-12">
          {setting.direction}
          </p>
        </div>

        <div className="w-full mt-6 lg:mt-0 md:w-1/2 lg:w-1/5">
          <h6 className="font-semibold text-gray-700 mb-4">Company</h6>
          <ul>
            <li> <a href="" className="block text-gray-600 py-2">Team</a> </li>
            <li> <a href="" className="block text-gray-600 py-2">About us</a> </li>
            <li> <a href="" className="block text-gray-600 py-2">Press</a> </li>
          </ul>
        </div>

        <div className="w-full mt-6 lg:mt-0 md:w-1/2 lg:w-1/5">
          <h6 className="font-semibold text-gray-700 mb-4">Content</h6>
          <ul>
            <li> <a href="" className="block text-gray-600 py-2">Blog</a> </li>
            <li> <a href="" className="block text-gray-600 py-2">Privacy Policy</a> </li>
            <li> <a href="" className="block text-gray-600 py-2">Terms & Conditions</a> </li>
            <li> <a href="" className="block text-gray-600 py-2">Documentation</a> </li>
          </ul>
        </div>

        <div className="w-full mt-6 lg:mt-0 md:w-1/2 lg:w-1/5">
          <h6 className="font-semibold text-gray-700 mb-4">Company</h6>
          <ul>
            <li> <a href="" className="block text-gray-600 py-2">Team</a> </li>
            <li> <a href="" className="block text-gray-600 py-2">About us</a> </li>
            <li> <a href="" className="block text-gray-600 py-2">Press</a> </li>
          </ul>
        </div>

      </div>
    </footer>

      
    </footer>
  )
}
