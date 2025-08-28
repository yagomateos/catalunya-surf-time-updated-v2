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
  const { data: conditions, isLoading, isError } = useSurfConditions(spot.id);

  if (isLoading) {
    return (
      <div className="p-6 shadow-wave hover:shadow-deep transition-wave bg-gradient-to-br from-card to-secondary/20">
        <div className="flex justify-between items-start mb-4">
          <Skeleton className="h-6 w-2/4" />
          <Skeleton className="h-6 w-1/4" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div>
              <Skeleton className="h-4 w-12 mb-1" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div>
              <Skeleton className="h-4 w-12 mb-1" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div>
              <Skeleton className="h-4 w-12 mb-1" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div>
              <Skeleton className="h-4 w-12 mb-1" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <SurfConditionsCard
        spotId={spot.id}
        location={spot.name}
        waveHeight="--"
        waveDirection=""
        swellWaveHeight="--"
        swellWaveDirection=""
        swellWavePeriod="--"
        windSpeed="--"
        windDirection=""
        temperature="--"
        rating="poor"
      />
    );
  }

  return (
    <SurfConditionsCard
      spotId={spot.id}
      location={spot.name}
      waveHeight={conditions?.waveHeight || "--"}
      waveDirection={conditions?.windDirection ? degreesToCardinal(conditions.windDirection) : ""}
      swellWaveHeight={conditions?.swellWaveHeight || "--"}
      swellWaveDirection={conditions?.swellWaveDirection ? degreesToCardinal(conditions.swellWaveDirection) : ""}
      swellWavePeriod={conditions?.swellWavePeriod?.toString() || "--"}
      windSpeed={conditions?.windSpeed || "--"}
      windDirection={conditions?.windDirection ? degreesToCardinal(conditions.windDirection) : ""}
      temperature={conditions?.temperature || "--"}
      rating={conditions?.rating || spot.rating}
    />
  );
};

export default SurfConditionsWrapper;
