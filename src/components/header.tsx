import Link from "next/link";
import style from './header.module.css';
import Image from "next/image";
import HeaderUtillties from "./header-utilities";

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
            <div className={style.hd_menu_wrap}>
                <ul>
                    <li>
                        <Link href={'/list/12'}>Travel Guide</Link>
                    </li>
                    <li>
                        <Link href={'/board/list'}>Notice</Link>
                    </li>
                </ul>
            </div>
            <div className={style.hd_right_wrap}>
                <HeaderUtillties />
            </div>
          </div>
        </header>
    )
}

