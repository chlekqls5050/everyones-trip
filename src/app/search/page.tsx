import ListItem from '@/components/list-item';
import style from './page.module.css';
import type { tripData } from "@/types";

export default async function Page({ searchParams }: { searchParams: { q?: string } }) {
    const q = searchParams.q || '';

    const response = await fetch(`https://apis.data.go.kr/B551011/KorService1/searchKeyword1?MobileOS=ETC&MobileApp=festivites&_type=json&arrange=Q&keyword=${q}&serviceKey=${process.env.NEXT_PUBLIC_API_KEY}`);

    if(!response.ok) {
        throw new Error('에러');
    }
    const data = await response.json();

    const dd:tripData[] = data.response.body.items.item;



    if(dd === undefined) {
        return <div>데이터가 없습니다.</div>
    }

    return (
        <div>
            {
                dd.map((item) => (
                    <ListItem key={item.contentid} {...item}/>
                ))
            }
        </div>
    )
}