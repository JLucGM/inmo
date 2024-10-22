

export default function InfoSection({data}) {
  return (
    <section className="bg-white text-gray-900 container mx-auto py-16 px-4 md:px-16">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Bible Chat Features</h1>
        <p className="text-lg text-gray-600">Download the Bible Chat to explore features that will make your experience memorable.</p>
      </div>

      {/* Feature Blocks */}
      <div className="space-y-12">
        {data.map((feature, index) => (
          <div key={index} className={`flex flex-col md:flex-row items-center md:items-start md:justify-between ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            {/* Text Block */}
            <div className="md:w-5/12">
              <h2 className="text-2xl font-bold mb-4 capitalize">{feature.name}</h2>
              <p className="text-gray-600 mb-6 text-center md:text-left">{feature.text}</p>
            </div>

            {/* Image Block */}
            <div className="md:w-7/12 max-w-lg">
              <img className="rounded-3xl border-none" src={`${feature.image}`} alt={feature.alt} />

              {/* <img
                            alt=""
                            src={`/img/setting/${setting.logo}`}
                            className="h-8 w-auto"
                        /> */}
            </div>
          </div>
        ))}
      </div>

     
    </section>
  )
}
