"use server"

import { redirect } from "next/navigation"
import { signIn } from "@/auth"
export default async (prevState: any, formData: FormData) => {
  // 서버 컴포넌트를 사용하기 위해 아래 코드를 작성해줌
  // 서버 컴포넌트 내 코드는 브라우저에 노출 되지 않으므로 보안에 더 좋음 (디비 커넥트 혹은 민감정보를 다루는 코드를 작성하면 좋음)
  // ex) api key 등
  // 서버 컴포넌트는 브라우저에서 실행되지 않음
  if(!formData.get('id') || (formData.get('id') as string).trim()) {
    return { message: 'no_id'}
  }
  if(!formData.get('name') || (formData.get('name') as string).trim()) {
    return { message: 'no_name'}
  }
  if(!formData.get('password') || (formData.get('password') as string).trim()) {
    return { message: 'no_password'}
  }
  if(!formData.get('image')) {
    return { message: 'no_image'}
  }

  let shouldRedirect = false;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: 'POST',
        body: formData,
        credentials: 'include' // 이 구문이 있어야 쿠키가 전달됨
      });

      if (response.status === 403) {
        return { message: 'user_exists'};
      }
      console.log(await response.json());
      shouldRedirect = true;

      // 로그인
      await signIn("credentials", {
        username: formData.get('id'),
        password: formData.get('password'),
        redirect: false,
      })

      console.log(response.status);
    } catch (err) {
      console.error(err);
    }

    if(shouldRedirect) {
      await signIn("credentials", {
        username: formData.get('id'),
        password: formData.get('password'),
        redirect: false,
      })
    }
}
