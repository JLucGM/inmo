

export default function InfoSection({ data, setting }) {
  return (
    <section className="bg-white text-gray-900 container mx-auto py-16 px-4 md:px-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{setting.titleInfoSection}</h1>
        <p className="text-lg text-gray-600">{setting.descriptionInfoSection}</p>
      </div>

      <div className="space-y-12">
        {data.map((feature, index) => (
          <div key={index} className={`grid grid-cols-2 items-center md:items-start md:justify-between ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            <div className="col-span-full md:col-span-1">
              <h2 className="text-2xl font-bold mb-4 capitalize">{feature.name}</h2>
              {/* <p className="text-gray-600 mb-6 text-center md:text-left">{feature.text}</p> */}
              <div className="text-gray-600 mb-6 text-center md:text-left" dangerouslySetInnerHTML={{ __html: feature.text }} />
            </div>
            <div className="col-span-full md:col-span-1">
              <img className="rounded-3xl border-none" src={`${feature.image}`} alt={feature.alt} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
