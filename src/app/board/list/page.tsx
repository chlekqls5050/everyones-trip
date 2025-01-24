"use client";
import { supabase } from '../../../lib/supabase';
import { useEffect, useState } from 'react';
import BoardItem from '../components/board-item';

const BoardList = () => {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
    const fetchPosts = async () => {
        const { data, error } = await supabase.from('posts').select('*');
        if (error) {
        console.error(error);
        } else {
        setPosts(data);
        }
    };

    fetchPosts();
    }, []);

    return (
        <div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <BoardItem {...post}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};





export default BoardList;