import {QueryFunction} from "@tanstack/react-query";
import {Post as IPost} from "@/model/Post";

export const getComments: QueryFunction<IPost[], [_1: string, id: string, _3: string]>
  = async({ queryKey }) =>{
  const [_1, id, _2] = queryKey;
  const res = await fetch(`http://localhost:9090/api/posts/${id}/comments`, {
    next: {
      tags: ['posts', id, 'comments'],
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
