import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

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

  const handleOnDrop = () => {
    if (!acceptedFiles?.length) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (!result || typeof result !== 'string') return;
      const lines = result.split('\r\n');
      const headers = lines[0].split(',');
      console.log({ lines, result });
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
    reader.readAsText(acceptedFiles[0]);
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 px-4">
      <div className="text-center text-3xl">CSV转JSON - 在线转换文档文件</div>
      <section className="flex cursor-pointer flex-col items-center px-4">
        <div
          {...getRootProps({
            className: 'flex-1 border-2 rounded self-stretch outline-none border-dashed border-blue-300 p-5',
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
      </section>
      <button className="cursor-pointer rounded border-2 border-blue-500 p-2 text-3xl hover:opacity-80" onClick={handleOnDrop}>
        change!
      </button>
      <div className="flex flex-col gap-4">
        {rows?.map((item: { [key: string]: string }, idx) => {
          if (!item) return null;
          return (
            <div className="flex flex-wrap gap-4 bg-slate-600 p-2 text-center text-xl" key={idx}>
              {Object.keys(item).map((key, idx2) => {
                return (
                  <div className="bg-slate-500" key={idx2}>
                    <div className="bg-slate-400 px-2">{key}</div>
                    <div className="bg-slate-700 px-2">{item[key]}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
