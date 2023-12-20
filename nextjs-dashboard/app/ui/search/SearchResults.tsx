import DozerCard, { DozerInfo } from '@/app/ui/search/DozerCard';

export interface SearchResultsProps {
    dozerInfos: DozerInfo[];
}

export default function SearchResults( { dozerInfos } : SearchResultsProps){
    const dozerCards = dozerInfos.map((d) => <DozerCard {...d} key={d.modelId} />);

    return <div className="dozerCardsContainer">{dozerCards}</div>;
}