import { dozerDummyData } from '@/app/lib/api'; // TODO: fix CORS issue and fetch data
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

const baseUrl =
  'https://www.cat.com/content/catdotcom/en_US/products/new/equipment/dozers/jcr:content/root/responsivegrid/productcards.feed.json';

export async function GET() {
  //return NextResponse.json(dozerDummyData);

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('User-Agent', 'DozerSearch/1.0.0');
  //requestHeaders.set('Host', 'www.cat.com');
  //requestHeaders.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8');
  //requestHeaders.set('Accept-Encoding', 'gzip, deflate, br');
  //requestHeaders.set('Connection', 'keep-alive');
  // TODO: investigate
  //requestHeaders.set('Cookie', 'ak_bmsc=93F75991A02A349DDFA69950B227E6F0~000000000000000000000000000000~YAAQZDsvFzGJvWWMAQAANWcxjRYEQEFAYsqTJ47coAl7oETToQDoiVkGKZShsvxVLu2aYQgzXmVpqlM8EqtcfT3cp1BJ+SVXimUW0yakeq9YO+2RdmVkYZ9duv79PgwqobrT25V84pgqTPdtDAmo8KGFBEkPlYTQ8cXips7ARlge5yOdyKums+UKICggOWsekisyJOhf4Fiqy2JjYl5VJj9ciahIZhHXAHa+t4qEhkwUi/0zDVpVlNDXK72s67GSZmL6xy/dmnI3Ar75SB1bc0hmlV2HO0oA7Xcjgm27VNM68GcENqAQyuTu6M0TxQOj8m1KQ/NbIg8n+3aJ9vfNw/CZ1s8zwKefPcmiUCVX/HAEu6RjBPs6ZrE4WozOfVfkUHUVqhjb');

  //requestHeaders.set('Accept', 'application/json');
  //requestHeaders.set('Content-Type', 'application/json');

  const res = await fetch(baseUrl, {
    headers: requestHeaders,
    method: 'GET',
    credentials: "same-origin"
    //mode: 'no-cors',
  });
  
  const data = await res.json();

  return NextResponse.json(data);
}
