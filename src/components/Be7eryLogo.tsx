import React from 'react';

interface Be7eryLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSignature?: boolean;
}

export const Be7eryLogo: React.FC<Be7eryLogoProps> = ({
  className = '',
  size = 'md',
  showSignature = false,
}) => {
  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-12',
    lg: 'h-16 sm:h-20',
    xl: 'h-24 sm:h-28',
  };

  const [imgError, setImgError] = React.useState(false);

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className="relative flex items-center shrink-0">
        {!imgError ? (
          <img
            src="/be7ery_logo.jpg"
            alt="#Be7ery Logo"
            className={`${sizeClasses[size]} w-auto object-contain drop-shadow-xs transition-transform hover:scale-105`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-[#1D4ED8] font-black text-sm font-mono">
            #Be7ery
          </div>
        )}

        {showSignature && (
          <div className="flex flex-col text-right pr-3 border-r border-gray-200 mr-2">
            <span className="font-black text-gray-900 text-sm leading-tight">
              البرمجة والذكاء الاصطناعي
            </span>
            <span className="text-[10px] font-mono tracking-wider text-gray-400 font-bold">
              #Be7ery
            </span>
          </div>
        )}
      </div>
    </div>
  );
};




