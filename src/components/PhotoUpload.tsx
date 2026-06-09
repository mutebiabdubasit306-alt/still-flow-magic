import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PhotoUploadProps {
  onUpload: (file: File) => void;
  onClear: () => void;
  previewUrl: string | null;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ onUpload, onClear, previewUrl }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    }
  }, [onUpload]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  }, [onUpload]);

  if (previewUrl) {
    return (
      <Card className="relative overflow-hidden group aspect-video flex items-center justify-center bg-muted/50 border-dashed border-2">
        <img 
          src={previewUrl} 
          alt="Upload preview" 
          className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105 duration-500"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button variant="destructive" size="sm" onClick={onClear}>
            <X className="w-4 h-4 mr-2" />
            Remove Photo
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer",
        isDragging 
          ? "border-primary bg-primary/5 scale-[0.99]" 
          : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
      )}
      onClick={() => document.getElementById('file-upload')?.click()}
    >
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Upload className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Upload your photo</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Drag and drop or click to select an image
          </p>
        </div>
        <Button variant="outline" className="mt-2">
          <ImageIcon className="w-4 h-4 mr-2" />
          Browse Files
        </Button>
      </div>
    </div>
  );
};
