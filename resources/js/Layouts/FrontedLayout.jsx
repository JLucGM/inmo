import Footer from "@/Components/Footer";
import MegaMenu from "@/Components/MegaMenu";

export default function FrontedLayout({children , auth, setting, pages}) {

    return (
        <>
            <MegaMenu auth={auth} setting={setting} />

            <main className="mt-22 mx-5 md:mx-18">
                {children}
            </main>

           <Footer setting={setting} pages={pages}/>
           </>
    );
}
