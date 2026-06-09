import { useState, useCallback } from 'react';
import { PhotoUpload } from './components/PhotoUpload';
import { SlowMotionViewer } from './components/SlowMotionViewer';
import { Controls } from './components/Controls';
import { Toaster, toast } from 'sonner';
import { Sparkles, Image as ImageIcon, Video } from 'lucide-react';

const DEFAULT_SETTINGS = {
  speed: 10,
  zoom: 1.15,
  panX: 3,
  panY: 2,
};

function App() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Animation settings
  const [speed, setSpeed] = useState(DEFAULT_SETTINGS.speed);
  const [zoom, setZoom] = useState(DEFAULT_SETTINGS.zoom);
  const [panX, setPanX] = useState(DEFAULT_SETTINGS.panX);
  const [panY, setPanY] = useState(DEFAULT_SETTINGS.panY);

  const handleUpload = useCallback((file: File) => {
    setPhoto(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    toast.success('Photo uploaded successfully!');
  }, []);

  const handleClear = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPhoto(null);
    setPreviewUrl(null);
    toast.info('Photo removed');
  }, [previewUrl]);

  const handleReset = useCallback(() => {
    setSpeed(DEFAULT_SETTINGS.speed);
    setZoom(DEFAULT_SETTINGS.zoom);
    setPanX(DEFAULT_SETTINGS.panX);
    setPanY(DEFAULT_SETTINGS.panY);
    toast.info('Settings reset to default');
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-foreground transition-colors duration-300">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-black/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">SlowMo Photo</h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="hidden sm:inline">Turn images into cinematic motion</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Hero Section */}
          <section className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Animate your photos in <span className="text-primary">slow motion</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload any image and apply a beautiful, slow-moving Ken Burns effect. 
              Perfect for creating cinematic backgrounds and story visuals.
            </p>
          </section>

          {/* Main Workspace */}
          <div className="grid gap-8">
            {previewUrl ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <SlowMotionViewer 
                  imageUrl={previewUrl}
                  speed={speed}
                  zoom={zoom}
                  panX={panX}
                  panY={panY}
                  isPlaying={isPlaying}
                  onTogglePlay={() => setIsPlaying(!isPlaying)}
                />
                
                <Controls 
                  speed={speed}
                  zoom={zoom}
                  panX={panX}
                  panY={panY}
                  onSpeedChange={setSpeed}
                  onZoomChange={setZoom}
                  onPanXChange={setPanX}
                  onPanYChange={setPanY}
                  onReset={handleReset}
                />

                <div className="flex justify-center">
                   <button 
                    onClick={handleClear}
                    className="text-sm text-muted-foreground hover:text-destructive transition-colors underline underline-offset-4"
                  >
                    Upload a different photo
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-500">
                <PhotoUpload 
                  onUpload={handleUpload} 
                  onClear={handleClear} 
                  previewUrl={previewUrl} 
                />
              </div>
            )}
          </div>

          {/* Features Grid */}
          {!previewUrl && (
            <section className="grid sm:grid-cols-3 gap-6 pt-12 border-t">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold">Ken Burns Effect</h4>
                <p className="text-sm text-muted-foreground">
                  Smooth panning and zooming that brings static images to life.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <Video className="w-5 h-5" />
                </div>
                <h4 className="font-semibold">Cinematic Loops</h4>
                <p className="text-sm text-muted-foreground">
                  Perfectly timed loops for a continuous slow-motion experience.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-semibold">Full Control</h4>
                <p className="text-sm text-muted-foreground">
                  Adjust speed, intensity, and direction to match your vision.
                </p>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-12 bg-white/50 dark:bg-black/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SlowMo Photo Animator. Create something beautiful.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
