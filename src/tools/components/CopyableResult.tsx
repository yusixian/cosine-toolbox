import { toast } from 'react-toastify';
import copy from 'copy-to-clipboard';
import { twMerge } from 'tailwind-merge';
import Button from '@/components/ui/button/Button';
import { FiCopy } from 'react-icons/fi';

type CopyableResultProps = {
  copyText?: string;
  areaClass?: string;
  className?: string;
};
export default function CopyableResult({ copyText, className, areaClass }: CopyableResultProps) {
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
    <div className={twMerge('relative flex items-start gap-2', className)}>
      <textarea
        className={twMerge(
          'h-16 w-full flex-grow overflow-hidden whitespace-pre-wrap rounded border border-border p-1',
          areaClass,
        )}
        value={copyText}
        readOnly
      />
      <Button className="rounded p-2" onClick={onCopy}>
        <FiCopy className="h-5 w-5" />
      </Button>
    </div>
  );
}
