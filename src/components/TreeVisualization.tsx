import { motion, AnimatePresence } from 'framer-motion';
import { type TreeStage } from '@/lib/mockData';
import { useEffect, useState } from 'react';

interface TreeVisualizationProps {
  stage: TreeStage;
  health: number;
  points: number;
}

// Falling leaf component
const FallingLeaf = ({ delay, x }: { delay: number; x: number }) => (
  <motion.g
    initial={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
    animate={{
      opacity: [1, 0.8, 0],
      y: [0, 80, 160],
      x: [0, Math.sin(delay) * 30, Math.sin(delay) * 50],
      rotate: [0, 180, 360],
    }}
    transition={{ duration: 3 + delay, repeat: Infinity, delay: delay * 0.8, ease: 'easeIn' }}
  >
    <path
      d={`M${x} 200 Q${x - 4} 195 ${x - 2} 190 Q${x + 2} 192 ${x} 200Z`}
      fill="hsl(42 70% 50%)"
      opacity={0.7}
    />
  </motion.g>
);

// Glow pulse for growth
const GrowthGlow = ({ stage }: { stage: TreeStage }) => {
  const radius = stage === 'full-tree' ? 120 : stage === 'small-tree' ? 100 : stage === 'growing' ? 80 : 50;
  const cy = stage === 'full-tree' ? 200 : stage === 'small-tree' ? 220 : 260;

  return (
    <motion.ellipse
      cx={200} cy={cy} rx={radius} ry={radius * 0.8}
      fill="url(#glowGradient)"
      animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.95, 1.05, 0.95] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
};

const Seed = () => (
  <g>
    <ellipse cx="200" cy="340" rx="60" ry="15" className="fill-tree-brown/30" />
    <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 1 }}>
      <ellipse cx="200" cy="320" rx="12" ry="8" className="fill-tree-brown" />
      <motion.path
        d="M200 320 Q200 310 195 305"
        className="stroke-primary" strokeWidth="2" fill="none"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      <motion.circle
        cx="195" cy="303" r="3" className="fill-primary"
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 1.5 }}
      />
    </motion.g>
  </g>
);

const Sprout = () => (
  <g>
    <ellipse cx="200" cy="340" rx="70" ry="18" className="fill-tree-brown/30" />
    <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ originY: 1, originX: 0.5 }} transition={{ duration: 0.8 }}>
      <line x1="200" y1="340" x2="200" y2="280" className="stroke-primary" strokeWidth="4" strokeLinecap="round" />
      <motion.g animate={{ rotate: [-3, 3, -3] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
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
      {/* Pulsing fruits */}
      <motion.circle cx="170" cy="160" r="5" className="fill-secondary" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.circle cx="230" cy="150" r="5" className="fill-secondary" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
      <motion.circle cx="200" cy="130" r="6" className="fill-secondary" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
      <motion.circle cx="155" cy="190" r="4" className="fill-secondary" opacity={0.8} />
      <motion.circle cx="245" cy="185" r="4" className="fill-secondary" opacity={0.8} />
      {/* Sparkles */}
      {[
        { cx: 180, cy: 120, delay: 0 }, { cx: 220, cy: 110, delay: 0.7 },
        { cx: 160, cy: 145, delay: 1.2 }, { cx: 240, cy: 140, delay: 0.4 },
      ].map((s, i) => (
        <motion.circle
          key={i} cx={s.cx} cy={s.cy} r="2.5" className="fill-streak"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: s.delay }}
        />
      ))}
    </motion.g>
  </g>
);

const treeComponents: Record<TreeStage, React.FC> = {
  seed: Seed, sprout: Sprout, growing: Growing,
  'small-tree': SmallTree, 'full-tree': FullTree,
};

// Health bar component
const HealthBar = ({ health }: { health: number }) => {
  const barColor = health >= 70 ? 'hsl(152 55% 35%)' : health >= 40 ? 'hsl(42 80% 55%)' : 'hsl(0 72% 51%)';
  const label = health >= 70 ? 'Thriving' : health >= 40 ? 'Needs Care' : 'Wilting';

  return (
    <div className="w-full max-w-[280px]">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          {health >= 70 ? '💚' : health >= 40 ? '💛' : '❤️‍🩹'} {label}
        </span>
        <span className="text-xs font-bold" style={{ color: barColor }}>{health}%</span>
      </div>
      <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden relative">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${barColor}, ${barColor}dd)` }}
          initial={{ width: 0 }}
          animate={{ width: `${health}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        {health >= 70 && (
          <motion.div
            className="absolute top-0 h-full w-8 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
            animate={{ left: ['-10%', '110%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        )}
      </div>
    </div>
  );
};

export const TreeVisualization = ({ stage, health, points }: TreeVisualizationProps) => {
  const TreeComponent = treeComponents[stage];
  const stageLabels: Record<TreeStage, string> = {
    seed: '🌱 Seed', sprout: '🌿 Sprout', growing: '🌳 Growing',
    'small-tree': '🌲 Small Tree', 'full-tree': '✨ Full Tree',
  };

  const showLeaves = health < 50;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg viewBox="0 0 400 400" className="w-72 h-72 md:w-96 md:h-96" style={{ filter: health < 50 ? 'saturate(0.5) brightness(0.9)' : 'none' }}>
          <defs>
            <radialGradient id="ground" cx="50%" cy="50%">
              <stop offset="0%" stopColor="hsl(80 30% 45%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(80 30% 45%)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="glowGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="hsl(152 55% 45%)" stopOpacity="0.4" />
              <stop offset="60%" stopColor="hsl(152 55% 45%)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(152 55% 45%)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="200" cy="365" rx="150" ry="30" fill="url(#ground)" />

          {/* Growth glow */}
          {health >= 50 && <GrowthGlow stage={stage} />}

          <AnimatePresence mode="wait">
            <motion.g
              key={stage}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <TreeComponent />
            </motion.g>
          </AnimatePresence>

          {/* Falling leaves on low health */}
          {showLeaves && [160, 190, 210, 240].map((x, i) => (
            <FallingLeaf key={i} delay={i * 0.7} x={x} />
          ))}
        </svg>

        {/* Decay warning */}
        {health < 50 && (
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-destructive/15 border border-destructive/30 backdrop-blur-sm"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs font-medium text-destructive">⚠️ Tree is wilting!</span>
          </motion.div>
        )}
      </div>

      <motion.div
        className="text-center space-y-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-xl font-bold text-foreground">{stageLabels[stage]}</p>
        <p className="text-sm font-mono text-muted-foreground">{points} pts</p>
      </motion.div>

      <HealthBar health={health} />
    </div>
  );
};
