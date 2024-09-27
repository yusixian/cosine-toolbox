import { toast } from 'react-toastify';
import copy from 'copy-to-clipboard';
import { twMerge } from 'tailwind-merge';
import Button from '@/components/ui/button/Button';
import { FiCopy } from 'react-icons/fi';
import { cn } from '@/lib/utils';

type CopyableResultProps = {
  copyText?: string;
  areaClass?: string;
  className?: string;
  type?: 'input' | 'textarea';
};
export default function CopyableResult({ copyText, className, areaClass, type = 'input' }: CopyableResultProps) {
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
  if (type === 'input')
    return (
      <div className={cn('relative flex', className)}>
        <input
          className={cn(
            'border-r-none flex-grow overflow-hidden truncate whitespace-pre-wrap rounded-s border border-border px-2 outline-1 outline-primary hover:outline focus:outline',
            areaClass,
          )}
          value={copyText}
          readOnly
        />
        <Button className="rounded-e rounded-s-none p-2" onClick={onCopy}>
          <FiCopy className="h-5 w-5" />
        </Button>
      </div>
    );

  return (
    <div className={cn('relative flex items-start gap-2', className)}>
      <textarea
        className={cn('h-16 w-full flex-grow overflow-hidden whitespace-pre-wrap rounded border border-border p-2', areaClass)}
        value={copyText}
        readOnly
      />
      <Button className="rounded p-2" onClick={onCopy}>
        <FiCopy className="h-5 w-5" />
      </Button>
    </div>
  );
}
