import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" className="dark:bg-black bg-white">
      <body>
        <div id="loader"></div>
        <ThemeProvider enableSystem={true} attribute="class">
          <Toaster position="bottom-center" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
