import { CardContent } from '@mui/material';
import Card from '@mui/material/Card';
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

export default function DozerCard({
  makeName,
  modelName,
  category,
  engineHpString,
  operatingWeightString,
  engineHp,
  operatingWeight,
  imageUrl
}: DozerInfo) {
  return (
    <div className="cardContainer">
      <Card>
        <CardContent>
          <div>Make: {makeName}</div>
          <div>Model: {modelName}</div>
          <div>Category: {category}</div>
          <div>Engine HP: {engineHpString}</div>
          <div>Operating weight: {operatingWeightString}</div>
          {/* <div>Engine HP: {engineHp}</div>
          <div>Operating weight: {operatingWeight}</div> */}
          <Image
            src={imageUrl}
            width={200}
            height={200}
            alt={`Picture of dozer ${makeName} - ${modelName}`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
