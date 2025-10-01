import ContainerTitle from "@/Components/ContainerTitle";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Select from "react-select";
import customStyles from "@/Components/lib/SelectCustom";

export default function UserForm({ data, user = "", setData, errors, roles }) {

    const statusOptions = [
        { value: 0, label: 'Inactivo' },
        { value: 1, label: 'Activo' }
    ];

    // Opciones para los roles
    const roleOptions = roles.map(role => ({
        value: role.name,
        label: role.name
    }));

    return (
        <>
            <div className="col-span-full lg:col-span-2">
                <ContainerTitle title={'Datos del usuario'} className='xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

                    <div className='col-span-full'>
                        <InputLabel htmlFor="name" value="Nombre" />

                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className=" block w-full"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className='col-span-full'>
                        <InputLabel htmlFor="email" value="Correo electrónico" />

                        <TextInput
                            id="email"
                            type="text"
                            name="email"
                            value={data.email}
                            className=" block w-full"
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className='col-span-full'>
                        <InputLabel htmlFor="password" value="Contraseña" />

                        <TextInput
                            id="password"
                            type="text"
                            name="password"
                            value={data.password}
                            className=" block w-full"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className='col-span-full'>
                        <InputLabel htmlFor="phone" value="Teléfono" />

                        <TextInput
                            id="phone"
                            type="text"
                            name="phone"
                            value={data.phone}
                            className=" block w-full"
                            onChange={(e) => setData('phone', e.target.value)}
                        />

                        <InputError message={errors.phone} className="mt-2" />
                    </div>


                </ContainerTitle>
            </div>
            <div className="col-span-full lg:col-span-1">
                <ContainerTitle title={'Datos del usuario'} className='xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

                    <div className='col-span-full'>
                        {user.avatar ? (
                            <img className='w-auto max-w-48 mx-auto rounded-lg' src={user.avatar} alt="Avatar" />
                        ) : null}
                        <InputLabel htmlFor="avatar" value="avatar" />

                        <TextInput
                            id="avatar"
                            type="file"
                            name="avatar"
                            className=" block w-full"
                            onChange={(e) => setData('avatar', e.target.files[0])}
                        />

                        <InputError message={errors.avatar} className="mt-2" />
                    </div>

                    <div className='col-span-full'>
                        <InputLabel htmlFor="status" value="Estado" />
                        <Select
                            name="status"
                            id="status"
                            options={statusOptions}
                            value={statusOptions.find(option => option.value === Number(data.status))} // Asegúrate de que sea un número
                            onChange={(selectedOption) => setData('status', selectedOption.value)}
                            styles={customStyles}
                        />
                        <InputError message={errors.status} className="mt-2" />
                    </div>

                    <div className='col-span-full'>
                        <InputLabel htmlFor="role" value="Rol" />
                        <Select
                            name="role"
                            id="role"
                            options={roleOptions}
                            value={roleOptions.find(option => option.value === data.role)}
                            onChange={(selectedOption) => setData('role', selectedOption.value)}
                            styles={customStyles}
                        />
                        <InputError message={errors.role} className="mt-2" />
                    </div>

                </ContainerTitle>
            </div>
        </>
    )
}