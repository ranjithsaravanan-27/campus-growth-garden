import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, Code2, CheckCircle, ExternalLink } from 'lucide-react';
import { mockTeam } from '@/lib/mockData';

const Profile = () => {
  const user = mockTeam.members[0]; // Demo user
  const [leetcodeInput, setLeetcodeInput] = useState(user.leetcodeUsername);
  const [verified, setVerified] = useState(true);

  const diffBreakdown = [
    { label: 'Easy', count: 12, color: 'bg-primary' },
    { label: 'Medium', count: 5, color: 'bg-secondary' },
    { label: 'Hard', count: 1, color: 'bg-ember' },
  ];

  return (
    <div className="min-h-screen px-4 md:px-8 pt-20 pb-28 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>

        {/* User info */}
        <div className="glass-panel p-6 flex items-center gap-4">
          <span className="text-5xl">{user.avatar}</span>
          <div>
            <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
            <p className="text-sm text-muted-foreground">alex.chen@university.edu</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                <Github className="w-3 h-3" /> @{user.githubUsername}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                {mockTeam.name}
              </span>
            </div>
          </div>
        </div>

        {/* GitHub stats */}
        <div className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <Github className="w-5 h-5 text-foreground" />
            <h3 className="font-semibold text-foreground">GitHub Activity</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-xl bg-background/50">
              <p className="text-2xl font-bold text-foreground">{user.commits}</p>
              <p className="text-xs text-muted-foreground">Commits</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-background/50">
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">Repos</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-background/50">
              <p className="text-2xl font-bold text-foreground">{user.streak}d</p>
              <p className="text-xs text-muted-foreground">Streak</p>
            </div>
          </div>
        </div>

        {/* LeetCode */}
        <div className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-5 h-5 text-foreground" />
            <h3 className="font-semibold text-foreground">LeetCode</h3>
            {verified && <CheckCircle className="w-4 h-4 text-primary" />}
          </div>
          <div className="flex gap-2 mb-4">
            <Input
              value={leetcodeInput}
              onChange={e => { setLeetcodeInput(e.target.value); setVerified(false); }}
              placeholder="LeetCode username"
              className="rounded-xl font-mono"
            />
            <Button variant="outline" className="rounded-xl" onClick={() => setVerified(true)}>
              Verify
            </Button>
          </div>
          {verified && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 rounded-xl bg-background/50">
                  <p className="text-2xl font-bold text-foreground">{user.problemsSolved}</p>
                  <p className="text-xs text-muted-foreground">Problems Solved</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-background/50">
                  <p className="text-2xl font-bold text-foreground">{user.streak}d</p>
                  <p className="text-xs text-muted-foreground">Daily Streak</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Difficulty Breakdown</p>
                {diffBreakdown.map(d => (
                  <div key={d.label} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-16">{d.label}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${d.color}`} style={{ width: `${(d.count / 18) * 100}%` }} />
                    </div>
                    <span className="text-xs font-medium text-foreground w-6">{d.count}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Points summary */}
        <div className="glass-panel p-6 text-center">
          <p className="text-sm text-muted-foreground mb-1">Total Productivity Points</p>
          <p className="text-4xl font-bold text-gradient-nature">{user.points}</p>
          <a href="#" className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-2 hover:text-foreground transition">
            How are points calculated? <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
