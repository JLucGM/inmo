export default function ContainerTitle({ className = '',title, children, ...props }) {
    return (
        <div
            {...props}
            
            className={
                'rounded-3xl dark:bg-gray-900h border-2 border-gray-300 dark:border-gray-300 text-gray-600 dark:text-gray-300 shadow-sm mb-4 p-4 ' 
            }
        >
            <p className="text-lg capitalize font-medium col-span-full mb-4">{title}</p>
            <div className={
                '' +
                className
            }>

            {children}
            </div>
        </div>
    );
}
