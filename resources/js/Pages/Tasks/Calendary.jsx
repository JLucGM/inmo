import Badge from '@/Components/Badge';
import Breadcrumb from '@/Components/Breadcrumb';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';

import "react-big-calendar/lib/css/react-big-calendar.css"

export default function Index({ auth, tasks, role, permission }) {

    // console.log(tasks)
    const items = [
        {
            name: 'Dashboard',
            href: 'dashboard',
            icon: {
                path: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z',
            },
        },
        {
            name: 'Calendario',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
    ];

    const localizer = dayjsLocalizer(dayjs);

    const events = tasks.map(task => ({
        start: dayjs(task.start_time).toDate(),
        end: dayjs(task.end_time).toDate(),
        title: task.name + ' - ' + task.type_task.name,
        status: task.status_contact.name // Asegúrate de que este campo esté disponible
    }));

    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={role}
            permission={permission}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Calendario</h2>
                    <Link href={route('tasks.create')}
                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Crear
                    </Link>
                </div>
            }
        >
            <Breadcrumb items={items} />

            <Head className="capitalize" title="Calendario" />

            <div className="">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden ">
                        <div className=" text-gray-900 dark:text-gray-100">

                            <div className="relative overflow-x-auto">
                                <Calendar
                                    localizer={localizer}
                                    events={events}
                                    style={{
                                        height: "95vh",
                                        width: "70vw",
                                    }}
                                    components={{
                                        event: ({ event }) => (
                                            <div className="flex items-center">
                                                <Badge
                                                    className={`rbc-event event-${event.status.replace(/\s+/g, '-').toLowerCase()} p-2 rounded`} // Cambia el nombre de la clase según el estado

                                                >
                                                    {event.title}
                                                </Badge>
                                            </div>
                                        )
                                    }}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}