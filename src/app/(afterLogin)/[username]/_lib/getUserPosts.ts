import {QueryFunction} from "@tanstack/react-query";
import {Post as IPost} from "@/model/Post";

export const getUserPosts: QueryFunction<IPost[], [_1: string, _2: string, username: string]>
  = async ({ queryKey }) => {
  const [_1, _2, username] = queryKey;
  const res = await fetch(`http://localhost:9090/api/users/${username}/posts`, {
    next: {
      // 캐싱 (서버에 요청을 보내지 않고 캐싱된 데이터를 사용)
      // 캐싱된 데이터를 없애고 새로운 데이터를 업데이트 하기위해 이 tag를 사용
      tags: ['posts', 'users', username],
    },
    // 캐싱 저장을 하지 않겠다.
    cache: 'no-store',
  });
  // The return value is not serialized
  // you can return Date, Map, Set, etc.

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  // /home 페이지 전체 데이터를 다시 불러옴
  // revalidatePath('/home');
  // 캐싱된 데이터가 날아감
  // revalidateTag('recommends');

  return res.json();
}
