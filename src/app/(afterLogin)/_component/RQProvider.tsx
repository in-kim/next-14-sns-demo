"use client";

import React, {useState} from "react";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

type Props = {
  children: React.ReactNode;
}

export default function RQProvider({children}: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: { // 전역설정
        queries: {
          refetchOnWindowFocus: false, // 탭 포커스 아웃 됐다가 다시 접속했을 때
          retryOnMount: true, // 컴포넌트가 새로 마운트 됐을때
          refetchOnReconnect: true, // 인터넷이 다시 접속 됐을때
          retry: false,
        }
      }
    })
  )
  return (
    <QueryClientProvider client={client}>
      {children}
      {/*local 환경에서만 devtools 노출*/}
      <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local'}/>
    </QueryClientProvider>
  )
}
