import { useState } from 'react';
import Badge from '@/Components/Badge';
import SectionHeader from '@/Components/SectionHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';

import "react-big-calendar/lib/css/react-big-calendar.css"

const typeColors = {
    'Evento': '#8b5cf6',
    'Reunión': '#22c55e',
    'Llamada': '#3b82f6',
    'Correo electrónico': '#ec4899',
    'Tarea': '#f59e0b',
    'Recordatorio': '#06b6d4',
    'Otro': '#6b7280',
};

export default function Index({ auth, tasks }) {
    const localizer = dayjsLocalizer(dayjs);
    const [selectedTask, setSelectedTask] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const events = tasks.map(task => ({
        start: dayjs(task.start_time).toDate(),
        end: dayjs(task.end_time).toDate(),
        title: task.name + ' - ' + task.type_task?.name,
        task,
    }));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center'>
                    <SectionHeader
                        title="Calendario de tareas"
                        subtitle="Aquí puedes ver el calendario de tareas."
                    />
                    <Link href={route('tasks.create')}
                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Crear tarea
                    </Link>
                </div>
            }
        >

            <Head className="capitalize" title="Calendario" />

            <div className="">
                <div className="relative overflow-x-auto">
                    <Calendar
                        localizer={localizer}
                        events={events}
                        style={{
                            height: "95vh",
                            width: "100%",
                        }}
                        onSelectEvent={(event) => {
                            setSelectedTask(event.task);
                            setDialogOpen(true);
                        }}
                        eventPropGetter={(event) => {
                            const color = typeColors[event.task.type_task?.name] || typeColors['Otro'];
                            return {
                                style: {
                                    backgroundColor: color,
                                    color: '#fff',
                                    borderRadius: '9999px',
                                    padding: '2px 8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                }
                            };
                        }}
                    />
                </div>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-125">
                    <DialogHeader>
                        <DialogTitle>{selectedTask?.name || 'Sin título'}</DialogTitle>
                        <DialogDescription>
                            {selectedTask?.description || 'Sin descripción'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3 py-4">
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-sm">Tipo:</span>
                            <Badge
                                style={{
                                    backgroundColor: typeColors[selectedTask?.type_task?.name] || typeColors['Otro'],
                                }}
                            >
                                {selectedTask?.type_task?.name || 'N/A'}
                            </Badge>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm">Estado:</span>
                            <span className="text-sm">{selectedTask?.status_contact?.name || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm">Inicio:</span>
                            <span className="text-sm">{selectedTask?.start_time ? dayjs(selectedTask.start_time).format('DD/MM/YYYY HH:mm') : 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm">Fin:</span>
                            <span className="text-sm">{selectedTask?.end_time ? dayjs(selectedTask.end_time).format('DD/MM/YYYY HH:mm') : 'N/A'}</span>
                        </div>
                        {selectedTask?.contact && (
                            <div className="flex justify-between">
                                <span className="font-medium text-sm">Contacto:</span>
                                <span className="text-sm text-blue-600 dark:text-blue-400">{selectedTask.contact.name}</span>
                            </div>
                        )}
                        {selectedTask?.property && (
                            <div className="flex justify-between">
                                <span className="font-medium text-sm">Propiedad:</span>
                                <span className="text-sm text-blue-600 dark:text-blue-400">{selectedTask.property.name}</span>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Cerrar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    )
}