import { motion } from 'framer-motion';

interface DailyMissionProps {
  mission: string;
  streakSync: number;
}

export const DailyMission = ({ mission, streakSync }: DailyMissionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 gradient-nature opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <h3 className="font-semibold text-foreground mb-2">🎯 Daily Squad Mission</h3>
      <p className="text-sm text-muted-foreground mb-3">{mission}</p>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent text-accent-foreground">
          🧩 Team Streak: {streakSync} days
        </span>
      </div>
    </motion.div>
  );
};
