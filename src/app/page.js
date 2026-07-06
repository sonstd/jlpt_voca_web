import { LEVELS, getTotalDays } from '@/lib/words';
import HomeClient from '@/components/HomeClient';

export default async function HomePage() {
  const levels = await Promise.all(
    Object.entries(LEVELS).map(async ([key, { label }]) => ({
      key,
      label,
      totalDays: await getTotalDays(key),
    }))
  );

  return <HomeClient levels={levels} />;
}