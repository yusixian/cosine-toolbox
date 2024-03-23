import BackTop from './BackTop';
import ToBottom from './ToBottom';

export default function FloatGroup() {
  return (
    <div className="bg-background/80 hover:shadow-card group fixed bottom-0 right-0 z-10 text-primary/80 shadow-xl md:bg-background md:text-primary">
      <BackTop className="pt-3" />
      <ToBottom className="pb-3" />
    </div>
  );
}
