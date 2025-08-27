import { useSurfConditions } from "@/hooks/useSurfConditions";
import SurfConditionsCard from "./SurfConditionsCard";
import { Skeleton } from "./ui/skeleton";

export interface SurfSpot {
  id: string;
  name: string;
  coordinates: [number, number];
  rating: 'excellent' | 'good' | 'fair';
  region: string;
  waveHeight?: string;
  windSpeed?: string;
}

interface SurfConditionsWrapperProps {
  spot: SurfSpot;
}

const degreesToCardinal = (deg: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(deg / 45) % 8];
};

const SurfConditionsWrapper = ({ spot }: SurfConditionsWrapperProps) => {
  const { data: conditions, isLoading, isError, error } = useSurfConditions(spot.id);

  if (isLoading) {
    return <Skeleton className="h-[200px] w-full rounded-lg" />;
  }

  if (isError) {
    return (
      <div className="p-4 border rounded-lg bg-destructive/10 text-destructive">
        <p className="font-bold">Error al cargar los datos de {spot.name}</p>
        <p className="text-xs">{error.message}</p>
      </div>
    );
  }

  if (!conditions) {
    return null;
  }

  return (
    <SurfConditionsCard
      location={spot.name}
      waveHeight={conditions.waveHeight}
      waveDirection={degreesToCardinal(conditions.windDirection)}
      windSpeed={conditions.windSpeed}
      windDirection={degreesToCardinal(conditions.windDirection)}
      temperature={conditions.temperature}
      visibility={"N/A"}
      rating={conditions.rating}
    />
  );
};

export default SurfConditionsWrapper;