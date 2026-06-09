import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SlowMotionViewerProps {
  imageUrl: string;
  speed: number; // Duration of one loop in seconds
  zoom: number;  // Scale factor (e.g., 1.2)
  panX: number;  // Horizontal pan percentage (-5 to 5)
  panY: number;  // Vertical pan percentage (-5 to 5)
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const SlowMotionViewer: React.FC<SlowMotionViewerProps> = ({
  imageUrl,
  speed,
  zoom,
  panX,
  panY,
  isPlaying,
  onTogglePlay,
}) => {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl group">
      <AnimatePresence mode="wait">
        <motion.div
          key={imageUrl}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-full"
        >
          <motion.div
            className="w-full h-full origin-center"
            animate={isPlaying ? {
              scale: [1, zoom, 1],
              x: [`${-panX}%`, `${panX}%`, `${-panX}%`],
              y: [`${-panY}%`, `${panY}%`, `${-panY}%`],
            } : {}}
            transition={{
              duration: speed,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            <img
              src={imageUrl}
              alt="Animated slow motion"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Overlay Controls */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full shadow-lg pointer-events-auto"
          onClick={onTogglePlay}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </Button>
        
        <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] uppercase tracking-wider text-white font-medium">
          Slow Motion Active
        </div>
      </div>

      {/* Frame indicator for aesthetic */}
      <div className="absolute top-4 left-4 flex gap-1.5 pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <div className="text-[10px] text-white font-mono uppercase tracking-widest opacity-80">REC SLOW-MO</div>
      </div>
    </div>
  );
};
