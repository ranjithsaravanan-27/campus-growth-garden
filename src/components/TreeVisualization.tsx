import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { type TreeStage, type TeamMember } from '@/lib/mockData';
import { Heart, AlertTriangle } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

interface TreeVisualizationProps {
  stage: TreeStage;
  health: number;
  points: number;
  members?: TeamMember[];
  showParticles?: boolean;
  onPointsAdded?: () => void;
}

/* ── Falling leaf ── */
const FallingLeaf = ({ delay, x, size = 1 }: { delay: number; x: number; size?: number }) => (
  <motion.g
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0, 0.9, 0.7, 0],
      y: [0, 60, 130, 200],
      x: [0, Math.sin(delay * 2) * 25, Math.sin(delay * 3) * 40, Math.sin(delay) * 55],
      rotate: [0, 45, 180, 360],
    }}
    transition={{ duration: 4 + delay * 0.5, repeat: Infinity, delay: delay * 1.1, ease: 'easeIn' }}
  >
    <path
      d={`M${x} 180 Q${x - 5 * size} 174 ${x - 3 * size} 168 Q${x + 3 * size} 171 ${x} 180Z`}
      fill="hsl(30 65% 50%)"
      opacity={0.75}
    />
    <path
      d={`M${x} 180 Q${x + 4 * size} 175 ${x + 2 * size} 170 Q${x - 1 * size} 173 ${x} 180Z`}
      fill="hsl(42 70% 50%)"
      opacity={0.5}
    />
  </motion.g>
);

/* ── Energy particle (flows into tree on contribution) ── */
const EnergyParticle = ({ startX, startY, delay: d }: { startX: number; startY: number; delay: number }) => (
  <motion.circle
    cx={startX} cy={startY} r="3"
    fill="hsl(152 55% 55%)"
    initial={{ opacity: 0, cx: startX, cy: startY }}
    animate={{
      opacity: [0, 1, 1, 0],
      cx: [startX, startX + (200 - startX) * 0.5, 200],
      cy: [startY, startY - 40, 250],
      r: [3, 4, 2],
    }}
    transition={{ duration: 1.8, delay: d, ease: 'easeInOut' }}
  />
);

