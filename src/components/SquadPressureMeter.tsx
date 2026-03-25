import { motion } from 'framer-motion';
import { type TeamMember } from '@/lib/mockData';

interface SquadPressureMeterProps {
  members: TeamMember[];
}

const warningMessages = [
  { threshold: 25, message: '🚨 Critical! Most of the squad is offline.', color: 'text-destructive' },
  { threshold: 50, message: '⚠️ Half the squad is slacking. Rally them!', color: 'text-destructive' },
  { threshold: 75, message: '💪 Decent pressure, but room to improve.', color: 'text-secondary' },
  { threshold: 100, message: '🔥 Full squad active! Keep this energy!', color: 'text-primary' },
];

export const SquadPressureMeter = ({ members }: SquadPressureMeterProps) => {
  const activeCount = members.filter(m => !m.isInactive).length;
  const pressure = Math.round((activeCount / members.length) * 100);
  const warning = warningMessages.find(w => pressure <= w.threshold)!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 relative overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-5 rounded-2xl"
        style={{
          background: pressure >= 75
            ? 'linear-gradient(135deg, hsl(152 55% 35%), transparent)'
            : pressure >= 50
            ? 'linear-gradient(135deg, hsl(42 80% 55%), transparent)'
            : 'linear-gradient(135deg, hsl(0 72% 51%), transparent)',
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg text-foreground">🔥 Squad Pressure</h3>
          <motion.span
            className={`text-2xl font-black ${pressure >= 75 ? 'text-primary' : pressure >= 50 ? 'text-secondary' : 'text-destructive'}`}
            key={pressure}
            initial={{ scale: 1.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {pressure}%
          </motion.span>
        </div>

        {/* Pressure bar */}
        <div className="w-full h-3.5 bg-muted rounded-full overflow-hidden mb-3 relative">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: pressure >= 75
                ? 'linear-gradient(90deg, hsl(152 55% 35%), hsl(152 55% 45%))'
                : pressure >= 50
                ? 'linear-gradient(90deg, hsl(42 60% 45%), hsl(42 80% 55%))'
                : 'linear-gradient(90deg, hsl(0 60% 40%), hsl(0 72% 51%))',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${pressure}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          {pressure >= 75 && (
            <motion.div
              className="absolute top-0 h-full w-10 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
              animate={{ left: ['-10%', '110%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            />
          )}
        </div>

        {/* Warning message */}
        <motion.p
          className={`text-sm font-medium mb-4 ${warning.color}`}
          key={warning.message}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {warning.message}
        </motion.p>

        {/* Member pills */}
        <div className="flex gap-2 flex-wrap">
          {members.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-default ${
                m.isInactive
                  ? 'bg-destructive/15 text-destructive border border-destructive/30 ring-1 ring-destructive/20'
                  : 'bg-accent text-accent-foreground border border-primary/20'
              }`}
            >
              <span className="text-sm">{m.avatar}</span>
              <span>{m.name.split(' ')[0]}</span>
              {m.isInactive ? (
                <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  💤
                </motion.span>
              ) : (
                <span className="text-primary">✓</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
