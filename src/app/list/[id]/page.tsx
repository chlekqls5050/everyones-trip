'use client'
import style from './page.module.css';
import ListItem from '@/components/list-item';
import { tripData } from "@/types";
import { useEffect, useState, use } from 'react';


export default function Page({ params }: { params: Promise<{ id: string }>}) {
    const { id } = use(params);

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    const fetchData = async (pageNo:number) => {
        const response = await fetch(`https://apis.data.go.kr/B551011/KorService1/areaBasedSyncList1?numOfRows=12&pageNo=${page}&MobileOS=ETC&MobileApp=trip&serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&_type=json&arrange=Q&contentTypeId=${id}`, {cache : "force-cache"}); // contentId=1&
        const data = await response.json();
        setData(data.response.body.items.item);
        
        if (!response.ok) {
            console.error("API 호출 실패");
        }
        
    }
    useEffect(() => {
        fetchData(page);
    },[page])

    return (
        <div className={style.container}>
            <div className='w-1200'>
                <div className={style.list_wrap}>
                    { 
                        data.map((item:tripData) => (
                            <ListItem key={item.contentid} {...item} />
                        ))
                    }
                </div>
                <div className='paging'>
                    <ul>
                        <li>
                            {page === 1 ? <button onClick={() => {alert('첫번째 페이지 입니다');}}>PREV</button> : <button onClick={()=> {setPage(page - 1); window.scrollTo({top:0,left:0,behavior:'smooth'});}}>PREV</button>}
                        </li>
                        <li>
                            {page >= 10 ? <button onClick={() => {alert('마지막 페이지 입니다');}}>NEXT</button> : <button onClick={()=> {setPage(page + 1); window.scrollTo({top:0,left:0,behavior:'smooth'});}}>NEXT</button>}
                        </li>
                    </ul>
                </div>
            </div> 
        </div>
    )
}
