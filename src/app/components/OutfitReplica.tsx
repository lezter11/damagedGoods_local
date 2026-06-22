import React from 'react';
import { Product } from './ProductPage';
import { LiquidBlobHero } from './LiquidBlobHero';
import { EditorialArchive } from './EditorialArchive';
import { Footer } from './Footer';

interface OutfitReplicaProps {
  onProductClick?: (product: Product, rect?: DOMRect) => void;
  activeProductId?: number | null;
}

export const OutfitReplica: React.FC<OutfitReplicaProps> = ({ onProductClick, activeProductId }) => {
  return (
    <div className="w-full flex flex-col bg-[#050505]">
      {/* 
        SECTION 1: THE PORTAL LANDING
        This serves as the connection between the 3D void and the DOM.
        It uses the LiquidBlobHero which is the exact aesthetic requested by the user.
      */}
      <LiquidBlobHero />

      {/* 
        SECTION 2: THE EDITORIAL ARCHIVE
        This is the new bespoke vertical scroll layout system.
      */}
      <EditorialArchive onProductClick={onProductClick} activeProductId={activeProductId} />

      {/* 
        SECTION 3: FOOTER & CTA
      */}
      <Footer />
    </div>
  );
};