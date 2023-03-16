import { useRouter } from 'next/router';
import Card from '../card';

const ToolList = () => {
  const router = useRouter();
  return (
    <div className="mx-8 flex items-center justify-center gap-4">
      <Card layoutId="csv2json" title="CSV转JSON" onClick={() => router.push('/tools/csv2json')} clickable showArrow />
      <Card
        layoutId="base64download"
        title="base64数组批量下载"
        onClick={() => router.push('/tools/base64download')}
        clickable
        showArrow
      />
    </div>
  );
};
export default ToolList;
