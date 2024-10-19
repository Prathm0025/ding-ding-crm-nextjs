import { Poppins } from "next/font/google";
import "../../app/globals.css";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";

const inter = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export const metadata = {
    title: "Ding-Ding-Crm",
    description: "Ding-Ding-Crm",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`flex flex-1 dark:bg-black bg-white lg:space-x-3  ${inter.className}`}>
            <div className="lg:flex-.2 lg:w-full">
                <Sidebar />
            </div>
            <div className="w-full flex-1 pr-3 lg:flex-.9">
                <div className="w-full">
                    <Header />
                    {children}
                </div>
            </div>
        </div>
    );
}