import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels, Textarea, Transition } from '@headlessui/react';
import Breadcrumb from '@/Components/Breadcrumb';
import ToggleSwitch from '@/Components/ToggleSwitch';

export default function Edit({ auth, setting, currencies, role, permission }) {

    const initialValues = {
        name: setting.name,
        phone: setting.phone,
        logo: setting.logo,
        logo_footer: setting.logo_footer,
        favicon: setting.favicon,
        direction: setting.direction,
        description: setting.description,
        descriptionBlog: setting.descriptionBlog,
        descriptionFaq: setting.descriptionFaq,
        descriptionContact: setting.descriptionContact,
        descriptionAnunciar: setting.descriptionAnunciar,
        titleBlog: setting.titleBlog,
        titleFaq: setting.titleFaq,
        titleContact: setting.titleContact,
        titleAnunciar: setting.titleAnunciar,
        status_banner: setting.status_banner,
        status_products_list: setting.status_products_list,
        status_info_section: setting.status_info_section,
        status_testimonials: setting.status_testimonials,
        status_team: setting.status_team,
        status_instagram_posts: setting.status_instagram_posts,
        instagram: setting.instagram,
        token_instagram: setting.token_instagram,
        portadaContact: setting.portadaContact,
        portadaFaq: setting.portadaFaq,
        portadaAnunciar: setting.portadaAnunciar,

        titleInfoSection: setting.titleInfoSection,
        descriptionInfoSection: setting.descriptionInfoSection,
        titleTeamSection: setting.titleTeamSection,
        descriptionTeamSection: setting.descriptionTeamSection,

        currency_id: setting.currency_id || (currencies.length > 0 ? currencies[0].id : null), // Usar el valor de setting si existe
    }

    const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        post(route('settings.update', setting))
        // console.log(data)
    }

    const items = [
        {
            name: 'Dashboard',
            href: 'dashboard',
            icon: {
                path: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z',
            },
        },
        {
            name: 'Configuraciones',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={role}
            permission={permission}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Actualizar Configuraciones</h2>
                </div>
            }
        >

            <Breadcrumb items={items} />


            <Head className="capitalize" title="Actualizar Configuraciones" />

            <div className="">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className=" text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className='space-y-4 '>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-green-600 dark:text-gray-400 text-center">Saved.</p>
                                </Transition>

                                <TabGroup vertical className={'border rounded-lg'}>
                                    <div className="grid grid-cols-4">
                                        <TabList className="flex flex-col overflow-y-auto rounded-lg h-44s md:min-h-screen-[-175] md:border-b md:flex-rowf md:overflow-hidden border-e  col-span-full md:col-span-1">
                                            <Tab
                                                className="rounded-lg py-5 bg-white border-b capitalize text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 data-[selected]:bg-blue-500 data-[selected]:text-white"
                                            >
                                                Datos principales
                                            </Tab>
                                            <Tab
                                                className="rounded-lg py-5 bg-white border-b capitalize text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 data-[selected]:bg-blue-500 data-[selected]:text-white"
                                            >
                                                images

                                            </Tab>
                                            <Tab
                                                className="rounded-lg py-5 bg-white border-b capitalize text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 data-[selected]:bg-blue-500 data-[selected]:text-white"
                                            >
                                                Configurar frontend

                                            </Tab>
                                            <Tab
                                                className="rounded-lg py-5 bg-white border-b capitalize text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 data-[selected]:bg-blue-500 data-[selected]:text-white"
                                            >
                                                Redes

                                            </Tab>
                                            <Tab
                                                className="rounded-lg py-5 bg-white border-b capitalize text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 data-[selected]:bg-blue-500 data-[selected]:text-white"
                                            >
                                                Blog
                                            </Tab>
                                            <Tab
                                                className="rounded-lg py-5 bg-white border-b capitalize text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 data-[selected]:bg-blue-500 data-[selected]:text-white"
                                            >
                                                Faq
                                            </Tab>
                                            <Tab
                                                className="rounded-lg py-5 bg-white border-b capitalize text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 data-[selected]:bg-blue-500 data-[selected]:text-white"
                                            >
                                                Contact
                                            </Tab>
                                            <Tab
                                                className="rounded-lg py-5 bg-white border-b capitalize text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 data-[selected]:bg-blue-500 data-[selected]:text-white"
                                            >
                                                Anunciar
                                            </Tab>
                                            <Tab
                                                className="rounded-lg py-5 bg-white border-b capitalize text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 data-[selected]:bg-blue-500 data-[selected]:text-white"
                                            >
                                                Sección de información
                                            </Tab>
                                            <Tab
                                                className="rounded-lg py-5 bg-white border-b capitalize text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 data-[selected]:bg-blue-500 data-[selected]:text-white"
                                            >
                                                Sección de equipo
                                            </Tab>
                                        </TabList>

                                        <TabPanels className={'col-span-full md:col-span-3'}>

                                            <TabPanel className={'w-full'}>
                                                <div title={'Datos principales'} className=' p-5 xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

                                                    <div>
                                                        <InputLabel htmlFor="name" value="Nombre" />

                                                        <TextInput
                                                            id="name"
                                                            type="text"
                                                            name="name"
                                                            value={data.name}
                                                            className="mt-1 block w-full"
                                                            isFocused={true}
                                                            onChange={(e) => setData('name', e.target.value)}
                                                        />

                                                        <InputError message={errors.name} className="mt-2" />
                                                    </div>

                                                    <div>
                                                        <InputLabel htmlFor="phone" value="phone" />

                                                        <TextInput
                                                            id="phone"
                                                            type="text"
                                                            name="phone"
                                                            value={data.phone}
                                                            className="mt-1 block w-full"
                                                            onChange={(e) => setData('phone', e.target.value)}
                                                        />

                                                        <InputError message={errors.phone} className="mt-2" />
                                                    </div>

                                                    <div>
                                                        <InputLabel htmlFor="direction" value="direction" />

                                                        <TextInput
                                                            id="direction"
                                                            type="text"
                                                            name="direction"
                                                            value={data.direction}
                                                            className="mt-1 block w-full"
                                                            onChange={(e) => setData('direction', e.target.value)}
                                                        />

                                                        <InputError message={errors.phone} className="mt-2" />
                                                    </div>

                                                    <div>
                                                        <InputLabel htmlFor="currency_id" value="currencies" />

                                                        <select
                                                            name="currency_id"
                                                            id="currency_id"
                                                            className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 capitalize dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                            value={data.currency_id}
                                                            onChange={(e) => {
                                                                setData('currency_id', parseInt(e.target.value));
                                                            }}
                                                        >
                                                            {currencies.map((currency) => (
                                                                <option value={currency.id} key={currency.id}>
                                                                    {currency.symbol} - {currency.name}
                                                                </option>
                                                            ))}
                                                        </select>

                                                        <InputError message={errors.currency_id} className="mt-2" />
                                                    </div>



                                                    <div className='col-span-2'>
                                                        <InputLabel htmlFor="description" value="description" />

                                                        <Textarea
                                                            id="description"
                                                            type="text"
                                                            name="description"
                                                            rows={10}
                                                            value={data.description}
                                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                            onChange={(e) => setData('description', e.target.value)}
                                                        />

                                                        <InputError message={errors.description} className="mt-2" />
                                                    </div>

                                                </div>
                                            </TabPanel>

                                            <TabPanel>
                                                <div title={'Datos principales'} className=' p-5 xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

                                                    <div className=''>
                                                        <img src={`${setting.logo}`} alt={setting.logo} className='w-40' />
                                                        <InputLabel htmlFor="logo" value="logo" />
                                                        <TextInput
                                                            id="logo"
                                                            type="file"
                                                            name="logo"
                                                            className="mt-1 block w-full"
                                                            onChange={(e) => setData('logo', e.target.files[0])}
                                                        />
                                                        <InputError message={errors.logo} className="mt-2" />
                                                    </div>

                                                    <div>
                                                        <img src={`${setting.logo_footer}`} alt={setting.logo_footer} className='w-40' />
                                                        <InputLabel htmlFor="logo_footer" value="logo_footer" />
                                                        <TextInput
                                                            id="logo_footer"
                                                            type="file"
                                                            name="logo_footer"
                                                            className="mt-1 block w-full"
                                                            onChange={(e) => setData('logo_footer', e.target.files[0])}
                                                        />
                                                        <InputError message={errors.logo_footer} className="mt-2" />
                                                    </div>

                                                    <div className=''>
                                                        <img src={`${setting.favicon}`} alt={setting.favicon} className='w-40' />
                                                        <InputLabel htmlFor="favicon" value="favicon" />
                                                        <TextInput
                                                            id="favicon"
                                                            type="file"
                                                            name="favicon"
                                                            className="mt-1 block w-full"
                                                            onChange={(e) => setData('favicon', e.target.files[0])}
                                                        />

                                                        <InputError message={errors.favicon} className="mt-2" />
                                                    </div>
                                                </div>
                                            </TabPanel>

                                            <TabPanel>
                                                <div title={'Configurar Frontend'} className='p-5 xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

                                                    <div className="p-4">
                                                        <ToggleSwitch
                                                            isChecked={data.status_banner === 1}
                                                            onToggle={() => {
                                                                const newValue = data.status_banner === 1 ? 0 : 1;
                                                                setData('status_banner', newValue);
                                                            }}
                                                            label="Activar Banner"
                                                        />
                                                    </div>

                                                    <div className="p-4">
                                                        <ToggleSwitch
                                                            isChecked={data.status_products_list === 1}
                                                            onToggle={() => {
                                                                const newValue = data.status_products_list === 1 ? 0 : 1;
                                                                setData('status_products_list', newValue);
                                                            }}
                                                            label="Activar status_products_list"
                                                        />
                                                    </div>

                                                    <div className="p-4">
                                                        <ToggleSwitch
                                                            isChecked={data.status_info_section === 1}
                                                            onToggle={() => {
                                                                const newValue = data.status_info_section === 1 ? 0 : 1;
                                                                setData('status_info_section', newValue);
                                                            }}
                                                            label="Activar status_info_section"
                                                        />
                                                    </div>

                                                    <div className="p-4">
                                                        <ToggleSwitch
                                                            isChecked={data.status_testimonials === 1}
                                                            onToggle={() => {
                                                                const newValue = data.status_testimonials === 1 ? 0 : 1;
                                                                setData('status_testimonials', newValue);
                                                            }}
                                                            label="Activar status_testimonials"
                                                        />
                                                    </div>

                                                    <div className="p-4">
                                                        <ToggleSwitch
                                                            isChecked={data.status_team === 1}
                                                            onToggle={() => {
                                                                const newValue = data.status_team === 1 ? 0 : 1;
                                                                setData('status_team', newValue);
                                                            }}
                                                            label="Activar status_team"
                                                        />
                                                    </div>

                                                    <div className="p-4">
                                                        <ToggleSwitch
                                                            isChecked={data.status_instagram_posts === 1}
                                                            onToggle={() => {
                                                                const newValue = data.status_instagram_posts === 1 ? 0 : 1;
                                                                setData('status_instagram_posts', newValue);
                                                            }}
                                                            label="Activar status_instagram_posts"
                                                        />
                                                    </div>
                                                </div>
                                            </TabPanel>

                                            <TabPanel>
                                                <div title={'Redes'} className='p-5 xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

                                                    <div className='col-span-2'>
                                                        <InputLabel htmlFor="instagram" value="Username Instagram" />

                                                        <TextInput
                                                            id="instagram"
                                                            type="text"
                                                            name="instagram"
                                                            value={data.instagram}
                                                            className="mt-1 block w-full"
                                                            isFocused={true}
                                                            onChange={(e) => setData('instagram', e.target.value)}
                                                        />

                                                        <InputError message={errors.instagram} className="mt-2" />
                                                    </div>

                                                    <div className='col-span-2'>
                                                        <InputLabel htmlFor="token_instagram" value="token_instagram" />

                                                        <TextInput
                                                            id="token_instagram"
                                                            type="text"
                                                            name="token_instagram"
                                                            value={data.token_instagram}
                                                            className="mt-1 block w-full"
                                                            isFocused={true}
                                                            onChange={(e) => setData('token_instagram', e.target.value)}
                                                        />

                                                        <InputError message={errors.token_instagram} className="mt-2" />
                                                    </div>
                                                </div>
                                            </TabPanel>

                                            <TabPanel>
                                                <div title={'Blog'} className='p-5 xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

                                                    {/* <div className=''>
                                                        <img src={`${setting.portadaContact}`} alt={setting.portadaContact} className='w-40' />
                                                        <InputLabel htmlFor="portadaContact" value="portadaContact" />
                                                        <TextInput
                                                            id="portadaContact"
                                                            type="file"
                                                            name="portadaContact"
                                                            className="mt-1 block w-full"
                                                            onChange={(e) => setData('portadaContact', e.target.files[0])}
                                                        />

                                                        <InputError message={errors.portadaContact} className="mt-2" />
                                                    </div> */}

                                                    <div className='col-span-2'>
                                                        <InputLabel htmlFor="titleBlog" value="titleBlog" />

                                                        <TextInput
                                                            id="titleBlog"
                                                            type="text"
                                                            name="titleBlog"
                                                            value={data.titleBlog}
                                                            className="mt-1 block w-full"
                                                            isFocused={true}
                                                            onChange={(e) => setData('titleBlog', e.target.value)}
                                                        />

                                                        <InputError message={errors.titleBlog} className="mt-2" />
                                                    </div>

                                                    <div className='col-span-2'>
                                                        <InputLabel htmlFor="descriptionBlog" value="descriptionBlog" />

                                                        <Textarea
                                                            id="descriptionBlog"
                                                            type="text"
                                                            name="descriptionBlog"
                                                            rows={10}
                                                            value={data.descriptionBlog}
                                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                            onChange={(e) => setData('descriptionBlog', e.target.value)}
                                                        />

                                                        <InputError message={errors.descriptionBlog} className="mt-2" />
                                                    </div>
                                                </div>
                                            </TabPanel>

                                            <TabPanel>
                                                <div title={'FAQS'} className='p-5 grid xs:grid-cols-1 md:grid-cols-1 gap-4'>

                                                    <div className=''>
                                                        <img src={`${setting.portadaFaq}`} alt={setting.portadaFaq} className='w-40 mx-auto rounded-3xl' />
                                                        <InputLabel htmlFor="portadaFaq" value="portadaFaq" />
                                                        <TextInput
                                                            id="portadaFaq"
                                                            type="file"
                                                            name="portadaFaq"
                                                            className="mt-1 block w-full"
                                                            onChange={(e) => setData('portadaFaq', e.target.files[0])}
                                                        />

                                                        <InputError message={errors.portadaFaq} className="mt-2" />
                                                    </div>

                                                    <div className='col-span-2'>
                                                        <InputLabel htmlFor="titleFaq" value="titleFaq" />

                                                        <TextInput
                                                            id="titleFaq"
                                                            type="text"
                                                            name="titleFaq"
                                                            value={data.titleFaq}
                                                            className="mt-1 block w-full"
                                                            isFocused={true}
                                                            onChange={(e) => setData('titleFaq', e.target.value)}
                                                        />

                                                        <InputError message={errors.titleFaq} className="mt-2" />
                                                    </div>

                                                    <div className='col-span-2'>
                                                        <InputLabel htmlFor="descriptionFaq" value="descriptionFaq" />

                                                        <Textarea
                                                            id="descriptionFaq"
                                                            type="text"
                                                            name="descriptionFaq"
                                                            rows={10}
                                                            value={data.descriptionFaq}
                                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                            onChange={(e) => setData('descriptionFaq', e.target.value)}
                                                        />

                                                        <InputError message={errors.descriptionFaq} className="mt-2" />
                                                    </div>
                                                </div>
                                            </TabPanel>

                                            <TabPanel>
                                                <div title={'Contacto'} className='p-5 xs:grid md:grid xs:grid-cols-1 md:grid-cols-1 gap-4'>

                                                    <div className=''>
                                                        <img src={`${setting.portadaContact}`} alt={setting.portadaContact} className='w-40 rounded-3xl mx-auto' />
                                                        <InputLabel htmlFor="portadaContact" value="portadaContact" />
                                                        <TextInput
                                                            id="portadaContact"
                                                            type="file"
                                                            name="portadaContact"
                                                            className="mt-1 block w-full"
                                                            onChange={(e) => setData('portadaContact', e.target.files[0])}
                                                        />

                                                        <InputError message={errors.portadaContact} className="mt-2" />
                                                    </div>

                                                    <div className='col-span-2'>
                                                        <InputLabel htmlFor="titleContact" value="titleContact" />

                                                        <TextInput
                                                            id="titleContact"
                                                            type="text"
                                                            name="titleContact"
                                                            value={data.titleContact}
                                                            className="mt-1 block w-full"
                                                            isFocused={true}
                                                            onChange={(e) => setData('titleContact', e.target.value)}
                                                        />

                                                        <InputError message={errors.titleContact} className="mt-2" />
                                                    </div>

                                                    <div className='col-span-2'>
                                                        <InputLabel htmlFor="descriptionContact" value="descriptionContact" />

                                                        <Textarea
                                                            id="descriptionContact"
                                                            type="text"
                                                            name="descriptionContact"
                                                            rows={10}
                                                            value={data.descriptionContact}
                                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                            onChange={(e) => setData('descriptionContact', e.target.value)}
                                                        />

                                                        <InputError message={errors.descriptionContact} className="mt-2" />
                                                    </div>
                                                </div>
                                            </TabPanel>

                                            <TabPanel>
                                                <div title={'Anunciar'} className='p-5 xs:grid md:grid xs:grid-cols-1 md:grid-cols-1 gap-4'>

                                                    <div className=''>
                                                        <img src={`${setting.portadaAnunciar}`} alt={setting.portadaAnunciar} className='w-40 rounded-3xl mx-auto' />
                                                        <InputLabel htmlFor="portadaAnunciar" value="portadaAnunciar" />
                                                        <TextInput
                                                            id="portadaAnunciar"
                                                            type="file"
                                                            name="portadaAnunciar"
                                                            className="mt-1 block w-full"
                                                            onChange={(e) => setData('portadaAnunciar', e.target.files[0])}
                                                        />

                                                        <InputError message={errors.portadaAnunciar} className="mt-2" />
                                                    </div>

                                                    <div className='col-span-2'>
                                                        <InputLabel htmlFor="titleAnunciar" value="titleAnunciar" />

                                                        <TextInput
                                                            id="titleAnunciar"
                                                            type="text"
                                                            name="titleAnunciar"
                                                            value={data.titleAnunciar}
                                                            className="mt-1 block w-full"
                                                            isFocused={true}
                                                            onChange={(e) => setData('titleAnunciar', e.target.value)}
                                                        />

                                                        <InputError message={errors.titleAnunciar} className="mt-2" />
                                                    </div>

                                                    <div className='col-span-2'>
                                                        <InputLabel htmlFor="descriptionAnunciar" value="descriptionAnunciar" />

                                                        <Textarea
                                                            id="descriptionAnunciar"
                                                            type="text"
                                                            name="descriptionAnunciar"
                                                            rows={10}
                                                            value={data.descriptionAnunciar}
                                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                            onChange={(e) => setData('descriptionAnunciar', e.target.value)}
                                                        />

                                                        <InputError message={errors.descriptionAnunciar} className="mt-2" />
                                                    </div>
                                                </div>

                                            </TabPanel>

                                            <TabPanel>
                                                <div title={'Sección de información'} className='p-5 xs:grid md:grid xs:grid-cols-1 md:grid-cols-1 gap-4'>

                                                    <div>
                                                        <InputLabel htmlFor="titleInfoSection" value="Título de sección" />
                                                        <TextInput
                                                            id="titleInfoSection"
                                                            type="text"
                                                            name="titleInfoSection"
                                                            value={data.titleInfoSection}
                                                            className="mt-1 block w-full"
                                                            isFocused={true}
                                                            onChange={(e) => setData('titleInfoSection', e.target.value)}
                                                        />
                                                        <InputError message={errors.titleInfoSection} className="mt-2" />
                                                    </div>

                                                    <div>
                                                        <InputLabel htmlFor="descriptionInfoSection" value="Descripción de sección" />
                                                        <Textarea
                                                            id="descriptionInfoSection"
                                                            // type="text"
                                                            name="descriptionInfoSection"
                                                            rows={10}
                                                            value={data.descriptionInfoSection}
                                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                            onChange={(e) => setData('descriptionInfoSection', e.target.value)}
                                                        />
                                                        <InputError message={errors.descriptionInfoSection} className="mt-2" />
                                                    </div>

                                                </div>

                                            </TabPanel>

                                            <TabPanel>
                                                <div title={'Anunciar'} className='p-5 xs:grid md:grid xs:grid-cols-1 md:grid-cols-1 gap-4'>

                                                <div>
                                                        <InputLabel htmlFor="titleTeamSection" value="Título de sección" />
                                                        <TextInput
                                                            id="titleTeamSection"
                                                            type="text"
                                                            name="titleTeamSection"
                                                            value={data.titleTeamSection}
                                                            className="mt-1 block w-full"
                                                            isFocused={true}
                                                            onChange={(e) => setData('titleTeamSection', e.target.value)}
                                                        />
                                                        <InputError message={errors.titleTeamSection} className="mt-2" />
                                                    </div>
                                                
                                                <div>
                                                        <InputLabel htmlFor="descriptionTeamSection" value="Descripción de sección" />
                                                        <Textarea
                                                            id="descriptionTeamSection"
                                                            // type="text"
                                                            name="descriptionTeamSection"
                                                            rows={10}
                                                            value={data.descriptionTeamSection}
                                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                            onChange={(e) => setData('descriptionTeamSection', e.target.value)}
                                                        />
                                                        <InputError message={errors.descriptionTeamSection} className="mt-2" />
                                                    </div>

                                                </div>

                                            </TabPanel>
                                        </TabPanels>
                                    </div>
                                </TabGroup>

                                <div className="flex justify-end p-2.5">
                                    <PrimaryButton >
                                        Guardar
                                    </PrimaryButton>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}