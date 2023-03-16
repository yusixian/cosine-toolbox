import { motion } from 'framer-motion';
import { useState } from 'react';
import Card from '../../../components/card';
import { base64Example } from '../../../constants/examples';
import { useThrottle } from '../../../hooks/useThrottle';

export default function Base64Download() {
  const [inputArrValue, setInputArrValue] = useState('');
  const [stringArray, setStringArray] = useState<string[]>('' || []);
  const [filePrefix, setFilePrefix] = useState('img_');

  const handleSubmitArr = useThrottle((e: any) => {
    e.preventDefault();
    if (!inputArrValue.trim()) {
      return;
    }
    const newStringArray = inputArrValue.split(' ');
    setStringArray(stringArray.concat(newStringArray));
    setInputArrValue('');
    console.log({ newStringArray });
  });
  const onInputArrChange = useThrottle((e: any) => setInputArrValue(e.target.value), 50);
  const onInputPrefixValueChange = useThrottle((e: any) => setFilePrefix(e.target.value), 50);

  const parseByBase64 = useThrottle(() => {
    setStringArray((preArr) => {
      return preArr.map((str) => {
        const reg =
          /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i;
        if (reg.test(str)) return str;

        const arr = str.replace(/\s/, '').match(/[a-z0-9!$&',()*+;=\-._~:@/?%\s]*/gi);
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
    <motion.div layoutId="base64download" className="flex flex-col gap-4">
      <Card className="w-full" title="输入base64字符串数组 空格分隔" showArrow={false}>
        <div className="flex flex-col gap-2 text-rose-500/70 dark:text-white">
          <div className="text-xl">输入base64字符串数组 空格分隔</div>
          <div className="text-xl">inputItemValue: {inputArrValue}</div>
          <button
            className="rounded bg-rose-400/50  py-2 px-4 text-2xl hover:opacity-80 dark:bg-blue-300"
            onClick={() => setInputArrValue(base64Example)}
          >
            示例
          </button>
          <form onSubmit={handleSubmitArr} className="flex flex-col gap-3">
            <input
              type="text"
              className="w-full rounded border-2 border-rose-300 bg-rose-100 p-1 outline-none dark:border-blue-300 dark:bg-sky-700"
              value={inputArrValue}
              onChange={onInputArrChange}
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

      <Card title="Result" showArrow={false}>
        <div className="flex flex-col gap-2">
          <div className="flex w-full flex-wrap items-center gap-2 text-white">
            <button className="rounded bg-rose-400/50 py-2 px-4 hover:opacity-80 dark:bg-blue-300" onClick={parseByBase64}>
              正则过滤
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
              <li key={index} className="rounded p-2 dark:bg-slate-700">
                <div className="w-36 truncate">{str}</div>
                <img src={str} className="max-h-80 w-52" alt={str} />
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </motion.div>
  );
}
