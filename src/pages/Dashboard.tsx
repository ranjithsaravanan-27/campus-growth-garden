import { motion } from 'framer-motion';
import { TreeVisualization } from '@/components/TreeVisualization';
import { ActivityChart } from '@/components/ActivityChart';
import { MemberCard } from '@/components/MemberCard';
import { SquadPressureMeter } from '@/components/SquadPressureMeter';
import { DailyMission } from '@/components/DailyMission';
import { InsightCard } from '@/components/InsightCard';
import { mockTeam, TREE_STAGES } from '@/lib/mockData';

const Dashboard = () => {
  const sortedMembers = [...mockTeam.members].sort((a, b) => b.points - a.points);
  const currentStageInfo = TREE_STAGES.find(s => s.stage === mockTeam.treeStage)!;
  const nextStageInfo = TREE_STAGES[TREE_STAGES.indexOf(currentStageInfo) + 1];
  const progress = nextStageInfo
    ? ((mockTeam.points - currentStageInfo.minPoints) / (nextStageInfo.minPoints - currentStageInfo.minPoints)) * 100
    : 100;

  const topContributor = sortedMembers[0];
  const totalCommits = mockTeam.members.reduce((s, m) => s + m.commits, 0);
  const totalProblems = mockTeam.members.reduce((s, m) => s + m.problemsSolved, 0);

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

        {/* === TREE CENTERPIECE === */}
        <motion.div
          className="glass-panel p-8 mb-6 glow-green flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TreeVisualization stage={mockTeam.treeStage} health={mockTeam.treeHealth} points={mockTeam.points} />
          {nextStageInfo && (
            <div className="w-full max-w-md mt-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5 font-medium">
                <span>{currentStageInfo.label}</span>
                <span>{nextStageInfo.label}</span>
              </div>
              <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full gradient-nature rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-1.5 font-medium">
                ⚡ {nextStageInfo.minPoints - mockTeam.points} pts to next stage
              </p>
            </div>
          )}
        </motion.div>

        {/* === INSIGHT STATS === */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <InsightCard
            icon="⚡" label="Team Points" value={mockTeam.points}
            insight={`Top 15% of all squads`}
            color="primary" delay={0}
          />
          <InsightCard
            icon="👥" label="Active Members" value={`${mockTeam.members.filter(m => !m.isInactive).length}/${mockTeam.members.length}`}
            insight={mockTeam.members.some(m => m.isInactive) ? 'Some members need a nudge!' : 'Everyone is contributing!'}
            color={mockTeam.members.some(m => m.isInactive) ? 'destructive' : 'accent'} delay={0.05}
          />
          <InsightCard
            icon="💻" label="Total Commits" value={totalCommits}
            insight={`${topContributor.name} leads with ${topContributor.commits}`}
            color="secondary" delay={0.1}
          />
          <InsightCard
            icon="🧩" label="Problems Solved" value={totalProblems}
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
            {/* Smart insight banner */}
            <motion.div
              className="glass-panel p-4 border-l-4 border-primary"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm font-semibold text-foreground">
                💡 <span className="text-primary">{topContributor.name}</span> is the top contributor this week!
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                The team's productivity is up 18% compared to last week. Keep the momentum going!
              </p>
            </motion.div>

            <ActivityChart />

            {/* Leaderboard */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                🏆 Leaderboard
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
