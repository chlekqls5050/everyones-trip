'use client';
import ListItem from '@/components/list-item';
import style from './page.module.css';
import type { tripData } from "@/types";
import { useState, useEffect, use } from 'react';
import MoreBtn from '@/components/morebtn';

export default function Page({ searchParams }: { searchParams: Promise<{ q: string }>}) {
    const { q } = use(searchParams);

    const [count, setCount] = useState<number>(12);
    const [total, setTotal] = useState<number>(0);
    const [searchItem, setSearchItem] = useState<tripData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?MobileOS=ETC&MobileApp=festivites&_type=json&arrange=Q&numOfRows=${count}&keyword=${q}&serviceKey=${process.env.NEXT_PUBLIC_API_KEY}`,
                    {cache:"force-cache"}
                );
                if (!response.ok) throw new Error('Error fetching data');
                const data = await response.json();
                setTotal(data.response.body.totalCount);
                setSearchItem(data.response.body.items.item || []);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [q, count]);

    return (
        <div className={style.container}>
            <div className='w-1200'>
                <div className={style.search_title_wrap}>
                    <h3>"{q}" 검색결과</h3>
                </div>
                {searchItem.length > 0 ? (
                    <>
                    <div className={style.search_total_wrap}>
                        <p>total : <span>{total}</span></p>
                    </div>
                    <div className={`${style.list_wrap} ${style.existing}`}>
                        {searchItem.map((item) => <ListItem key={item.contentid} {...item} />)}
                    </div>
                    </>
                ) : (
                    <>
                        <div className={style.list_wrap}>
                            <div className={style.empty}>검색 결과가 없습니다.</div>
                        </div>
                    </>
                )}
                <MoreBtn count={count} setCount={setCount} total={total}/>
            </div>
        </div>
    );
}
