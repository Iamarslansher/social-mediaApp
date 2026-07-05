import { Manrope } from "next/font/google";
import "./globals.css";
import ToastProvider from "../components/ToastProvider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata = {
  title: "Luma Social",
  description:
    "A premium social media experience for creators and communities.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
