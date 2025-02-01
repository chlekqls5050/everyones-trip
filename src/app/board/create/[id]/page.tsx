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
  const [password, setPassword] = useState('');
  const [type, setType] = useState<string | undefined>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setType(id);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from('board').insert([{ title, content, author, creation_date: new Date(), type, password }]);
    
    if (error) {
      setError('게시글 작성에 실패했습니다.');
    } else {
      router.push(`/board/list/${type}`);
    }
  };

  return (
    <div className={style.container}>
      <div className='w-1200'>
        <div className={style.title_wrap}>
          <h3>{id}</h3>
        </div>
        <form onSubmit={handleSubmit} className={style.form_wrap}>
          <input type="text" value={type} readOnly hidden />
          <div className={style.form_input}>
            <label>작성자</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className={style.form_input}>
            <label>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={style.form_input}>
            <label>내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className={style.form_input}>
            <label>비밀번호</label>
            <input type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={style.submit_btn_wrap}>
            <button type="submit">작성하기</button>
          </div>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

