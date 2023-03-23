import clsx from 'clsx';
import { useState } from 'react';
import { base64ImageExample } from '../../constants/examples';
import { useInput } from '../../hooks/useInput';
import { useThrottle } from '../../hooks/useThrottle';
import Button from '../Button';
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
      <div className="text-center text-3xl">Base64 图片批量下载</div>
      <Card className={'w-full'} title="输入base64字符串数组 空格分隔">
        <div className="flex flex-col gap-2 text-rose-500/70 dark:text-white">
          <Button onClick={() => setInputValue(base64ImageExample)} type="secondary" className="rounded text-2xl" size="large">
            示例
          </Button>
          <form onSubmit={handleSubmitArr} className="flex flex-col gap-3">
            <textarea
              className="h-24 w-full rounded border-2 border-rose-300 bg-rose-100 p-1 outline-none dark:border-blue-300 dark:bg-sky-700"
              value={inputValue}
              onChange={onInputChange}
            />
            <div className="grid grid-cols-2 gap-4 text-2xl md:grid-cols-1">
              <Button isSubmit type="primary" className="rounded" size="large">
                Add
              </Button>
              <Button onClick={() => setStringArray([])} type="secondary" className="rounded" size="large">
                Clear
              </Button>
            </div>
          </form>
        </div>
      </Card>
      <Card title="Result">
        <div className="flex flex-col gap-2 text-xl">
          <div className="flex w-full flex-wrap items-center gap-2 text-white">
            <Button onClick={parseByBase64} type="secondary" className="rounded" size="large">
              正则过滤{`（/[a-z0-9,+;=\-.:/\s]*/gi）`}
            </Button>
            <Button onClick={downloadAll} type="primary" className="rounded" size="large">
              批量下载图片
            </Button>
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
