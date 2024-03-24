'use client';

import Button from '@/components/ui/button/Button';
import { Card, CardTitle } from '@/components/ui/card';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { urlDecodeExample, urlEncodeExample } from '../../constants/examples';
import { useInput } from '../../hooks/useInput';
import CopyableResult from '../components/CopyableResult';
import Select from '@/components/ui/select';
import { motion } from 'framer-motion';

const modeOpts = [
  { value: 'query', label: '编码/解码 Query 部分' },
  { value: 'all', label: '编码/解码所有部分' },
];
export function UrlEncoder() {
  const { inputValue: inputPlain, onInputChange: onInputPlainChange, setInputValue: setInputPlain } = useInput();
  const { inputValue: inputUrlText, onInputChange: onInputUrlChange, setInputValue: setInputUrl } = useInput();
  const [mode, setMode] = useState('all');
  const [resUrl, setResUrl] = useState('');
  const reset = useCallback(() => {
    setInputPlain('');
    setInputUrl('');
    setResUrl('');
  }, [setInputPlain, setInputUrl]);

  const encodeUrl = useCallback(
    (e: any) => {
      e?.preventDefault();
      try {
        const idx = inputPlain.search(/\?/);
        const target = inputPlain || inputUrlText;
        const isCorrectDir = !!inputPlain;
        let resUrl = '';
        if (mode === 'query' && idx !== -1) {
          resUrl = target.slice(0, idx + 1) + encodeURIComponent(target.slice(idx + 1));
        } else resUrl = encodeURIComponent(target);
        isCorrectDir && setInputUrl(resUrl);
        setResUrl(resUrl);
        toast('🦄 Url编码成功！');
      } catch (e) {
        toast.error('encodeUrl error' + e);
        console.error('encodeUrl error', e);
      }
    },
    [inputPlain, inputUrlText, mode, setInputUrl],
  );

  const decodeUrl = useCallback(
    (e: any) => {
      e?.preventDefault();
      try {
        const target = inputUrlText || inputPlain;
        const isCorrectDir = !!inputUrlText;
        let resUrl = '';
        if (mode === 'query') {
          const idx = target.search(/\?/);
          resUrl = target.slice(0, idx + 1) + decodeURIComponent(target.slice(idx + 1));
        } else resUrl = decodeURIComponent(target);

        isCorrectDir && setInputPlain(resUrl);
        setResUrl(resUrl);
        toast('🦄 Url解码成功！');
      } catch (e) {
        toast.error('decodeUrl error' + e);
        console.error('decodeUrl error', e);
      }
    },
    [inputPlain, inputUrlText, mode, setInputPlain],
  );

  return (
    <motion.div layoutId="/url-encoder" className="flex flex-col gap-4">
      <Card className="flex max-w-screen-2xl flex-col gap-2">
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
            onChange={(value: string) => setMode(value)}
            options={modeOpts}
          />
        </div>
        <div className="flex"></div>
        <div className="flex flex-col gap-2">
          <form className="flex flex-col gap-3">
            <textarea
              className="h-36 rounded border border-border p-2"
              value={inputPlain}
              onChange={onInputPlainChange}
              placeholder="请输入需要 Url 编码的文本"
            />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
              <Button onClick={encodeUrl} className="rounded">
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
        </div>
      </Card>
      <Card>
        <CardTitle>转换结果</CardTitle>
        <CopyableResult className="mt-2" copyText={resUrl} />
      </Card>
    </motion.div>
  );
}
