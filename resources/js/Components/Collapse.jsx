export default function Collapse({ title, children }) {
    return (
        <label className='w-full'>
            <input className="peer/showLabel absolute scale-0 w-full" type="checkbox" defaultChecked />
            <span className="block w-full max-h-52 border overflow-hidden rounded-lg py-0  text-black transition-all duration-300 peer-checked/showLabel:max-h-52 showLabel">
                <h3 className="flex h-14 cursor-pointer items-center font-bold w-full bg-slate-200 px-4">{title}</h3>
                <div className="p-4">
                    {children}
                </div>
            </span>
        </label>
    );
}
