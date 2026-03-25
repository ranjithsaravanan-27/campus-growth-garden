import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { mockActivity } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export const ActivityChart = () => {
  return (
    <motion.div
      className="glass-panel p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" /> Weekly Activity
        </h3>
        <div className="flex gap-3">
          {[
            { label: 'Commits', color: 'bg-primary' },
            { label: 'Problems', color: 'bg-secondary' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
              <span className="text-xs text-muted-foreground font-medium">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={mockActivity}>
          <defs>
            <linearGradient id="gradCommits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(152 55% 35%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(152 55% 35%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradProblems" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(42 80% 55%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(42 80% 55%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '12px',
              fontSize: '13px',
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)',
            }}
          />
          <Area type="monotone" dataKey="commits" stroke="hsl(152 55% 35%)" strokeWidth={2.5} fill="url(#gradCommits)" name="Commits" animationDuration={1500} />
          <Area type="monotone" dataKey="problems" stroke="hsl(42 80% 55%)" strokeWidth={2.5} fill="url(#gradProblems)" name="Problems" animationDuration={1500} animationBegin={300} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
