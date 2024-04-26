"use client";
import { useEffect } from "react";

export const MSWComponent = () => {
  useEffect(() => {
    // browser에서만 동작됨을 보장해주는 조건문
    if(typeof window !== 'undefined') {
      // 개발서버에서만 동작하도록 환경변수 설정
      if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
        require("@/mocks/browser");
      }
    }
  }, []);

  return null;
}