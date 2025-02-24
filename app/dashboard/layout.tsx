import ProtectedRoute from "@/components/common/ProtectedRoute";
import Header from "@/components/dashboard/Header";

import Sidebar from "@/components/dashboard/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
        <div className="flex h-screen flex-col bg-green-50 text-black md:flex-row md:overflow-hidden overflow-x-hidden">

            <div className="hidden lg:block flex-none lg:w-72 m-4 bg-white rounded-xl">

                <Sidebar/>
                    
            </div>

            <div className="flex grow flex-col w-full">

                <div className="lg:h-18 m-4 text-black bg-white rounded-xl">
                    <Header />
                </div>

                <div className="grow py-4 md:pt-2 md:overflow-y-auto">
                {children}
                </div>
            </div>
        </div>
        </ProtectedRoute>
    );
}
