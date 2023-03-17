import clsx from 'clsx';
import { Base64 } from 'js-base64';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useInput } from '../../hooks/useInput';
import Button from '../Button';
import Card from '../Card';

type Base64CodeProps = {
  className?: string;
};
export function Base64Code({ className }: Base64CodeProps) {
  const { inputValue: inputPlain, onInputChange: onInputPlainChange, setInputValue: setInputPlain } = useInput();
  const { inputValue: inputBase64Text, onInputChange: onInputBase64Change, setInputValue: setInputBase64 } = useInput();
  console.log({ inputPlain, inputBase64Text });

  const encodeBase64 = useCallback(
    (e: any) => {
      e.preventDefault();
      try {
        const base64 = Base64.encode(inputPlain);
        setInputBase64(base64);
        toast('🦄 Base64编码成功！');
      } catch (e) {
        toast.error('encodeBase64 error' + e);
        console.error('encodeBase64 error', e);
      }
    },
    [inputPlain, setInputBase64],
  );

  const decodeBase64 = useCallback(
    (e: any) => {
      e.preventDefault();
      try {
        const plain = Base64.decode(inputBase64Text);
        setInputPlain(plain);
        toast('🦄 Base64解码成功！');
      } catch (e) {
        toast.error('decodeBase64 error' + e);
        console.error('decodeBase64 error', e);
      }
    },
    [inputBase64Text, setInputPlain],
  );

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <div className="text-center text-2xl">Base64 编解码工具</div>
      <Card className="w-full">
        <div className="flex flex-col gap-2 text-rose-500/70 dark:text-white">
          <form className="flex flex-col gap-3">
            <textarea
              className="h-24 w-full rounded border-2 border-rose-300 bg-rose-100 p-1 outline-none dark:border-blue-300 dark:bg-sky-700"
              value={inputPlain}
              onChange={onInputPlainChange}
              placeholder="请输入需要Base64编码的文本，如：我是一个文本"
            />
            <div className="grid grid-cols-2 gap-4 text-2xl md:grid-cols-1">
              <Button onClick={encodeBase64} type="primary" className="rounded" size="large">
                Base64编码 👇
              </Button>
              <Button onClick={decodeBase64} type="primary" className="rounded" size="large">
                Base64解码 👆
              </Button>
            </div>
            <textarea
              className="h-24 w-full rounded border-2 border-rose-300 bg-rose-100 p-1 outline-none dark:border-blue-300 dark:bg-sky-700"
              value={inputBase64Text}
              onChange={onInputBase64Change}
              placeholder="请输入需要Base64解码的文本，如：5oiR5piv5LiA5Liq5paH5pys"
            />
          </form>
        </div>
      </Card>
    </div>
  );
}
