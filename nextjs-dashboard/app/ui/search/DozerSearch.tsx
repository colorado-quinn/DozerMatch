'use client';

import { useEffect, useState } from 'react';
import SearchResults from '@/app/ui/search/SearchResults';
import {
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
  Button,
  FormLabel,
} from '@mui/material';
import * as EmailValidator from 'email-validator';
import { phone } from 'phone';
import { DozerInfo } from './types';

export const DozerSearch = ({dozerInfos}:{dozerInfos: DozerInfo[]}) => {
  // setup HP slider values
  const minHp: number = Math.min(
    ...dozerInfos.map((d) => d.engineHp || 100000),
  );
  const maxHp: number = Math.max(...dozerInfos.map((d) => d.engineHp || 0));
  const ceilMaxHp: number = Math.ceil(maxHp / 10) * 10;

  // setup op weight slider values
  const minOpWeight: number = Math.min(...dozerInfos.map((d) => d.operatingWeight || 100000));
  const flooredMinOpWeight: number = Math.floor(minOpWeight / 1000) * 1000;
  const maxOpWeight: number = Math.max(...dozerInfos.map((d) => d.operatingWeight || 0));
  const ceilOpWeight: number = Math.ceil(maxOpWeight / 1000) * 1000;

  const [includeSmall, setIncludeSmall] = useState(false);
  const [includeMedium, setIncludeMedium] = useState(false);
  const [includeLarge, setIncludeLarge] = useState(false);
  const [includeWheel, setIncludeWheel] = useState(false);
  const [hpSliderValue, setHpSliderValue] = useState<number[]>([minHp, ceilMaxHp]);
  const [opWeightSliderValue, setOpWeightSliderValue] = useState<number[]>([flooredMinOpWeight, ceilOpWeight]);
  const [filteredDozerInfos, setFilteredDozerInfos] = useState<DozerInfo[]>([]);

  // when filters change, update filtered list
  useEffect(() => {
    const filteredDozerInfos: DozerInfo[] = dozerInfos.filter((d) =>
      filterCriteria(d),
    );
    setFilteredDozerInfos(filteredDozerInfos);
  }, [
    includeSmall,
    includeMedium,
    includeLarge,
    includeWheel,
    hpSliderValue,
    opWeightSliderValue,
  ]);

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

  // TODO: dialog transition, clashing with typing
  const dozerMoreInfoDialog: JSX.Element = (
    <Dialog open={isDozerMoreInfoDialogOpen} onClose={handleDialogCancel}>
      <DialogTitle>Request More Information</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Want more info on the {dozerMoreInfo?.makeName}{' '}
          {dozerMoreInfo?.modelName}? We&apos;re here to help!
        </DialogContentText>
        <div className="my-4">
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
        <div className="my-4">
          <TextField
            label={'Email'}
            onChange={handleRequestorEmailChange}
            error={!requestorEmailIsValid}
            helperText={
              requestorEmailIsValid ? '' : 'Please provide an email address'
            }
          />
        </div>
        <div className="my-4">
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
        {/* <Button onClick={handleDialogOk} className='bg-blue-600'>Request Info</Button> */}
        <Button onClick={handleDialogOk} variant="contained">
          Request Info!
        </Button>
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
  const opWeightSliderOnChange = (
    event: Event,
    newValue: number | number[],
  ) => {
    setOpWeightSliderValue(newValue as number[]);
  };

  function filterCriteria(dozer: DozerInfo): boolean {
    let meetsCategoryCriteria: boolean = false;
    let meetsHpCriteria: boolean = false;
    let meetsOpWeightCriteria: boolean = false;

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

    if (dozer.operatingWeight == undefined) {
      meetsOpWeightCriteria = true; // default true if value unknown, otherwise it will never show
    } else if (
      dozer.operatingWeight >= opWeightSliderValue[0] &&
      dozer.operatingWeight <= opWeightSliderValue[1]
    ) {
      meetsOpWeightCriteria = true;
    }

    return meetsCategoryCriteria && meetsHpCriteria && meetsOpWeightCriteria;
  }

  return (
    <>
      {isDozerMoreInfoDialogOpen && dozerMoreInfoDialog}
      <div className="flex h-full">
        {/* Fixed Sidebar */}
        <div className="flex-0">
          <div className="mb-7">
            <FormLabel component="legend">Category</FormLabel>
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
          </div>
          <div className="md:mb-7">
            <FormGroup>
              <FormLabel component="legend">Engine HP</FormLabel>
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
                    step={10}
                  />
                }
                label={`${hpSliderValue[0]} - ${hpSliderValue[1]}`}
                labelPlacement="top"
              />
            </FormGroup>
          </div>
          <FormGroup>
            <FormLabel component="legend">Operating Weight</FormLabel>
            <FormControlLabel
              control={
                <Slider
                  getAriaLabel={() => 'Operating Weight'}
                  value={opWeightSliderValue}
                  onChange={opWeightSliderOnChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={() => `${opWeightSliderValue}`}
                  min={minOpWeight}
                  max={maxOpWeight}
                  step={1000}
                />
              }
              label={`${opWeightSliderValue[0]} - ${opWeightSliderValue[1]}`}
              labelPlacement="top"
            />
          </FormGroup>
        </div>
        {/* Scroll wrapper */}
        <div className="flex flex-1 overflow-hidden">
          {/* Scrollable container */}
          <div className="flex-1 overflow-y-auto">
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
