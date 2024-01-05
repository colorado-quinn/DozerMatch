import { DozerSearch } from '@/app/ui/search/DozerSearch';
import { fetchDozerData } from '@/app/lib/api';

export default async function Page() {
  const dozerInfos = await fetchDozerData();

  // TODO: fetch images on server?

  return <DozerSearch dozerInfos={dozerInfos}></DozerSearch>;
}
