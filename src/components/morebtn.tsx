import style from './morebtn.module.css';
interface MoreBtnProps {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function MoreBtn({count, setCount}:MoreBtnProps) {
    
    return (
        <div className={style.more_btn_wrap}>
            {count <= 60 ? <button onClick={() => {setCount(count + 12)}}><span>더 많은 정보 불러오기 +</span></button> : ""}
        </div>
    )
}