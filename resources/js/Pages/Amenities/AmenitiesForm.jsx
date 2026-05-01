import ContainerTitle from "@/Components/ContainerTitle";
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

export default function AmenitiesForm({ data, setData, errors }) {
    return (
        <ContainerTitle title="Datos de la comodidad">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                        id="name"
                        type="text"
                        value={data.name}
                        autoFocus
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && (
                        <Alert variant="destructive" className="mt-1 py-2">
                            <AlertDescription>{errors.name}</AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
        </ContainerTitle>
    );
}