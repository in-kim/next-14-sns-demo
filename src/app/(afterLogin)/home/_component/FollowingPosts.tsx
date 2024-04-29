"use client";

import {InfiniteData, useInfiniteQuery, useQuery, useSuspenseInfiniteQuery} from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import {Post as IPost} from "@/model/Post";
import {getFollowingPosts} from "@/app/(afterLogin)/home/_lib/getFollowingPosts";
import { useInView } from 'react-intersection-observer';
import { Fragment, useEffect } from "react";

export default function FollowingPosts() {
  const { 
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useSuspenseInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _1: string], number>({
    queryKey: ['posts', 'followings'],
    queryFn: ({pageParam}) => getFollowingPosts({pageParam}),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 300,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage])

  return <>
    {
      data?.pages.map((page, i) => (
        <Fragment key={i}>
          {
            page.map((post) => <Post key={post.postId} post={post} />)
          }
        </Fragment>
      ))
    }
    <div ref={ref} style={{ height: 50}} />
  </>
}
