import { type TeamMember } from '@/lib/mockData';
import { motion } from 'framer-motion';

interface MemberCardProps {
  member: TeamMember;
  rank: number;
}

const rankEmojis = ['🥇', '🥈', '🥉'];

export const MemberCard = ({ member, rank }: MemberCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.08 }}
      whileHover={{ x: 4, scale: 1.01 }}
      className={`glass-panel p-4 flex items-center gap-4 cursor-default transition-shadow hover:shadow-lg ${
        member.isInactive ? 'opacity-50 border-destructive/20' : ''
      } ${rank === 0 ? 'border-primary/30 glow-green' : ''}`}
    >
      <span className="text-xl font-bold w-8 text-center">
        {rank < 3 ? rankEmojis[rank] : <span className="text-muted-foreground text-base">#{rank + 1}</span>}
      </span>
      <span className="text-2xl">{member.avatar}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-foreground truncate">{member.name}</p>
          {member.isInactive && (
            <motion.span
              className="px-2 py-0.5 text-xs rounded-full bg-destructive/15 text-destructive font-semibold border border-destructive/30"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💤 Inactive
            </motion.span>
          )}
          {member.streak >= 7 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-secondary/20 text-secondary font-semibold">
              🔥 {member.streak}d streak
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {member.commits} commits • {member.problemsSolved} problems • Last active {member.lastActive}
        </p>
      </div>
      <div className="text-right">
        <motion.p
          className="text-xl font-black text-foreground"
          key={member.points}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
        >
          {member.points}
        </motion.p>
        <p className="text-[10px] text-muted-foreground font-medium">pts</p>
      </div>
    </motion.div>
  );
};
