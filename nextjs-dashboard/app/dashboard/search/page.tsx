//"use client"

import { dozerDummyData } from '@/app/lib/api'; // TODO: fix CORS issue and fetch data
import DozerCard, { DozerInfo } from '@/app/ui/DozerCard';
import { useState, useEffect } from 'react';

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

  // convert data
  const dozerInfos: DozerInfo[] = dozerDummyData.models.map((m) => {
    const powerSpec = m.specs.find(s => s.spec_name.toLowerCase().includes('power'));
    const powerString: string = powerSpec == undefined ? 'Unknown' : powerSpec.spec_value[0];
    const powerNumber: number | undefined = powerSpec == undefined ? undefined : Number(powerSpec.spec_value[0].split(" ")[0]);

    const weightSpec = m.specs.find(s => s.spec_name.toLowerCase().includes('operating weight'));
    const weigthString: string = weightSpec == undefined ? 'Unknown' : weightSpec.spec_value[0];
    const weightNumber: number | undefined = weightSpec == undefined ? undefined : Number(weightSpec.spec_value[0].split(" ")[0]);

    const dozerInfo: DozerInfo = {
        category: m.productCategory,
        engineHp: powerNumber,
        engineHpString: powerString,
        makeName: m.brand,
        modelId: m.modelId,
        modelName: m.model_name, 
        operatingWeightString: weigthString,
        operatingWeight: weightNumber,
    };
    return dozerInfo;
  });

  const dozerCards = dozerInfos.map((d) => (
    <DozerCard {...d} key={d.modelId} />
  ));
  return <div className='dozerCardsContainer'>{dozerCards}</div>;
}
