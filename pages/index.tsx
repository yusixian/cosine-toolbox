import SocialBar from '../components/Social';
import type { NextPage } from 'next';
import ToolList from '../components/ToolList';
const Home: NextPage = () => {
  return (
    <div className="min-h-full px-8 ">
      <main className="flex flex-col items-center justify-center gap-6 py-16">
        <h1 className="text-center text-3xl">余弦工具箱</h1>
        <p className="text-center text-xl	">🌸 一个简洁实用包罗万象的工具站点喵~</p>
        <SocialBar />
        <ToolList />
      </main>
    </div>
  );
};

export default Home;
