import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import { Metadata } from "next";


export const metadata: Metadata = {
  title:"모두의 여행",
  description:"여행 코스부터 명소까지, 모두의 여행이 함께합니다.",
  openGraph: {
    title:"모두의 여행",
    description:"여행 코스부터 명소까지, 모두의 여행이 함께합니다.",
    // images:['/thumbnail.png']
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
