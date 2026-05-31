import { Link } from "@inertiajs/react";

export default function CardPost({ data }) {
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(data.created_at));

  return (
    <Link
      key={data.id}
      href={route('posts.show', data.slug)}
      className="group block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-md"
    >
      <div className="relative overflow-hidden">
        <img
          alt=""
          src={data.image}
          loading="lazy"
          className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = `https://placehold.co/600x450/f3f4f6/9ca3af?text=Sin+imagen`;
          }}
        />
        {data.category_post?.name && (
          <span className="absolute top-3 left-3 z-10 capitalize rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-700 shadow-xs">
            {data.category_post.name}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <time dateTime={data.created_at}>{formattedDate}</time>
        </div>

        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-gray-600 transition-colors">
          {data.name}
        </h3>

        {data.extract && (
          <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
            {data.extract}
          </p>
        )}

        {data.user && (
          <div className="flex items-center gap-2 pt-2 mt-auto">
            <img
              alt=""
              src={data.user.avatar}
              loading="lazy"
              className="h-7 w-7 rounded-full bg-gray-100 object-cover"
              onError={(e) => {
                e.target.src = `https://placehold.co/28x28/e5e7eb/9ca3af?text=U`;
              }}
            />
            <span className="text-xs font-medium text-gray-700">
              {data.user.name}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
