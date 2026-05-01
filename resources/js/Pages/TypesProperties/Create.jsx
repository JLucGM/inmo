import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import TypesPropertiesForm from './TypesPropertiesForm';

export default function Create({ auth, role, permission }) {
    const { data, setData, errors, post } = useForm({
        name: '',
        image: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('typesproperties.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user} permission={permission}>
            <Head title="Crear Tipo de Propiedad" />
            
            <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <TypesPropertiesForm data={data} setData={setData} errors={errors} />
                </div>
                
                <div className="flex justify-end">
                    <Button type="submit">Guardar</Button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}