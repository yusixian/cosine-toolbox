'use client';

import Button from '@/components/ui/button/Button';
import { Card, CardTitle } from '@/components/ui/card';
import Select from '@/components/ui/select';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useInput } from '../../hooks/useInput';
import CopyableResult from '../components/CopyableResult';
import { urlDecodeExample, urlEncodeExample } from './example';
import { UrlEncodeMode, encodeUrl } from './service';

const modeOpts = [
  { value: 'query', label: '编码/解码 Query 部分' },
  { value: 'all', label: '编码/解码所有部分' },
];

export function UrlEncoder() {
  const { inputValue: inputPlain, onInputChange: onInputPlainChange, setInputValue: setInputPlain } = useInput();
  const { inputValue: inputUrlText, onInputChange: onInputUrlChange, setInputValue: setInputUrl } = useInput();
  const [mode, setMode] = useState<UrlEncodeMode>(UrlEncodeMode.ALL);
  const [resUrl, setResUrl] = useState('');

  const reset = useCallback(() => {
    setInputPlain('');
    setInputUrl('');
    setResUrl('');
  }, [setInputPlain, setInputUrl]);

  const encode = useCallback(
    (e: any) => {
      e?.preventDefault();
      const target = inputPlain || inputUrlText;

      const { res } = encodeUrl(target, mode);

      const isCorrectDir = !!inputPlain;
      isCorrectDir && setInputUrl(res);
      setResUrl(res);
    },
    [inputPlain, inputUrlText, mode, setInputUrl],
  );

  const decodeUrl = useCallback(
    (e: any) => {
      e?.preventDefault();
      const target = inputUrlText || inputPlain;

      const { res } = encodeUrl(target, mode);

      const isCorrectDir = !!inputUrlText;
      isCorrectDir && setInputPlain(res);
      setResUrl(res);
    },
    [inputPlain, inputUrlText, mode, setInputPlain],
  );

  return (
    <motion.div layoutId="/url-encoder" className="flex flex-col gap-4">
      <Card className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-4 text-sm">
          <Button className="flex-grow" onClick={() => setInputPlain(urlEncodeExample)}>
            编码示例
          </Button>
          <Button className="flex-grow" onClick={() => setInputUrl(urlDecodeExample)}>
            解码示例
          </Button>
          <Button className="flex-grow" onClick={reset} variant="primary">
            重置
          </Button>
          <Select
            wrapperClassName="flex-grow-[2]"
            className="h-9"
            bordered
            value={mode}
            onChange={(value: string) => setMode(value as UrlEncodeMode)}
            options={modeOpts}
          />
        </div>
        <form className="flex flex-col gap-3">
          <textarea
            className="h-36 rounded border border-border p-2"
            value={inputPlain}
            onChange={onInputPlainChange}
            placeholder="请输入需要 Url 编码的文本"
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            <Button onClick={encode} className="rounded">
              Url编码 👇
            </Button>
            <Button onClick={decodeUrl} className="rounded">
              Url解码 👆
            </Button>
          </div>
          <textarea
            className="h-36 rounded border border-border p-2"
            value={inputUrlText}
            onChange={onInputUrlChange}
            placeholder="请输入需要 Url 解码的文本"
          />
        </form>
      </Card>
      <Card>
        <CardTitle>转换结果</CardTitle>
        <CopyableResult type="textarea" className="mt-2" copyText={resUrl} />
      </Card>
    </motion.div>
  );
}