/* ── Glow pulse ── */
const GrowthGlow = ({ stage, intensity = 1 }: { stage: TreeStage; intensity?: number }) => {
  const config = {
    'full-tree': { r: 130, cy: 190 },
    'small-tree': { r: 110, cy: 210 },
    growing: { r: 85, cy: 250 },
    sprout: { r: 60, cy: 290 },
    seed: { r: 40, cy: 320 },
  };
  const { r, cy } = config[stage];

  return (
    <>
      <motion.ellipse
        cx={200} cy={cy} rx={r} ry={r * 0.75}
        fill="url(#glowGradient)"
        animate={{ opacity: [0.1 * intensity, 0.3 * intensity, 0.1 * intensity], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Inner bright glow */}
      <motion.ellipse
        cx={200} cy={cy} rx={r * 0.5} ry={r * 0.4}
        fill="url(#innerGlow)"
        animate={{ opacity: [0.05 * intensity, 0.15 * intensity, 0.05 * intensity] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
    </>
  );
};

/* ── Breathing wrapper for idle animation ── */
const BreathingWrapper = ({ children, health }: { children: React.ReactNode; health: number }) => (
  <motion.g
    animate={{
      scaleY: health >= 50 ? [1, 1.008, 1] : [1, 0.995, 1],
      scaleX: health >= 50 ? [1, 1.004, 1] : [1, 0.998, 1],
    }}
    transition={{ duration: health >= 50 ? 4 : 3, repeat: Infinity, ease: 'easeInOut' }}
    style={{ transformOrigin: '200px 360px' }}
  >
    {children}
  </motion.g>
);

/* ── Member avatar positioned around tree ── */
const MemberAvatar = ({ member, index, total, treeCenter }: { member: TeamMember; index: number; total: number; treeCenter: { x: number; y: number } }) => {
  const angle = ((index / total) * Math.PI * 0.8) + Math.PI * 0.6; // spread across bottom arc
  const radius = 155;
  const x = treeCenter.x + Math.cos(angle) * radius;
  const y = treeCenter.y + Math.sin(angle) * (radius * 0.35) + 30;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + index * 0.15, type: 'spring', stiffness: 200 }}
    >
      {/* Connection line to tree */}
      <motion.line
        x1={x} y1={y} x2={200} y2={320}
        stroke={member.isInactive ? 'hsl(0 50% 50%)' : 'hsl(152 55% 45%)'}
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity={member.isInactive ? 0.2 : 0.25}
        animate={!member.isInactive ? { opacity: [0.15, 0.35, 0.15] } : {}}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
      />
      {/* Avatar circle */}
      <motion.circle
        cx={x} cy={y} r={16}
        fill={member.isInactive ? 'hsl(0 20% 25%)' : 'hsl(152 30% 20%)'}
        stroke={member.isInactive ? 'hsl(0 50% 40%)' : 'hsl(152 55% 45%)'}
        strokeWidth={2}
        whileHover={{ scale: 1.2, strokeWidth: 3 }}
      />
      <text
        x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle"
        fill={member.isInactive ? 'hsl(0 30% 60%)' : 'hsl(152 55% 80%)'}
        fontSize="9" fontWeight="700" fontFamily="'Space Grotesk', sans-serif"
      >
        {member.avatar}
      </text>
      {/* Activity indicator */}
      {!member.isInactive && (
        <motion.circle
          cx={x + 11} cy={y - 11} r="4"
          fill="hsl(152 55% 45%)"
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
        />
      )}
      {member.isInactive && (
        <motion.circle
          cx={x + 11} cy={y - 11} r="4"
          fill="hsl(0 60% 50%)"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      {/* Energy particles flowing to tree for active members */}
      {!member.isInactive && (
        <EnergyParticle startX={x} startY={y} delay={index * 1.5 + 1} />
      )}
    </motion.g>
  );
};

/* ── Tree stage components ── */
const Seed = () => (
  <g>
    <ellipse cx="200" cy="340" rx="60" ry="15" className="fill-tree-brown/30" />
    <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 1.2, bounce: 0.3 }}>
      <ellipse cx="200" cy="322" rx="14" ry="9" className="fill-tree-brown" />
      <motion.path d="M200 322 Q200 308 194 300" className="stroke-primary" strokeWidth="2.5" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
      />
      <motion.circle cx="194" cy="298" r="4" className="fill-primary"
        initial={{ scale: 0 }} animate={{ scale: [0, 1.4, 1] }} transition={{ duration: 0.6, delay: 2 }}
      />
      <motion.circle cx="194" cy="298" r="6" className="fill-primary" opacity={0.2}
        animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2.5 }}
      />
    </motion.g>
  </g>
);

