import { toast } from 'react-toastify';
import Button from '../Button';
import copy from 'copy-to-clipboard';
import { twMerge } from 'tailwind-merge';

type CopyableResultProps = {
  title?: string;
  copyText?: string;
  copyButtonText?: string;
  areaClass?: string;
  className?: string;
};
export default function CopyableResult({ title, copyText, copyButtonText, className, areaClass }: CopyableResultProps) {
  const onCopy = (e: any) => {
    e?.preventDefault();
    try {
      copy(copyText ?? '');
      toast('WOW! 已经成功复制到剪切板啦=v=');
    } catch (e) {
      toast.error('好像出了点错误TwT');
      console.error('onCopy Error', e);
    }
  };
  return (
    <div className={twMerge('flex flex-col items-center gap-2 text-2xl', className)}>
      <div className="flex items-center justify-center gap-2">
        {title ?? '转换结果如下👇'}
        <Button onClick={onCopy} type="primary" className="rounded text-2xl" size="large">
          {copyButtonText ?? '复制'}
        </Button>
      </div>
      <textarea
        className={twMerge(
          'h-44 w-full whitespace-pre-wrap rounded border-2 border-rose-300 bg-rose-100 p-2 text-xl outline-none dark:border-blue-300 dark:bg-sky-700',
          areaClass,
        )}
        value={copyText}
        readOnly
      />
    </div>
  );
}
