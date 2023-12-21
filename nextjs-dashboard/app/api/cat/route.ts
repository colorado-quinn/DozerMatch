import { dozerDummyData } from '@/app/lib/api'; // TODO: fix CORS issue and fetch data
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

const baseUrl =
  'http://www.cat.com/content/catdotcom/en_US/products/new/equipment/dozers/jcr:content/root/responsivegrid/productcards.feed.json';

export async function GET() {
  return NextResponse.json(dozerDummyData);


  // TODO: fetch is failing below with 'Error: read ECONNRESET'

  const requestHeaders: HeadersInit = new Headers();
  //requestHeaders.set('Content-Type', 'application/json');
  console.log('about to fetch');
  const res = await fetch(baseUrl, {
    headers: requestHeaders,
    method: 'GET',
    //mode: 'no-cors',
  });
  console.log('fetch finished');
  const data = await res.json();
  console.log('result jsond');

  return NextResponse.json({ data });
}
