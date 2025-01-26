import style from './morebtn.module.css';
interface MoreBtnProps {
    total?:number;
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function MoreBtn({count, setCount, total}:MoreBtnProps) {
    // console.log(total,count);
    return (
        <div className={style.more_btn_wrap}>
            {total && (total as number) >= count || total === undefined && count <= 48 ? (
                <button onClick={() => {setCount(count + 12)}}><span>더 많은 정보 불러오기 +</span></button>
            ) : (
                ""
            )}
        </div>
    )
}