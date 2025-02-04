"use client";

import FestivitiesItem from "@/components/festivities-item";
import { tripData } from "@/types";
import style from "@/app/page.module.css";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export default function FestivitiesSection({ items }: { items: tripData[] }) {
  const contentTypeId = items[0]?.contenttypeid;

  const boxRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (boxRef.current) {
      gsap.fromTo(
        boxRef.current,
        { opacity: 0, y: 200 },  // 초기 상태: opacity 0, x 위치 -200px (왼쪽으로부터)
        {
          opacity: 1,               // 애니메이션 끝날 때 opacity 1
          y: 0,                     // x 위치 0으로 이동 (왼쪽에서 오른쪽으로)
          duration: 2,              // 1초 동안 애니메이션
          ease: "power2.out",       // 부드러운 ease
          scrollTrigger: {
            trigger: boxRef.current,  // boxRef2로 지정된 요소가 트리거
            start: "top 80%",          // 요소 상단이 뷰포트 상단의 80%에 도달할 때 애니메이션 시작
            end: "top 30%",            // 요소가 화면 중앙에 도달할 때 애니메이션 종료
            once: true,                // 한 번만 실행되고 이후에는 실행되지 않음
          },
        }
      );
    }
  }, []);

  return (
    <div className={style.main_contents_wrap} ref={boxRef}>
      <div className={style.main_title_wrap}>
        <h3>전국의 축제 정보</h3>
      </div>
      <div className={style.festivities_wrap}>
        {items.map((item) => (
          <FestivitiesItem key={item.contentid} {...item} />
        ))}
      </div>
      <div className={style.btn_wrap}>
        <Link href={`/list/${contentTypeId}`}>View More</Link>
      </div>
    </div>
  );
}
