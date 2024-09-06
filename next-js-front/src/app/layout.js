import localFont from "next/font/google";
import "./globals.css";
import "./style.css";

import {Inter} from "next/font/google";

const inter = Inter({ subsets: ["latin"]});

export const metadata = {
  title: "Restauramt Menu",
  description: "A simple UI to handle menus",
};

export default function RootLayout({ children}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="menu-container">{children}</main>
      </body>
    </html>
  )
}
