import { Link } from "@inertiajs/react";

export default function Footer({ setting }) {
  return (
    <footer className="py-16 text-center text-sm text-black dark:text-white/70">
      Laravel

      <a href="#" className="-m-1.5 p-1.5">
        <span className="sr-only">Your Company</span>
        <img
          alt=""
          src={`/img/setting/${setting.logo_footer}`}
          className="h-8 w-auto"
        />

      </a>

      
    </footer>
  )
}
