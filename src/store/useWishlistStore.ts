import { create } from 'zustand';

export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  colSpan: string;
}

interface WishlistStore {
  items: Product[];
  isWishlistOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  toggleWishlist: () => void;
  setIsWishlistOpen: (isOpen: boolean) => void;
  hasItem: (id: number) => boolean;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  isWishlistOpen: false,
  addItem: (product) => set((state) => {
    const exists = state.items.some((item) => item.id === product.id);
    if (exists) return {};
    return { items: [...state.items, product] };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),
  toggleWishlist: () => set((state) => ({ isWishlistOpen: !state.isWishlistOpen })),
  setIsWishlistOpen: (isOpen) => set({ isWishlistOpen: isOpen }),
  hasItem: (id) => get().items.some((item) => item.id === id),
}));
