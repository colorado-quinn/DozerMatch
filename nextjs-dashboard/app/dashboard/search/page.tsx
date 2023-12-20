'use client';

import { dozerDummyData } from '@/app/lib/api'; // TODO: fix CORS issue and fetch data
import { DozerInfo } from '@/app/ui/search/DozerCard';
import { useEffect, useState } from 'react';
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
  const [hpSliderValue, setHpSliderValue] = useState<number[]>([0, 1000]);

  const dozerInfos: DozerInfo[] = convertDataToDozers(dozerDummyData);
  const filteredDozerInfos: DozerInfo[] = dozerInfos.filter((d) =>
    filterCriteria(d),
  );

  const minHp: number = Math.min(...dozerInfos.map((d) => d.engineHp || 0));
  const maxHp: number = Math.max(...dozerInfos.map((d) => d.engineHp || 0));

  useEffect(() => {
    setHpSliderValue([minHp, maxHp]);
  }, []);

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
  const hpSliderOnChange = (event: Event, newValue: number | number[]) => {
    setHpSliderValue(newValue as number[]);
  };

  function convertDataToDozers(data) {
    const dozerInfos: DozerInfo[] = data.models.map((m) => {
      const powerSpec = m.specs.find(
        (s) =>
          s.spec_name.toLowerCase().includes('power') &&
          !s.spec_name.toLowerCase().includes('speed'),
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
        imageUrl: m.image_url,
      };
      return dozerInfo;
    });

    return dozerInfos;
  }

  function filterCriteria(dozer: DozerInfo): boolean {
    let meetsCategoryCriteria: boolean = false;
    let meetsHpCriteria: boolean = false;

    const noCheckboxesSelected: boolean =
      !includeSmall && !includeMedium && !includeLarge && !includeWheel;
    if (noCheckboxesSelected) {
      meetsCategoryCriteria = true;
    } else if (
      includeSmall &&
      dozer.category.toLowerCase().includes('small dozer')
    ) {
      meetsCategoryCriteria = true;
    } else if (
      includeMedium &&
      dozer.category.toLowerCase().includes('medium dozer')
    ) {
      meetsCategoryCriteria = true;
    } else if (
      includeLarge &&
      dozer.category.toLowerCase().includes('large dozer')
    ) {
      meetsCategoryCriteria = true;
    } else if (
      includeWheel &&
      dozer.category.toLowerCase().includes('wheel dozer')
    ) {
      meetsCategoryCriteria = true;
    }

    if (dozer.engineHp == undefined) {
      meetsHpCriteria = true; // default true if value unknown, otherwise it will never show
    } else if (
      dozer.engineHp >= hpSliderValue[0] &&
      dozer.engineHp <= hpSliderValue[1]
    ) {
      meetsHpCriteria = true;
    }

    return meetsCategoryCriteria && meetsHpCriteria;
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* TODO: left side fixed, scroll right side */}
      <div className="col-span-1 h-4">
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
          <FormControlLabel
            control={
              <Slider
                getAriaLabel={() => 'Engine HP'}
                value={hpSliderValue}
                onChange={hpSliderOnChange}
                valueLabelDisplay="auto"
                getAriaValueText={() => `${hpSliderValue}`}
                min={minHp}
                max={maxHp}
              />
            }
            label={`Engine HP: ${hpSliderValue[0]} - ${hpSliderValue[1]}`}
            labelPlacement="top"
          />
        </FormGroup>
      </div>
      <div className="col-span-3 h-4">
        <SearchResults dozerInfos={filteredDozerInfos} />
      </div>
    </div>

    // <>

    // </>
  );
}
