"use client";

import React, { useRef, useState, useEffect } from "react";
import style from "./header-utilities.module.css";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SearchBar() {
  const searchBarRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const q = searchParams?.get("q") || "";

  useEffect(() => {
    setSearch(q);
  }, [q]);

  const searchBarToggle = () => {
    if (searchBarRef.current && searchInputRef.current) {
      searchBarRef.current.style.display = isHidden ? "none" : "block";
      searchInputRef.current.focus();
      setIsHidden(!isHidden);
    }
  };

  const searchBgClose = () => {
    if (searchBarRef.current) {
      searchBarRef.current.style.display = isHidden ? "none" : "block";
      setIsHidden(!isHidden);
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClickButton = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
    setSearch("");
    searchBgClose();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickButton();
    }
  };

  return (
    <>
      <div className={style.hd_etc_wrap}>
        <div className={style.sch_btn_wrap}>
          <button className={`${style.sch_btn} ${style.icon_wrap}`} onClick={searchBarToggle}>
            {!isHidden ? (
              <Image src="/images/icon/icon_search.png" alt="검색 아이콘" fill />
            ) : (
              <Image src="/images/icon/icon_close.png" alt="닫기 아이콘" fill />
            )}
          </button>
        </div>
        <div className={style.ham_btn_wrap}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div ref={searchBarRef} className={style.sch_bar_wrap}>
        <div className={style.sch_bg_wrap} onClick={searchBgClose}></div>
        <div className={style.sch_input_box}>
          <div className="w-1200">
            <div className={style.flex_box}>
              <input ref={searchInputRef} type="text" value={search} onChange={onChangeInput} onKeyDown={onKeyDown} />
              <button onClick={onClickButton}>Search</button>
            </div>
          </div>
        </div>
      </div>
      <div className={style.ham_wrap}>
        <div className={style.ham_bg}></div>
        <div className={style.ham_contents_box}>
          <div className={style.ham_hd_wrap}>
            <button className={`${style.close_btn} ${style.icon_wrap}`}>
              <Image src="/images/icon/icon_close.png" alt="닫기 아이콘" fill />
            </button>
          </div>
          <div className={style.ham_menu_wrap}>
            <ul className={style.Depth_1}>
              <li>
                <p className={style.Depth_1_title}>Travel Guide</p>
                <ul className={style.Depth_2}>
                  <li>
                    <Link href={"/list/12"}>관광지</Link>
                  </li>
                  <li>
                    <Link href={"/list/14"}>문화시설</Link>
                  </li>
                  <li>
                    <Link href={"/list/15"}>축제공연행사</Link>
                  </li>
                  <li>
                    <Link href={"/list/25"}>여행코스</Link>
                  </li>
                  <li>
                    <Link href={"/list/28"}>레포츠</Link>
                  </li>
                  <li>
                    <Link href={"/list/32"}>숙박</Link>
                  </li>
                  <li>
                    <Link href={"/list/38"}>쇼핑</Link>
                  </li>
                  <li>
                    <Link href={"/list/39"}>음식점</Link>
                  </li>
                </ul>
              </li>
              <li>
                <p className={style.Depth_1_title}>Notice</p>
                <ul className={style.Depth_2}>
                  <li>
                    <Link href={"/board/list"}>공지사항</Link>
                  </li>
                  <li>
                    <Link href={"/board/list"}>질문</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
