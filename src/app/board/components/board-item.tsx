import Link from "next/link";

interface boardData {
    id:number;
    title:string;
    content:string;
    creation_date:string;
    author:string;
}

export default function BoardItem({id, title, content, creation_date, author}:boardData) {
    
    // 'day', 'month', 'year' 순으로 변환
    // const day = String(post.getDate()).padStart(2, '0'); // 일 부분 (두 자릿수로 만들기)
    // const month = String(post.getMonth() + 1).padStart(2, '0'); // 월 부분 (두 자릿수로 만들기)
    // const year = String(post.getFullYear()).slice(-2); // 연도 부분 (두 자릿수로 만들기)

    // const formattedDate = `${day}.${month}.${year}`;

    console.log(creation_date);
    return (
        <Link href={`/board/view/${id}`}>
            {title} |
            {content} | {author}
            {creation_date}
        </Link>
    )
}