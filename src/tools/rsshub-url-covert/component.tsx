'use client';

import Button from '@/components/ui/button/Button';
import { Card, CardTitle } from '@/components/ui/card';
import { useInput } from '@/hooks/useInput';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CopyableResult from '../components/CopyableResult';
import { accessKeyExample, routeExample, urlPrefixExample } from './example';
import { MD5 } from 'crypto-js';
import { url } from 'inspector';
import { useLocalStorage } from 'react-use';
import { STORAGE_KEY } from '@/constants/storage';
import { toast } from 'react-toastify';

export function RSSHubUrlConverter() {
  const { inputValue: inputAccessKey, onInputChange: onInputAccessKeyChange, setInputValue: setInputAccessKey } = useInput();
  const { inputValue: inputRoute, onInputChange: onInputRouteChange, setInputValue: setInputRoute } = useInput();
  const { inputValue: inputUrlPrefix, onInputChange: onInputUrlPrefix, setInputValue: setInputUrlPrefix } = useInput();
  const [localData, setLocalData] = useLocalStorage<string[]>(STORAGE_KEY.TOOL_RSSHUB_URL_CONVERT, []);
  const [md5Code, setMd5Code] = useState('');
  const feedUrl = useMemo(() => inputUrlPrefix + inputRoute + '?code=' + md5Code, [md5Code, inputRoute, inputUrlPrefix]);

  useEffect(() => {
    if (localData?.length) {
      setInputAccessKey(localData[0]);
      setInputRoute(localData[1]);
      setInputUrlPrefix(localData[2]);
    }
  }, [localData]);

  const reset = useCallback(() => {
    setInputAccessKey('');
    setInputRoute('');
    setInputUrlPrefix('');
  }, [setInputAccessKey, setInputRoute]);

  const example = useCallback(() => {
    setInputAccessKey(accessKeyExample);
    setInputRoute(routeExample);
    setInputUrlPrefix(urlPrefixExample);
  }, [setInputAccessKey, setInputRoute]);

  const saveToLocalStorage = useCallback(() => {
    try {
      setLocalData([inputAccessKey, inputRoute, inputUrlPrefix]);
      toast.success('保存成功');
    } catch (e) {
      toast.error('保存失败');
      console.error(e);
    }
  }, [inputAccessKey, inputRoute, inputUrlPrefix, setLocalData]);

  useEffect(() => {
    try {
      if (!inputRoute) {
        setMd5Code('');
        return;
      }
      const md5Input = inputRoute + inputAccessKey;
      const md5Hash = MD5(md5Input).toString();
      setMd5Code(md5Hash);
    } catch (e) {
      setMd5Code('');
      console.error(e);
    }
  }, [inputAccessKey, inputRoute, setMd5Code]);

  return (
    <motion.div layoutId="/rsshub-url-converter" className="flex flex-col gap-4">
      <Card className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-4 text-sm">
          <Button className="flex-grow" onClick={example}>
            填入示例
          </Button>
          <Button className="flex-grow" onClick={reset} variant="primary">
            重置
          </Button>
          <Button className="flex-grow" onClick={saveToLocalStorage}>
            存至 LocalStorage
          </Button>
        </div>
        <form className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <label>{'访问密钥（ACCESS_KEY）'}</label>
            <textarea
              autoComplete="current-password"
              className="h-11 flex-grow rounded border border-border p-2"
              value={inputAccessKey}
              onChange={onInputAccessKeyChange}
              placeholder="请输入部署自建 RSSHub 指定的的 ACCESS_KEY，如 ILoveRSSHub"
            />
          </div>
          <div className="flex items-center gap-2">
            <label>路由:</label>
            <textarea
              autoComplete="given-name"
              className="h-11 flex-grow rounded border border-border p-2"
              value={inputRoute}
              onChange={onInputRouteChange}
              placeholder="请输入路由，如 /qdaily/column/59	"
            />
          </div>
          <div className="flex items-center gap-2">
            <label>url 前缀:</label>
            <textarea
              autoComplete="url"
              className="h-11 flex-grow rounded border border-border p-2"
              value={inputUrlPrefix}
              onChange={onInputUrlPrefix}
              placeholder="请输入 url 前缀，如 https://rsshub.app"
            />
          </div>
        </form>
      </Card>
      <Card>
        <CardTitle>转换结果</CardTitle>
        <div className="mt-2 flex items-center gap-2">
          <label>md5 code:</label>
          <CopyableResult className="flex-grow" copyText={md5Code} />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <label>feed url:</label>
          <CopyableResult className="flex-grow" copyText={feedUrl} />
        </div>
        <a href={feedUrl} className="mt-4 block rounded-md bg-page-background py-2 text-center text-blue-500 hover:underline">
          {feedUrl}
        </a>
      </Card>
    </motion.div>
  );
}
