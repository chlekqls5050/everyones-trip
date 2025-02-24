"use client";
import { supabase } from '@/lib/supabase';
import { useEffect, useState, use } from 'react';
import BoardItem from '@/app/board/components/board-item';
import style from './page.module.css';
import Link from 'next/link';
import { Post } from '@/types';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const {id} = use(params);
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState<null | number>(0);
    const postsPerPage = 10;

    useEffect(() => {
        const fetchPosts = async () => {
            let boardCategory = 'notice';
            if(id == 'event') {
                boardCategory = 'event';
            };

            const { count, error: countError} = await supabase.from('board').select('*', { count: 'exact' }).eq('type', boardCategory).order('id', { ascending: false });

            if (countError) {
                console.error(countError);
            } else {
                setTotalPosts(count);
            }

            const { data, error } = await supabase
                .from('board')
                .select('*')
                .eq('type', boardCategory).order('id', { ascending: false })
                .range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1);
            
            if (error) {
                console.error(error);
            } else {
                setPosts(data);
            }

            console.log(data)
        };

        fetchPosts();
    }, [id, currentPage]);

    const totalPages = Math.ceil((totalPosts as number) / postsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className={style.board_contents_wrap}>
            <div className='w-1200'>
                <div className={style.board_title_wrap}>
                    <h2>
                        {id === 'notice' ? 'Notice' : 'Event'}
                    </h2>
                </div>
                <div className={style.board_totla_wrap}>
                    <p>총 <span>{totalPosts}</span>개의 게시물</p>
                </div>
                <div className={style.board_list_wrap}>
                    {posts.length === 0 ? (
                        <p>게시물이 없습니다</p>
                    ) : (
                        <ul>
                            {posts.map((post) => (
                                <li key={post.id}>
                                    <BoardItem {...post} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className={style.create_btn_wrap}>
                    <Link href={id === 'notice' ? '/board/create/notice' : '/board/create/event'}>글 쓰기</Link>
                </div>
                {posts.length > 0 ? (
                    <div className={style.pagination_wrap}>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            &lt;
                        </button>
                        <span>{currentPage} / {totalPages}</span>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            &gt;
                        </button>
                    </div>
                    ) : (
                    <></>
                )}
                
            </div>
        </div>
    );
};