const Sprout = () => (
  <g>
    <ellipse cx="200" cy="340" rx="70" ry="18" className="fill-tree-brown/30" />
    <motion.g initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} style={{ originY: 1, originX: 0.5 }}
      transition={{ duration: 1, ease: 'easeOut' }}>
      <line x1="200" y1="340" x2="200" y2="275" className="stroke-primary" strokeWidth="5" strokeLinecap="round" />
      <motion.g animate={{ rotate: [-4, 4, -4] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
        <motion.path d="M200 305 Q182 288 175 268 Q192 280 200 305Z" className="fill-primary"
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />
        <motion.path d="M200 290 Q218 273 228 258 Q212 275 200 290Z" className="fill-primary" opacity={0.8}
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.8 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        />
        <motion.path d="M200 280 Q188 268 183 255 Q193 265 200 280Z" className="fill-primary" opacity={0.6}
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.6 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        />
      </motion.g>
    </motion.g>
  </g>
);

const Growing = () => (
  <g>
    <ellipse cx="200" cy="340" rx="85" ry="20" className="fill-tree-brown/30" />
    <motion.g initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }}
      style={{ originY: 1, originX: 0.5 }} transition={{ duration: 1.2, ease: 'easeOut' }}>
      <path d="M196 340 Q193 295 191 255 Q189 235 200 222 Q211 235 209 255 Q207 295 204 340Z" className="fill-tree-brown" />
      <motion.g animate={{ rotate: [-1.5, 1.5, -1.5] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>
        {[
          { cx: 200, cy: 235, rx: 50, ry: 38, o: 0.9, d: 0.3 },
          { cx: 175, cy: 248, rx: 28, ry: 22, o: 0.7, d: 0.5 },
          { cx: 225, cy: 248, rx: 28, ry: 22, o: 0.7, d: 0.7 },
          { cx: 200, cy: 218, rx: 35, ry: 25, o: 0.55, d: 0.9 },
        ].map((leaf, i) => (
          <motion.ellipse key={i}
            cx={leaf.cx} cy={leaf.cy} rx={leaf.rx} ry={leaf.ry}
            className="fill-primary" opacity={leaf.o}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: leaf.o }}
            transition={{ delay: leaf.d, duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </motion.g>
    </motion.g>
  </g>
);

const SmallTree = () => (
  <g>
    <ellipse cx="200" cy="350" rx="95" ry="22" className="fill-tree-brown/30" />
    <motion.g initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }}
      style={{ originY: 1, originX: 0.5 }} transition={{ duration: 1.4, ease: 'easeOut' }}>
      <path d="M193 350 Q189 285 187 225 Q185 205 200 188 Q215 205 213 225 Q211 285 207 350Z" className="fill-tree-brown" />
      <path d="M187 278 Q162 262 150 272" className="stroke-tree-brown" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M213 256 Q238 240 250 252" className="stroke-tree-brown" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <motion.g animate={{ rotate: [-1.2, 1.2, -1.2] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}>
        {[
          { cx: 200, cy: 195, rx: 65, ry: 52, o: 0.9, d: 0.3 },
          { cx: 165, cy: 218, rx: 38, ry: 30, o: 0.7, d: 0.5 },
          { cx: 235, cy: 218, rx: 38, ry: 30, o: 0.7, d: 0.6 },
          { cx: 148, cy: 262, rx: 22, ry: 16, o: 0.55, d: 0.7 },
          { cx: 250, cy: 245, rx: 20, ry: 15, o: 0.55, d: 0.8 },
          { cx: 200, cy: 168, rx: 45, ry: 32, o: 0.45, d: 0.9 },
        ].map((leaf, i) => (
          <motion.ellipse key={i}
            cx={leaf.cx} cy={leaf.cy} rx={leaf.rx} ry={leaf.ry}
            className="fill-primary" opacity={leaf.o}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: leaf.o }}
            transition={{ delay: leaf.d, duration: 0.7, ease: 'easeOut' }}
          />
        ))}
      </motion.g>
      {/* Fruits */}
      {[{ cx: 175, cy: 208, d: 0 }, { cx: 228, cy: 198, d: 0.4 }].map((f, i) => (
        <motion.circle key={i} cx={f.cx} cy={f.cy} r="5" className="fill-secondary"
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: f.d }}
        />
      ))}
    </motion.g>
  </g>
);

