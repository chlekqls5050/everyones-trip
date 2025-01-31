'use client';

import { useState, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import style from './page.module.css';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const {id} = use(params);
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<string | undefined>('');

  useEffect(() => {
    if (id) {
      setType(id);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.from('board').insert([{ title, content, author, creation_date: new Date(), type }]);
    

    if (error) {
      setError('게시글 작성에 실패했습니다.');
    } else {
      router.push(`/board/list/${type}`);
    }
  };

  return (
    <div className={style.container}>
      <div className='w-1200'>
        <form onSubmit={handleSubmit}>
          <div>
            <label>작성자</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <input type="text" value={type} readOnly />
          <div>
            <label>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit">작성하기</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

