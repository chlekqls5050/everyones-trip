// import React from "react";
import style from './loading.module.css';

const Loading = () => {
  return (
    <div className={style.loading_wrap}>
        <div className={style.loader}></div>
    </div>
  );
};

export default Loading;
