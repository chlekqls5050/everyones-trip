
import style from "./page.module.css";
import { tripData } from "@/types";
import Visual from "@/components/visual";
import FestivitiesItem from "@/components/festivities-item";
import LodgmentItem from "@/components/lodgment-item";
import Link from "next/link";
import { supabase } from '@/lib/supabase';
import MainBoardItem from "@/components/main-board-item";

async function FestivitiesContent(){
  const response = await fetch(`https://apis.data.go.kr/B551011/KorService1/searchFestival1?numOfRows=4&MobileOS=ETC&MobileApp=festivites&_type=json&arrange=Q&eventStartDate=20250115&serviceKey=${process.env.NEXT_PUBLIC_API_KEY}`, {cache : "force-cache"});
  if(!response.ok) {
    return <div>오류가 발생했습니다...</div>
  }
  const result = await response.json();
  const items:tripData[] = result.response.body.items.item;

  const contentTypeId = items[0].contenttypeid;
  return (
    <>
      <div className={style.main_title_wrap}>
        <h3>전국의 축제 정보</h3>
      </div>
      <div className={style.festivities_wrap}>
          { 
            items.map((item) => (
              <FestivitiesItem key={item.contentid} {...item} />
            ))
          }
      </div>
      <div className={style.btn_wrap}>
        <Link href={`/list/${contentTypeId}`}>View More</Link>
      </div>
    </>
  )
}
async function LodgmentContent() {
  const response = await fetch(`https://apis.data.go.kr/B551011/KorService1/searchStay1?numOfRows=7&MobileOS=ETC&MobileApp=lodgment&_type=json&arrange=R&serviceKey=${process.env.NEXT_PUBLIC_API_KEY}`, {cache : "force-cache"});
  if(!response.ok) {
    throw new Error(`${response.statusText}`);
  }
  const result = await response.json();
  const items:tripData[] = result.response.body.items.item;
  const contentTypeId = items[0].contenttypeid;

  return (
    <>
      <div className={style.main_title_wrap}>
        <h3>전국의 숙박 정보</h3>
      </div>
      <div className={style.lodgment_wrap}>
        <div className={style.first_item_wrap}>
          <LodgmentItem key={items[0].contentid}{...items[0]} />
        </div>
        <div className={style.other_items_wrap}>
          {items.slice(1).map((item) => (
            <LodgmentItem key={item.contentid} {...item} />
          ))}
        </div>
      </div>
      <div className={style.btn_wrap}>
        <Link href={`/list/${contentTypeId}`}>View More</Link>
      </div>
    </>
  );
}


export default async function Home() {

  const { data: qaPosts, error: qaError } = await supabase.from('board').select('*').eq('type', 'qa').limit(5);
  const { data: noticePosts, error: noticeError } = await supabase.from('board').select('*').eq('type', 'notice').limit(5);

  if (qaError || noticeError) {
    console.error('데이터 가져오기 오류', qaError, noticeError);
    return <div>데이터 가져오는 데 문제가 발생했습니다.</div>;
  }

  return (
    <div className={style.container}>
      <Visual />
      <div className="w-1200">
        <div className={style.main_contents_wrap}>
          <FestivitiesContent />
        </div>
        <div className={`${style.main_contents_wrap} ${style.main_banner_wrap}`}>
          <div className={style.container}>
            <div className={style.bg}></div>
            <div className={style.banner_txt_wrap}>
              <p className={style.txt}>당신의 특별한 순간을 위한 국내 여행 가이드</p>
              <p className={style.title}>Everyone&apos;s trip</p>
            </div>
          </div>
        </div>
        <div className={style.main_contents_wrap}>
          <LodgmentContent />
        </div>
        <div className={style.main_board_wrap}>
          <div className={style.main_title_wrap}>
            <h3>공지사항</h3>
          </div>
          <div className={style.board_cont_wrap}>
            <div>
              <MainBoardItem posts={noticePosts || []} />
            </div>
            <div>
              <MainBoardItem posts={qaPosts || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
