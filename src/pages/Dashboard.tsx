import { motion } from 'framer-motion';
import { TreeVisualization } from '@/components/TreeVisualization';
import { ActivityChart } from '@/components/ActivityChart';
import { MemberCard } from '@/components/MemberCard';
import { SquadPressureMeter } from '@/components/SquadPressureMeter';
import { DailyMission } from '@/components/DailyMission';
import { mockTeam, TREE_STAGES } from '@/lib/mockData';

const Dashboard = () => {
  const sortedMembers = [...mockTeam.members].sort((a, b) => b.points - a.points);
  const currentStageInfo = TREE_STAGES.find(s => s.stage === mockTeam.treeStage)!;
  const nextStageInfo = TREE_STAGES[TREE_STAGES.indexOf(currentStageInfo) + 1];
  const progress = nextStageInfo
    ? ((mockTeam.points - currentStageInfo.minPoints) / (nextStageInfo.minPoints - currentStageInfo.minPoints)) * 100
    : 100;

  return (
    <div className="min-h-screen px-4 md:px-8 pt-20 pb-28 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{mockTeam.name}</h1>
          <p className="text-muted-foreground">Team Code: <span className="font-mono text-foreground">{mockTeam.code}</span></p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Tree + Progress */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel p-6 flex flex-col items-center glow-green">
              <TreeVisualization stage={mockTeam.treeStage} health={mockTeam.treeHealth} points={mockTeam.points} />
              {nextStageInfo && (
                <div className="w-full mt-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{currentStageInfo.label}</span>
                    <span>{nextStageInfo.label}</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full gradient-nature rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    {nextStageInfo.minPoints - mockTeam.points} pts to next stage
                  </p>
                </div>
              )}
            </div>
            <DailyMission mission={mockTeam.dailyMission} streakSync={mockTeam.streakSync} />
          </div>

          {/* Right: Stats + Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Team Points', value: mockTeam.points, icon: '⚡' },
                { label: 'Members', value: mockTeam.members.length, icon: '👥' },
                { label: 'Total Commits', value: mockTeam.members.reduce((s, m) => s + m.commits, 0), icon: '💻' },
                { label: 'Problems', value: mockTeam.members.reduce((s, m) => s + m.problemsSolved, 0), icon: '🧩' },
              ].map(stat => (
                <div key={stat.label} className="glass-panel p-4 text-center">
                  <span className="text-xl">{stat.icon}</span>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <SquadPressureMeter members={mockTeam.members} />
            <ActivityChart />

            {/* Leaderboard */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">🏆 Leaderboard</h3>
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
