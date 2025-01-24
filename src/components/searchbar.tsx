'use client';
import React, { useEffect, useRef, useState } from 'react';
import style from './searchbar.module.css';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';


export default function SearchBar() {
    const searchBarRef = useRef<HTMLDivElement | null>(null);
    const [isHidden, setIsHidden] = useState(false);
    const [search, setSearch] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const q = searchParams.get("q");

    useEffect(() => {
        setSearch(q || "");
    }, [q]);

    const searchBarToggle = () => {
        if (searchBarRef.current) {
            searchBarRef.current.style.display = isHidden ? 'none' : 'block';
            setIsHidden(!isHidden);
        }
    };
    const searchBgClose = () => {
        if (searchBarRef.current) {
            searchBarRef.current.style.display = isHidden ? 'none' : 'block';
            setIsHidden(!isHidden);
        }

        console.log('실행')
    }

    const onChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    const onClickButton = () => {
        if (!search || q === search) return;
        router.push(`/search?q=${search}`);
        searchBgClose();
    }
    const onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            onClickButton();
        }
    }
    
    return (
        <>
            <div className={style.hd_etc_wrap}>
                <div className={style.sch_btn_wrap}>
                    <button className={style.sch_btn} onClick={searchBarToggle}>
                        {!isHidden ? <Image src="/images/icon/icon_search.png" alt="검색 아이콘" width={34} height={34} />:<Image src="/images/icon/icon_close.png" alt="닫기 아이콘" width={34} height={34} />}
                        
                    </button>
                </div>
            </div>
            <div ref={searchBarRef} className={style.sch_bar_wrap}>
                <div className={style.sch_bg_wrap} onClick={searchBgClose}></div>
                <div className={style.sch_input_box}>
                    <div className='w-1200'>
                        <div className={style.flex_box}>
                            <input type='text' value={search} onChange={onChangeInput} onKeyDown={onKeyDown}/>
                            <button onClick={onClickButton}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}