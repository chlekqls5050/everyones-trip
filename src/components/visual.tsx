'use client';

import Image from "next/image";
import style from "./visual.module.css";
import { Swiper, SwiperSlide, SwiperClass, SwiperRef } from 'swiper/react';
import { useEffect, useRef, useState } from "react";
import { Autoplay, Controller, EffectFade, Pagination } from "swiper/modules";
import 'swiper/css';
import "swiper/css/effect-fade";
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

const images = [
    { src: '/images/visual_img1.jpg', alt: '경복궁 이미지' },
    { src: '/images/visual_img2.jpg', alt: '광안대교 이미지' },
    { src: '/images/visual_img3.jpg', alt: '한라산 이미지' },
];

const textInfo = [
    {hashtag:'#겨울경복궁 #눈내린고궁❄️', title:'고요한 겨울, 경복궁에서의 여유', text:'눈 덮인 경복궁에서 겨울의 고요함을 느껴보세요.'},
    {hashtag:'#겨울한라산 #눈덮인산🗻', title:'설원의 고요함으로 떠나는 겨울 여행', text:'한라산에서 눈 덮인 겨울 풍경을 만끽하세요.'},
    {hashtag:'#겨울광안대교 #광안대교야경🌉', title:'빛나는 겨울 바다, 광안대교와 함께', text:'겨울밤, 광안대교에서 특별한 야경을 즐기세요.'},
]



export default function Visual() {
    const textSwiperRef = useRef<SwiperClass | null>(null);
    const imgSwiperRef = useRef<SwiperClass | null>(null);
    const swiperRef = useRef<SwiperRef | null>(null);
    const [isAutoplay, setIsAutoplay] = useState(true);
    const [snowflakes, setSnowflakes] = useState<number[]>([]);

    useEffect(() => {
        setSnowflakes(Array.from({ length: 18 }, (_, index) => index));

        if (textSwiperRef.current && imgSwiperRef.current) {
            textSwiperRef.current.controller.control = imgSwiperRef.current;
            imgSwiperRef.current.controller.control = textSwiperRef.current;
        }
    }, []);

    const toggleAutoplay = () => {
        if (swiperRef.current) {
          const swiper = swiperRef.current.swiper;
          if (isAutoplay) {
            swiper.autoplay.stop();
          } else {
            swiper.autoplay.start();
          }
          setIsAutoplay(!isAutoplay);
        }
      };
    
    return (
        <div className={`${style.visual_wrap} visual_swiper`}>
            <div className={style.snow_wrap}>
            {
                snowflakes.map((_, index) => (
                    <div className={style.snow_div} key={index}>
                        <p>❅</p>
                        {/* <p>●</p> */}
                    </div>
                ))
            }
            </div>
            <div className="w-1200  overflow-hidden">
                <div className={style.visual_txt_box}>
                    <Swiper spaceBetween={20} slidesPerView={1} controller={{ control: imgSwiperRef.current }} onSwiper={(swiper) => (textSwiperRef.current = swiper)} modules={[Controller, EffectFade, Autoplay, Pagination]} effect="fade" fadeEffect={{ crossFade: true }} loop={true} pagination={{ type:"fraction" }} ref={swiperRef}  autoplay={{delay: 5000, disableOnInteraction: false,}}>
                        {
                            textInfo.map((textItem,index) => (
                                <SwiperSlide key={`text${index}`}>
                                    <p className={style.hashtag}>{textItem.hashtag}</p>
                                    <p className={style.title}>{textItem.text}</p>
                                    <p className={style.text}>{textItem.title}</p>
                                </SwiperSlide>  
                            ))
                        }
                        
                    </Swiper>
                    <div className={style.swiper_toggle_btn}>
                        <button onClick={toggleAutoplay}>
                            {isAutoplay ? '∣∣' : '▶'}
                        </button>
                    </div>
                </div>
                <div className={style.visual_img_box}>
                    <Swiper spaceBetween={20} slidesPerView={1} controller={{ control: textSwiperRef.current }} onSwiper={(swiper) => (imgSwiperRef.current = swiper)} modules={[Controller]} loop={true}>

                        {
                            images.map((image,index) => (
                                <SwiperSlide key={`images${index}`}>
                                    <div className={style.visual_cont}>
                                        <Image src={image.src} fill alt={image.alt} />
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    )
}