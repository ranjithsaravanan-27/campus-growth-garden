import { motion } from 'framer-motion';
import { useState } from 'react';
import { Target, Link2, Code, Trophy } from 'lucide-react';

interface DailyMissionProps {
  mission: string;
  streakSync: number;
}

export const DailyMission = ({ mission, streakSync }: DailyMissionProps) => {
  const [progress] = useState(68);
  const [showReward, setShowReward] = useState(false);

  const handleComplete = () => {
    setShowReward(true);
    setTimeout(() => setShowReward(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-40 h-40 gradient-nature opacity-[0.07] rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" /> Daily Squad Mission
          </h3>
          <motion.span
            className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent text-accent-foreground border border-primary/20 flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
          >
            <Link2 className="w-3 h-3" /> Streak: {streakSync}d
          </motion.span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{mission}</p>

        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground font-medium">Progress</span>
            <span className="font-bold text-foreground">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden relative">
            <motion.div
              className="h-full rounded-full gradient-nature"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            />
            <motion.div
              className="absolute top-0 h-full w-8 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
              animate={{ left: ['-10%', '110%'] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
            />
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          {[
            { label: 'Commits', current: 7, target: 10, Icon: Code },
            { label: 'Problems', current: 3, target: 5, Icon: Target },
          ].map(task => (
            <div key={task.label} className="flex-1 bg-muted/50 rounded-xl p-2.5 text-center">
              <task.Icon className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
              <p className="text-sm font-bold text-foreground">{task.current}/{task.target}</p>
              <p className="text-[10px] text-muted-foreground">{task.label}</p>
            </div>
          ))}
        </div>

        <motion.button
          onClick={handleComplete}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-xl gradient-nature text-primary-foreground font-semibold text-sm shadow-md hover:shadow-lg transition-shadow"
        >
          {progress >= 100 ? 'Claim Reward!' : 'Simulate Progress'}
        </motion.button>
      </div>

      {showReward && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5, times: [0, 0.7, 1] }}
          >
            <motion.div
              className="mx-auto mb-2"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Trophy className="w-16 h-16 text-secondary mx-auto" />
            </motion.div>
            <p className="font-bold text-foreground text-lg">+50 Bonus Points!</p>
            <p className="text-sm text-muted-foreground">Mission Complete!</p>
          </motion.div>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: ['hsl(152 55% 45%)', 'hsl(42 80% 55%)', 'hsl(42 90% 50%)', 'hsl(15 85% 55%)'][i % 4],
                left: '50%', top: '50%',
              }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: Math.cos(i * 30 * Math.PI / 180) * 100,
                y: Math.sin(i * 30 * Math.PI / 180) * 100,
                opacity: 0,
                scale: [1, 0],
              }}
              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
