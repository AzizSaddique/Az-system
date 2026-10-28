import React, { useState } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatioClass?: string;
  wrapperClassName?: string;
  priority?: boolean;
  skeletonLabel?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  aspectRatioClass = '',
  priority = false,
  width,
  height,
  skeletonLabel,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-surface-container-low ${aspectRatioClass} ${wrapperClassName}`}
    >
      {/* Cyber Skeleton Placeholder */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-surface-container-high/30 flex flex-col items-center justify-center pointer-events-none p-2"
          aria-hidden="true"
        >
          {/* Subtle tech grid background */}
          <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none" />
          
          {/* Scanning Shimmer Beam */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-surface-container-highest/40 to-transparent animate-shimmer" />

          {/* Micro Telemetry Pill */}
          <div className="relative z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-lowest/80 border border-outline-variant/30 text-[10px] font-mono-label text-outline">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="truncate max-w-[140px] uppercase tracking-wider">
              {skeletonLabel || 'SYNCING ASSET'}
            </span>
          </div>
        </div>
      )}

      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-surface-container-low text-outline font-mono-code text-[11px] border border-outline-variant/20">
          <span className="text-secondary font-bold">ASSET // OFFLINE</span>
          <span className="text-[10px] opacity-75 mt-0.5 truncate max-w-full">
            {alt || 'Media stream unavailable'}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          // @ts-expect-error fetchpriority is a valid HTML attribute supported in modern browsers
          fetchpriority={priority ? 'high' : 'auto'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`transition-opacity duration-300 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;

