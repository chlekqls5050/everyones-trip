import Link from "next/link";
import style from './board-item.module.css';

interface boardData {
    id:number;
    title:string;
    creation_date:string;
    author:string;
}

export default function BoardItem({id, title, creation_date, author}:boardData) {
    
  const date = new Date(creation_date);
  
  const year = date.getFullYear().toString().slice(2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  
  const dataF= `${year}.${month}.${day}`;

    return (
        <Link href={`/board/view/${id}`} className={style.board_cont}>
            <div className={style.inbox}>
                <p className={style.title}>{title}</p>
                <p className={style.author}>{author} | {dataF}</p>
            </div>
        </Link>
    )
}