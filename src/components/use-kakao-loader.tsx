'use client';

import Script from 'next/script';
import { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import style from '@/app/trip/[id]/page.module.css';
import Image from "next/image";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;

interface KakaoMapProps {
  mapx?: string;
  mapy?: string;
  tel: string;
  addr1: string;
  addr2: string;
}

export default function KakaoMap({mapx, mapy, tel, addr1, addr2}:KakaoMapProps) {
    const lat = mapy ? parseFloat(mapy) : 0;
    const lng = mapx ? parseFloat(mapx) : 0;
    const [kakaoLoaded, setKakaoLoaded] = useState(false);

    useEffect(() => {
      if (window.kakao) {
        setKakaoLoaded(true);
      }
    }, []);
    return (
        <div className={style.directions_wrap}>
          <div className={style.directions_map_wrap}>
            <Script src={KAKAO_SDK_URL} strategy="lazyOnload" onLoad={() => {setKakaoLoaded(true);}} />
            {kakaoLoaded && (
              <Map center={{ lat, lng }} style={{ width: '100%', height: '100%' }}>
                <MapMarker position={{ lat, lng }} />
              </Map>
            )}
          </div>
          {addr1 && tel ? (
            <ul className={style.directions_txt_wrap}>
            {addr1 && (
            <li>
              <p className={style.title}>
                <span className={style.icon_wrap}>
                  <Image src={'/images/icon/icon_location.png'} alt='주소 아이콘' fill />
                </span>
                <span>주소</span>
              </p>
              <p className={style.text}>
                {addr1} <br />
                {addr2}
              </p>
            </li>)}
            {tel && (
            <li>
              <p className={style.title}>
                <span className={style.icon_wrap}>
                  <Image src={'/images/icon/icon_phone.png'} alt='전화번호 아이콘' fill />
                </span>
                <span>전화번호</span>
              </p>
              <p className={style.text}>
                {tel}
              </p>
            </li>)}
            </ul>
          ):""}
        </div>
      );
}
