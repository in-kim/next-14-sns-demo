import style from './home.module.css';
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import TabDecider from "@/app/(afterLogin)/home/_component/TabDecider";

export default async function Home() {
  const queryClient = new QueryClient();
  // 객체형식으로 제공을 해줘야함
  // qeuryKey를 가지고 있다면 queryFn ['posts', 'recommends'] (두가지 모두 있어야함)을 실행시켜라 라는 의미
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab/>
          <PostForm />
          <TabDecider />
        </TabProvider>
      </HydrationBoundary>
    </main>
  )
}
