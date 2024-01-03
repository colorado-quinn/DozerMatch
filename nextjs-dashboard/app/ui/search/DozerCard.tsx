
import { DozerInfo } from './types';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import Image from 'next/image';

export interface DozerCardProps {
  dozer: DozerInfo;
  onDozerClick: (dozerInfo: DozerInfo) => void;
}

export default function DozerCard({ dozer, onDozerClick }: DozerCardProps) {
  const textVariant:Variant = 'body2';

  return (
    <div className="cardContainer">
      <Card>
        <CardActionArea onClick={() => onDozerClick(dozer)}>
          <CardContent className="cardContent">
            <span style={{width:"150px"}}>
              <Image
                src={dozer.imageUrl}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
                alt={`Picture of dozer ${dozer.makeName} - ${dozer.modelName}`}
              />
            </span>
            <span className="ml-5">
              <Typography variant={textVariant}><b>Make:</b> {dozer.makeName}</Typography>
              <Typography variant={textVariant}><b>Model:</b> {dozer.modelName}</Typography>
              <Typography variant={textVariant}><b>Category:</b> {dozer.category}</Typography>
              <Typography variant={textVariant}><b>Engine HP:</b> {dozer.engineHpString}</Typography>
              <Typography variant={textVariant}><b>Operating weight:</b> {dozer.operatingWeightString}</Typography>
            </span>
            {/* <div>Engine HP: {engineHp}</div>
              <div>Operating weight: {operatingWeight}</div> */}
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
