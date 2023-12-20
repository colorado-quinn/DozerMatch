export interface DozerCardProps {
  makeName: string;
  modelName: string;
  category: string;
  engineHp: string; // TODO: number
  operatingWeight: string;  // TODO: number
}

export default function DozerCard({
  makeName,
  modelName,
  category,
  engineHp,
  operatingWeight,
}: DozerCardProps) {
  return (
    <div>
      <div>Make: {makeName}</div>
      <div>Model: {modelName}</div>
      <div>Category: {category}</div>
      <div>Engine HP: {engineHp}</div>
      <div>Operating weight: {operatingWeight}</div>
    </div>
  );
}
