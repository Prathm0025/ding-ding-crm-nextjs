import { Poppins } from "next/font/google";
import "../../app/globals.css";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";

const inter = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export const metadata = {
    title: "Game Crm",
    description: "Game Crm",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`flex flex-1 dark:bg-black bg-white space-x-3  ${inter.className}`}>
            <div className="flex-.2 w-full">
                <Sidebar />
            </div>
            <div className="w-full flex-.9">
                <div className="w-full">
                    <Header />
                    {children}
                </div>
            </div>
        </div>
    );
}