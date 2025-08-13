import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import { cartService } from '../services/cartService';
import { AddToCartRequest, Cart, CartItem } from '../types/api';
import { STORAGE_KEYS } from '../utils/config';

// Cart State Type
interface CartState {
  cart: Cart | null;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  itemCount: number;
  promoCode: string | null;
  isLoading: boolean;
  error: string | null;
}

// Cart Actions
type CartAction =
  | { type: 'CART_LOADING'; payload: boolean }
  | { type: 'CART_SET'; payload: Cart }
  | { type: 'CART_ERROR'; payload: string }
  | { type: 'CART_CLEAR' }
  | { type: 'CART_UPDATE_TOTALS'; payload: { subtotal: number; tax: number; shipping: number; discount: number; total: number } }
  | { type: 'PROMO_SET'; payload: string | null }
  | { type: 'CLEAR_ERROR' };

// Initial State
const initialState: CartState = {
  cart: null,
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  discount: 0,
  total: 0,
  itemCount: 0,
  promoCode: null,
  isLoading: false,
  error: null,
};

// Cart Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'CART_LOADING':
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      };

    case 'CART_SET':
      const cart = action.payload;
      return {
        ...state,
        cart,
        items: cart.items,
        subtotal: cart.subtotal,
        tax: cart.tax,
        shipping: cart.shipping,
        discount: cart.discount,
        total: cart.total,
        itemCount: cart.items.reduce((count, item) => count + item.quantity, 0),
        promoCode: cart.promoCode || null,
        isLoading: false,
        error: null,
      };

    case 'CART_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case 'CART_CLEAR':
      return {
        ...initialState,
      };

    case 'CART_UPDATE_TOTALS':
      return {
        ...state,
        ...action.payload,
        total: action.payload.total,
      };

    case 'PROMO_SET':
      return {
        ...state,
        promoCode: action.payload,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// Cart Context
interface CartContextType extends CartState {
  addToCart: (item: AddToCartRequest) => Promise<void>;
  updateCartItem: (cartItemId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  applyPromoCode: (code: string) => Promise<void>;
  removePromoCode: () => Promise<void>;
  refreshCart: () => Promise<void>;
  clearError: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider Props
interface CartProviderProps {
  children: ReactNode;
}

// Cart Provider Component
export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart on initialization
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      dispatch({ type: 'CART_LOADING', payload: true });

      // Try to load from server first
      try {
        const cart = await cartService.getCart();
        dispatch({ type: 'CART_SET', payload: cart });
      } catch (serverError) {
        // Fallback to local storage
        const storedCart = await AsyncStorage.getItem(STORAGE_KEYS.CART_DATA);
        if (storedCart) {
          const cart = JSON.parse(storedCart);
          dispatch({ type: 'CART_SET', payload: cart });
        } else {
          dispatch({ type: 'CART_LOADING', payload: false });
        }
      }
    } catch (error: any) {
      console.error('Error loading cart:', error);
      dispatch({ type: 'CART_ERROR', payload: 'Failed to load cart' });
    }
  };

  const saveCartToLocal = async (cart: Cart) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CART_DATA, JSON.stringify(cart));
    } catch (error) {
      console.warn('Failed to save cart to local storage:', error);
    }
  };

  const addToCart = async (item: AddToCartRequest) => {
    try {
      dispatch({ type: 'CART_LOADING', payload: true });

      const updatedCart = await cartService.addToCart(item);
      
      dispatch({ type: 'CART_SET', payload: updatedCart });
      await saveCartToLocal(updatedCart);
    } catch (error: any) {
      dispatch({ type: 'CART_ERROR', payload: error.message });
      throw error;
    }
  };

  const updateCartItem = async (cartItemId: string, quantity: number) => {
    try {
      dispatch({ type: 'CART_LOADING', payload: true });

      if (quantity <= 0) {
        await removeFromCart(cartItemId);
        return;
      }

      const updatedCart = await cartService.updateCartItem({
        cartItemId,
        quantity,
      });
      
      dispatch({ type: 'CART_SET', payload: updatedCart });
      await saveCartToLocal(updatedCart);
    } catch (error: any) {
      dispatch({ type: 'CART_ERROR', payload: error.message });
      throw error;
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      dispatch({ type: 'CART_LOADING', payload: true });

      const updatedCart = await cartService.removeFromCart(cartItemId);
      
      dispatch({ type: 'CART_SET', payload: updatedCart });
      await saveCartToLocal(updatedCart);
    } catch (error: any) {
      dispatch({ type: 'CART_ERROR', payload: error.message });
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: 'CART_LOADING', payload: true });

      await cartService.clearCart();
      
      dispatch({ type: 'CART_CLEAR' });
      await AsyncStorage.removeItem(STORAGE_KEYS.CART_DATA);
    } catch (error: any) {
      dispatch({ type: 'CART_ERROR', payload: error.message });
      throw error;
    }
  };

  const applyPromoCode = async (code: string) => {
    try {
      // This would typically involve calling a promo validation API
      // For now, we'll update the promo code and recalculate totals
      dispatch({ type: 'PROMO_SET', payload: code });
      
      // Refresh cart to get updated totals with promo
      await refreshCart();
    } catch (error: any) {
      dispatch({ type: 'CART_ERROR', payload: error.message });
      throw error;
    }
  };

  const removePromoCode = async () => {
    try {
      dispatch({ type: 'PROMO_SET', payload: null });
      await refreshCart();
    } catch (error: any) {
      dispatch({ type: 'CART_ERROR', payload: error.message });
      throw error;
    }
  };

  const refreshCart = async () => {
    await loadCart();
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: CartContextType = {
    ...state,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    applyPromoCode,
    removePromoCode,
    refreshCart,
    clearError,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use Cart context
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
