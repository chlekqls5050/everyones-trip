// 'use client'
import style from './footer.module.css';
import Image from 'next/image';
// import { useState, useEffect } from "react";

export default function Footer(){
    // const [isScrolled, setIsScrolled] = useState(false);
    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (window.scrollY > 50) {
    //             setIsScrolled(true);
    //         } else {
    //             setIsScrolled(false);
    //         }
    //     };
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // },[]);

    return (
        
        // ${isScrolled ? style.fix_header : ''}
        <>
            <footer className={style.footer}>
                <div className="w-1200">
                    <div className={style.ft_top_wrap}>
                        <div className={style.ft_logo_wrap}>
                            <div>
                                <span>모두의 여행</span>
                                <Image src={'/images/icon/icon_logo_map.png'} alt='로고 아이콘' width={30} height={30} />
                            </div>
                        </div>
                        <div className={style.ft_info_wrap}>
                            <ul>
                                <li>
                                    <p className={style.title}>Phone</p>
                                    <p className={style.text}>010-8662-4218</p>
                                </li>
                                <li>
                                    <p className={style.title}>E-mail</p>
                                    <p className={style.text}>chlekqls5050@naver.com</p>
                                </li>
                                <li>
                                    <p className={style.title}>Address</p>
                                    <p className={style.text}>서울시 중랑구 중화동</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={style.ft_bt_wrap}>
                        <div className={style.copyright}>
                            <p>copyright ©2025 Dabeen. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
            {/* <div className={style.ft_fix_wr}>
                <button type="button" className={style.top_btn}>
                    <Image src="/images/icon/icon_top_btn.png" width={15} height={25} alt="top button" />
                </button>
            </div> */}
        </>
    )
}