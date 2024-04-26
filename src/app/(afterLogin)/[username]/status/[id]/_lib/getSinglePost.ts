import {QueryFunction} from "@tanstack/react-query";
import {Post as IPost} from "@/model/Post";

export const getSinglePost: QueryFunction<IPost, [_1: string, id: string]>
  = async({ queryKey }) =>{
  const [_1, id] = queryKey;
  const res = await fetch(`http://localhost:9090/api/posts/${id}`, {
    next: {
      tags: ['posts', id],
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  console.log("sucess to getSignlePost")

  return res.json();
}
