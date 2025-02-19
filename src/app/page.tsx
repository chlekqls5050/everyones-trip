import FestivitiesSection from "@/components/festivities-section";
import LodgmentSection from "@/components/lodgment-section";
import { supabase } from "@/lib/supabase";
import Visual from "@/components/visual";
import style from "./page.module.css";
import Link from "next/link";
import MainBanner from "@/components/main-banner";
import MainBoardItem from "@/components/main-board-item";

async function getFestivitiesData() {
  const response = await fetch(
    `https://apis.data.go.kr/B551011/KorService1/searchFestival1?numOfRows=4&MobileOS=ETC&MobileApp=festivites&_type=json&arrange=Q&eventStartDate=20250115&serviceKey=${process.env.NEXT_PUBLIC_API_KEY}`,
    { cache: "force-cache" } // { next: { revalidate: 86400 } }
  );
  const result = await response.json();
  return result.response.body.items.item;
}

async function getLodgmentData() {
  const response = await fetch(
    `https://apis.data.go.kr/B551011/KorService1/searchStay1?numOfRows=7&MobileOS=ETC&MobileApp=lodgment&_type=json&arrange=R&serviceKey=${process.env.NEXT_PUBLIC_API_KEY}`,
    { cache: "force-cache" }
  );
  const result = await response.json();
  return result.response.body.items.item;
}

export default async function Home() {
  const festivitiesItems = await getFestivitiesData();
  const lodgmentItems = await getLodgmentData();
  const { data: eventPosts, error: eventError } = await supabase
    .from("board")
    .select("*")
    .eq("type", "event")
    .limit(3);
  const { data: noticePosts, error: noticeError } = await supabase
    .from("board")
    .select("*")
    .eq("type", "notice")
    .limit(3);

  if (eventError || noticeError) {
    console.error("데이터 가져오기 오류", eventError, noticeError);
    return <div>데이터 가져오는 데 문제가 발생했습니다.</div>;
  }

  return (
    <div className={style.container}>
      <Visual />
      <div className="w-1200">
        <FestivitiesSection items={festivitiesItems} />
        <MainBanner />
        <LodgmentSection items={lodgmentItems} />
        <div className={style.main_board_wrap}>
          <div className="w-1200">
            <div className={style.board_cont_wrap}>
              <div>
                <div className={style.main_title_wrap}>
                  <h3>공지사항</h3>
                  <Link href={'/board/list/notice'}>View More <span className={style.plus_sign}>+</span></Link>
                </div>
                <MainBoardItem posts={noticePosts || []} />
              </div>
              <div>
                <div className={style.main_title_wrap}>
                  <h3>이벤트</h3>
                  <Link href={'/board/list/event'}>View More <span className={style.plus_sign}>+</span></Link>
                </div>
                <MainBoardItem posts={eventPosts || []} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}