import { useRouter } from 'next/router';
import { RouterType, tools } from '../../constants';
import Card from '../Card';

const ToolList = () => {
  const router = useRouter();
  return (
    <div className="mx-8 flex items-center justify-center gap-4">
      {tools.map(({ title, type }) => {
        if (!Object.values(RouterType).includes(type as RouterType)) return null;
        return <Card layoutId={type} key={type} title={title} onClick={() => router.push(`/${type}`)} clickable showArrow />;
      })}
    </div>
  );
};
export default ToolList;
