'use client';
import { useState, useEffect, use } from 'react';
import { supabase } from '@/lib/supabase';

const ViewPost = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [post, setPost] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      const { data, error } = await supabase.from('board').select('*').eq('id', id).single();

      if (error) {
        setError('게시글을 가져오는 데 실패했습니다.');
      } else {
        setPost(data);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>작성자 : {post.author}</p>
      <small>작성일: {post.creation_date}</small>
    </div>
  );
};

export default ViewPost;
