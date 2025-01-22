import type { tripData } from "@/types";
import Link from "next/link";
import style from './list-item.module.css';
import Image from "next/image";


export default function ListItem({
    addr1,
    firstimage,
    title,
    contentid,
}: tripData) {

  return (
    <div className={style.content_box}>
        <Link href={`/trip/${contentid}`}>
            <div className={style.image_box}>
                <Image src={firstimage} fill alt={`${title} 이미지`}/>
            </div>
            <div className={style.info_box}>
            <p className={style.title}>{title}</p>  
            <p className={style.addr}>{addr1}</p>
            </div>
        </Link>
    </div>
  );
}
