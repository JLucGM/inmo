import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle,
    CardDescription
} from '@/Components/ui/card';
import { 
    HomeIcon, 
    UserIcon, 
    ClipboardDocumentListIcon,
    ArrowUpRightIcon,
    CalendarDaysIcon
} from '@heroicons/react/24/outline';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';
import { Button } from '@/Components/ui/button';

const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export default function Dashboard({ auth, contacts, properties, tasks, taskCounts, propertyCounts, contactsCounts }) {
    
    // Transformar datos para el gráfico de tendencias (Área)
    const chartData = months.map((month, index) => ({
        name: month,
        Propiedades: propertyCounts[index] || 0,
        Contactos: contactsCounts[index] || 0,
    }));

    // Transformar datos para el gráfico de barras (Tareas por estado)
    const barData = Object.entries(taskCounts).map(([name, value]) => ({
        name,
        value,
    }));

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    return (
        <AuthenticatedLayout
            user={auth.user}
            
            header={
                <div className="flex flex-col gap-1 w-full">
                    <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100 leading-tight tracking-tight">
                        Resumen General
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Bienvenido de nuevo, <span className="font-semibold text-blue-600">{auth.user.name}</span>. Aquí tienes un vistazo de lo que está pasando hoy.
                    </p>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="p-4 md:p-6 space-y-8 max-w-7xl mx-auto">
                
                {/* Metrics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <Card className="shadow-sm border-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Propiedades</CardTitle>
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <HomeIcon className="w-4 h-4 text-blue-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">{properties}</div>
                            <p className="text-xs text-gray-400 mt-1">Nuevos registros este año</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Contactos</CardTitle>
                            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                                <UserIcon className="w-4 h-4 text-emerald-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">{contacts}</div>
                            <p className="text-xs text-gray-400 mt-1">Clientes activos en base</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Tareas Pendientes</CardTitle>
                            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                <ClipboardDocumentListIcon className="w-4 h-4 text-amber-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">{tasks?.length || 0}</div>
                            <p className="text-xs text-gray-400 mt-1">Próximos 7 días</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-none bg-gradient-to-br from-blue-600 to-indigo-700 hover:shadow-lg transition-all text-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-blue-100 italic">Acceso Rápido</CardTitle>
                            <ArrowUpRightIcon className="w-5 h-5 text-blue-200" />
                        </CardHeader>
                        <CardContent className="pt-2">
                            <Link href={route('properties.create')} className="text-lg font-semibold flex items-center gap-2 hover:underline">
                                Publicar Inmueble
                            </Link>
                            <p className="text-xs text-blue-100/60 mt-2 line-clamp-1">Gestiona tus publicaciones hoy.</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Charts & Lists Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Activity Area Chart */}
                    <Card className="lg:col-span-2 shadow-sm border dark:border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Crecimiento Mensual</CardTitle>
                            <CardDescription>Comparativa de registros de propiedades y contactos durante el año {new Date().getFullYear()}.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full pt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorProp" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorCont" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-gray-800" />
                                        <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                        <Tooltip 
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                            labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                                        />
                                        <Area type="monotone" dataKey="Propiedades" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorProp)" />
                                        <Area type="monotone" dataKey="Contactos" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCont)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upcoming Tasks Side List */}
                    <Card className="lg:col-span-1 shadow-sm border dark:border-gray-800">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-semibold">Próximas Tareas</CardTitle>
                                <CardDescription>Siguientes 7 días.</CardDescription>
                            </div>
                            <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {tasks?.length > 0 ? (
                                    tasks.slice(0, 5).map((task) => (
                                        <div key={task.id} className="group flex flex-col gap-1 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800 relative">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 line-clamp-1">{task.type_task?.name || 'Gestión'}</h4>
                                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-200">
                                                    {new Date(task.start_time).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 line-clamp-1 italic">{task.name}</p>
                                            <Link href={route('tasks.edit', task.id)} className="absolute inset-0 z-10 opacity-0">Editar</Link>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-10 text-center flex flex-col items-center gap-2">
                                        <ClipboardDocumentListIcon className="w-8 h-8 text-gray-300" />
                                        <p className="text-xs text-gray-500 italic">No hay tareas programadas.</p>
                                    </div>
                                )}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full mt-2"
                                    nativeButton={false}
                                    render={<Link href={route('tasks.index')}>Ver todo el calendario</Link>}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tasks Distribution Chart */}
                    <Card className="lg:col-span-1 shadow-sm border dark:border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Distribución por Estado</CardTitle>
                            <CardDescription>Volumen de tareas según su etapa actual.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={barData} layout="vertical" margin={{ left: 20 }}>
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={11} width={80} stroke="#9CA3AF" />
                                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none'}} />
                                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                                            {barData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Insights or quick info */}
                    <Card className="lg:col-span-2 shadow-sm border dark:border-gray-800 bg-gray-50/10 dark:bg-transparent">
                        <CardContent className="flex flex-col md:flex-row items-center justify-between p-6 gap-6">
                            <div className="flex-1 space-y-2">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    💡 Tip Inmobiliario
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    "Los inmuebles con más de 10 fotos profesionales reciben un 40% más de contactos." 
                                    Asegúrate de que tus nuevas publicaciones tengan el mejor material visual posible.
                                </p>
                                <div className="pt-4 flex gap-3">
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        nativeButton={false}
                                        render={<Link href={route('post.index')}>Ver consejos del blog</Link>}
                                    />
                                </div>
                            </div>
                            <div className="hidden md:block w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                                <ArrowUpRightIcon className="w-12 h-12 text-blue-500/50" />
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
