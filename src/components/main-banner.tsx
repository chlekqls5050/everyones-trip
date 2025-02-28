
"use client";
import style from "@/app/page.module.css";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function MainBanner () {
    const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
        gsap.fromTo(
            boxRef.current,
          { opacity: 0, width: '40vw', marginLeft: 'calc(-20vw + 50%)' },
          {
            opacity: 1, 
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            scrollTrigger: {
              trigger: boxRef.current,
              start: "top 70%",
              end: "top 10%",
              scrub: true,
              once: true,
            },
          }
        );
      }
  }, []);
    return (
        <div className={`${style.main_contents_wrap} ${style.main_banner_wrap}`} ref={boxRef}>
          <div className={style.container}>
            <div className={style.bg_wrap}>
              <div className={style.bg}></div>
            </div>
            <div className={style.banner_txt_wrap}>
              <p className={style.txt}>당신의 특별한 순간을 위한 국내 여행 가이드</p>
              <p className={style.title}>Everyone&apos;s trip</p>
            </div>
          </div>
        </div>
    )
}