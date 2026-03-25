import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockTeam } from '@/lib/mockData';
import { Copy, Check, UserPlus, Users } from 'lucide-react';

const Team = () => {
  const [copied, setCopied] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [tab, setTab] = useState<'view' | 'create' | 'join'>('view');

  const handleCopy = () => {
    navigator.clipboard.writeText(mockTeam.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen px-4 md:px-8 pt-20 pb-28 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground mb-2">Team</h1>
        <p className="text-muted-foreground mb-8">Manage your squad (2-4 members)</p>

        {/* Tab buttons */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'view' as const, label: 'My Team', icon: Users },
            { id: 'create' as const, label: 'Create', icon: UserPlus },
            { id: 'join' as const, label: 'Join', icon: UserPlus },
          ].map(t => (
            <Button
              key={t.id}
              variant={tab === t.id ? 'default' : 'outline'}
              onClick={() => setTab(t.id)}
              className="rounded-xl"
            >
              <t.icon className="w-4 h-4 mr-2" /> {t.label}
            </Button>
          ))}
        </div>

        {tab === 'view' && (
          <div className="space-y-6">
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{mockTeam.name}</h2>
                  <p className="text-sm text-muted-foreground">{mockTeam.members.length}/4 members</p>
                </div>
                <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-mono hover:bg-accent/80 transition">
                  {mockTeam.code}
                  {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="space-y-3">
                {mockTeam.members.map(m => (
                  <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl bg-background/50">
                    <span className="text-2xl">{m.avatar}</span>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{m.name}</p>
                      <p className="text-xs text-muted-foreground">
                        @{m.githubUsername} • {m.lastActive}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{m.points} pts</p>
                      {m.streak > 0 && <p className="text-xs text-secondary">🔥 {m.streak}d streak</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'create' && (
          <div className="glass-panel p-6 space-y-4">
            <h2 className="text-xl font-bold text-foreground">Create a Team</h2>
            <Input placeholder="Team Name" className="rounded-xl" />
            <Button className="w-full rounded-xl gradient-nature text-primary-foreground border-0">
              Create Team
            </Button>
            <p className="text-xs text-muted-foreground text-center">A unique team code will be generated automatically</p>
          </div>
        )}

        {tab === 'join' && (
          <div className="glass-panel p-6 space-y-4">
            <h2 className="text-xl font-bold text-foreground">Join a Team</h2>
            <Input
              placeholder="Enter Team Code (e.g. BYTE-4X2K)"
              value={joinCode}
              onChange={e => setJoinCode(e.target.value)}
              className="rounded-xl font-mono"
            />
            <Button className="w-full rounded-xl gradient-nature text-primary-foreground border-0" disabled={!joinCode}>
              Join Team
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Team;
