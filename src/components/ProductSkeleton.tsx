import React from 'react';

interface ProductCardSkeletonProps {
  className?: string;
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white border border-[#0A2342]/10 rounded-xl overflow-hidden shadow-sm flex flex-col h-full animate-pulse ${className}`}>
      
      {/* Skeleton Image Area */}
      <div className="relative h-72 w-full bg-[#E5E2DD]/80 flex items-center justify-center p-4 overflow-hidden">
        {/* Shimmer badge placeholders */}
        <div className="absolute top-3 left-3 flex gap-1">
          <div className="h-4 w-16 bg-slate-300/60 rounded-full"></div>
        </div>
        <div className="absolute top-3 right-3">
          <div className="h-4 w-20 bg-slate-300/60 rounded-full"></div>
        </div>

        {/* Center watermark placeholder */}
        <div className="w-16 h-16 rounded-full bg-slate-300/40 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-slate-300/60"></div>
        </div>
      </div>

      {/* Skeleton Content */}
      <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
        <div className="space-y-2">
          {/* Category & Rating */}
          <div className="flex items-center justify-between">
            <div className="h-3 w-20 bg-slate-200 rounded"></div>
            <div className="h-3 w-12 bg-slate-200 rounded"></div>
          </div>

          {/* Title */}
          <div className="h-5 w-4/5 bg-slate-200 rounded"></div>
          <div className="h-4 w-3/5 bg-slate-200/80 rounded"></div>

          {/* Price & State */}
          <div className="flex items-center justify-between pt-1">
            <div className="h-5 w-24 bg-slate-200 rounded"></div>
            <div className="h-3 w-16 bg-slate-200 rounded"></div>
          </div>
        </div>

        {/* Color swatches */}
        <div className="flex items-center gap-1.5 pt-1">
          <div className="w-4 h-4 rounded-full bg-slate-200"></div>
          <div className="w-4 h-4 rounded-full bg-slate-200"></div>
          <div className="w-4 h-4 rounded-full bg-slate-200"></div>
        </div>

        {/* Skeleton Button */}
        <div className="h-10 w-full bg-[#0A2342]/10 rounded-lg mt-2"></div>
      </div>
    </div>
  );
};

interface ProductGridSkeletonProps {
  count?: number;
  gridClassName?: string;
}

export const ProductGridSkeleton: React.FC<ProductGridSkeletonProps> = ({
  count = 8,
  gridClassName = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
}) => {
  return (
    <div className={gridClassName}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={`product-skeleton-${index}`} />
      ))}
    </div>
  );
};
