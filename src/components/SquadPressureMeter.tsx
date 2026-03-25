import { type TeamMember } from '@/lib/mockData';

interface SquadPressureMeterProps {
  members: TeamMember[];
}

export const SquadPressureMeter = ({ members }: SquadPressureMeterProps) => {
  const activeCount = members.filter(m => !m.isInactive).length;
  const pressure = Math.round((activeCount / members.length) * 100);

  return (
    <div className="glass-panel p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-foreground">🔥 Squad Pressure</h3>
        <span className={`text-sm font-bold ${pressure >= 75 ? 'text-primary' : pressure >= 50 ? 'text-secondary' : 'text-destructive'}`}>
          {pressure}%
        </span>
      </div>
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            pressure >= 75 ? 'gradient-nature' : pressure >= 50 ? 'bg-secondary' : 'bg-destructive'
          }`}
          style={{ width: `${pressure}%` }}
        />
      </div>
      <div className="mt-3 flex gap-2 flex-wrap">
        {members.map(m => (
          <div
            key={m.id}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
              m.isInactive ? 'bg-destructive/10 text-destructive' : 'bg-accent text-accent-foreground'
            }`}
          >
            <span>{m.avatar}</span>
            <span>{m.name.split(' ')[0]}</span>
            {m.isInactive && <span>💤</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
