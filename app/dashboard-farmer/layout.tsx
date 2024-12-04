import Header from "@/components/dashboard-farmer/Header";
import SidebarFarmer from "@/components/dashboard-farmer/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col bg-white text-black md:flex-row md:overflow-hidden overflow-x-hidden">

            <div className="hidden lg:block w-full flex-none bg-green-50 lg:w-72">
            <SidebarFarmer/>
                    
            </div>

            <div className="flex grow flex-col w-full">
                <div className="hidden lg:block w-full bg-green-50 lg:h-20 lg:max-w-full  text-black">
                <Header />
                </div>
                <div className="grow py-20 md:pt-2 md:overflow-y-auto">
                {children}
                </div>
            </div>
        </div>
    );
}
