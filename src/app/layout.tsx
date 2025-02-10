import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import { Metadata } from "next";
import Head from "next/head";


export const metadata: Metadata = {
  title:"모두의 여행",
  description:"여행 코스부터 명소까지, 모두의 여행이 함께합니다.",
  openGraph: {
    title:"모두의 여행",
    description:"여행 코스부터 명소까지, 모두의 여행이 함께합니다.",
    // images:['/thumbnail.png']
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
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
