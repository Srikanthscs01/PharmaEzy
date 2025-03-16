
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground = ({ className }: AnimatedBackgroundProps) => {
  return (
    <div className={cn('fixed inset-0 z-[-1] overflow-hidden', className)}>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/90" />
      
      {/* Subtle animated circles */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-teal-100/20 dark:bg-teal-800/10 blur-3xl opacity-60 animate-float" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-cyan-50/10 dark:bg-cyan-900/5 blur-3xl opacity-40 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-50/10 dark:bg-blue-900/5 blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-indigo-50/10 dark:bg-indigo-900/5 blur-3xl opacity-20 animate-float" style={{ animationDelay: '3s' }} />
      
      {/* Gradient lines */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent opacity-50" />
      <div className="absolute top-0 right-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-teal-500/10 to-transparent opacity-30" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiIgZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0ycTAgMC41IDAuNSAwLjVoM3EwLjUgMCAwLjUtMC41IDAtMC41LTAuNS0wLjVoLTNxLTAuNSAwLTAuNSAwLjV6TTAgMGg2MHY2MEgweiIvPjwvZz48L3N2Zz4=')] opacity-30" />
    </div>
  );
};

export default AnimatedBackground;
