import ContainerTitle from "@/Components/ContainerTitle";
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';

export default function TypesPropertiesForm({ data, setData, errors }) {
    return (
        <ContainerTitle title="Datos principales" className="space-y-4">
            <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1"
                    autoFocus
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && (
                    <Alert variant="destructive" className="mt-2 py-2">
                        <AlertDescription>{errors.name}</AlertDescription>
                    </Alert>
                )}
            </div>

            <div>
                <Label htmlFor="image">Imagen</Label>
                <Input
                    id="image"
                    type="file"
                    name="image"
                    className="mt-1"
                    onChange={(e) => setData('image', e.target.files[0])}
                />
                {errors.image && (
                    <Alert variant="destructive" className="mt-2 py-2">
                        <AlertDescription>{errors.image}</AlertDescription>
                    </Alert>
                )}
            </div>
        </ContainerTitle>
    );
}