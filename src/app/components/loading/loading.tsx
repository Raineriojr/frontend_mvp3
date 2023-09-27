'use client';

import Lottie from "lottie-react";
import LoadingLottie from "../../assets/loading.json";

const Loading = () => {
  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <Lottie animationData={LoadingLottie} loop={true} />
      <h2>Carregando...</h2>
    </div>
  )
}

export default Loading;