const FullTree = () => (
  <g>
    <ellipse cx="200" cy="360" rx="105" ry="26" className="fill-tree-brown/30" />
    <motion.g initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }}
      style={{ originY: 1, originX: 0.5 }} transition={{ duration: 1.8, ease: 'easeOut' }}>
      <path d="M189 360 Q183 275 180 195 Q178 168 200 148 Q222 168 220 195 Q217 275 211 360Z" className="fill-tree-brown" />
      <path d="M183 288 Q150 268 135 280" className="stroke-tree-brown" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M217 265 Q250 245 265 258" className="stroke-tree-brown" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M186 238 Q165 222 150 233" className="stroke-tree-brown" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M214 226 Q235 210 252 222" className="stroke-tree-brown" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <motion.g animate={{ rotate: [-0.8, 0.8, -0.8] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
        {[
          { cx: 200, cy: 155, rx: 85, ry: 68, o: 0.9, d: 0.3 },
          { cx: 150, cy: 192, rx: 48, ry: 40, o: 0.75, d: 0.5 },
          { cx: 250, cy: 192, rx: 48, ry: 40, o: 0.75, d: 0.6 },
          { cx: 135, cy: 258, rx: 30, ry: 24, o: 0.6, d: 0.7 },
          { cx: 265, cy: 245, rx: 28, ry: 22, o: 0.6, d: 0.8 },
          { cx: 200, cy: 118, rx: 60, ry: 42, o: 0.48, d: 0.9 },
        ].map((leaf, i) => (
          <motion.ellipse key={i}
            cx={leaf.cx} cy={leaf.cy} rx={leaf.rx} ry={leaf.ry}
            className="fill-primary" opacity={leaf.o}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: leaf.o }}
            transition={{ delay: leaf.d, duration: 0.8, ease: 'easeOut' }}
          />
        ))}
      </motion.g>
      {/* Pulsing fruits */}
      {[
        { cx: 168, cy: 158, r: 5.5, d: 0 }, { cx: 232, cy: 148, r: 5.5, d: 0.5 },
        { cx: 200, cy: 125, r: 6.5, d: 1 }, { cx: 152, cy: 188, r: 4.5, d: 1.3 },
        { cx: 248, cy: 182, r: 4.5, d: 0.8 },
      ].map((f, i) => (
        <motion.circle key={i} cx={f.cx} cy={f.cy} r={f.r} className="fill-secondary"
          animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 2.2, repeat: Infinity, delay: f.d }}
        />
      ))}
      {/* Sparkle particles */}
      {[
        { cx: 178, cy: 115, d: 0 }, { cx: 222, cy: 105, d: 0.7 },
        { cx: 158, cy: 142, d: 1.2 }, { cx: 242, cy: 135, d: 0.4 },
        { cx: 200, cy: 98, d: 1.8 }, { cx: 170, cy: 165, d: 2.2 },
      ].map((s, i) => (
        <motion.circle key={i} cx={s.cx} cy={s.cy} r="2.5" className="fill-streak"
          animate={{ opacity: [0, 1, 0], scale: [0.3, 1.3, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: s.d }}
        />
      ))}
    </motion.g>
  </g>
);

const treeComponents: Record<TreeStage, React.FC> = {
  seed: Seed, sprout: Sprout, growing: Growing,
  'small-tree': SmallTree, 'full-tree': FullTree,
};

