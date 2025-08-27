import SurfConditionsCard from "./SurfConditionsCard";

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

const SurfConditionsWrapper = ({ spot }: SurfConditionsWrapperProps) => {
  // This component no longer fetches live data automatically.
  // It just displays the static information.
  // The user can click to go to the map/details page to see live conditions.

  return (
    <SurfConditionsCard
      location={spot.name}
      waveHeight={spot.waveHeight || "--"} // Display static data if available
      waveDirection={'' as any} // Static card won't show this
      windSpeed={spot.windSpeed || "--"}
      windDirection={'' as any} // Static card won't show this
      temperature={"--"}
      visibility={"--"}
      rating={spot.rating}
    />
  );
};

export default SurfConditionsWrapper;