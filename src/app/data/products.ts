import type { Product } from "../components/ProductPage";

import aetherialShell from "../../imports/Jacket_homepage_high_pixel.webp";
import priestHood from "../../imports/scatter/pimp_priest_product_image.webp";
import phaseShiftCargo from "../../imports/scatter/actively_product_image.webp";
import synapseBase from "../../imports/scatter/Lips_holy_product_image.webp";
import adoredDiscarded from "../../imports/scatter/Adored_discareded_product_image.webp";
import voidWalkers from "../../imports/scatter/Sin_looks_better_product_image.webp";
import zipMechanism from "../../imports/img1.webp";

export const products: Product[] = [
  {
    id: 1,
    name: "Aetherial Shell",
    price: "$450",
    category: "Outerwear",
    image: aetherialShell,
    year: "2025",
    collection: "AW-25",
    cardType: "hero"
  },
  {
    id: 2,
    name: "Priest Hood",
    price: "$210",
    category: "Hoodies",
    image: priestHood,
    year: "2025",
    collection: "AW-25",
    cardType: "micro"
  },
  {
    id: 3,
    name: "Phase Shift Cargo",
    price: "$280",
    category: "Bottoms",
    image: phaseShiftCargo,
    year: "2025",
    collection: "AW-25",
    cardType: "portrait"
  },
  {
    id: 4,
    name: "Synapse Base Layer",
    price: "$150",
    category: "Tops",
    image: synapseBase,
    year: "2025",
    collection: "AW-25",
    cardType: "feature"
  },
  {
    id: 5,
    name: "Adored Discarded Tee",
    price: "$120",
    category: "Tops",
    image: adoredDiscarded,
    year: "2025",
    collection: "AW-25",
    cardType: "landscape"
  },
  {
    id: 6,
    name: "Void Walkers",
    price: "$320",
    category: "Footwear",
    image: voidWalkers,
    year: "2025",
    collection: "AW-25",
    cardType: "portrait"
  },
  {
    id: 7,
    name: "Zip Mechanism",
    price: "$N/A",
    category: "Hardware",
    image: zipMechanism,
    year: "2025",
    collection: "AW-25",
    cardType: "micro"
  }
];
