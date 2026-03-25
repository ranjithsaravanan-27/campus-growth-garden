import { type TeamMember } from '@/lib/mockData';
import { motion } from 'framer-motion';

interface MemberCardProps {
  member: TeamMember;
  rank: number;
}

export const MemberCard = ({ member, rank }: MemberCardProps) => {
  const rankColors = ['text-streak', 'text-muted-foreground', 'text-tree-brown'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
      className={`glass-panel p-4 flex items-center gap-4 ${member.isInactive ? 'opacity-60' : ''}`}
    >
      <span className={`text-2xl font-bold w-8 ${rankColors[rank] || 'text-muted-foreground'}`}>
        #{rank + 1}
      </span>
      <span className="text-2xl">{member.avatar}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-foreground truncate">{member.name}</p>
          {member.isInactive && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-destructive/10 text-destructive font-medium">
              Inactive
            </span>
          )}
          {member.streak >= 7 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-secondary/20 text-secondary font-medium">
              🔥 {member.streak}d
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {member.commits} commits • {member.problemsSolved} problems
        </p>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-foreground">{member.points}</p>
        <p className="text-xs text-muted-foreground">pts</p>
      </div>
    </motion.div>
  );
};
