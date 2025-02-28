import style from "./main-banner-short.module.css";

export default function MainBannerShort () {

    return (
        <div className={style.main_banner_wrap}>
          <div className={style.container}>
            <div className={style.banner_txt_wrap}>
              <p className={style.text}>여행의 시작은 여기!</p>
              <p className={style.title}>모두의 여행으로 <span>모여</span></p>
            </div>
          </div>
        </div>
    )
}