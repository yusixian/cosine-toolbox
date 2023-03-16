import clsx from 'clsx';
import { useState } from 'react';
import { base64ImageExample } from '../../constants/examples';
import { useInput } from '../../hooks/useInput';
import { useThrottle } from '../../hooks/useThrottle';
import Card from '../Card';

type Base64DownloadProps = {
  className?: string;
};
export function Base64Download({ className }: Base64DownloadProps) {
  const { inputValue, setInputValue, onInputChange } = useInput('');
  const [stringArray, setStringArray] = useState<string[]>('' || []);
  const { inputValue: filePrefix, onInputChange: onInputPrefixValueChange } = useInput('img_');

  const handleSubmitArr = useThrottle((e: any) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      return;
    }
    const newStringArray = inputValue.split(' ');
    setStringArray(stringArray.concat(newStringArray));
    setInputValue('');
    console.log({ newStringArray });
  });

  const parseByBase64 = useThrottle(() => {
    setStringArray((preArr) => {
      return preArr.map((str) => {
        const reg =
          /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i;
        if (reg.test(str)) return str;

        const arr = str.replace(/\s/, '').match(/[a-z0-9,+;=\-.:/\s]*/gi);
        return arr?.reduce((prev, cur) => prev + cur, '') ?? '';
      });
    });
  });
  const downloadAll = useThrottle(() => {
    stringArray.forEach((base64String, index) => {
      const downloadLink = document.createElement('a');
      downloadLink.href = base64String;
      downloadLink.download = `${filePrefix}${index}`;
      downloadLink.click();
    });
  });
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <div className="text-center text-2xl">Base64 图片批量下载</div>
      <Card className={'w-full'} title="输入base64字符串数组 空格分隔">
        <div className="flex flex-col gap-2 text-rose-500/70 dark:text-white">
          <button
            className="rounded bg-rose-400/50  py-2 px-4 text-2xl hover:opacity-80 dark:bg-blue-300"
            onClick={() => setInputValue(base64ImageExample)}
          >
            示例
          </button>
          <form onSubmit={handleSubmitArr} className="flex flex-col gap-3">
            <textarea
              className="h-24 w-full rounded border-2 border-rose-300 bg-rose-100 p-1 outline-none dark:border-blue-300 dark:bg-sky-700"
              value={inputValue}
              onChange={onInputChange}
            />
            <div className="grid grid-cols-2 gap-4 text-2xl md:grid-cols-1">
              <button className="rounded bg-rose-400/50 py-2 px-4 hover:opacity-80 dark:bg-blue-300" type="submit">
                Add
              </button>
              <button
                className="rounded bg-rose-400/50 py-2 px-4 hover:opacity-80 dark:bg-blue-600"
                onClick={() => setStringArray([])}
                type="submit"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </Card>
      <Card title="Result">
        <div className="flex flex-col gap-2 text-xl">
          <div className="flex w-full flex-wrap items-center gap-2 text-white">
            <button className="rounded bg-rose-400/50 py-2 px-4 hover:opacity-80 dark:bg-blue-300" onClick={parseByBase64}>
              正则过滤{`（/[a-z0-9,+;=\-.:/\s]*/gi）`}
            </button>
            <button
              className="rounded bg-rose-400/50 py-2 px-4 hover:opacity-80 dark:bg-blue-600"
              onClick={downloadAll}
              type="submit"
            >
              批量下载图片
            </button>
            文件前缀:
            <input
              type="text"
              className="rounded border-2 border-rose-300 bg-rose-100 p-1 outline-none dark:border-blue-300 dark:bg-sky-700"
              value={filePrefix}
              onChange={onInputPrefixValueChange}
            />
            {`${filePrefix}1.png`}
          </div>
          预览
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {stringArray.map((str, index) => (
              <li key={index} className="rounded bg-rose-100 p-2 dark:bg-sky-700">
                <div className="w-36 truncate">{str}</div>
                <img src={str} className="max-h-80 w-52" alt={str} />
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
