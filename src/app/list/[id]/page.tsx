'use client';
// import NotFound from '@/app/404';
import style from './page.module.css';
import ListItem from '@/components/list-item';
import { tripData } from "@/types";
import { useEffect, useState, use, useCallback } from 'react';
import Image from "next/image";
import MoreBtn from '@/components/morebtn';
import Link from 'next/link';


export default function Page({ params }: { params: Promise<{ id: string }>}) {
    const { id } = use(params);
    const [count, setCount] = useState<number>(12);
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const fetchData = useCallback(async (count:number) => {
        const response = await fetch(`https://apis.data.go.kr/B551011/KorService1/areaBasedSyncList1?numOfRows=${count}&MobileOS=ETC&MobileApp=trip&serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&_type=json&arrange=Q&contentTypeId=${id}`, { cache: "force-cache" });
        const data = await response.json();
        setData(data.response.body.items.item);
        
        if (!response.ok) {
            // if (response.status === 404) {
            // NotFound();
            // }

            return <div>오류가 발생했습니다...</div>
        }
    }, [id]); 
    
    useEffect(() => {
        fetchData(count);
    },[count, fetchData])


    return (
        <div className={style.container}>
            <div className={style.banner_wrap}>
                <div className={style.banner_img_wrap}>
                    <Image src={`/images/sub_banner_${id}.jpg`} fill alt={'배너 이미지'} />
                </div>
                <div className={style.banner_txt_wrap}>
                    <p className={style.title}>
                        {id === "12" ? "Spot" : id === "14" ? "cultural facilities" : id === "15" ? "festival" : id === "25" ? "Travel course" : id === "28" ? "leisure sports" : id === "32" ? "Stay" : id === "38" ? "shopping" : id === "39" ? "eating house" : "ALL"}
                    </p>
                </div>
            </div>
            <div className={style.sub_nav_wrap}>
                <Link href={'/'}>
                    <Image src={'/images/icon/icon_home.png'} alt={'home 버튼'} width={20} height={20} />
                </Link>
                <div className={style.nav_tab_wrap}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={isOpen ? style.open : ""}
                >
                        {id === "12" ? "Spot" : id === "14" ? "cultural facilities" : id === "15" ? "festival" : id === "25" ? "Travel course" : id === "28" ? "leisure sports" : id === "32" ? "Stay" : id === "38" ? "shopping" : id === "39" ? "eating house" : "ALL"}
                        <span>
                            <Image src={`/images/icon/icon_arrow.png`} width={12} height={12} alt={'arrow 아이콘'} />
                        </span>
                    </button>
                    {isOpen && (
                    <ul>
                        <li>
                            <Link href={'/list/12'}>spot</Link>
                        </li>
                        <li>
                            <Link href={'/list/14'}>cultural facilities</Link>
                        </li>
                        <li>
                            <Link href={'/list/15'}>festival</Link>
                        </li>
                        <li>
                            <Link href={'/list/25'}>Travel course</Link>
                        </li>
                        <li>
                            <Link href={'/list/28'}>leisure sports</Link>
                        </li>
                        <li>
                            <Link href={'/list/32'}>Stay</Link>
                        </li>
                        <li>
                            <Link href={'/list/38'}>shopping</Link>
                        </li>
                        <li>
                            <Link href={'/list/39'}>eating house</Link>
                        </li>
                    </ul>
                    )}
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
                <MoreBtn count={count} setCount={setCount} />
            </div> 
        </div>
    )
}
