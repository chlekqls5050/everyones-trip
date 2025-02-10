"use client";

import LodgmentItem from "@/components/lodgment-item";
import { tripData } from "@/types";
import style from "@/app/page.module.css";
import Link from "next/link";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function LodgmentSection({ items }: { items: tripData[] }) {
    const contentTypeId = items[0].contenttypeid;
    
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
    </div>
  );
}
