'use client';

import { DozerInfo } from '@/app/ui/search/DozerCard';
import { useEffect, useState } from 'react';
import SearchResults from '@/app/ui/search/SearchResults';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import * as EmailValidator from 'email-validator';
import { phone } from 'phone';

export default function Page() {
  const [includeSmall, setIncludeSmall] = useState(false);
  const [includeMedium, setIncludeMedium] = useState(false);
  const [includeLarge, setIncludeLarge] = useState(false);
  const [includeWheel, setIncludeWheel] = useState(false);
  const [hpSliderValue, setHpSliderValue] = useState<number[]>([0, 1000]);

  const [dozerInfos, setDozerInfos] = useState<DozerInfo[]>([]);
  const [filteredDozerInfos, setFilteredDozerInfos] = useState<DozerInfo[]>([]);
  const [overallMinHp, setOverallMinHp] = useState<number>();
  const [overallMaxHp, setOverallMaxHp] = useState<number>();
  //const [isLoading, setLoading] = useState(true)

  // fetch dozer data from api
  useEffect(() => {
    fetch('/api/cat')
      .then((res) => res.json())
      .then((data) => {
        //setLoading(false)

        const dozerInfos: DozerInfo[] = convertDataToDozers(data);
        setDozerInfos(dozerInfos);

        // TODO: consider reduce for performance
        const minHp: number = Math.min(
          ...dozerInfos.map((d) => d.engineHp || 100000),
        );
        setOverallMinHp(minHp);
        const maxHp: number = Math.max(
          ...dozerInfos.map((d) => d.engineHp || 0),
        );
        setOverallMaxHp(maxHp);
        setHpSliderValue([minHp, maxHp]);
      });
  }, []);

  // when filters change, update filtered list
  useEffect(() => {
    const filteredDozerInfos: DozerInfo[] = dozerInfos.filter((d) =>
      filterCriteria(d),
    );
    setFilteredDozerInfos(filteredDozerInfos);
  }, [includeSmall, includeMedium, includeLarge, includeWheel, hpSliderValue]);

  //#region RequestMoreInfo dialog
  const [dozerMoreInfo, setDozerMoreInfo] = useState<DozerInfo>();
  const [requestorName, setRequestorName] = useState<string | undefined>(
    undefined,
  );
  const [requestorEmail, setRequestorEmail] = useState<string | undefined>(
    undefined,
  );
  const [requestorPhone, setRequestorPhone] = useState<string | undefined>(
    undefined,
  );
  const [requestorNameIsValid, setRequestorNameIsValid] = useState(true);
  const [requestorEmailIsValid, setRequestorEmailIsValid] = useState(true);
  const [requestorPhoneIsValid, setRequestorPhoneIsValid] = useState(true);
  const [isDozerMoreInfoDialogOpen, setDozerMoreInfoDialogOpen] =
    useState(false);
  const handleDialogCancel = () => {
    setDozerMoreInfoDialogOpen(false);
    resetForm();
  };
  const handleDialogOk = () => {
    if (validateForm()) {
      setDozerMoreInfoDialogOpen(false);
      resetForm();

      // TODO: send to real email server
      const emailMessage: string = `${requestorName} has requested more information about the ${dozerMoreInfo?.makeName} ${dozerMoreInfo?.modelName} bulldozer. You can reach them at ${requestorEmail} or call them at ${requestorPhone}`;
      console.log(emailMessage);
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;

    if (requestorName == undefined || requestorName.length == 0) {
      isValid = false;
      setRequestorNameIsValid(false);
    }

    if (
      requestorEmail == undefined ||
      requestorEmail.length == 0 ||
      (requestorEmail != undefined && !EmailValidator.validate(requestorEmail))
    ) {
      isValid = false;
      setRequestorEmailIsValid(false);
    }

    if (
      requestorPhone == undefined ||
      requestorPhone.length == 0 ||
      (requestorPhone != undefined && !phone(requestorPhone).isValid)
    ) {
      isValid = false;
      setRequestorPhoneIsValid(false);
    }

    return isValid;
  };

  const resetForm = () => {
    setRequestorName(undefined);
    setRequestorPhone(undefined);
    setRequestorEmail(undefined);
    setRequestorNameIsValid(true);
    setRequestorPhoneIsValid(true);
    setRequestorEmailIsValid(true);
  };

  const handleDozerClick = (dozer: DozerInfo) => {
    setDozerMoreInfo(dozer);
    setDozerMoreInfoDialogOpen(true);
  };

  const handleRequestorNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setRequestorName(e.currentTarget.value);
    if (e.currentTarget.value.length > 0) {
      setRequestorNameIsValid(true);
    }
  };

  const handleRequestorEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRequestorEmail(e.currentTarget.value);
    if (e.currentTarget.value.length > 0) {
      setRequestorEmailIsValid(true);
    }
  };

  const handleRequestorPhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRequestorPhone(e.currentTarget.value);
    if (e.currentTarget.value.length > 0) {
      setRequestorPhoneIsValid(true);
    }
  };

  const dozerMoreInfoDialog: JSX.Element = (
    <Dialog open={isDozerMoreInfoDialogOpen} onClose={handleDialogCancel}>
      <DialogTitle>Request More Information</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Want more info on this {dozerMoreInfo?.makeName}{' '}
          {dozerMoreInfo?.modelName}? We&apos;d love to hear from you!
        </DialogContentText>
        <div className="moreInfoInput">
          <TextField
            autoFocus={true}
            label={'Full Name'}
            onChange={handleRequestorNameChange}
            error={!requestorNameIsValid}
            helperText={
              requestorNameIsValid ? '' : 'Please provide your full name'
            }
          />
        </div>
        <div className="moreInfoInput">
          <TextField
            label={'Email'}
            onChange={handleRequestorEmailChange}
            error={!requestorEmailIsValid}
            helperText={
              requestorEmailIsValid ? '' : 'Please provide an email address'
            }
          />
        </div>
        <div className="moreInfoInput">
          <TextField
            label={'Phone'}
            onChange={handleRequestorPhoneChange}
            error={!requestorPhoneIsValid}
            helperText={
              requestorPhoneIsValid ? '' : 'Please provide a phone number'
            }
          />
        </div>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={handleDialogOk}>Request Info</Button>
      </DialogActions>
    </Dialog>
  );
  //#endregion

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

  function convertDataToDozers(data: any) {
    const dozerInfos: DozerInfo[] = data.models.map((m: any) => {
      const powerSpec = m.specs.find(
        (s: any) =>
          s.spec_name.toLowerCase().includes('power') &&
          !s.spec_name.toLowerCase().includes('speed'),
      );
      const powerString: string =
        powerSpec == undefined ? 'Unknown' : powerSpec.spec_value[0];
      const powerNumber: number | undefined =
        powerSpec == undefined
          ? undefined
          : Number(powerSpec.spec_value[0].split(' ')[0]);

      const weightSpec = m.specs.find((s: any) =>
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
    <>
      {isDozerMoreInfoDialogOpen && dozerMoreInfoDialog}
      <div className="flex h-full">
        {/* Fixed Sidebar */}
        <div className="flex-0">
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
                  min={overallMinHp}
                  max={overallMaxHp}
                />
              }
              label={`Engine HP: ${hpSliderValue[0]} - ${hpSliderValue[1]}`}
              labelPlacement="top"
            />
          </FormGroup>
        </div>
        {/* Scroll wrapper */}
        <div className="flex flex-1 overflow-hidden">
          {/* Scrollable container */}
          <div className="flex-1 overflow-y-scroll">
            <SearchResults
              dozerInfos={filteredDozerInfos}
              onDozerClick={handleDozerClick}
            />
          </div>
        </div>
      </div>
    </>
  );
}
