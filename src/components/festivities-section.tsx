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
        { opacity: 0, y: 200 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: boxRef.current,
            start: "top 80%",
            end: "top 30%",
            once: true,
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
