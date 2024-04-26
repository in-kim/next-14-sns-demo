"use client";

import {useQuery} from "@tanstack/react-query";
import {Post as IPost} from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";
import {getSearchResult} from "@/app/(afterLogin)/search/_lib/getSearchResult";

interface Props {
  searchParams: {
    q: string,
    f?: string,
    pf?: string
  };
}
export default function SearchResult({ searchParams }: Props ) {
  // useQuery 타입
  // [3] 값이 queryKey의 타입이다.
  const { data } = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, Props['searchParams']]>({
    // searchParams => 다이나믹 쿼리키
    queryKey: ['posts', "search", searchParams],
    queryFn: getSearchResult,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  return data?.map((post) => (
    <Post key={post.postId} post={post} />
  ))
}
