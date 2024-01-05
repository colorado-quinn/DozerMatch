import { DozerSearch } from '@/app/ui/search/DozerSearch';
import { fetchDozerData } from '@/app/lib/api';

export default async function Page() {
  // TODO: improve initial load times due to size (images are not the culprit)
  // TODO: ensure mobile friendly layout

  const dozerInfos = await fetchDozerData();

  return <DozerSearch dozerInfos={dozerInfos}></DozerSearch>;
}
