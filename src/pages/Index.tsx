import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Code2, Users, TreesIcon } from 'lucide-react';

const features = [
  { icon: Github, title: 'GitHub Sync', desc: 'Auto-track commits and repo activity' },
  { icon: Code2, title: 'LeetCode Tracking', desc: 'Problems solved, streaks, difficulty' },
  { icon: Users, title: 'Squad System', desc: 'Teams of 2-4, collaborative growth' },
  { icon: TreesIcon, title: 'Grow Together', desc: 'Your productivity grows a shared tree' },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 flex items-center justify-center px-6 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-8">
              <TreesIcon className="w-4 h-4 text-primary" /> Multiplayer Productivity for Students
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="text-foreground">Build habits.</span>
              <br />
              <span className="text-gradient-nature">Grow together.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Co-op Campus turns your coding productivity into a collaborative game. 
              Form squads, track GitHub & LeetCode activity, and grow a shared tree.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="text-base px-8 py-6 rounded-2xl gradient-nature text-primary-foreground border-0 shadow-lg hover:shadow-xl transition-shadow">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="text-base px-8 py-6 rounded-2xl">
                  View Demo
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-16 animate-float"
          >
            <TreesIcon className="w-24 h-24 text-primary mx-auto" />
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="glass-panel p-6 text-center hover:scale-[1.02] transition-transform"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent flex items-center justify-center">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
