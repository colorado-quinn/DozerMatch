import { SearchComponent } from '@/app/ui/search/SearchComponent';
import { fetchDozerData } from '@/app/lib/api';

export default async function Page() {
  const dozerInfos = await fetchDozerData();
  return <SearchComponent dozerInfos={dozerInfos}></SearchComponent>;
}
