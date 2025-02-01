'use client';
import { Post } from '@/types';
import BoardItem from '@/app/board/components/board-item';
import style from './main-board-item.module.css';

interface MainBoardItemProps {
  posts: Post[];
}

export default function MainBoardItem({ posts }: MainBoardItemProps) {
  return (
    <ul className={style.board_list_wrap}>
      {posts.map((post) => {
        const listItemClass = post.type === 'notice' ? style.notice : style.qa;
        return (
          <li key={post.id} className={listItemClass}>
            <BoardItem {...post}/>
          </li>
        );
      })}
    </ul>
  );
}
