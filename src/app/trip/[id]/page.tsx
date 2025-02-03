// import NotFound from '@/app/404';
import { tripData, infoItemProps, repeatItemProps } from '@/types';
import style from "./page.module.css";
import Image from "next/image";
import KakaoMap from "@/components/use-kakao-loader";
import parse from 'html-react-parser';
import { use } from "react";
import Link from 'next/link';


async function TripDetail({TripId} :{TripId:string}) {
  const response = await fetch(`https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=festivites&_type=json&contentId=${TripId}&defaultYN=Y&firstImageYN=Y&mapinfoYN=Y&addrinfoYN=Y&areacodeYN=Y&catcodeYN=Y&serviceKey=${process.env.NEXT_PUBLIC_API_KEY}`, {cache : "force-cache"})

  if(!response.ok) {
    // if(response.status === 404) {
    //   NotFound();
    // }
    return <div>오류가 발생했습니다...</div>
  }
  const data = await response.json();
  const tripDate:tripData[] = data.response.body.items.item;
  const filteredItems = tripDate?.filter((item) => item.contentid === TripId);


  if (!filteredItems || filteredItems.length === 0) {
    return <div>해당 여행 정보를 찾을 수 없습니다.</div>;
  }
  const filterItem = filteredItems?.[0] || null;
  // const $el = {
  //   areaCode : filterItem.areacode,
  //   sigunguCode : filterItem.sigungucode,
  //   contentid : filterItem.contentid,
  //   contentType : filterItem.contenttypeid,
  //   cat1 : filterItem.cat1,
  //   cat2 : filterItem.cat2,
  //   cat3 : filterItem.cat3,
  //   homePage : filterItem.homepage,
  // }

  const areaCode = filterItem.areacode;
  const sigunguCode = filterItem.sigungucode;
  const contentid = filterItem.contentid;
  const contentType = filterItem.contenttypeid;
  const cat1 = filterItem.cat1;
  const cat2 = filterItem.cat2;
  const cat3 = filterItem.cat3;
  const homePage = filterItem.homepage;



  // 상세소개 쉬는날, 개장기간 등 내역을 조회 api
  const addInfoData = await fetch(`https://apis.data.go.kr/B551011/KorService1/detailIntro1?MobileOS=ETC&MobileApp=festivites&_type=json&contentId=${contentid}&contentTypeId=${contentType}&serviceKey=${process.env.NEXT_PUBLIC_API_KEY}`, {cache : "force-cache"});
  const addInfoDataJson = await addInfoData.json();
  const tripDate2:infoItemProps = addInfoDataJson.response.body.items.item?.[0] || null;
  const eventStartDate = tripDate2.eventstartdate;
  const eventEndDate = tripDate2.eventenddate;
  const playTime = tripDate2.playtime;
  const useTimeFestival = tripDate2.usetimefestival;
  const treatMenu = tripDate2.treatmenu;
  const parKing = tripDate2.parking;
  const restDate = tripDate2.restdate;
  const disTance = tripDate2.distance;
  const fairDay = tripDate2.fairday;
  const openTime = tripDate2.opentime;
  const saleItem = tripDate2.saleitem;


  
  console.log(tripDate2);


  // 반복정보조회 / 관광정보 상세내역관련 api
  const repeatData = await fetch(`https://apis.data.go.kr/B551011/KorService1/detailInfo1?MobileOS=ETC&MobileApp=festivites&_type=json&contentId=${contentid}&contentTypeId=${contentType}&serviceKey=${process.env.NEXT_PUBLIC_API_KEY}`, {cache : "force-cache"});
  const repeatDataJson = await repeatData.json();
  const repeatDataItems:repeatItemProps[] = repeatDataJson.response.body.items.item;

  let infoText: string | undefined = undefined;
  if (repeatDataItems && repeatDataItems.length > 0) {
    const repeatDataItem = repeatDataItems?.[0] || null;
    infoText = repeatDataItem.infotext;
  }


  // 숙소 카테고리 명칭
  const stayCategoryResponse = await fetch(`https://apis.data.go.kr/B551011/KorService1/categoryCode1?&MobileOS=ETC&MobileApp=festivites&_type=json&serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&cat1=${cat1}&cat2=${cat2}&cat3=${cat3}`, {cache : "force-cache"});
  const stayCategoryJson = await stayCategoryResponse.json();
  const stayCategoryData:tripData[] = stayCategoryJson.response.body.items.item;
  const name = stayCategoryData?.[0].name || null;


  return (
    <div>
      <div className={style.main_title_wrap}>
        <p>축제 상세정보</p>
      </div>
      {filteredItems?.length > 0 &&  filteredItems.map((item) => (
        <div key={item.contentid}  className={style.festivites_cont}>
          <div className={`${style.festivites_info_wrap} ${style.festivites_cont_wrap}`}>
            <div className={style.img_wrap}>
              {item.firstimage ? (
                <Image src={item.firstimage} alt={item.title} fill />
              ) : (
                  <p className={style.empty}>{item.title} 이미지</p>
              )}
            </div>
            <div className={style.txt_wrap}>
              <p className={style.title}>{item.title}</p>
              <div>
                {name && (<p className={style.text}><span className={style.info_title}>구분 : </span><span>{name}</span></p>)}
                {disTance && (<p className={style.text}><span className={style.info_title}>거리 : </span><span>{disTance}</span></p>)}
                {eventStartDate && eventEndDate && (<p className={style.text}><span className={style.info_title}>축제 기간 : </span><span>{eventStartDate} ~ {eventEndDate}</span></p>)}
                {playTime && (<p className={style.text}><span className={style.info_title}>축제 시간 : </span><span>{playTime?.replace(/<br>/gi, "\n")}</span></p>)}
                {fairDay && (<p className={style.text}><span className={style.info_title}>장서는 날 : </span><span>{fairDay?.replace(/<br>/gi, "\n")}</span></p>)}
                {openTime && (<p className={style.text}><span className={style.info_title}>오픈 시간 : </span><span>{openTime?.replace(/<br>/gi, "\n")}</span></p>)}
                {saleItem && (<p className={style.text}><span className={style.info_title}>판매 품목 : </span><span>{saleItem?.replace(/<br>/gi, "\n")}</span></p>)}
                {restDate && (<p className={style.text}><span className={style.info_title}>휴무 : </span><span>{restDate?.replace(/<br>/gi, "\n")}</span></p>)}
                {useTimeFestival && (<p className={style.text}><span className={style.info_title}>이용 요금 : </span><span>{useTimeFestival?.replace(/<br>/gi, "\n")}</span></p>)
                }
                {parKing && (<p className={style.text}><span className={style.info_title}>주차 여부 : </span><span>{parKing}</span></p>)}
                {treatMenu && (<p className={style.text}><span className={style.info_title}>메뉴 : </span><span>{treatMenu}</span></p>)}
                {homePage && (<p className={style.text}><span className={style.info_title}>홈페이지 바로가기 : </span><span>{parse((homePage as string))}</span></p>)}


                
                {infoText && (<p className={`${style.text} ${style.detail_infor_text}`}>{infoText?.replace(/<br>/gi, "\n")}</p>)}
              </div>
            </div>
          </div>
          <div className={`${style.festivites_map_wrap} ${style.festivites_cont_wrap}`}>
            <div className="w-1200">
              <div className={style.sub_title_wrap}>
                <p>오시는 길</p>
              </div>
              {item.mapx && item.mapy ? (
                <KakaoMap {...item} />
              ) : (
                <div>위치 정보가 없습니다.</div>
              )}
            </div>
          </div>
          {areaCode && sigunguCode && <RecommendPlace areaCode={areaCode} sigunguCode={sigunguCode} />}
          {areaCode && sigunguCode && contentType !== '32' && <StayPlace areaCode={areaCode} sigunguCode={sigunguCode} />}
        </div>
      ))}
    </div>
  );
}
async function RecommendPlace({areaCode, sigunguCode} : {areaCode :string; sigunguCode:string}) {
  const response = await fetch(`https://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=4&MobileOS=ETC&MobileApp=festivites&_type=json&areaCode=${areaCode}&sigunguCode=${sigunguCode}&arrange=R&serviceKey=${process.env.NEXT_PUBLIC_API_KEY}`, {cache : "force-cache"});
  if(!response.ok) {
    // if(response.status === 404) {
    //   NotFound();
    // }
    return <div>오류가 발생했습니다...</div>
  }
  const data = await response.json();
  const tripDate:tripData[] = data.response.body.items.item;

  return (
    <div className={`${style.festivites_suggestion_wrap} ${style.festivites_cont_wrap}`}>
      <div className="inner_box">
        <div className={style.sub_title_wrap}>
          <p>함께 방문하면 좋은 장소</p>
        </div>
        <ul className={style.content_wrap}>
          {
            tripDate?.length > 0 && tripDate.map((item) => (
              <li key={item.contentid}>
                <Link href={`/trip/${item.contentid}`}>
                  <div className={style.img_wrap}>
                    {item.firstimage ? (
                      <Image src={item.firstimage} alt={item.title} fill />
                    ) : (
                      <p className={style.nix}>{item.title} 이미지 입니다.</p>
                    )}
                  </div>
                  <p className={style.title} title={item.title}>{item.title}</p>
                  <p className={style.add} title={`${item.addr1}${item.addr2}`}>
                    <Image src={'/images/icon/icon_location.png'} alt='주소 아이콘' width={15} height={15} />
                    <span>{item.addr1}{item.addr2}</span>
                  </p> 
                  {item.tel? (
                    <p className={style.tel}>
                      <Image src={'/images/icon/icon_phone.png'} alt='전화번호 아이콘' width={15} height={15} />
                      {item.tel}
                    </p>
                  ):('')}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}
async function StayPlace({areaCode, sigunguCode}:{areaCode:string; sigunguCode:string;}) {
  const stayResponse = await fetch(`https://apis.data.go.kr/B551011/KorService1/searchStay1?numOfRows=4&areaCode=${areaCode}&sigunguCode=${sigunguCode}&MobileOS=ETC&MobileApp=festivites&_type=json&arrange=Q&serviceKey=${process.env.NEXT_PUBLIC_API_KEY}`, {cache : "force-cache"});
  const stayJson = await stayResponse.json();
  const stayDate:tripData[] = stayJson.response.body.items.item;

  return (
    <div className={`${style.festivites_suggestion_wrap} ${style.festivites_cont_wrap}`}>
      <div className="inner_box">
        <div className={style.sub_title_wrap}>
          <p>근처 숙소</p>
        </div>
        <ul className={style.content_wrap}>
          {
            stayDate?.length > 0 ? stayDate.map((item) => (
              <li key={item.contentid}>
                <Link href={`/trip/${item.contentid}`}>
                  <div className={style.img_wrap}>
                    {item.firstimage ? (
                      <Image src={item.firstimage} alt={item.title} fill />
                    ) : (
                      <p className={style.nix}>{item.title} 이미지 입니다.</p>
                    )}
                  </div>
                  <p className={style.title} title={item.title}>{item.title}</p>
                  <p className={style.add} title={`${item.addr1}${item.addr2}`}>
                    <Image src={'/images/icon/icon_location.png'} alt='주소 아이콘' width={15} height={15} />
                    <span>{item.addr1}{item.addr2}</span>
                  </p> 
                  {item.tel? (<p className={style.tel}><Image src={'/images/icon/icon_phone.png'} alt='전화번호 아이콘' width={15} height={15} /> {item.tel}</p>):('')}
                  </Link>
              </li>
            )) : (
              <li><p className={style.title}>근처 숙소가 없습니다.</p></li>
            )
          }
        </ul>
      </div>
    </div>
  )
}



export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const {id} = use(params);
  return (
    <section className={style.container}>
      <div className="w-1200">
          <TripDetail TripId={id} />
      </div>
    </section>
  )
}
