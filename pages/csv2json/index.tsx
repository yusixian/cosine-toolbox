import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Card from '../../components/Card';
import { RouterType } from '../../constants';
import { csvExample } from '../../constants/examples';

export default function Csv2Json() {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
    },
  });
  const [rows, setRows] = useState<
    {
      [key: string]: string;
    }[]
  >([]);
  const [inputValue, setInputValue] = useState(csvExample);

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
    const headers = lines[0].split(/,s*(?![^"]*",)/);
    console.log({ lines, str });
    const rows: { [key: string]: string }[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(/,s*(?![^"]*",)/); // https://www.cnblogs.com/ae6623/p/4416485.html
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
      setRows(rows);
    }
  };

  const handleOnDrop = () => {
    console.log({ acceptedFiles, inputValue });
    if (!acceptedFiles?.length && !inputValue) return;
    if (!acceptedFiles?.length) {
      parseCSV(inputValue);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (!result || typeof result !== 'string') return;
      parseCSV(result);
    };
    reader.readAsText(acceptedFiles[0]);
  };
  const onInputChange = (e: any) => setInputValue(e.target.value);
  const handleSubmit = (e: any) => {
    e?.preventDefault();
    console.log({ e });
    if (!inputValue.trim()) {
      return;
    }
    const newString = '' + inputValue;
    console.log({ newString });
  };

  return (
    <motion.div layoutId={RouterType.CSV2JSON} className="flex h-full w-full flex-col gap-4 px-4 text-xl">
      <Card className="flex flex-col items-center px-4 dark:text-white">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
          <button
            className="rounded bg-rose-400/50  py-2 px-4 text-2xl hover:opacity-80 dark:bg-blue-300"
            onClick={() => setInputValue(csvExample)}
          >
            示例
          </button>
          <textarea
            className="h-44 w-full rounded border-2 border-rose-300 bg-rose-100 p-1 outline-none dark:border-blue-300 dark:bg-sky-700"
            value={inputValue}
            onChange={onInputChange}
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            <button
              className="rounded bg-rose-400/50 py-2 px-4 hover:opacity-80 dark:bg-blue-600"
              onClick={() => setInputValue('')}
              type="submit"
            >
              Clear
            </button>
            <button className="rounded bg-rose-400/50 py-2 px-4 hover:opacity-80 dark:bg-blue-300" type="submit">
              Submit
            </button>
          </div>
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
        <button className="w-full rounded bg-rose-400/50 py-2 px-4 hover:opacity-80 dark:bg-blue-300" onClick={handleOnDrop}>
          Change!
        </button>
      </Card>
      <Card>
        <div className="whitespace-pre">{inputValue}</div>
        <div className="flex flex-col gap-4">
          {rows?.map((item: { [key: string]: string }, idx) => {
            if (!item) return null;
            return (
              <div className="flex flex-wrap gap-4 bg-rose-100 p-2 text-center text-xl dark:bg-slate-600" key={idx}>
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
      </Card>
    </motion.div>
  );
}
