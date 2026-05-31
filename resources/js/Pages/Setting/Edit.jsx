import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

import SectionHeader from '@/Components/SectionHeader';
import ContainerTitle from '@/Components/ContainerTitle';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/Components/ui/tabs';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Switch } from '@/Components/ui/switch';
import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Edit({ auth, setting, currencies }) {

    const initialValues = {
        name: setting.name || "",
        phone: setting.phone || "",
        logo: setting.logo || null,
        logo_footer: setting.logo_footer || null,
        favicon: setting.favicon || null,
        direction: setting.direction || "",
        description: setting.description || "",
        descriptionBlog: setting.descriptionBlog || "",
        descriptionFaq: setting.descriptionFaq || "",
        descriptionContact: setting.descriptionContact || "",
        descriptionAnunciar: setting.descriptionAnunciar || "",
        titleBlog: setting.titleBlog || "",
        titleFaq: setting.titleFaq || "",
        titleContact: setting.titleContact || "",
        titleAnunciar: setting.titleAnunciar || "",
        titleTestimonials: setting.titleTestimonials || "",
        descriptionTestimonials: setting.descriptionTestimonials || "",
        status_banner: setting.status_banner,
        status_products_list: setting.status_products_list,
        status_info_section: setting.status_info_section,
        status_testimonials: setting.status_testimonials,
        status_team: setting.status_team,
        status_instagram_posts: setting.status_instagram_posts,
        instagram: setting.instagram || "",
        token_instagram: setting.token_instagram || "",
        portadaContact: null,
        portadaFaq: null,
        portadaAnunciar: null,
        titleInfoSection: setting.titleInfoSection || "",
        descriptionInfoSection: setting.descriptionInfoSection || "",
        titleTeamSection: setting.titleTeamSection || "",
        descriptionTeamSection: setting.descriptionTeamSection || "",
        currency_id: setting.currency_id?.toString() || (currencies?.length > 0 ? currencies[0].id.toString() : ""),
    };

    const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues);

    const submit = (e) => {
        e.preventDefault();
        post(route('settings.update', setting));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            
            
            header={
                <div className='flex justify-between items-center'>
                    <SectionHeader title="Actualizar configuración" subtitle="Administra los ajustes generales, información de contacto, imágenes y secciones del frontend." />
                </div>
            }
        >
            <Head className="capitalize" title="Configuraciones" />

            <div className=" p-4">
                {recentlySuccessful && (
                    <Alert className="mb-6 border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
                        <CheckCircleIcon className="size-4" />
                        <AlertDescription>¡Ajustes guardados exitosamente!</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={submit} className=" rounded-xl text-gray-900 dark:text-gray-100">
                    <Tabs orientation="vertical" className=" gap-6" defaultValue="principales">

                        <TabsList className="flex md:flex-col w-full md:w-64 items-start justify-start p-1 border dark:border-gray-800 overflow-x-auto md:overflow-visible">
                            <TabsTrigger value="principales" className="w-full text-left justify-start">Datos principales</TabsTrigger>
                            <TabsTrigger value="imagenes" className="w-full text-left justify-start">Imágenes / Logos</TabsTrigger>
                            <TabsTrigger value="frontend" className="w-full text-left justify-start">Configurar frontend</TabsTrigger>
                            <TabsTrigger value="blog" className="w-full text-left justify-start">Sección Blog</TabsTrigger>
                            <TabsTrigger value="faq" className="w-full text-left justify-start">Preguntas Frecuentes</TabsTrigger>
                            <TabsTrigger value="contacto" className="w-full text-left justify-start">Contacto</TabsTrigger>
                            <TabsTrigger value="anunciar" className="w-full text-left justify-start">Anunciar Propiedades</TabsTrigger>
                            <TabsTrigger value="info" className="w-full text-left justify-start">Sección Información</TabsTrigger>
                            <TabsTrigger value="equipo" className="w-full text-left justify-start">Equipo de trabajo</TabsTrigger>
                            <TabsTrigger value="testimonios" className="w-full text-left justify-start">Testimonios</TabsTrigger>
                        </TabsList>

                        <div className="flex-1 w-full min-w-0 h-screen">
                            
                            {/* Datos principales */}
                            <TabsContent value="principales" className="space-y-4 m-0">
                                <ContainerTitle title="Ajustes Generales" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <Label htmlFor="name">Nombre / Razón Social</Label>
                                        <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} className="mt-1" />
                                        {errors.name && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.name}</AlertDescription></Alert>}
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Teléfono principal</Label>
                                        <Input id="phone" value={data.phone} onChange={e => setData('phone', e.target.value)} className="mt-1" />
                                        {errors.phone && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.phone}</AlertDescription></Alert>}
                                    </div>
                                    <div>
                                        <Label htmlFor="currency_id">Moneda por defecto</Label>
                                        <ShadcnSelect value={data.currency_id} onValueChange={val => setData('currency_id', val)}>
                                            <SelectTrigger className="mt-1 w-full"><SelectValue placeholder="Seleccionar moneda" /></SelectTrigger>
                                            <SelectContent>
                                                {currencies?.map(c => (
                                                    <SelectItem value={c.id.toString()} key={c.id}>{c.symbol} - {c.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </ShadcnSelect>
                                        {errors.currency_id && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.currency_id}</AlertDescription></Alert>}
                                    </div>
                                    <div className="md:col-span-2">
                                        <Label htmlFor="direction">Dirección</Label>
                                        <Input id="direction" value={data.direction} onChange={e => setData('direction', e.target.value)} className="mt-1" />
                                        {errors.direction && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.direction}</AlertDescription></Alert>}
                                    </div>
                                    <div className="md:col-span-2">
                                        <Label htmlFor="description">Descripción (Para SEO y Meta Tags)</Label>
                                        <Textarea id="description" rows={4} value={data.description} onChange={e => setData('description', e.target.value)} className="mt-1" />
                                        {errors.description && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.description}</AlertDescription></Alert>}
                                    </div>
                                </ContainerTitle>
                            </TabsContent>

                            {/* Imágenes / Logos */}
                            <TabsContent value="imagenes" className="space-y-4 m-0">
                                <ContainerTitle title="Identidad Visual de la Marca" className="grid grid-cols-1 gap-6">
                                    <div className="flex flex-col md:flex-row gap-4 items-start p-4 border rounded-lg ">
                                        <div className="shrink-0">
                                            <Label className="block mb-2 text-center text-xs text-muted-foreground">Logo Actual</Label>
                                            {setting.logo ? <img src={setting.logo} alt="Logo" className="w-16 h-16 object-contain bg-white rounded-md p-2 shadow-sm border" /> : <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs">Sin logo</div>}
                                        </div>
                                        <div className="flex-1 w-full">
                                            <Label htmlFor="logo">Actualizar Logo Principal</Label>
                                            <Input id="logo" type="file" onChange={e => setData('logo', e.target.files[0])} className="mt-2" accept="image/*" />
                                            {errors.logo && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.logo}</AlertDescription></Alert>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-4 items-start p-4 border rounded-lg ">
                                        <div className="shrink-0">
                                            <Label className="block mb-2 text-center text-xs text-muted-foreground">Logo Footer Actual</Label>
                                            {setting.logo_footer ? <img src={setting.logo_footer} alt="Logo Footer" className="w-16 h-16 object-contain bg-slate-900 rounded-md p-2 shadow-sm border" /> : <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs">Sin logo</div>}
                                        </div>
                                        <div className="flex-1 w-full">
                                            <Label htmlFor="logo_footer">Actualizar Logo de Pie de Página</Label>
                                            <Input id="logo_footer" type="file" onChange={e => setData('logo_footer', e.target.files[0])} className="mt-2" accept="image/*" />
                                            {errors.logo_footer && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.logo_footer}</AlertDescription></Alert>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-4 items-start p-4 border rounded-lg ">
                                        <div className="shrink-0">
                                            <Label className="block mb-2 text-center text-xs text-muted-foreground">Favicon Actual</Label>
                                            {setting.favicon ? <img src={setting.favicon} alt="Favicon" className="w-16 h-16 object-cover mx-auto bg-white rounded-md p-1 shadow-sm border" /> : <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs">N/A</div>}
                                        </div>
                                        <div className="flex-1 w-full">
                                            <Label htmlFor="favicon">Actualizar Favicon</Label>
                                            <Input id="favicon" type="file" onChange={e => setData('favicon', e.target.files[0])} className="mt-2" accept="image/*" />
                                            {errors.favicon && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.favicon}</AlertDescription></Alert>}
                                        </div>
                                    </div>
                                </ContainerTitle>
                            </TabsContent>

                            {/* Configurar Frontend */}
                            <TabsContent value="frontend" className="space-y-4 m-0">
                                <ContainerTitle title="Visibilidad de Secciones Públicas">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex flex-row items-center justify-between rounded-lg border p-4 ">
                                            <div className="space-y-0.5">
                                                <Label className="text-base font-medium">Banner Principal</Label>
                                                <div className="text-sm text-muted-foreground">Muestra el slider/banner en la página de inicio.</div>
                                            </div>
                                            <Switch checked={data.status_banner === 1} onCheckedChange={val => setData('status_banner', val ? 1 : 0)} />
                                        </div>

                                        <div className="flex flex-row items-center justify-between rounded-lg border p-4 ">
                                            <div className="space-y-0.5">
                                                <Label className="text-base font-medium">Lista de Propiedades</Label>
                                                <div className="text-sm text-muted-foreground">Muestra la cuadrícula de propiedades destacadas.</div>
                                            </div>
                                            <Switch checked={data.status_products_list === 1} onCheckedChange={val => setData('status_products_list', val ? 1 : 0)} />
                                        </div>

                                        <div className="flex flex-row items-center justify-between rounded-lg border p-4 ">
                                            <div className="space-y-0.5">
                                                <Label className="text-base font-medium">Sección de Información</Label>
                                                <div className="text-sm text-muted-foreground">Muestra el contenido de "Quiénes Somos" o similares.</div>
                                            </div>
                                            <Switch checked={data.status_info_section === 1} onCheckedChange={val => setData('status_info_section', val ? 1 : 0)} />
                                        </div>

                                        <div className="flex flex-row items-center justify-between rounded-lg border p-4 ">
                                            <div className="space-y-0.5">
                                                <Label className="text-base font-medium">Testimonios</Label>
                                                <div className="text-sm text-muted-foreground">Muestra las opiniones de los clientes.</div>
                                            </div>
                                            <Switch checked={data.status_testimonials === 1} onCheckedChange={val => setData('status_testimonials', val ? 1 : 0)} />
                                        </div>

                                        <div className="flex flex-row items-center justify-between rounded-lg border p-4 ">
                                            <div className="space-y-0.5">
                                                <Label className="text-base font-medium">Equipo de Trabajo</Label>
                                                <div className="text-sm text-muted-foreground">Muestra a los agentes inmobiliarios.</div>
                                            </div>
                                            <Switch checked={data.status_team === 1} onCheckedChange={val => setData('status_team', val ? 1 : 0)} />
                                        </div>
                                    </div>
                                </ContainerTitle>
                            </TabsContent>

                            {/* Opciones Específicas... Blog, FAQ, etc. */}
                            <TabsContent value="blog" className="space-y-4 m-0">
                                <ContainerTitle title="Personalización del Blog" className="space-y-4">
                                    <div>
                                        <Label htmlFor="titleBlog">Título de la página del Blog</Label>
                                        <Input id="titleBlog" value={data.titleBlog} onChange={e => setData('titleBlog', e.target.value)} className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="descriptionBlog">Descripción del Blog</Label>
                                        <Textarea id="descriptionBlog" rows={6} value={data.descriptionBlog} onChange={e => setData('descriptionBlog', e.target.value)} className="mt-1" />
                                    </div>
                                </ContainerTitle>
                            </TabsContent>

                            <TabsContent value="faq" className="space-y-4 m-0">
                                <ContainerTitle title="Personalización de Preguntas Frecuentes" className="space-y-4">
                                    <div className="flex flex-col md:flex-row gap-6 items-start p-4 border rounded-lg  mb-4">
                                        <div className="shrink-0">
                                            <Label className="block mb-2 text-center text-xs text-muted-foreground">Portada Actual</Label>
                                            {setting.portadaFaq ? <img src={setting.portadaFaq} alt="FAQ" className="w-32 h-24 object-cover rounded-md shadow-sm border" /> : <div className="w-32 h-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>}
                                        </div>
                                        <div className="flex-1 w-full">
                                            <Label htmlFor="portadaFaq">Actualizar Portada (Hero Image)</Label>
                                            <Input id="portadaFaq" type="file" onChange={e => setData('portadaFaq', e.target.files[0])} className="mt-2" accept="image/*" />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="titleFaq">Título</Label>
                                        <Input id="titleFaq" value={data.titleFaq} onChange={e => setData('titleFaq', e.target.value)} className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="descriptionFaq">Descripción</Label>
                                        <Textarea id="descriptionFaq" rows={6} value={data.descriptionFaq} onChange={e => setData('descriptionFaq', e.target.value)} className="mt-1" />
                                    </div>
                                </ContainerTitle>
                            </TabsContent>

                            <TabsContent value="contacto" className="space-y-4 m-0">
                                <ContainerTitle title="Personalización de Página de Contacto" className="space-y-4">
                                    <div className="flex flex-col md:flex-row gap-6 items-start p-4 border rounded-lg  mb-4">
                                        <div className="shrink-0">
                                            <Label className="block mb-2 text-center text-xs text-muted-foreground">Portada Actual</Label>
                                            {setting.portadaContact ? <img src={setting.portadaContact} alt="Contact" className="w-32 h-24 object-cover rounded-md shadow-sm border" /> : <div className="w-32 h-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>}
                                        </div>
                                        <div className="flex-1 w-full">
                                            <Label htmlFor="portadaContact">Actualizar Portada (Hero Image)</Label>
                                            <Input id="portadaContact" type="file" onChange={e => setData('portadaContact', e.target.files[0])} className="mt-2" accept="image/*" />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="titleContact">Título</Label>
                                        <Input id="titleContact" value={data.titleContact} onChange={e => setData('titleContact', e.target.value)} className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="descriptionContact">Descripción</Label>
                                        <Textarea id="descriptionContact" rows={6} value={data.descriptionContact} onChange={e => setData('descriptionContact', e.target.value)} className="mt-1" />
                                    </div>
                                </ContainerTitle>
                            </TabsContent>

                            <TabsContent value="anunciar" className="space-y-4 m-0">
                                <ContainerTitle title="Personalización de Vender/Anunciar" className="space-y-4">
                                    <div className="flex flex-col md:flex-row gap-6 items-start p-4 border rounded-lg  mb-4">
                                        <div className="shrink-0">
                                            <Label className="block mb-2 text-center text-xs text-muted-foreground">Portada Actual</Label>
                                            {setting.portadaAnunciar ? <img src={setting.portadaAnunciar} alt="Anunciar" className="w-32 h-24 object-cover rounded-md shadow-sm border" /> : <div className="w-32 h-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>}
                                        </div>
                                        <div className="flex-1 w-full">
                                            <Label htmlFor="portadaAnunciar">Actualizar Portada (Hero Image)</Label>
                                            <Input id="portadaAnunciar" type="file" onChange={e => setData('portadaAnunciar', e.target.files[0])} className="mt-2" accept="image/*" />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="titleAnunciar">Título</Label>
                                        <Input id="titleAnunciar" value={data.titleAnunciar} onChange={e => setData('titleAnunciar', e.target.value)} className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="descriptionAnunciar">Descripción</Label>
                                        <Textarea id="descriptionAnunciar" rows={6} value={data.descriptionAnunciar} onChange={e => setData('descriptionAnunciar', e.target.value)} className="mt-1" />
                                    </div>
                                </ContainerTitle>
                            </TabsContent>

                            <TabsContent value="info" className="space-y-4 m-0">
                                <ContainerTitle title="Sección de Información (Quiénes Somos)" className="space-y-4">
                                    <div>
                                        <Label htmlFor="titleInfoSection">Título</Label>
                                        <Input id="titleInfoSection" value={data.titleInfoSection} onChange={e => setData('titleInfoSection', e.target.value)} className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="descriptionInfoSection">Descripción general / Texto descriptivo</Label>
                                        <Textarea id="descriptionInfoSection" rows={8} value={data.descriptionInfoSection} onChange={e => setData('descriptionInfoSection', e.target.value)} className="mt-1" />
                                    </div>
                                </ContainerTitle>
                            </TabsContent>

                            <TabsContent value="equipo" className="space-y-4 m-0">
                                <ContainerTitle title="Sección de Equipo de Trabajo" className="space-y-4">
                                    <div>
                                        <Label htmlFor="titleTeamSection">Título</Label>
                                        <Input id="titleTeamSection" value={data.titleTeamSection} onChange={e => setData('titleTeamSection', e.target.value)} className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="descriptionTeamSection">Descripción</Label>
                                        <Textarea id="descriptionTeamSection" rows={6} value={data.descriptionTeamSection} onChange={e => setData('descriptionTeamSection', e.target.value)} className="mt-1" />
                                    </div>
                                </ContainerTitle>
                            </TabsContent>

                            <TabsContent value="testimonios" className="space-y-4 m-0">
                                <ContainerTitle title="Sección de Testimonios" className="space-y-4">
                                    <div>
                                        <Label htmlFor="titleTestimonials">Título</Label>
                                        <Input id="titleTestimonials" value={data.titleTestimonials} onChange={e => setData('titleTestimonials', e.target.value)} className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="descriptionTestimonials">Descripción</Label>
                                        <Textarea id="descriptionTestimonials" rows={6} value={data.descriptionTestimonials} onChange={e => setData('descriptionTestimonials', e.target.value)} className="mt-1" />
                                    </div>
                                </ContainerTitle>
                            </TabsContent>

                        </div>
                    </Tabs>

                    <div className="flex justify-end pt-6 mt-6">
                        <Button type="submit" size="lg" className="px-8">
                            Guardar configuración
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
