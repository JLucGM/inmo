import { Link } from "@inertiajs/react";

export default function CardPost({ data }) {
  // console.log(data)
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(data.created_at));

  return (
    <div className="">
      <Link key={data.id} href={route('posts.show', data.slug)} className="flex max-w-xl flex-col items-start justify-between">
        <img
          alt=""
          src={`${data.image}`}
          loading="lazy"  // <-- Aquí agregas lazy loading
          className="h-48 w-full object-cover rounded-xl bg-gray-50"
        />

        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime={data.created_at} className="text-gray-500">
            {formattedDate}
          </time>
          <p
            // href={data.category.href}
            className="capitalize relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {data.category_post.name}
          </p>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <p
            // href={data.href}
            >
              <span className="absolute inset-0" />
              {data.name}
            </p>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{data.extract}</p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <img
            alt=""
            src={`${data.user.avatar}`}
            loading="lazy"  // <-- Aquí también
            className="h-10 w-10 rounded-full bg-gray-50"
          />
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <span className="absolute inset-0" />
              {data.user.name}
            </p>
            {/* <p className="text-gray-600">{data.author.role}</p> */}
          </div>
        </div>
      </Link>
    </div>
  );
}
