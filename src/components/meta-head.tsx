import Head from "next/head";

type meta = {
    title:string;
    description:string;
    url:string;
    image:string;
}

const MetaHead = ({ title, description, url, image }:meta) => {
  return (
    <Head>
      <title>{title || "모두의 여행"}</title>
      <meta
        name="description"
        content={
          description ||
          "여행 코스부터 명소까지, 모두의 여행이 함께합니다"
        }
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title || "모두의 여행"} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || "http://localhost:3000/"} />
      <meta property="og:image" content={image} />
      <meta property="og:article:author" content="모두의 여행" />
    </Head>
  );
};
export default MetaHead;