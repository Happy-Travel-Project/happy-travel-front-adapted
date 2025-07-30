import { Inter } from "next/font/google";
import "./globals.css";
import AuthContextProvider from "@/context/authContext";
import Navbar from "./components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nomad Pulse",
  description: "A happy travel app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/public/favicon.png" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <AuthContextProvider>
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
