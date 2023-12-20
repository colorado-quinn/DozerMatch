'use client';

import { dozerDummyData } from '@/app/lib/api'; // TODO: fix CORS issue and fetch data
import DozerCard, { DozerInfo } from '@/app/ui/search/DozerCard';
import { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SearchResults from '@/app/ui/search/SearchResults';

export default function Page() {
  const [includeSmall, setIncludeSmall] = useState(false);
  const [includeMedium, setIncludeMedium] = useState(false);
  const [includeLarge, setIncludeLarge] = useState(false);
  const [includeWheel, setIncludeWheel] = useState(false);

  const dozerInfos: DozerInfo[] = convertDataToDozers(dozerDummyData)
    .filter((d) => filterCriteria(d));

  // checkbox change handlers
  function smallDozerOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIncludeSmall(event.target.checked);
  }
  function mediumDozerOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIncludeMedium(event.target.checked);
  }
  function largeDozerOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIncludeLarge(event.target.checked);
  }
  function wheelDozerOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIncludeWheel(event.target.checked);
  }

  function convertDataToDozers(data) {
    const dozerInfos: DozerInfo[] = data.models.map((m) => {
      const powerSpec = m.specs.find((s) =>
        s.spec_name.toLowerCase().includes('power'),
      );
      const powerString: string =
        powerSpec == undefined ? 'Unknown' : powerSpec.spec_value[0];
      const powerNumber: number | undefined =
        powerSpec == undefined
          ? undefined
          : Number(powerSpec.spec_value[0].split(' ')[0]);

      const weightSpec = m.specs.find((s) =>
        s.spec_name.toLowerCase().includes('operating weight'),
      );
      const weigthString: string =
        weightSpec == undefined ? 'Unknown' : weightSpec.spec_value[0];
      const weightNumber: number | undefined =
        weightSpec == undefined
          ? undefined
          : Number(weightSpec.spec_value[0].split(' ')[0]);

      const dozerInfo: DozerInfo = {
        category: m.productCategory,
        engineHp: powerNumber,
        engineHpString: powerString,
        makeName: m.brand,
        modelId: m.idmodel,
        modelName: m.model_name,
        operatingWeightString: weigthString,
        operatingWeight: weightNumber,
        imageUrl: m.image_url
      };
      return dozerInfo;
    });

    return dozerInfos;
  }

  function filterCriteria(d: DozerInfo): boolean {
    const noCheckboxesSelected: boolean =
      !includeSmall && !includeMedium && !includeLarge && !includeWheel;
    if (noCheckboxesSelected) {
      return true;
    }

    if (includeSmall && d.category.toLowerCase().includes('small dozer')) {
      return true;
    }
    if (includeMedium && d.category.toLowerCase().includes('medium dozer')) {
      return true;
    } else if (
      includeLarge &&
      d.category.toLowerCase().includes('large dozer')
    ) {
      return true;
    } else if (
      includeWheel &&
      d.category.toLowerCase().includes('wheel dozer')
    ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox onChange={smallDozerOnChange} />}
          label="Small Dozer"
        />
        <FormControlLabel
          control={<Checkbox onChange={mediumDozerOnChange} />}
          label="Medium Dozer"
        />
        <FormControlLabel
          control={<Checkbox onChange={largeDozerOnChange} />}
          label="Large Dozer"
        />
        <FormControlLabel
          control={<Checkbox onChange={wheelDozerOnChange} />}
          label="Wheel Dozer"
        />
      </FormGroup>

      <SearchResults dozerInfos={dozerInfos}/>
    </>
  );
}
