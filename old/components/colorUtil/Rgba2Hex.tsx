import clsx from 'clsx';
import { useMemo } from 'react';
import { rgbaExample } from '../../constants/examples';
import { useInput } from '../../hooks/useInput';
import { rgba2hex } from '../../utils';
import Button from '../Button';
import Card from '../Card';
import CopyableResult from '../main/CopyableResult';

type Rgba2HexProps = {
  className?: string;
};
export function Rgba2Hex({ className }: Rgba2HexProps) {
  const { inputValue: inputRgbaStr, onInputChange: onInputRgbaStrChange, setInputValue: setInputRgbaStr } = useInput();
  const hexStr = useMemo(() => rgba2hex(inputRgbaStr), [inputRgbaStr]);

  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      <div className="text-center text-3xl">Rgba 与 Hex 相互转换</div>
      <Card className="gap-4 text-xl">
        <div className="flex gap-4">
          <div className="flex flex-grow flex-col items-center gap-4">
            <p className="text-2xl">输入 rgba 颜色值或rgb颜色值</p>
            <p>
              <Button onClick={() => setInputRgbaStr(rgbaExample)} size="middle">
                示例
              </Button>
              <Button className="ml-4" onClick={() => setInputRgbaStr('')} size="middle">
                重置
              </Button>
            </p>
            <input
              className="w-full rounded border-2 border-rose-300 bg-rose-100 p-1 text-xl outline-none dark:border-blue-300 dark:bg-sky-700 dark:text-white"
              value={inputRgbaStr}
              onChange={onInputRgbaStrChange}
              placeholder="输入 rgba 颜色值或rgb颜色值，如 rgba(50, 150, 230, 0.6)"
            />
            <div className="h-12 w-12 rounded-lg border-2" style={{ backgroundColor: inputRgbaStr || 'transparent' }} />
          </div>
          <div className="flex flex-grow items-center gap-4 text-2xl">
            <CopyableResult title="对应十六进制如下" copyText={hexStr || undefined} areaClass="h-16" />
            <div
              className="aspect-square h-full rounded-lg border-2"
              style={{ backgroundColor: rgba2hex(inputRgbaStr) || 'transparent' }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
