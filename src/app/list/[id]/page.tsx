'use client';
import NotFound from '@/app/not-found';
import style from './page.module.css';
import ListItem from '@/components/list-item';
import { tripData } from "@/types";
import { useEffect, useState, use } from 'react';
import Image from "next/image";


export default function Page({ params }: { params: Promise<{ id: string }>}) {
    const { id } = use(params);

    const [data, setData] = useState([]);
    const [count, setCount] = useState(12);

    const fetchData = async (pageNo:number) => {
        const response = await fetch(`https://apis.data.go.kr/B551011/KorService1/areaBasedSyncList1?numOfRows=${count}&MobileOS=ETC&MobileApp=trip&serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&_type=json&arrange=Q&contentTypeId=${id}`, {cache : "force-cache"});
        const data = await response.json();
        setData(data.response.body.items.item);

          if(!response.ok) {
            if(response.status === 404) {
              NotFound();
            }
            return <div>오류가 발생했습니다...</div>
          }
        
    }
    useEffect(() => {
        fetchData(count);
    },[count])

    return (
        <div className={style.container}>
            <div className={style.banner_wrap}>
                <div className={style.banner_img_wrap}>
                    <Image src={`/images/sub_banner_${id}.jpg`} fill alt={'배너 이미지'} />
                </div>
                <div className={style.banner_txt_wrap}>
                    <p className={style.title}>
                        {id === "32" ? "STAY" : "FESTIVTIES"}
                    </p>
                </div>
            </div>
            <div className='w-1200'>
                <div className={style.list_wrap}>
                    { 
                        data.map((item:tripData) => (
                            <ListItem key={item.contentid} {...item} />
                        ))
                    }
                </div>
                <div className={style.more_btn_wrap}>
                    {count <= 60 ? <button onClick={() => {setCount(count + 12)}}><span>더 많은 정보 불러오기 +</span></button> : ""}
                </div>
            </div> 
        </div>
    )
}
