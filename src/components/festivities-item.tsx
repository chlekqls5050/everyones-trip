import type { tripData } from "@/types";
import Link from "next/link";
import style from "./Festivities-item.module.css";
import Image from "next/image";


export default function LodgmentItem({
    addr1,
    firstimage,
    title,
    contentid,
}: tripData) {

  return (
    <div className={style.content_box}>
        <div className={style.image_box}>
            <Image src={firstimage} fill alt={`${title} 이미지`}/>
        </div>
        <div className={style.info_box}>
          <p className={style.title}>{title}</p>  
          <p className={style.addr}>{addr1}</p>
          <Link href={`/trip/${contentid}`}>
            자세히 보러가기
          </Link>
        </div>
    </div>
  );
}
