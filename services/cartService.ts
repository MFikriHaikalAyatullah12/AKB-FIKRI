import {
    AddToCartRequest,
    ApiResponse,
    Cart,
    CartItem,
    UpdateCartItemRequest,
} from '../types/api';
import { API_CONFIG } from '../utils/config';
import { apiClient } from './apiClient';

class CartService {
  async getCart(): Promise<Cart> {
    try {
      const response = await apiClient.get<ApiResponse<Cart>>(
        API_CONFIG.ENDPOINTS.CART
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch cart');
    }
  }

  async addToCart(item: AddToCartRequest): Promise<Cart> {
    try {
      const response = await apiClient.post<ApiResponse<Cart>>(
        API_CONFIG.ENDPOINTS.ADD_TO_CART,
        item
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add item to cart');
    }
  }

  async updateCartItem(update: UpdateCartItemRequest): Promise<Cart> {
    try {
      const response = await apiClient.put<ApiResponse<Cart>>(
        API_CONFIG.ENDPOINTS.UPDATE_CART,
        update
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update cart item');
    }
  }

  async removeFromCart(cartItemId: string): Promise<Cart> {
    try {
      const response = await apiClient.delete<ApiResponse<Cart>>(
        `${API_CONFIG.ENDPOINTS.REMOVE_FROM_CART}/${cartItemId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to remove item from cart');
    }
  }

  async clearCart(): Promise<void> {
    try {
      await apiClient.delete(API_CONFIG.ENDPOINTS.CLEAR_CART);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to clear cart');
    }
  }

  // Local cart management (for offline/fallback scenarios)
  calculateCartTotals(items: CartItem[], promoDiscount: number = 0): {
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
  } {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const discount = promoDiscount;
    const discountedSubtotal = subtotal - discount;
    const shipping = discountedSubtotal >= 100 ? 0 : 9.99;
    const tax = discountedSubtotal * 0.08; // 8% tax
    const total = discountedSubtotal + shipping + tax;

    return {
      subtotal,
      tax,
      shipping,
      discount,
      total,
    };
  }

  validateCartItem(item: AddToCartRequest): boolean {
    return !!(
      item.productId &&
      item.quantity > 0 &&
      item.quantity <= 10 // Max quantity limit
    );
  }
}

export const cartService = new CartService();
