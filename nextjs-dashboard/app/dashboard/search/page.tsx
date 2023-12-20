//"use client"

import { dozerDummyData } from '@/app/lib/api'  // TODO: fix CORS issue and fetch data
import DozerCard from '@/app/ui/DozerCard';
import { useState, useEffect } from 'react'
 
export default function Page() {
  // const [data, setData] = useState(null)
  // const [isLoading, setLoading] = useState(true)
 
  // useEffect(() => {
  //   console.log('about to fetch');
  //   fetch('https://www.cat.com/content/catdotcom/en_US/products/new/equipment/dozers/jcr:content/root/responsivegrid/productcards.feed.json',
  //   {
  //     method : "GET",
  //     mode: 'no-cors',
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data)
  //       setLoading(false)
  //     })
  // }, [])
 
  // if (isLoading) return <p>Loading...</p>
  // if (!data) return <p>No profile data</p>
  const listItems = dozerDummyData.models.map((m) =>
    <DozerCard key={m.modelId} modelName={m.model_name}></DozerCard>
  );
  return (
    listItems
  )
}