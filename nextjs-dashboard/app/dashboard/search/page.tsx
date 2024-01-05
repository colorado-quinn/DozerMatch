import { DozerSearch } from '@/app/ui/search/DozerSearch';
import { fetchDozerData } from '@/app/lib/api';

export default async function Page() {
  const dozerInfos = await fetchDozerData();

  return <DozerSearch dozerInfos={dozerInfos}></DozerSearch>;
}
