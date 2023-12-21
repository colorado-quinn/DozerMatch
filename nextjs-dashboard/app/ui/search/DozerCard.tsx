import { Box, Card, CardActionArea, CardContent } from '@mui/material';
import Image from 'next/image';

export interface DozerInfo {
  modelId: string;
  makeName: string;
  modelName: string;
  category: string;
  engineHp: number | undefined;
  engineHpString: string; // TODO: remove string and use number?
  operatingWeight: number | undefined;
  operatingWeightString: string; // TODO: remove string and use number?
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
          <CardContent>
            <Box display={'flex'} justifyContent={'center'}>
              <Image
                src={dozer.imageUrl}
                width={200}
                height={200}
                alt={`Picture of dozer ${dozer.makeName} - ${dozer.modelName}`}
              />
            </Box>
            <div>Make: {dozer.makeName}</div>
            <div>Model: {dozer.modelName}</div>
            <div>Category: {dozer.category}</div>
            <div>Engine HP: {dozer.engineHpString}</div>
            <div>Operating weight: {dozer.operatingWeightString}</div>
            {/* <div>Engine HP: {engineHp}</div>
          <div>Operating weight: {operatingWeight}</div> */}
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
