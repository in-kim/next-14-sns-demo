"use client";

import {Fragment, useEffect} from "react";
import {InfiniteData, useInfiniteQuery} from "@tanstack/react-query";
import {getPostRecommends} from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import {Post as IPost} from "@/model/Post";
import {useInView} from "react-intersection-observer";

export default function PostRecommends() {
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetching 
  } = useInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2: string], number>({
    queryKey: ['posts', 'recommends'],
    queryFn: ({pageParam}) => getPostRecommends({pageParam}),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  const { ref, inView } = useInView({
    threshold: 0, // 요소가 화면에 0% 이상 보일 때 콜백함수 실행
    delay: 300, // 콜백함수 실행 전 딜레이
    // fetchNextPAge가 두 번 호출 될때는 delay 를 조절하면 된다.
  })

  useEffect(() => {
    if (inView) {
      // 데이터 가져오지 않고 있을때
      // 다음 페이지가 있을때
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage])
  
  return <>
    {data?.pages.map((page, i) => (
      <Fragment key={i}>
        {page.map((post) => <Post key={post.postId} post={post} />)}
      </Fragment>
    ))}
    <div ref={ref} style={{ height: 50}} />
  </>
}
