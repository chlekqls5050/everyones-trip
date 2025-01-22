'use client';
import style from './searchbar.module.css';
import Image from 'next/image';


export default function SearchBar() {
    return (
        <div className={style.sch_wrap}>
            <button className={style.sch_btn}>
                <Image src="/images/icon/icon_search.png" alt="검색 아이콘" width={34} height={34} />
            </button>
        </div>
    )
}