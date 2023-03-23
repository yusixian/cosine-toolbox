import clsx from 'clsx';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { urlDecodeExample, urlEncodeExample } from '../../constants/examples';
import { useInput } from '../../hooks/useInput';
import Button from '../Button';
import Card from '../Card';

type UrlCodeProps = {
  className?: string;
};
export function UrlCode({ className }: UrlCodeProps) {
  const { inputValue: inputPlain, onInputChange: onInputPlainChange, setInputValue: setInputPlain } = useInput();
  const { inputValue: inputUrlText, onInputChange: onInputUrlChange, setInputValue: setInputUrl } = useInput();
  console.log({ inputPlain, inputUrlText });

  const encodeUrl = useCallback(
    (e: any) => {
      e.preventDefault();
      try {
        setInputUrl(encodeURI(inputPlain));
        toast('🦄 Url编码成功！');
      } catch (e) {
        toast.error('encodeUrl error' + e);
        console.error('encodeUrl error', e);
      }
    },
    [inputPlain, setInputUrl],
  );

  const decodeUrl = useCallback(
    (e: any) => {
      e.preventDefault();
      try {
        const plain = decodeURI(inputUrlText);
        setInputPlain(plain);
        toast('🦄 Url解码成功！');
      } catch (e) {
        toast.error('decodeUrl error' + e);
        console.error('decodeUrl error', e);
      }
    },
    [inputUrlText, setInputPlain],
  );

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <div className="text-center text-3xl">Url 编解码工具</div>
      <Card className="w-full">
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
              className="h-36 w-full rounded border-2 border-rose-300 bg-rose-100 p-1 outline-none dark:border-blue-300 dark:bg-sky-700"
              value={inputPlain}
              onChange={onInputPlainChange}
              placeholder="请输入需要Url编码的文本，如：我是一个文本"
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
              className="h-36 w-full rounded border-2 border-rose-300 bg-rose-100 p-1 outline-none dark:border-blue-300 dark:bg-sky-700"
              value={inputUrlText}
              onChange={onInputUrlChange}
              placeholder="请输入需要Url解码的文本，如：5oiR5piv5LiA5Liq5paH5pys"
            />
          </form>
        </div>
      </Card>
    </div>
  );
}
