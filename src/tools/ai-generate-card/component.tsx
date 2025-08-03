'use client';

import Button from '@/components/ui/button/Button';
import { Card, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useInput } from '../../hooks/useInput';
import CopyableResult from '../components/CopyableResult';
import { aiGenerateCardExample } from './example';
import { processAiGenerateCard } from './service';

export function AiGenerateCard() {
  const { inputValue, onInputChange, setInputValue } = useInput();
  const [result, setResult] = useState('');

  const reset = useCallback(() => {
    setInputValue('');
    setResult('');
  }, [setInputValue]);

  const process = useCallback(
    (e: any) => {
      e?.preventDefault();
      if (!inputValue.trim()) return;

      const processedResult = processAiGenerateCard(inputValue);
      setResult(processedResult);
    },
    [inputValue],
  );

  return (
    <motion.div layoutId="/ai-generate-card" className="flex flex-col gap-4">
      <Card className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-4 text-sm">
          <Button className="flex-grow" onClick={() => setInputValue(aiGenerateCardExample)}>
            示例
          </Button>
          <Button className="flex-grow" onClick={reset} variant="primary">
            重置
          </Button>
        </div>
        <form className="flex flex-col gap-3">
          <textarea
            className="h-36 rounded border border-border p-2"
            value={inputValue}
            onChange={onInputChange}
            placeholder="请输入内容"
          />
          <Button onClick={process} className="rounded">
            处理
          </Button>
        </form>
      </Card>
      <Card>
        <CardTitle>处理结果</CardTitle>
        <CopyableResult type="textarea" className="mt-2" copyText={result} />
      </Card>
    </motion.div>
  );
}
