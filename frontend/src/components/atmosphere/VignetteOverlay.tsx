import React from 'react';

export const VignetteOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[90] pointer-events-none shadow-[inset_0_0_12vw_rgba(0,0,0,0.8)]" />
  );
};
