import clsx from 'clsx';
import { useMemo } from 'react';
import { hexExample } from '../../constants/examples';
import { useInput } from '../../hooks/useInput';
import Button from '../Button';
import Card from '../Card';
import CopyableResult from '../main/CopyableResult';
import { hex2rgba } from '../../utils';

type Hex2RgbaProps = {
  className?: string;
};

export function Hex2Rgba({ className }: Hex2RgbaProps) {
  const { inputValue: inputHexStr, onInputChange: onInputHexStrChange, setInputValue: setInputHexStr } = useInput();
  const rgbaStr = useMemo(() => hex2rgba(inputHexStr), [inputHexStr]);

  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      <div className="text-center text-3xl">Hex 与 Rgba 相互转换</div>
      <Card className="gap-4 text-xl">
        <div className="flex gap-4">
          <div className="flex flex-grow flex-col items-center gap-4">
            <p className="text-2xl">输入 Hex 颜色值</p>
            <p>
              <Button onClick={() => setInputHexStr(hexExample)} size="middle">
                示例
              </Button>
              <Button className="ml-4" onClick={() => setInputHexStr('')} size="middle">
                重置
              </Button>
            </p>
            <input
              className="w-full rounded border-2 border-rose-300 bg-rose-100 p-1 text-xl outline-none dark:border-blue-300 dark:bg-sky-700 dark:text-white"
              value={inputHexStr}
              onChange={onInputHexStrChange}
              placeholder="输入 Hex 颜色值，如 #3286E6A3"
            />
            <div className="h-12 w-12 rounded-lg border-2" style={{ backgroundColor: inputHexStr || 'transparent' }} />
          </div>
          <div className="flex flex-grow items-center gap-4 text-2xl">
            <CopyableResult title="对应 RGBA 如下" copyText={rgbaStr || undefined} areaClass="h-16" />
            <div
              className="aspect-square h-full rounded-lg border-2"
              style={{ backgroundColor: hex2rgba(inputHexStr) || 'transparent' }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
