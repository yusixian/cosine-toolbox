import { Select } from 'antd';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { urlDecodeExample, urlEncodeExample } from '../../constants/examples';
import { useInput } from '../../hooks/useInput';
import Button from '../Button';
import Card from '../Card';
import CopyableResult from '../main/CopyableResult';

type UrlCodeProps = {
  className?: string;
};
export function UrlCode({ className }: UrlCodeProps) {
  const { inputValue: inputPlain, onInputChange: onInputPlainChange, setInputValue: setInputPlain } = useInput();
  const { inputValue: inputUrlText, onInputChange: onInputUrlChange, setInputValue: setInputUrl } = useInput();
  const [mode, setMode] = useState('query');
  const [resUrl, setResUrl] = useState('');

  const encodeUrl = useCallback(
    (e: any) => {
      e?.preventDefault();
      try {
        const idx = inputPlain.search(/\?/);
        const target = inputPlain || inputUrlText;
        const isCorrectDir = !!inputPlain;
        let resUrl = '';
        if (mode === 'query' && idx !== -1) {
          resUrl = target.slice(0, idx + 1) + encodeURIComponent(target.slice(idx + 1));
        } else resUrl = encodeURIComponent(target);
        isCorrectDir && setInputUrl(resUrl);
        setResUrl(resUrl);
        toast('🦄 Url编码成功！');
      } catch (e) {
        toast.error('encodeUrl error' + e);
        console.error('encodeUrl error', e);
      }
    },
    [inputPlain, inputUrlText, mode, setInputUrl],
  );

  const decodeUrl = useCallback(
    (e: any) => {
      e?.preventDefault();
      try {
        const target = inputUrlText || inputPlain;
        const isCorrectDir = !!inputUrlText;
        let resUrl = '';
        if (mode === 'query') {
          const idx = target.search(/\?/);
          resUrl = target.slice(0, idx + 1) + decodeURIComponent(target.slice(idx + 1));
        } else resUrl = decodeURIComponent(target);

        isCorrectDir && setInputPlain(resUrl);
        setResUrl(resUrl);
        toast('🦄 Url解码成功！');
      } catch (e) {
        toast.error('decodeUrl error' + e);
        console.error('decodeUrl error', e);
      }
    },
    [inputPlain, inputUrlText, mode, setInputPlain],
  );

  return (
    <div className={clsx('flex flex-col items-center gap-2', className)}>
      <div className="text-center text-3xl">Url 编解码工具</div>
      <Card className="w-full max-w-screen-2xl">
        <div className="grid grid-cols-2 gap-4 text-2xl md:grid-cols-1">
          <Button onClick={() => setInputPlain(urlEncodeExample)} type="primary" size="large">
            编码示例
          </Button>
          <Button onClick={() => setInputUrl(urlDecodeExample)} type="primary" size="large">
            解码示例
          </Button>
        </div>

        <div className="flex flex-col gap-2 text-rose-500/70 dark:text-white">
          <form className="flex flex-col gap-3">
            <textarea
              className="h-36 w-full rounded border-2 border-rose-300 bg-rose-100 p-1 text-xl outline-none dark:border-blue-300 dark:bg-sky-700"
              value={inputPlain}
              onChange={onInputPlainChange}
              placeholder="请输入需要Url编码的文本，如：我是一个文本"
            />
            <Select
              defaultValue="query"
              onChange={(value: string) => setMode(value)}
              options={[
                { value: 'query', label: 'Encode/Decode Query Component' },
                { value: 'all', label: 'Encode/Decode All Component' },
              ]}
            />
            <div className="grid grid-cols-2 gap-4 text-2xl md:grid-cols-1">
              <Button onClick={encodeUrl} type="primary" className="rounded" size="large">
                Url编码 👇
              </Button>
              <Button onClick={decodeUrl} type="primary" className="rounded" size="large">
                Url解码 👆
              </Button>
            </div>
            <textarea
              className="h-36 w-full rounded border-2 border-rose-300 bg-rose-100 p-1 text-xl outline-none dark:border-blue-300 dark:bg-sky-700"
              value={inputUrlText}
              onChange={onInputUrlChange}
              placeholder="请输入需要Url解码的文本，如：5oiR5piv5LiA5Liq5paH5pys"
            />
          </form>
          <CopyableResult copyText={resUrl} />
        </div>
      </Card>
    </div>
  );
}
