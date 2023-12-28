import { Box, Card, CardActionArea, CardContent } from '@mui/material';
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
            <span>
              <Image
                src={dozer.imageUrl}
                width={150}
                height={150}
                alt={`Picture of dozer ${dozer.makeName} - ${dozer.modelName}`}
              />
            </span>
            <span className="cardInfo">
              <div>Make: {dozer.makeName}</div>
              <div>Model: {dozer.modelName}</div>
              <div>Category: {dozer.category}</div>
              <div>Engine HP: {dozer.engineHpString}</div>
              <div>Operating weight: {dozer.operatingWeightString}</div>
            </span>
            {/* <div>Engine HP: {engineHp}</div>
              <div>Operating weight: {operatingWeight}</div> */}
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
