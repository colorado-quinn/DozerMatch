import DozerCard, { DozerInfo } from '@/app/ui/search/DozerCard';

export interface SearchResultsProps {
  dozerInfos: DozerInfo[];
  onDozerClick: (dozerInfo: DozerInfo) => void;
}

export default function SearchResults({
  dozerInfos,
  onDozerClick,
}: SearchResultsProps) {
  const dozerCards = dozerInfos.map((d) => (
    <DozerCard key={d.modelId} dozer={d} onDozerClick={onDozerClick} />
  ));

  return <div className="dozerCardsContainer">{dozerCards}</div>;
}
