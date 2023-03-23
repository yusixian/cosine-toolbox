import copy from 'copy-to-clipboard';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { jsObj2JsonExample } from '../../constants/examples';
import { useInput } from '../../hooks/useInput';
import Button from '../Button';
import Card from '../Card';

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });
export default function JsObj2Json() {
  const { inputValue, setInputValue, onInputChange } = useInput(jsObj2JsonExample);
  const [convertTargetObj, setConvertTargetObj] = useState({});

  const jsonStr = useMemo(() => {
    return JSON.stringify(convertTargetObj);
  }, [convertTargetObj]);

  const onCopy = (e: any) => {
    e?.preventDefault();
    try {
      copy(jsonStr);
      toast('WOW! 已经成功复制到剪切板啦=v=');
    } catch (e) {
      toast.error('好像出了点错误TwT');
      console.error('onCopy Error', e);
    }
  };

  const handleConvert = (e: any) => {
    e?.preventDefault();
    console.log(inputValue);
    let objStr = inputValue.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
    setConvertTargetObj(JSON.parse(objStr));
  };
  return (
    <div>
      <div className="mb-4 text-center text-3xl">JS对象 转 JSON</div>
      <Card title="填入待转换json对象" className="flex flex-col items-center px-4 dark:text-white">
        <form onSubmit={handleConvert} className="flex w-full flex-col gap-3">
          <Button onClick={() => setInputValue(jsObj2JsonExample)} type="primary" className="rounded text-2xl" size="large">
            示例
          </Button>
          <textarea
            className="h-44 w-full rounded border-2 border-rose-300 bg-rose-100 p-1 outline-none dark:border-blue-300 dark:bg-sky-700"
            value={inputValue}
            onChange={onInputChange}
          />
          <Button isSubmit type="primary" className="rounded text-2xl" size="large">
            开始转换
          </Button>
        </form>
      </Card>
      <Card title="转换结果">
        <div className="flex flex-col items-center gap-2 text-2xl">
          <div className="flex items-center justify-center gap-2">
            转换 Json 如下👇
            <Button onClick={onCopy} type="primary" className="rounded text-2xl" size="large">
              复制
            </Button>
          </div>
          <div className="custom-scroll-bar max-h-[25rem] w-full overflow-scroll">
            <DynamicReactJson iconStyle="circle" collapsed={1} theme="monokai" src={convertTargetObj} />
          </div>
          <textarea
            className="h-44 w-full whitespace-pre rounded border-2 border-rose-300 bg-rose-100 p-2 text-xl outline-none dark:border-blue-300 dark:bg-sky-700"
            value={jsonStr}
            readOnly
          />
        </div>
      </Card>
    </div>
  );
}
