import { useRouter } from 'next/router';
import { useState } from 'react';
import { RouterType, tools } from '../../constants';
import Button from '../Button';
import Card from '../Card';

const ToolList = () => {
  const router = useRouter();
  const [showExample, setShowExample] = useState(false);
  return (
    <div className="items flex flex-col justify-center gap-4">
      <Button className="rounded text-xl" type="primary" size="large" onClick={() => setShowExample(!showExample)}>
        {showExample ? '关闭示例图片' : '显示示例图片'}
      </Button>
      <div className="flex flex-wrap justify-between gap-x-4 gap-y-8">
        {tools.map(({ title, type, desc, exampleImage }) => {
          if (!Object.values(RouterType).includes(type as RouterType)) return null;
          return (
            <Card layoutId={type} key={type} title={title} onClick={() => router.push(`/${type}`)} clickable showArrow>
              <div className="whitespace-pre-wrap text-lg">{desc}</div>
              {showExample && exampleImage && <img src={exampleImage} alt={type} className="w-50 max-h-80 object-contain" />}
            </Card>
          );
        })}
        <i className="h-0 w-96" />
        <i className="h-0 w-96" />
        <i className="h-0 w-96" />
        <i className="h-0 w-80" />
      </div>
    </div>
  );
};
export default ToolList;
