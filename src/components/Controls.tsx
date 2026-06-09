import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RotateCcw, FastForward, ZoomIn, MoveHorizontal, MoveVertical } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ControlsProps {
  speed: number;
  zoom: number;
  panX: number;
  panY: number;
  onSpeedChange: (value: number) => void;
  onZoomChange: (value: number) => void;
  onPanXChange: (value: number) => void;
  onPanYChange: (value: number) => void;
  onReset: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  speed,
  zoom,
  panX,
  panY,
  onSpeedChange,
  onZoomChange,
  onPanXChange,
  onPanYChange,
  onReset,
}) => {
  return (
    <Card className="p-6 space-y-8 bg-card/50 backdrop-blur-sm border-muted">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          Animation Settings
        </h3>
        <Button variant="ghost" size="sm" onClick={onReset} className="text-muted-foreground hover:text-primary">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Speed Control */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <FastForward className="w-4 h-4 text-primary" />
              Duration (Slow-mo)
            </Label>
            <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{speed}s</span>
          </div>
          <Slider
            value={[speed]}
            min={2}
            max={20}
            step={0.5}
            onValueChange={(vals) => onSpeedChange(vals[0])}
          />
          <p className="text-[10px] text-muted-foreground">
            Higher values create a slower, more cinematic motion.
          </p>
        </div>

        {/* Zoom Control */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <ZoomIn className="w-4 h-4 text-primary" />
              Zoom Intensity
            </Label>
            <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{zoom.toFixed(2)}x</span>
          </div>
          <Slider
            value={[zoom]}
            min={1}
            max={1.5}
            step={0.01}
            onValueChange={(vals) => onZoomChange(vals[0])}
          />
          <p className="text-[10px] text-muted-foreground">
            Adjust how much the photo scales during the animation.
          </p>
        </div>

        {/* Pan X Control */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <MoveHorizontal className="w-4 h-4 text-primary" />
              Horizontal Pan
            </Label>
            <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{panX}%</span>
          </div>
          <Slider
            value={[panX]}
            min={0}
            max={10}
            step={0.5}
            onValueChange={(vals) => onPanXChange(vals[0])}
          />
        </div>

        {/* Pan Y Control */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <MoveVertical className="w-4 h-4 text-primary" />
              Vertical Pan
            </Label>
            <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{panY}%</span>
          </div>
          <Slider
            value={[panY]}
            min={0}
            max={10}
            step={0.5}
            onValueChange={(vals) => onPanYChange(vals[0])}
          />
        </div>
      </div>
    </Card>
  );
};
