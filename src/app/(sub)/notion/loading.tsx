"use client";

import { ClipLoader } from "react-spinners";

export default function NotionPageLading() {
  return (
    <div className="flex h-screen w-screen flex-col items-center  justify-center gap-8 text-3xl text-navy">
      <h3>노션 페이지로 이동 중 입니다</h3>
      <ClipLoader size={50} color="#36d7b7" />
    </div>
  );
}
