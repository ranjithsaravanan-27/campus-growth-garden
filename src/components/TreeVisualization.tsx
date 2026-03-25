import { motion } from 'framer-motion';
import { type TreeStage } from '@/lib/mockData';

interface TreeVisualizationProps {
  stage: TreeStage;
  health: number;
  points: number;
}

const Seed = () => (
  <g>
    <ellipse cx="200" cy="340" rx="60" ry="15" className="fill-tree-brown/30" />
    <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 1 }}>
      <ellipse cx="200" cy="320" rx="12" ry="8" className="fill-tree-brown" />
      <path d="M200 320 Q200 310 195 305" className="stroke-primary" strokeWidth="2" fill="none" />
      <circle cx="195" cy="303" r="3" className="fill-primary" />
    </motion.g>
  </g>
);

const Sprout = () => (
  <g>
    <ellipse cx="200" cy="340" rx="70" ry="18" className="fill-tree-brown/30" />
    <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ originY: 1, originX: 0.5 }} transition={{ duration: 0.8 }}>
      <line x1="200" y1="340" x2="200" y2="280" className="stroke-primary" strokeWidth="4" strokeLinecap="round" />
      <motion.g animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity }}>
        <path d="M200 300 Q185 285 180 270 Q195 280 200 300Z" className="fill-primary" />
        <path d="M200 290 Q215 275 225 265 Q210 278 200 290Z" className="fill-primary" opacity={0.8} />
      </motion.g>
    </motion.g>
  </g>
);

const Growing = () => (
  <g>
    <ellipse cx="200" cy="340" rx="80" ry="20" className="fill-tree-brown/30" />
    <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ originY: 1, originX: 0.5 }} transition={{ duration: 1 }}>
      <path d="M196 340 Q194 300 192 260 Q190 240 200 230 Q210 240 208 260 Q206 300 204 340Z" className="fill-tree-brown" />
      <motion.g animate={{ rotate: [-1.5, 1.5, -1.5] }} transition={{ duration: 4, repeat: Infinity }}>
        <ellipse cx="200" cy="240" rx="45" ry="35" className="fill-primary" opacity={0.9} />
        <ellipse cx="180" cy="250" rx="25" ry="20" className="fill-primary" opacity={0.7} />
        <ellipse cx="220" cy="250" rx="25" ry="20" className="fill-primary" opacity={0.7} />
        <ellipse cx="200" cy="225" rx="30" ry="22" className="fill-primary" opacity={0.6} />
      </motion.g>
    </motion.g>
  </g>
);

const SmallTree = () => (
  <g>
    <ellipse cx="200" cy="350" rx="90" ry="22" className="fill-tree-brown/30" />
    <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ originY: 1, originX: 0.5 }} transition={{ duration: 1.2 }}>
      <path d="M193 350 Q190 290 188 230 Q186 210 200 195 Q214 210 212 230 Q210 290 207 350Z" className="fill-tree-brown" />
      <path d="M188 280 Q165 265 155 275" className="stroke-tree-brown" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M212 260 Q235 245 245 255" className="stroke-tree-brown" strokeWidth="3" fill="none" strokeLinecap="round" />
      <motion.g animate={{ rotate: [-1, 1, -1] }} transition={{ duration: 5, repeat: Infinity }}>
        <ellipse cx="200" cy="200" rx="60" ry="50" className="fill-primary" opacity={0.9} />
        <ellipse cx="170" cy="220" rx="35" ry="28" className="fill-primary" opacity={0.7} />
        <ellipse cx="230" cy="220" rx="35" ry="28" className="fill-primary" opacity={0.7} />
        <ellipse cx="155" cy="265" rx="20" ry="15" className="fill-primary" opacity={0.6} />
        <ellipse cx="245" cy="248" rx="18" ry="14" className="fill-primary" opacity={0.6} />
        <ellipse cx="200" cy="175" rx="40" ry="30" className="fill-primary" opacity={0.5} />
      </motion.g>
      {/* Small fruits */}
      <circle cx="175" cy="210" r="4" className="fill-secondary" opacity={0.8} />
      <circle cx="225" cy="200" r="4" className="fill-secondary" opacity={0.8} />
    </motion.g>
  </g>
);

