import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import Image from 'next/image';

export interface DozerInfo {
  modelId: string;
  makeName: string;
  modelName: string;
  category: string;
  engineHp: number | undefined;
  engineHpString: string;
  operatingWeight: number | undefined;
  operatingWeightString: string;
  imageUrl: string;
}
export interface DozerCardProps {
  dozer: DozerInfo;
  onDozerClick: (dozerInfo: DozerInfo) => void;
}

export default function DozerCard({ dozer, onDozerClick }: DozerCardProps) {
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
              <Typography variant='body1'><b>Make:</b> {dozer.makeName}</Typography>
              <Typography variant='body1'><b>Model:</b> {dozer.modelName}</Typography>
              <Typography variant='body1'><b>Category:</b> {dozer.category}</Typography>
              <Typography variant='body1'><b>Engine HP:</b> {dozer.engineHpString}</Typography>
              <Typography variant='body1'><b>Operating weight:</b> {dozer.operatingWeightString}</Typography>
            </span>
            {/* <div>Engine HP: {engineHp}</div>
              <div>Operating weight: {operatingWeight}</div> */}
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
