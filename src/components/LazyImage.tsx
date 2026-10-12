import React, { useState } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatioClass?: string;
  wrapperClassName?: string;
  priority?: boolean;
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
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-surface-container-low ${aspectRatioClass} ${wrapperClassName}`}
    >
      {/* Lightweight cyber placeholder shimmer before image loads */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-surface-container-high/40 animate-pulse flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-secondary/40 animate-ping" />
        </div>
      )}

      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center bg-surface-container-low text-outline font-mono-code text-[11px]">
          <span>IMAGE_NOT_RESOLVED</span>
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
          className={`transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;
