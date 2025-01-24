import Link from "next/link";
import style from './header.module.css';
import Image from "next/image";
import SearchBar from '@/components/searchbar';

export default function Header(){
    return (
        <header className={`${style.common_header}`}>
          <div className="w-1200 h-100">
            <Link href={'/'} className={style.hd_logo_wrap}>
                <div>
                    {/* Everyone&apos;s trip */}
                    <span>모두의 여행</span>
                    <Image src={'/images/icon/icon_logo_map.png'} alt='로고 아이콘' width={30} height={30} />
                </div>
            </Link>
            {/* <div className={style.hd_menu_wrap}>
                <Link href={''}>축제 정보</Link>
                <Link href={''}>숙박 정보</Link>
                <Link href={''}>애견동반 여행 정보</Link>
            </div> */}
            <SearchBar />
                {/* <button className={style.weather_btn}>
                    <Image src="/images/icon/icon_weather.png" alt="날씨 아이콘" width={30} height={30} />
                </button> */}
          </div>
        </header>
    )
}

