import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import "react-big-calendar/lib/css/react-big-calendar.css"
import Badge from '@/Components/Badge';
import Breadcrumb from '@/Components/Breadcrumb';
import MyChart from '@/Components/MyChart';
import { CalendarDateRangeIcon, FolderIcon, HomeModernIcon, ListBulletIcon } from '@heroicons/react/24/outline';


export default function Dashboard({ auth, taskCounts, contacts, properties, propertyCounts, contactsCounts, tasks, roles, permission }) {
    // console.log(roles)
    const localizer = dayjsLocalizer(dayjs);

    const events = tasks.map(task => ({
        start: dayjs(task.start_time, { format: 'YYYY-MM-DD HH:mm:ss' }).toDate(),
        end: dayjs(task.end_time, { format: 'YYYY-MM-DD HH:mm:ss' }).toDate(),
        title: task.name + ' - ' + task.type_task.name,
        status: task.status_contact.name, // Asegúrate de que este campo esté disponible
        id: task.id
    }));

    const items = [
        {
            name: 'Dashboard',
            href: 'dashboard',
            icon: {
                path: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z',
            },
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={roles}
            permission={permission}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Bienvenido, {auth.user.name}</h2>
                    <div className="flex space-x-4">
                        {permission.some(perm => perm.name === 'admin.contactos.index') && (

                            <Link className='text-sm text-gray-800 dark:text-gray-200 border dark:border-gray-500 rounded-full p-2 transition ease-in-out duration-150' href={route('contacts.create')}>Crear contactos</Link>
                        )}
                        {permission.some(perm => perm.name === 'admin.properties.index') && (
                            <Link className='text-sm text-gray-800 dark:text-gray-200 border dark:border-gray-500 rounded-full p-2 transition ease-in-out duration-150' href={route('properties.create')}>Crear propiedad</Link>
                        )}

                    </div>
                </div>
            }
        >
            <Breadcrumb items={items} />

            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto my-5">


                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div className="grid grid-cols-3 lg:grid-cols-6 col-span-3 border dark:border-gray-500 rounded-xl">
                        <div className="col-span-full p-2 border-b-2 dark:border-gray-500 flex justify-between items-center">
                            <div className="flex">
                            <ListBulletIcon className='size-6 me-2 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white' />
                            <p className="capitalize text-base font-bold text-gray-800 dark:text-gray-200">Registros de Tareas</p>
                            </div>
                            {permission.some(perm => perm.name === 'admin.tasks.index') && (
                                <Link className='text-sm text-gray-800 dark:text-gray-200 underline underline-offset-4' href={route('tasks.create')}>Crear</Link>
                            )}
                        </div>
                        {Object.entries(taskCounts).map(([statusName, count]) => (
                            <div key={statusName} className="flex items-center justify-center h-24 rounded-xl hover:bg-gray-900">
                                <div className='text-center'>
                                    <p className="text-2xl text-gray-800 dark:text-gray-200">{count || 0}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{statusName}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border dark:border-gray-500 rounded-xl">
                        <div className="col-span-full p-2 border-b-2 dark:border-gray-500">
                            <div className="flex">
                                <FolderIcon className='size-6 me-2 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white' />
                                <p className="capitalize text-base font-bold text-gray-800 dark:text-gray-200">contacto</p>
                            </div>
                        </div>
                        <div className="col-span-1 flex items-center justify-center h-24 rounded-xl hover:bg-gray-900 ">
                            <div className='text-center'>
                                <p className="text-2xl text-gray-800 dark:text-gray-200">{contacts}</p>
                                <p className="capitalize text-sm text-gray-500 dark:text-gray-400">Nuevos</p>
                            </div>
                        </div>
                    </div>
                    <div className="border dark:border-gray-500 rounded-xl">
                        <div className="col-span-full p-2 border-b-2 dark:border-gray-500">
                            <div className="flex">
                                <HomeModernIcon className='size-6 me-2 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white' />
                                <p className="capitalize text-base font-bold text-gray-800 dark:text-gray-200">propiedades</p>
                            </div>
                        </div>
                        <div className="col-span-1 flex items-center justify-center h-24 rounded-xl hover:bg-gray-900">
                            <div className='text-center'>
                                <p className="text-2xl text-gray-800 dark:text-gray-200">{properties}</p>
                                <p className="capitalize text-sm text-gray-500 dark:text-gray-400">publicados</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">

                    <div className="border dark:border-gray-500 rounded-3xl col-span-2">
                        <div className="col-span-full p-2 border-b-2 dark:border-gray-500 flex justify-between items-center">
                            <div className="flex">
                                <CalendarDateRangeIcon className='size-6 me-2 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white' />
                                <p className="capitalize text-base font-bold text-gray-800 dark:text-gray-200">Agenda del dia</p>
                            </div>
                        </div>

                        <Calendar
                            localizer={localizer}
                            events={events}
                            style={{
                                height: "50vh",
                                width: "auto",
                            }}
                            defaultView='agenda'
                            toolbar={false}
                            components={{
                                event: ({ event }) => (
                                    <div className="flex items-center">
                                        <Badge
                                            className={`rbc-event event-${event.status.replace(/\s+/g, '-').toLowerCase()} p-2 rounded`} // Cambia el nombre de la clase según el estado
                                        >
                                            #{event.id} - {event.title} - {dayjs(event.start).format('hh:mm A')} a {dayjs(event.end).format('hh:mm A')}
                                            {/* {event.title} */}

                                        </Badge>
                                    </div>
                                )
                            }}
                        />
                        <div className="col-span-full p-2  dark:border-gray-500 flex justify-center items-center">
                            {permission.some(perm => perm.name === 'admin.tasks.calendary') && (
                                <Link
                                    className='capitalize text-sm text-gray-800 dark:text-gray-200 underline underline-offset-4'
                                    href={route('tasks.calendary')}
                                >
                                    Ver calendario
                                </Link>

                            )}
                        </div>
                    </div>

                    {/* <div className="bg-red-400">
                        <div className="col-span-full p-2 border-b-2 dark:border-gray-500 flex justify-between items-center">
                            <p className="capitalize text-base font-bold text-gray-800 dark:text-gray-200">Contactos nuevos</p>
                            <Link
                                className='capitalize text-sm text-gray-800 dark:text-gray-200 underline underline-offset-4'
                                href={route('contacts.index')}
                            >
                                Ver lista
                            </Link>

                        </div>
                    </div> */}
                </div>

                {permission.some(perm => perm.name === 'admin.dashboard.charts') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="border dark:border-gray-500 rounded-3xl">
                            <div className="border-b-2 dark:border-gray-500 p-2">
                                <p className="capitalize text-base font-bold text-gray-800 dark:text-gray-200">Propiedades registradas en cada mes</p>
                            </div>
                            <div className="p-2">
                                <MyChart propertyCounts={propertyCounts} label={'Propiedades creadas'} />
                            </div>
                        </div>
                        <div className="border dark:border-gray-500 rounded-3xl">
                            <div className="border-b-2 dark:border-gray-500 p-2">
                                <p className="capitalize text-base font-bold text-gray-800 dark:text-gray-200">Contactos registradas en cada mes</p>
                            </div>
                            <div className="p-2">
                                <MyChart propertyCounts={contactsCounts} label={'Contactos creados'} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