/* ── Health Bar ── */
const HealthBar = ({ health }: { health: number }) => {
  const barColor = health >= 70 ? 'hsl(152 55% 35%)' : health >= 40 ? 'hsl(42 80% 55%)' : 'hsl(0 72% 51%)';
  const label = health >= 70 ? 'Thriving' : health >= 40 ? 'Needs Care' : 'Wilting';

  return (
    <div className="w-full max-w-xs">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5" style={{ color: barColor, fill: health >= 70 ? barColor : 'none' }} /> {label}
        </span>
        <motion.span
          className="text-xs font-bold"
          style={{ color: barColor }}
          key={health}
          initial={{ scale: 1.4 }}
          animate={{ scale: 1 }}
        >
          {health}%
        </motion.span>
      </div>
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden relative">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${barColor}cc, ${barColor})` }}
          initial={{ width: 0 }}
          animate={{ width: `${health}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        {health >= 60 && (
          <motion.div
            className="absolute top-0 h-full w-12 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
            animate={{ left: ['-15%', '115%'] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2.5 }}
          />
        )}
      </div>
    </div>
  );
};

/* ── Point burst particles ── */
const PointBurst = () => (
  <g>
    {[...Array(8)].map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      return (
        <motion.circle
          key={i} cx={200} cy={250} r="3"
          fill="hsl(152 55% 55%)"
          initial={{ opacity: 1 }}
          animate={{
            cx: 200 + Math.cos(angle) * 60,
            cy: 250 + Math.sin(angle) * 50,
            opacity: 0,
            r: 1,
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      );
    })}
  </g>
);

/* ── Main component ── */
export const TreeVisualization = ({ stage, health, points, members = [], showParticles = false }: TreeVisualizationProps) => {
  const TreeComponent = treeComponents[stage];
  const stageLabels: Record<TreeStage, string> = {
    seed: 'Seed', sprout: 'Sprout', growing: 'Growing',
    'small-tree': 'Small Tree', 'full-tree': 'Full Tree',
  };

  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const showFallingLeaves = health < 50;
  const decayTilt = health < 40 ? 1.5 : health < 50 ? 0.8 : 0;

  const handleClick = useCallback(() => {
    setIsClicked(true);
    setShowBurst(true);
    setTimeout(() => setIsClicked(false), 300);
    setTimeout(() => setShowBurst(false), 1200);
  }, []);

  // Trigger burst on showParticles
  useEffect(() => {
    if (showParticles) {
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 1200);
    }
  }, [showParticles]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative cursor-pointer" onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        
        {/* Ambient glow behind SVG */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl -z-10"
          style={{
            background: health >= 50
              ? 'radial-gradient(circle, hsl(152 55% 40% / 0.2), transparent 70%)'
              : 'radial-gradient(circle, hsl(0 50% 40% / 0.1), transparent 70%)',
          }}
          animate={{
            scale: isHovered ? 1.15 : [1, 1.06, 1],
            opacity: isHovered ? 0.8 : [0.4, 0.6, 0.4],
          }}
          transition={{ duration: isHovered ? 0.3 : 4, repeat: isHovered ? 0 : Infinity, ease: 'easeInOut' }}
        />

        <motion.svg
          viewBox="0 0 400 420"
          className="w-80 h-80 md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px]"
          style={{
            filter: health < 50
              ? `saturate(${0.3 + health * 0.014}) brightness(${0.85 + health * 0.003})`
              : isHovered ? 'saturate(1.15) brightness(1.05)' : 'none',
          }}
          animate={{
            scale: isClicked ? 0.96 : 1,
            rotate: decayTilt > 0 ? [0, decayTilt, 0, -decayTilt * 0.5, 0] : 0,
          }}
          transition={decayTilt > 0
            ? { duration: 5, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.2, type: 'spring', stiffness: 400 }
          }
        >
          <defs>
            <radialGradient id="ground" cx="50%" cy="50%">
              <stop offset="0%" stopColor="hsl(80 30% 45%)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(80 30% 45%)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="glowGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="hsl(152 55% 50%)" stopOpacity="0.5" />
              <stop offset="50%" stopColor="hsl(152 55% 45%)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="hsl(152 55% 40%)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="innerGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="hsl(152 70% 65%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(152 55% 50%)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="200" cy="370" rx="155" ry="32" fill="url(#ground)" />

          {/* Growth glow */}
          {health >= 40 && <GrowthGlow stage={stage} intensity={health >= 70 ? 1.2 : 0.7} />}

          {/* Hover extra glow */}
          {isHovered && (
            <motion.ellipse
              cx={200} cy={220} rx={100} ry={80}
              fill="hsl(152 55% 55%)" opacity={0}
              animate={{ opacity: [0, 0.08, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}

          {/* Breathing tree */}
          <BreathingWrapper health={health}>
            <AnimatePresence mode="wait">
              <motion.g
                key={stage}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <TreeComponent />
              </motion.g>
            </AnimatePresence>
          </BreathingWrapper>

          {/* Falling leaves on decay */}
          {showFallingLeaves && [145, 170, 195, 220, 245].map((x, i) => (
            <FallingLeaf key={`leaf-${i}`} delay={i * 0.6} x={x} size={0.8 + Math.random() * 0.5} />
          ))}

          {/* Point burst effect */}
          {showBurst && <PointBurst />}

          {/* Team member avatars around tree */}
          {members.length > 0 && members.map((m, i) => (
            <MemberAvatar key={m.id} member={m} index={i} total={members.length} treeCenter={{ x: 200, y: 340 }} />
          ))}
        </motion.svg>

        {/* Decay warning */}
        {health < 50 && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-destructive/15 border border-destructive/30 backdrop-blur-md flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0.8, 1, 0.8], y: 0 }}
            transition={{ opacity: { duration: 2.5, repeat: Infinity }, y: { duration: 0.5 } }}
          >
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-semibold text-destructive">Your tree is weakening</span>
          </motion.div>
        )}
      </div>

      {/* Stage label + points */}
      <motion.div
        className="text-center space-y-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-2xl font-black text-foreground tracking-tight">{stageLabels[stage]}</p>
        <motion.p
          className="text-base font-mono text-muted-foreground"
          key={points}
          initial={{ scale: 1.2, color: 'hsl(152 55% 45%)' }}
          animate={{ scale: 1, color: 'hsl(var(--muted-foreground))' }}
          transition={{ duration: 0.5 }}
        >
          {points} pts
        </motion.p>
      </motion.div>

      <HealthBar health={health} />
    </div>
  );
};
