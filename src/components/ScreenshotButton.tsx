import React, { useCallback } from 'react';
import { Camera } from 'lucide-react';
import { toast } from 'react-toastify';
import domtoimage from 'dom-to-image';

interface ScreenshotButtonProps {
  targetId: string;
}

const ScreenshotButton: React.FC<ScreenshotButtonProps> = ({ targetId }) => {
  const takeScreenshot = useCallback(async () => {
    const element = document.getElementById(targetId);
    
    if (!element) {
      toast.error('Screenshot area not found!');
      return;
    }
    
    toast.info('Capturing screenshot...');

    try {
      // First, load the background image
      const bgImage = new Image();
      bgImage.crossOrigin = "anonymous";
      bgImage.src = "https://files.catbox.moe/yt2t9h.png";

      await new Promise((resolve, reject) => {
        bgImage.onload = resolve;
        bgImage.onerror = reject;
      });

      // Create a canvas to draw the background
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      // Set canvas size to match element
      canvas.width = element.offsetWidth;
      canvas.height = element.offsetHeight;

      // Draw background
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

      // Capture the element content
      const dataUrl = await domtoimage.toPng(element, {
        height: element.offsetHeight,
        width: element.offsetWidth,
        style: {
          transform: 'scale(1)',
          'transform-origin': 'top left'
        },
        cacheBust: true,
        skipFonts: true, // Skip font loading to avoid CORS issues
        filter: (node) => {
          // Skip background image in the element since we're drawing it manually
          if (node.tagName === 'DIV' && node.style.backgroundImage) {
            node.style.backgroundImage = 'none';
          }
          return true;
        }
      });

      // Load the element content as an image
      const contentImage = new Image();
      contentImage.src = dataUrl;

      await new Promise((resolve) => {
        contentImage.onload = resolve;
      });

      // Draw the content over the background
      ctx.drawImage(contentImage, 0, 0);

      // Convert to PNG and download
      const finalDataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'tournament-screenshot.png';
      link.href = finalDataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Screenshot saved!');
    } catch (error) {
      console.error('Screenshot error:', error);
      toast.error('Failed to capture screenshot');
    }
  }, [targetId]);

  return (
    <button 
      onClick={takeScreenshot}
      className="fixed bottom-6 right-6 z-50 bg-primary text-white px-4 py-2 rounded-full
        flex items-center gap-2 shadow-glow-md hover:shadow-glow-lg transition-all duration-300"
    >
      <Camera size={18} />
      <span>Save Screenshot</span>
    </button>
  );
};

export default ScreenshotButton;