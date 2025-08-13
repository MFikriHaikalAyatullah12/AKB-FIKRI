import {
    ApiResponse,
    ValidatePromoRequest,
    ValidatePromoResponse,
} from '../types/api';
import { API_CONFIG } from '../utils/config';
import { apiClient } from './apiClient';

class PromoService {
  async validatePromoCode(request: ValidatePromoRequest): Promise<ValidatePromoResponse> {
    try {
      const response = await apiClient.post<ApiResponse<ValidatePromoResponse>>(
        API_CONFIG.ENDPOINTS.VALIDATE_PROMO,
        request
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to validate promo code');
    }
  }

  // Local validation for common promo codes (fallback)
  validatePromoCodeLocal(code: string, subtotal: number): ValidatePromoResponse {
    const normalizedCode = code.toUpperCase().trim();
    
    const promoCodes = {
      'SAVE20': {
        type: 'percentage' as const,
        value: 20,
        minimumOrderAmount: 50,
        description: '20% off orders over $50'
      },
      'SAVE10': {
        type: 'percentage' as const,
        value: 10,
        minimumOrderAmount: 25,
        description: '10% off orders over $25'
      },
      'FREESHIP': {
        type: 'free_shipping' as const,
        value: 9.99,
        minimumOrderAmount: 75,
        description: 'Free shipping on orders over $75'
      },
      'WELCOME15': {
        type: 'percentage' as const,
        value: 15,
        minimumOrderAmount: 40,
        description: '15% off for new customers'
      },
      'FLAT50': {
        type: 'fixed_amount' as const,
        value: 50,
        minimumOrderAmount: 200,
        description: '$50 off orders over $200'
      }
    };

    const promo = promoCodes[normalizedCode as keyof typeof promoCodes];

    if (!promo) {
      return {
        isValid: false,
        discount: 0,
        message: 'Invalid promo code'
      };
    }

    if (subtotal < promo.minimumOrderAmount) {
      return {
        isValid: false,
        discount: 0,
        message: `Minimum order amount is $${promo.minimumOrderAmount}`
      };
    }

    let discount = 0;
    let message = '';

    switch (promo.type) {
      case 'percentage':
        discount = (subtotal * promo.value) / 100;
        message = `${promo.value}% discount applied!`;
        break;
      case 'fixed_amount':
        discount = Math.min(promo.value, subtotal);
        message = `$${discount} discount applied!`;
        break;
      case 'free_shipping':
        discount = promo.value;
        message = 'Free shipping applied!';
        break;
    }

    return {
      isValid: true,
      discount,
      message
    };
  }

  calculateDiscount(
    type: 'percentage' | 'fixed_amount' | 'free_shipping',
    value: number,
    subtotal: number,
    maxDiscount?: number
  ): number {
    let discount = 0;

    switch (type) {
      case 'percentage':
        discount = (subtotal * value) / 100;
        if (maxDiscount && discount > maxDiscount) {
          discount = maxDiscount;
        }
        break;
      case 'fixed_amount':
        discount = Math.min(value, subtotal);
        break;
      case 'free_shipping':
        discount = value; // Usually shipping cost
        break;
    }

    return discount;
  }
}

export const promoService = new PromoService();
