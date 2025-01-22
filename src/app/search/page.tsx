// import style from './page.module.css';


export default async function Page(){
    const response = await fetch(`https://apis.data.go.kr/B551011/KorService1/searchKeyword1?MobileOS=ETC&MobileApp=festivites&_type=json&arrange=Q&keyword=1&serviceKey=${process.env.NEXT_PUBLIC_API_KEY}`);
    if(!response.ok) {
        throw new Error('에러');
    }
    const data = await response.json();

    console.log(data);
    return (
        <div></div>
    )
}