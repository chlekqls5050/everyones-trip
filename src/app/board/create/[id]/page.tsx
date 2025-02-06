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
        <div className={style.board_title_wrap}>
          <h3>{id}</h3>
        </div>
        <form onSubmit={handleSubmit} className={style.form_wrap}>
          <div className={style.form_input_wrap}>
            <input type="text" value={type} readOnly hidden />
            <div className={`${style.form_input} ${style.half_wrap}`}>
              <div>
                <label htmlFor='author'>작성자</label>
                <span className={style.input_ani}>
                  <input
                    id='author'
                    type="text"
                    value={author}
                    tabIndex={1}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="작성자를 입력하세요."
                    required
                  />
                  <span className={style.under_ani}></span>
                </span>
              </div>
              <div>
                <label htmlFor='pw'>비밀번호</label>
                <span className={style.input_ani}>
                  <input
                    id='pw'
                    type='password'
                    value={password}
                    tabIndex={2}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요."
                    required
                  />
                  <span className={style.under_ani}></span>
                </span>
              </div>
            </div>
            <div className={style.form_input}>
              <label htmlFor='title'>제목</label>
              <span className={style.input_ani}>
                <input
                  id='title'
                  type="text"
                  value={title}
                  tabIndex={3}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력하세요."
                  required
                />
                <span className={style.under_ani}></span>
              </span>
            </div>
            <div className={style.form_input}>
              <label htmlFor='content'>내용</label>
              <span className={style.input_ani}>
                <textarea
                  id='content'
                  value={content}
                  tabIndex={4}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="내용을 입력하세요."
                  required
                />
                <span className={style.under_ani}></span>
              </span>
            </div>
          </div>
          <div className={style.submit_btn_wrap}>
            <button type="submit" tabIndex={5}><span>작성하기</span></button>
          </div>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

