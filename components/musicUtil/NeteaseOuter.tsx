import clsx from 'clsx';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { neteaseMusicIdExample } from '../../constants/examples';
import { useInput } from '../../hooks/useInput';
import Button from '../Button';
import Card from '../Card';
import CopyableResult from '../main/CopyableResult';

type NeteaseOuterProps = {
  className?: string;
};
export function NeteaseOuter({ className }: NeteaseOuterProps) {
  const { inputValue: inputId, onInputChange: onInputIdChange, setInputValue: setInputId } = useInput();
  const href = useMemo(() => {
    try {
      if (!inputId) return '';
      const id = parseInt(inputId);
      if (isNaN(id)) {
        throw new Error('请输入数字');
      }
      return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
    } catch (e) {
      toast.error((e as any)?.message);
      return '';
    }
  }, [inputId]);

  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      <div className="text-center text-3xl">wyy外链生成器</div>
      <Card className="gap-4 text-xl">
        <div>
          获取wyy音乐外链地址，歌曲ID获取参见
          <a className="hover:brightness-110" href="https://zhuanlan.zhihu.com/p/266060655" target="_blank" rel="noreferrer">
            ：https://zhuanlan.zhihu.com/p/266060655
          </a>
        </div>
        <a
          className="hover:brightness-110"
          href="http://music.163.com/song/media/outer/url?id=508862123.mp3"
          target="_blank"
          rel="noreferrer"
        >
          外链示例：http://music.163.com/song/media/outer/url?id=508862123.mp3
        </a>
        <Button onClick={() => setInputId(neteaseMusicIdExample)} type="primary" size="large">
          示例
        </Button>
        <input
          type="number"
          className="rounded border-2 border-rose-300 bg-rose-100 p-4 p-1 text-xl outline-none dark:border-blue-300 dark:bg-sky-700 dark:text-white"
          value={inputId}
          onChange={onInputIdChange}
          placeholder="请输入歌曲ID"
        />
        <h2 className="text-3xl dark:text-white">Result</h2>
        <div>
          <a href={href} className="hover:brightness-110" target="_blank" rel="noreferrer">
            {href}
          </a>
          <div className="flex  gap-2">
            <div className="flex-grow">
              <CopyableResult copyText={href} areaClass="h-20" />
              <div className="text-center text-3xl">❗❗仅供学习使用❗❗</div>
            </div>
            <div>
              <div>点击右下角展开菜单可下载</div>
              <iframe className="bg-red-50" src={href} width="300px" height="200px" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
