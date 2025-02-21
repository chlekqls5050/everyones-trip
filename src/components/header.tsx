"use client";
import Link from "next/link";
import style from './header.module.css';
import Image from "next/image";
import HeaderUtillties from "./header-utilities";
import { Suspense, useEffect, useState } from "react";

export default function Header() {
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`${style.common_header} ${isFixed ? style.fix : ""}`}>
            <div className="w-1200 h-100">
                <div className={style.header_wrap}>
                    <Link href={'/'} className={style.hd_logo_wrap}>
                        <div>
                            <span>모두의 여행</span>
                            <div className={style.icon_wrap}>
                                <Image src={'/images/icon/icon_logo_map.png'} alt='로고 아이콘' fill />
                            </div>
                        </div>
                    </Link>
                    <div className={style.hd_right_wrap}>
                        <div className={style.hd_menu_wrap}>
                            <ul>
                                <li>
                                    <Link href={'/list/12'}>Travel</Link>
                                </li>
                                <li>
                                    <Link href={'/board/list/notice'}>Notice</Link>
                                </li>
                                <li>
                                    <Link href={'/board/list/event'}>Event</Link>
                                </li>
                            </ul>
                        </div>
                        <Suspense fallback={<div>Loading...</div>}>
                            <HeaderUtillties />
                        </Suspense>
                    </div>
                </div>
            </div>
        </header>
    );
}