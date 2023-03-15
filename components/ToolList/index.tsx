import { useRouter } from 'next/router';
import Card from '../card';

const ToolList = () => {
  const router = useRouter();
  return (
    <div className="mx-8 flex items-center justify-center">
      <Card title="CSV转JSON" onClick={() => router.push('/tools/csv2json')} />
    </div>
  );
};
export default ToolList;