const FullTree = () => (
  <g>
    <ellipse cx="200" cy="360" rx="100" ry="25" className="fill-tree-brown/30" />
    <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ originY: 1, originX: 0.5 }} transition={{ duration: 1.5 }}>
      <path d="M190 360 Q185 280 182 200 Q180 175 200 155 Q220 175 218 200 Q215 280 210 360Z" className="fill-tree-brown" />
      <path d="M185 290 Q155 270 140 280" className="stroke-tree-brown" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M215 270 Q245 250 260 260" className="stroke-tree-brown" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M188 240 Q168 225 155 235" className="stroke-tree-brown" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M212 230 Q232 215 248 225" className="stroke-tree-brown" strokeWidth="3" fill="none" strokeLinecap="round" />
      <motion.g animate={{ rotate: [-0.8, 0.8, -0.8] }} transition={{ duration: 6, repeat: Infinity }}>
        <ellipse cx="200" cy="160" rx="80" ry="65" className="fill-primary" opacity={0.9} />
        <ellipse cx="155" cy="195" rx="45" ry="38" className="fill-primary" opacity={0.75} />
        <ellipse cx="245" cy="195" rx="45" ry="38" className="fill-primary" opacity={0.75} />
        <ellipse cx="140" cy="260" rx="28" ry="22" className="fill-primary" opacity={0.6} />
        <ellipse cx="260" cy="248" rx="25" ry="20" className="fill-primary" opacity={0.6} />
        <ellipse cx="200" cy="125" rx="55" ry="40" className="fill-primary" opacity={0.5} />
      </motion.g>
      {/* Fruits */}
      <motion.circle cx="170" cy="160" r="5" className="fill-secondary" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.circle cx="230" cy="150" r="5" className="fill-secondary" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
      <motion.circle cx="200" cy="130" r="5" className="fill-secondary" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
      <motion.circle cx="155" cy="190" r="4" className="fill-secondary" opacity={0.8} />
      <motion.circle cx="245" cy="185" r="4" className="fill-secondary" opacity={0.8} />
      {/* Sparkles */}
      <motion.circle cx="180" cy="120" r="2" className="fill-streak" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.circle cx="220" cy="110" r="2" className="fill-streak" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }} />
    </motion.g>
  </g>
);

const treeComponents: Record<TreeStage, React.FC> = {
  seed: Seed,
  sprout: Sprout,
  growing: Growing,
  'small-tree': SmallTree,
  'full-tree': FullTree,
};

export const TreeVisualization = ({ stage, health, points }: TreeVisualizationProps) => {
  const TreeComponent = treeComponents[stage];
  const stageLabels: Record<TreeStage, string> = {
    seed: '🌱 Seed', sprout: '🌿 Sprout', growing: '🌳 Growing',
    'small-tree': '🌲 Small Tree', 'full-tree': '✨ Full Tree',
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg viewBox="0 0 400 400" className="w-64 h-64 md:w-80 md:h-80" style={{ filter: health < 50 ? 'saturate(0.5)' : 'none' }}>
          {/* Ground */}
          <defs>
            <radialGradient id="ground" cx="50%" cy="50%">
              <stop offset="0%" stopColor="hsl(80 30% 45%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(80 30% 45%)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="200" cy="365" rx="150" ry="30" fill="url(#ground)" />
          <TreeComponent />
        </svg>
        {health < 50 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl animate-pulse-glow">⚠️</span>
          </div>
        )}
      </div>
      <div className="text-center space-y-1">
        <p className="text-lg font-semibold text-foreground">{stageLabels[stage]}</p>
        <p className="text-sm text-muted-foreground">{points} pts • {health}% health</p>
      </div>
    </div>
  );
};
