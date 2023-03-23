import { useRouter } from 'next/router';
import { useState } from 'react';
import { RouterType, tools } from '../../constants';
import Button from '../Button';
import Card from '../Card';

const ToolList = () => {
  const router = useRouter();
  const [showExample, setShowExample] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Button className="rounded text-xl" type="primary" size="large" onClick={() => setShowExample(!showExample)}>
        {showExample ? '关闭示例图片' : '显示示例图片'}
      </Button>
      <div className="mx-8 flex flex-wrap items-start justify-center gap-4">
        {tools.map(({ title, type, desc, exampleImage }) => {
          if (!Object.values(RouterType).includes(type as RouterType)) return null;
          return (
            <Card layoutId={type} key={type} title={title} onClick={() => router.push(`/${type}`)} clickable showArrow>
              <div className="text-lg">{desc}</div>
              {showExample && exampleImage && <img src={exampleImage} alt={type} className="w-50 max-h-80 object-contain" />}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default ToolList;
