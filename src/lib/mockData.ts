export type TreeStage = 'seed' | 'sprout' | 'growing' | 'small-tree' | 'full-tree';

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  githubUsername: string;
  leetcodeUsername: string;
  commits: number;
  problemsSolved: number;
  points: number;
  streak: number;
  lastActive: string;
  isInactive: boolean;
}

export interface Team {
  id: string;
  name: string;
  code: string;
  points: number;
  treeStage: TreeStage;
  treeHealth: number;
  members: TeamMember[];
  dailyMission: string;
  streakSync: number;
}

export interface ActivityLog {
  date: string;
  commits: number;
  problems: number;
  points: number;
}

export const getTreeStage = (points: number): TreeStage => {
  if (points >= 600) return 'full-tree';
  if (points >= 300) return 'small-tree';
  if (points >= 150) return 'growing';
  if (points >= 50) return 'sprout';
  return 'seed';
};

export const mockTeam: Team = {
  id: '1',
  name: 'Byte Builders',
  code: 'BYTE-4X2K',
  points: 425,
  treeStage: 'small-tree',
  treeHealth: 85,
  members: [
    { id: '1', name: 'Alex Chen', avatar: 'AC', githubUsername: 'alexchen', leetcodeUsername: 'alex_lc', commits: 34, problemsSolved: 18, points: 350, streak: 7, lastActive: '2h ago', isInactive: false },
    { id: '2', name: 'Priya Sharma', avatar: 'PS', githubUsername: 'priyash', leetcodeUsername: 'priya_s', commits: 28, problemsSolved: 22, points: 360, streak: 12, lastActive: '30m ago', isInactive: false },
    { id: '3', name: 'Jordan Lee', avatar: 'JL', githubUsername: 'jordanl', leetcodeUsername: 'jlee99', commits: 15, problemsSolved: 8, points: 155, streak: 3, lastActive: '1d ago', isInactive: false },
    { id: '4', name: 'Sam Rivera', avatar: 'SR', githubUsername: 'samriv', leetcodeUsername: 'sam_r', commits: 5, problemsSolved: 2, points: 45, streak: 0, lastActive: '3d ago', isInactive: true },
  ],
  dailyMission: 'Squad goal: 5 LeetCode problems + 10 commits today!',
  streakSync: 3,
};

export const mockActivity: ActivityLog[] = [
  { date: 'Mon', commits: 12, problems: 5, points: 110 },
  { date: 'Tue', commits: 8, problems: 7, points: 110 },
  { date: 'Wed', commits: 15, problems: 3, points: 105 },
  { date: 'Thu', commits: 6, problems: 9, points: 120 },
  { date: 'Fri', commits: 20, problems: 4, points: 140 },
  { date: 'Sat', commits: 3, problems: 2, points: 35 },
  { date: 'Sun', commits: 10, problems: 6, points: 110 },
];

export const TREE_STAGES = [
  { stage: 'seed' as TreeStage, label: 'Seed', minPoints: 0, maxPoints: 50 },
  { stage: 'sprout' as TreeStage, label: 'Sprout', minPoints: 50, maxPoints: 150 },
  { stage: 'growing' as TreeStage, label: 'Growing', minPoints: 150, maxPoints: 300 },
  { stage: 'small-tree' as TreeStage, label: 'Small Tree', minPoints: 300, maxPoints: 600 },
  { stage: 'full-tree' as TreeStage, label: 'Full Tree', minPoints: 600, maxPoints: Infinity },
];
