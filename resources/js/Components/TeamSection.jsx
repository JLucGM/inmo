
export default function TeamSection({ data, setting }) {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6s lg:px-8s xl:grid-cols-3">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{setting.titleTeamSection}</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                    {setting.descriptionTeamSection}
                    </p>
                </div>
                <ul role="list" className="list-none	 grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {data.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6">
                                <img alt="" src={`${person.avatar}`} className="h-16 w-16 rounded-full" />
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
