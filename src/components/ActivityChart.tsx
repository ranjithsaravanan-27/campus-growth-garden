import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { mockActivity } from '@/lib/mockData';

export const ActivityChart = () => {
  return (
    <div className="glass-panel p-6">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Weekly Activity</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={mockActivity} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '12px',
              fontSize: '13px',
            }}
          />
          <Bar dataKey="commits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Commits" />
          <Bar dataKey="problems" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} name="Problems" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
