import ContainerTitle from "@/Components/ContainerTitle";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function AmenitiesForm({ data, setData, errors, }) {

    return (
        <>
            <ContainerTitle className='space-y-4'>

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

            </ContainerTitle>
        </>
    )
}