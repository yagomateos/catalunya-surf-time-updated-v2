import { useQuery } from '@tanstack/react-query';
import { fetchSurfConditions } from '../services/surfService';

export const useSurfConditions = (spotId: string) => {
  return useQuery({
    queryKey: ['surfConditions', spotId],
    queryFn: () => fetchSurfConditions(spotId),
    enabled: !!spotId,
    refetchInterval: 300000, // 5 minutes
    staleTime: 60000, // 1 minute
  });
};