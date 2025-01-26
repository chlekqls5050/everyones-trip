import Link from "next/link";

interface boardData {
    id:number;
    title:string;
    content:string;
    creation_date:string;
    author:string;
}

export default function BoardItem({id, title, content, creation_date, author}:boardData) {
    
  const date = new Date(creation_date);
  
  const year = date.getFullYear().toString().slice(2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  
  const dataF= `${year}.${month}.${day}`;

    console.log(creation_date);
    return (
        <Link href={`/board/view/${id}`}>
            {title} |
            {content} | {author}
            {dataF}
        </Link>
    )
}