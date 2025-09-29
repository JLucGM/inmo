import HeaderSection from "./HeaderSection";


export default function InfoSection({ data, setting }) {
  return (
    <section className="bg-white text-gray-900 container mx-auto py-16 px-4 md:px-16">

      <HeaderSection
        title={setting.titleInfoSection}
        description={setting.descriptionInfoSection}
      />

      <div className="space-y-12">
        {data.map((feature, index) => (
          <div key={index} className={`md:flex items-center md:items-start md:justify-between ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            <div className="w-full md:w-1/2 md:px-8">
              <h2 className="text-2xl font-bold mb-4 capitalize">{feature.name}</h2>
              {/* <p className="text-gray-600 mb-6 text-center md:text-left">{feature.text}</p> */}
              <div className="text-gray-600 mb-6 text-left md:text-left" dangerouslySetInnerHTML={{ __html: feature.text }} />
            </div>
            <div className="w-full md:w-1/2">
              <img className="rounded-3xl border-none" src={`${feature.image}`} alt={feature.alt} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
