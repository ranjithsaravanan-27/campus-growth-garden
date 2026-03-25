import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface InsightCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  insight: string;
  color: 'primary' | 'secondary' | 'destructive' | 'accent';
  delay?: number;
}

const colorMap = {
  primary: {
    border: 'border-primary/20',
    text: 'text-primary',
    glow: 'shadow-[0_0_20px_hsl(152_55%_35%/0.15)]',
  },
  secondary: {
    border: 'border-secondary/20',
    text: 'text-secondary',
    glow: 'shadow-[0_0_20px_hsl(42_80%_55%/0.15)]',
  },
  destructive: {
    border: 'border-destructive/20',
    text: 'text-destructive',
    glow: '',
  },
  accent: {
    border: 'border-primary/15',
    text: 'text-accent-foreground',
    glow: '',
  },
};

export const InsightCard = ({ icon, label, value, insight, color, delay = 0 }: InsightCardProps) => {
  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`glass-panel p-5 border ${c.border} ${c.glow} cursor-default transition-shadow hover:shadow-xl`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className={`${c.text}`}>{icon}</div>
        <motion.span
          className={`text-3xl font-black ${c.text}`}
          key={String(value)}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
        >
          {value}
        </motion.span>
      </div>
      <p className="text-xs font-semibold text-foreground mb-0.5">{label}</p>
      <p className="text-[11px] text-muted-foreground leading-snug">{insight}</p>
    </motion.div>
  );
};
