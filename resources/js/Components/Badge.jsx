export default function Badge({ className = '', children, ...props }) {
    return (
        <div className={"center relative inline-block select-none whitespace-nowrap rounded-full  py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white " +
            className}>
            <div className="mt-px">{children}</div>
        </div>
    );
}
