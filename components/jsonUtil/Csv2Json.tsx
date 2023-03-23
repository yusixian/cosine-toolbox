import copy from 'copy-to-clipboard';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { csvExample } from '../../constants/examples';
import { useInput } from '../../hooks/useInput';
import Button from '../Button';
import Card from '../Card';

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });
export default function Csv2Json() {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
    },
  });
  const [results, setResults] = useState<
    {
      [key: string]: string;
    }[]
  >([]);
  const { inputValue, setInputValue, onInputChange } = useInput(csvExample);
  const { inputValue: inputJsonStr, setInputValue: setInputJsonStr, onInputChange: onInputJsonStrChange } = useInput('');
  const [convertTargetObj, setConvertTargetObj] = useState('');
  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={(file as any).path}>
      {(file as any).path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={(file as any).path}>
      {(file as any).path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  const parseCSV = (str: string) => {
    const lines = str.split('\n');
    const headers = lines[0].split(/,\s*(?![^"]*",)/);
    // console.log({ lines, str });
    const rows: { [key: string]: string }[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(/,\s*(?![^"]*",)/); // https://www.cnblogs.com/ae6623/p/4416485.html
      const row: { [key: string]: string } = {};
      for (let j = 0; j < headers.length; j++) {
        let value = values[j];
        if (value?.search(',') !== -1) {
          value = value?.substring(1, value?.length - 1);
          console.log('引号内有逗号', value);
        }
        row[headers[j]] = value;
      }
      console.log({ values, row });
      rows.push(row);
      setResults(rows);
    }
  };
  useEffect(() => {
    if (!acceptedFiles?.length) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (!result || typeof result !== 'string') return;
      setConvertTargetObj(result);
    };
    reader.readAsText(acceptedFiles[0]);
  }, [acceptedFiles]);

  const handleChange = () => {
    if (!convertTargetObj) {
      toast.error('暂无待转换对象！请点击Submit提交或拖拽文件');
      return;
    }
    parseCSV(convertTargetObj);
  };

  const handleSubmit = (e: any) => {
    e?.preventDefault();
    console.log({ e });
    if (!inputValue.trim()) {
      return;
    }
    const newString = '' + inputValue;
    setConvertTargetObj(newString);
    console.log({ newString });
  };

  const onCopy = (e: any) => {
    e?.preventDefault();
    try {
      copy(inputJsonStr);
      toast('WOW! 已经成功复制到剪切板啦=v=');
    } catch (e) {
      toast.error('好像出了点错误TwT');
      console.error('onCopy Error', e);
    }
  };

  useEffect(() => {
    setInputJsonStr(JSON.stringify(results));
  }, [results, setInputJsonStr]);

  return (
    <div>
      <div className="mb-4 text-center text-3xl">CSV 转 JSON数组</div>
      <Card title="填入待转换csv文本或拖拽文件" className="flex flex-col items-center px-4 dark:text-white">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
          <Button onClick={() => setInputValue(csvExample)} type="primary" className="rounded text-2xl" size="large">
            示例
          </Button>
          <textarea
            className="h-44 w-full rounded border-2 border-rose-300 bg-rose-100 p-1 outline-none dark:border-blue-300 dark:bg-sky-700"
            value={inputValue}
            onChange={onInputChange}
          />
          <Button isSubmit type="primary" className="rounded text-2xl" size="large">
            Submit
          </Button>
          <div className="text-center text-2xl">Or</div>
        </form>
        <div
          {...getRootProps({
            className:
              'flex-1 border-2 rounded cursor-pointer self-stretch outline-none border-dashed border-rose-300 dark:border-blue-300 p-5',
          })}
        >
          <input {...getInputProps()} />
          <p>{`Drag csv file here, or click to select files`}</p>
          <em>(Only .csv will be accepted)</em>
        </div>
        <aside>
          <h4>Accepted files</h4>
          <ul>{acceptedFileItems}</ul>
          <h4>Rejected files</h4>
          <ul>{fileRejectionItems}</ul>
        </aside>
      </Card>
      <Card title="转换结果">
        <div className="grid grid-cols-3 gap-4 md:grid-cols-1">
          <div className="flex flex-col items-center gap-2">
            <Button onClick={handleChange} type="primary" className="w-full rounded text-2xl" size="large">
              开始转换！
            </Button>
            <div className="text-2xl">待转换对象如下：</div>
            <div className="custom-scroll-bar w-full overflow-scroll whitespace-pre rounded border-2 border-rose-300 bg-rose-100 p-2 text-xl dark:border-blue-300 dark:bg-sky-700">
              {convertTargetObj}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 text-2xl">
            <div className="flex items-center justify-center gap-2">
              转换 Json 如下👇
              <Button onClick={onCopy} type="primary" className="rounded text-2xl" size="large">
                复制
              </Button>
            </div>
            <div className="custom-scroll-bar max-h-[25rem] w-full overflow-scroll">
              <DynamicReactJson iconStyle="circle" collapsed={1} theme="monokai" src={results} />
            </div>
            <textarea
              className="h-44 w-full rounded border-2 border-rose-300 bg-rose-100 p-2 text-xl outline-none dark:border-blue-300 dark:bg-sky-700"
              value={inputJsonStr}
              onChange={onInputJsonStrChange}
            />
          </div>
          <div className="custom-scroll-bar flex max-h-[50rem] flex-col items-center gap-4 overflow-auto">
            {results?.map((item: { [key: string]: string }, idx) => {
              if (!item) return null;
              return (
                <div
                  className="flex flex-wrap items-center justify-center gap-4 rounded border-2 border-rose-300 bg-rose-100 p-2 text-center text-xl outline-none dark:border-blue-300 dark:bg-sky-700"
                  key={idx}
                >
                  <span className="text-sg text-4xl text-shadow-lg">{idx}</span>
                  {Object.keys(item).map((key, idx2) => {
                    return (
                      <div className="bg-rose-300 dark:bg-slate-500" key={idx2}>
                        <div className="bg-rose-400 px-2 text-red-100 dark:bg-slate-400">{key}</div>
                        <div className="bg-rose-200 px-2 dark:bg-slate-700">{item[key]}</div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}
