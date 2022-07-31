import SocialBar from '../components/Social';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="min-h-full px-8 ">
      <main className="flex flex-col items-center justify-center gap-12 py-16">
        <h1 className="text-center text-6xl">余弦工具箱</h1>
        <p className="text-center text-2xl	">一个专为前端程序员而生的工具站点~</p>
        <SocialBar />
      </main>
    </div>
  );
};

export default Home;
