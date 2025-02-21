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


interface ImageInfo {
    src: string;
    alt: string;
}
interface TextInfo {
    hashtag: string;
    title: string;
    text: string;
}
interface VisualData {
    images: ImageInfo;
    textInfo: TextInfo;
}
// const winterVisualData: VisualData[] = [
//     {
//         images: {
//             src: '/images/winter_visual_img1.jpg',
//             alt: '경복궁 이미지'
//         },
//         textInfo: {
//             hashtag:'#겨울경복궁 #눈내린고궁❄️', 
//             title:'고요한 겨울, 경복궁에서의 여유', 
//             text:'눈 덮인 경복궁에서 겨울의 고요함을 느껴보세요.'
//         }
//     },
//     {
//         images: {
//             src: '/images/winter_visual_img2.jpg', 
//             alt: '광안대교 이미지'
//         },
//         textInfo: {
//             hashtag:'#겨울한라산 #눈덮인산🗻', 
//             title:'설원의 고요함으로 떠나는 겨울 여행', 
//             text:'한라산에서 눈 덮인 겨울 풍경을 만끽하세요.'
//         }
//     },
//     {
//         images: {
//             src: '/images/winter_visual_img3.jpg',
//             alt: '한라산 이미지'
//         },
//         textInfo: {
//             hashtag:'#겨울광안대교 #광안대교야경🌉', 
//             title:'빛나는 겨울 바다, 광안대교와 함께', 
//             text:'겨울밤, 광안대교에서 특별한 야경을 즐기세요.'
//         }
//     }
// ]
const springVisualData: VisualData[] = [
    {
        images: {
            src: '/images/spring_visual_img1.jpg',
            alt: '군항제 이미지'
        },
        textInfo: {
            hashtag: '#진해군항제 #벚꽃축제🌸', 
            title: '벚꽃이 흩날리는 낭만, 진해 군항제', 
            text: '봄바람에 흩날리는 벚꽃과 함께 진해 군항제의 아름다움을 만끽하세요.'
        }
    },
    {
        images: {
            src: '/images/spring_visual_img2.jpg', 
            alt: '구례산수유축제 이미지'
        },
        textInfo: {
            hashtag: '#구례산수유꽃축제 #봄맞이🌼', 
            title: '노란 물결이 가득한 봄, 구례 산수유 꽃축제', 
            text: '산수유꽃이 만개한 구례에서 따뜻한 봄의 시작을 맞이하세요.'
        }
    },
    {
        images: {
            src: '/images/spring_visual_img3.jpg',
            alt: '태안튤립축제 이미지'
        },
        textInfo: {
            hashtag: '#태안튤립축제 #꽃물결🌷', 
            title: '형형색색의 꽃물결, 태안 세계 튤립 축제', 
            text: '수십만 송이의 튤립이 펼쳐진 태안에서 봄의 화려한 색감을 만끽하세요.'
        }
    }
]

export default function Visual() {
    const textSwiperRef = useRef<SwiperClass | null>(null);
    const imgSwiperRef = useRef<SwiperClass | null>(null);
    const swiperRef = useRef<SwiperRef | null>(null);
    const [isAutoplay, setIsAutoplay] = useState(true);
    const [flutterflakes, setFlutterflakes] = useState<number[]>([]);

    useEffect(() => {
        setFlutterflakes(Array.from({ length: 18 }, (_, index) => index));

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
            <div className={style.flutter_wrap}>
            {
                flutterflakes.map((_, index) => (
                    <div className={style.flutter_div} key={index}>
                        {/* <p>❅</p> */}
                        <p>
                            <span></span>
                        </p>
                    </div>
                ))
            }
            </div>
            <div className="w-1200  overflow-hidden">
                <div className={style.visual_txt_box}>
                    <Swiper spaceBetween={20} slidesPerView={1} controller={{ control: imgSwiperRef.current }} onSwiper={(swiper) => (textSwiperRef.current = swiper)} modules={[Controller, EffectFade, Autoplay, Pagination]} effect="fade" fadeEffect={{ crossFade: true }} loop={true} pagination={{ type:"fraction" }} ref={swiperRef}  autoplay={{delay: 5000, disableOnInteraction: false,}}>
                        {
                            springVisualData.map((textItem,index) => (
                                <SwiperSlide key={`text${index}`}>
                                    <p className={style.hashtag}>{textItem.textInfo.hashtag}</p>
                                    <p className={style.title}>{textItem.textInfo.text}</p>
                                    <p className={style.text}>{textItem.textInfo.title}</p>
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
                            springVisualData.map((imageItem,index) => (
                                <SwiperSlide key={`images${index}`}>
                                    <div className={style.visual_cont}>
                                        <Image src={imageItem.images.src} fill alt={imageItem.images.alt} />
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