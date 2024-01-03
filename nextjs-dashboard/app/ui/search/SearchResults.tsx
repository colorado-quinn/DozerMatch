import { DozerInfo } from './types';
import DozerCard from '@/app/ui/search/DozerCard';
import { AnimatePresence, motion } from 'framer-motion';

export interface SearchResultsProps {
  dozerInfos: DozerInfo[];
  onDozerClick: (dozerInfo: DozerInfo) => void;
}

const MotionWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 154 }}
    exit={{ opacity: 0, height: 0 }}
  >
    {children}
  </motion.div>
);

export default function SearchResults({
  dozerInfos,
  onDozerClick,
}: SearchResultsProps) {
  const dozerCards = dozerInfos.map((d) => (
    <MotionWrapper key={d.modelId}>
      <DozerCard dozer={d} onDozerClick={onDozerClick} />
    </MotionWrapper>
  ));

  return (
    <div className="dozerCardsContainer">
      <AnimatePresence>{dozerCards}</AnimatePresence>
    </div>
  );
}
