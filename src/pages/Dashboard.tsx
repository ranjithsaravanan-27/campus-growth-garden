import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TreeVisualization } from '@/components/TreeVisualization';
import { ActivityChart } from '@/components/ActivityChart';
import { MemberCard } from '@/components/MemberCard';
import { SquadPressureMeter } from '@/components/SquadPressureMeter';
import { DailyMission } from '@/components/DailyMission';
import { InsightCard } from '@/components/InsightCard';
import { mockTeam, TREE_STAGES, getTreeStage } from '@/lib/mockData';
import { Zap, Users, GitCommit, PuzzleIcon, Trophy, Lightbulb, Plus, Minus } from 'lucide-react';

const Dashboard = () => {
  // Interactive state for demo
  const [teamPoints, setTeamPoints] = useState(mockTeam.points);
  const [treeHealth, setTreeHealth] = useState(mockTeam.treeHealth);
  const [showParticles, setShowParticles] = useState(false);

  const currentStage = getTreeStage(teamPoints);
  const currentStageInfo = TREE_STAGES.find(s => s.stage === currentStage)!;
  const nextStageInfo = TREE_STAGES[TREE_STAGES.indexOf(currentStageInfo) + 1];
  const progress = nextStageInfo
    ? ((teamPoints - currentStageInfo.minPoints) / (nextStageInfo.minPoints - currentStageInfo.minPoints)) * 100
    : 100;

  const sortedMembers = [...mockTeam.members].sort((a, b) => b.points - a.points);
  const topContributor = sortedMembers[0];
  const totalCommits = mockTeam.members.reduce((s, m) => s + m.commits, 0);
  const totalProblems = mockTeam.members.reduce((s, m) => s + m.problemsSolved, 0);

  const addPoints = useCallback((amount: number) => {
    setTeamPoints(p => Math.max(0, p + amount));
    if (amount > 0) {
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 100);
    }
  }, []);

  const adjustHealth = useCallback((amount: number) => {
    setTreeHealth(h => Math.min(100, Math.max(0, h + amount)));
  }, []);

  return (
    <div className="min-h-screen px-4 md:px-8 pt-20 pb-28 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-black text-foreground">{mockTeam.name}</h1>
            <p className="text-muted-foreground text-sm">
              Team Code: <span className="font-mono text-foreground bg-muted px-2 py-0.5 rounded-md">{mockTeam.code}</span>
            </p>
          </div>
          <motion.div
            className="hidden md:flex items-center gap-2 glass-panel px-4 py-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">Live</span>
          </motion.div>
        </div>

        {/* ═══ TREE CENTERPIECE ═══ */}
        <motion.div
          className="glass-panel p-6 md:p-10 mb-6 glow-green flex flex-col items-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle at 30% 50%, hsl(152 55% 45%), transparent 50%), radial-gradient(circle at 70% 50%, hsl(42 80% 55%), transparent 50%)',
          }} />

          <div className="relative z-10">
            <TreeVisualization
              stage={currentStage}
              health={treeHealth}
              points={teamPoints}
              members={mockTeam.members}
              showParticles={showParticles}
            />
          </div>

          {/* Progress to next stage */}
          {nextStageInfo && (
            <div className="w-full max-w-lg mt-6 relative z-10">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5 font-medium">
                <span>{currentStageInfo.label}</span>
                <span>{nextStageInfo.label}</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full gradient-nature rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
                <motion.div
                  className="absolute top-0 h-full w-16 rounded-full"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
                  animate={{ left: ['-10%', '110%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              <motion.p
                className="text-xs text-muted-foreground text-center mt-2 font-medium"
                key={teamPoints}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
              >
                {Math.max(0, (nextStageInfo?.minPoints ?? 0) - teamPoints)} pts to next stage
              </motion.p>
            </div>
          )}

          {/* Interactive demo controls */}
          <div className="flex items-center gap-3 mt-5 relative z-10">
            <span className="text-xs text-muted-foreground font-medium">Demo:</span>
            <div className="flex items-center gap-1">
              <button onClick={() => addPoints(-50)} className="w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors">
                <Minus className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              <span className="text-xs font-medium text-muted-foreground px-1">Points</span>
              <button onClick={() => addPoints(50)} className="w-8 h-8 rounded-lg bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors">
                <Plus className="w-3.5 h-3.5 text-primary" />
              </button>
            </div>
            <div className="w-px h-5 bg-border" />
            <div className="flex items-center gap-1">
              <button onClick={() => adjustHealth(-15)} className="w-8 h-8 rounded-lg bg-destructive/15 hover:bg-destructive/25 flex items-center justify-center transition-colors">
                <Minus className="w-3.5 h-3.5 text-destructive" />
              </button>
              <span className="text-xs font-medium text-muted-foreground px-1">Health</span>
              <button onClick={() => adjustHealth(15)} className="w-8 h-8 rounded-lg bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors">
                <Plus className="w-3.5 h-3.5 text-primary" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ═══ INSIGHT STATS ═══ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <InsightCard
            icon={<Zap className="w-5 h-5" />} label="Team Points" value={teamPoints}
            insight="Top 15% of all squads"
            color="primary" delay={0}
          />
          <InsightCard
            icon={<Users className="w-5 h-5" />} label="Active Members" value={`${mockTeam.members.filter(m => !m.isInactive).length}/${mockTeam.members.length}`}
            insight={mockTeam.members.some(m => m.isInactive) ? 'Some members need a nudge!' : 'Everyone is contributing!'}
            color={mockTeam.members.some(m => m.isInactive) ? 'destructive' : 'accent'} delay={0.05}
          />
          <InsightCard
            icon={<GitCommit className="w-5 h-5" />} label="Total Commits" value={totalCommits}
            insight={`${topContributor.name} leads with ${topContributor.commits}`}
            color="secondary" delay={0.1}
          />
          <InsightCard
            icon={<PuzzleIcon className="w-5 h-5" />} label="Problems Solved" value={totalProblems}
            insight="Team consistency increased 12%"
            color="accent" delay={0.15}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            <DailyMission mission={mockTeam.dailyMission} streakSync={mockTeam.streakSync} />
            <SquadPressureMeter members={mockTeam.members} />
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              className="glass-panel p-4 border-l-4 border-primary flex items-start gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  <span className="text-primary">{topContributor.name}</span> is the top contributor this week!
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  The team's productivity is up 18% compared to last week. Keep the momentum going!
                </p>
              </div>
            </motion.div>

            <ActivityChart />

            <div>
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-secondary" /> Leaderboard
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                  {sortedMembers.length} members
                </span>
              </h3>
              <div className="space-y-2">
                {sortedMembers.map((m, i) => (
                  <MemberCard key={m.id} member={m} rank={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
