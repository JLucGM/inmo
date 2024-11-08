

export default function Guest({ children }) {
    return (
        <div class="bg-gray-100 dark:bg-gray-800 flex justify-center items-center h-screen">
            <div class="w-1/2 h-screen hidden lg:block">
                <img src="/img/setting/login.jpg" alt="Placeholder Image" class="object-cover w-full h-full" />
            </div>
            <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 mt-6 px-6 py-4  ">
                {/* <h1 class="text-2xl font-semibold mb-4">Login</h1> */}
                
                <div class="mt-6 text-blue-500 text-centers">
                    {children}
                </div>
            </div>
        </div>
    );
}
