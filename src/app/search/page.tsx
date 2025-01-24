import ListItem from '@/components/list-item';
// import style from './page.module.css';
import style from '../list/[id]/page.module.css';
import type { tripData } from "@/types";
import MoreBtn from '@/components/morebtn';
import { cache } from 'react';

export default async function Page({ searchParams }: { searchParams: { q?: string } }) {
    const q = searchParams.q || '';

    const response = await fetch(`https://apis.data.go.kr/B551011/KorService1/searchKeyword1?MobileOS=ETC&MobileApp=festivites&_type=json&arrange=Q&numOfRows=12&keyword=${q}&serviceKey=${process.env.NEXT_PUBLIC_API_KEY}`, { cache: "force-cache" }); //numOfRows=${count}&

    if(!response.ok) {
        throw new Error('Error');
    }
    const data = await response.json();
    const searchItem:tripData[] = data.response.body.items.item;

    if(searchItem === undefined) {
        return <div>데이터가 없습니다.</div>
    }

    return (
        <div className={style.container}>
            <div className='w-1200'>
                <div className={style.list_wrap}>
                {
                    searchItem.map((item) => (
                        <ListItem key={item.contentid} {...item}/>
                    ))
                }
                </div>
            </div>
        </div>
    )
}