import {
    ApiResponse,
    CreateOrderRequest,
    Order,
    PaginatedResponse,
} from '../types/api';
import { API_CONFIG } from '../utils/config';
import { apiClient } from './apiClient';

class OrderService {
  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    try {
      const response = await apiClient.post<ApiResponse<Order>>(
        API_CONFIG.ENDPOINTS.CREATE_ORDER,
        orderData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create order');
    }
  }

  async getOrders(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<Order>> {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Order>>>(
        API_CONFIG.ENDPOINTS.ORDERS,
        { params }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
  }

  async getOrderById(orderId: string): Promise<Order> {
    try {
      const response = await apiClient.get<ApiResponse<Order>>(
        `${API_CONFIG.ENDPOINTS.ORDERS}/${orderId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch order');
    }
  }

  async getOrderHistory(params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Order>> {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Order>>>(
        API_CONFIG.ENDPOINTS.ORDER_HISTORY,
        { params }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch order history');
    }
  }

  async cancelOrder(orderId: string): Promise<Order> {
    try {
      const response = await apiClient.patch<ApiResponse<Order>>(
        `${API_CONFIG.ENDPOINTS.ORDERS}/${orderId}/cancel`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to cancel order');
    }
  }

  // Utility methods
  getOrderStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#FFA500';
      case 'confirmed':
        return '#2196F3';
      case 'processing':
        return '#FF9800';
      case 'shipped':
        return '#9C27B0';
      case 'delivered':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      case 'refunded':
        return '#795548';
      default:
        return '#757575';
    }
  }

  getOrderStatusText(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      case 'refunded':
        return 'Refunded';
      default:
        return 'Unknown';
    }
  }
}

export const orderService = new OrderService();
