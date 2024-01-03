import { SearchComponent } from '@/app/ui/search/SearchComponent';
import { DozerInfo } from '@/app/ui/search/types';
import { convertDataToDozers } from '@/app/lib/utils';

const getDozerData = async () => {
  const baseUrl =
    'https://www.cat.com/content/catdotcom/en_US/products/new/equipment/dozers/jcr:content/root/responsivegrid/productcards.feed.json';
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('User-Agent', 'DozerSearch/1.0.0');

  const dozerInfos: DozerInfo[] = await fetch(baseUrl, {
    headers: requestHeaders,
    method: 'GET',
    credentials: 'same-origin',
  })
    .then((res) => res.json())
    .then((data) => convertDataToDozers(data));

  return dozerInfos;
};

export default async function Page() {
  const dozerInfos: DozerInfo[] = await getDozerData();
  return <SearchComponent dozerInfos={dozerInfos}></SearchComponent>;
}
