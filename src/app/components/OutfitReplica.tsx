import React from "react";

import { useUIStore } from "../../store/useUIStore";
import { products } from "../data/products";
import { motion } from "motion/react";
import { useCartStore } from "../../store/useCartStore";
import { Footer } from "./Footer";

export function OutfitReplica({
  onProductClick,
}: {
  onProductClick?: (p: any) => void;
}) {
  const { setHoveredProduct } = useUIStore();
  return (
    <>
      <main id="page" data-page="home">
        <div className="px-4 lg:px-6">
          <div className="mt-26 mb-6">
            <div className="relative">
              <div className="overflow-hidden pb-4">
                <motion.h1
                  className="text-[13vw] leading-[0.75] font-[900] uppercase tracking-tighter"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1,
                  }}
                >
                  DAMAGED GOODS
                </motion.h1>
              </div>
            </div>
            <motion.div
              id="hero-line"
              className="mb-6 h-[5px] w-full origin-left bg-current"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            ></motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              id="hero-content"
              className="mb-10 grid grid-cols-8 gap-x-6 gap-y-10 text-xs font-bold md:grid-cols-16 md:gap-6"
            >
              <div className="col-span-3 md:col-span-4">
                <h1 className="uppercase" id="hero-title">
                  Damaged Goods
                </h1>
              </div>
              <div className="col-span-5 md:col-span-8">
                <h2 className="mb-4 uppercase" id="hero-subtitle">
                  Why
                </h2>
                <p
                  id="hero-paragraph"
                  className="text-sm leading-4 tracking-tight md:max-w-[60%]"
                >
                  Created by the ++hellohello team, this store and signature
                  collection celebrates our collective creativity and passion
                  for apparel. Carefully designed.
                </p>
              </div>
              <div className="col-span-3 flex h-full flex-col justify-between md:col-span-3">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-hover max-w-fit uppercase"
                  id="hero-link"
                  href="https://www.hellohello.is"
                >
                  Visit ++ website
                </a>
                <a
                  className="link-hover max-w-fit uppercase hidden md:inline-block"
                  id="hero-shipping-returns-link"
                  href="/shipping-and-return"
                >
                  Shipping &amp; Returns
                </a>
              </div>
              <div
                className="col-span-5 flex justify-end md:col-span-1"
                id="hero-copyright"
              >
                © 2026
              </div>
              <div
                className="col-span-8 inline-block md:hidden"
                id="hero-shipping-returns-link-mobile"
              >
                <a
                  className="link-hover max-w-fit link-hover uppercase"
                  href="#"
                >
                  Shipping &amp; Returns
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="px-4 lg:px-6">
          <div className="px-4 lg:px-6 mb-34 mt-20">
            <section className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {products.slice(0, 4).map((product) => (
                <motion.article
                  layoutId={`product-image-${product.id}`}
                  key={product.id}
                  className="group relative cursor-none"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  onClick={() => {
                    setHoveredProduct(null); // Reset hover
                    if (onProductClick) {
                      onProductClick(product);
                    }
                  }}
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#1A1816] mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 mix-blend-normal"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-sm tracking-tight">
                        {product.name}
                      </h3>
                      <span className="font-bold text-sm">{product.price}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </section>
          </div>

          <template id="P:3"></template>
        </div>
      </main>
      <Footer />
    </>
  );
}
