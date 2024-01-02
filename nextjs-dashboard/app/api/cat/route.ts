import { NextResponse } from 'next/server';

const baseUrl =
  'https://www.cat.com/content/catdotcom/en_US/products/new/equipment/dozers/jcr:content/root/responsivegrid/productcards.feed.json';

export async function GET() {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('User-Agent', 'DozerSearch/1.0.0');

  const res = await fetch(baseUrl, {
    headers: requestHeaders,
    method: 'GET',
    credentials: 'same-origin',
  });

  const data = await res.json();

  return NextResponse.json(data);
}
