import { useCallback, useState } from 'react';
import { orderService } from '../services/orderService';
import { CreateOrderRequest, Order } from '../types/api';

// Hook for creating orders
export function useCreateOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = useCallback(async (orderData: CreateOrderRequest): Promise<Order> => {
    try {
      setLoading(true);
      setError(null);
      
      const order = await orderService.createOrder(orderData);
      return order;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createOrder,
    loading,
    error,
  };
}

// Hook for fetching orders
export function useOrders(params?: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await orderService.getOrders(params);
      
      setOrders(response.data);
      setPagination(response.pagination);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [params?.page, params?.limit, params?.status]);

  return {
    orders,
    loading,
    error,
    pagination,
    fetchOrders,
    refetch: fetchOrders,
  };
}

// Hook for fetching single order
export function useOrder(orderId: string | null) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = useCallback(async () => {
    if (!orderId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await orderService.getOrderById(orderId);
      setOrder(response);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  return {
    order,
    loading,
    error,
    fetchOrder,
    refetch: fetchOrder,
  };
}

// Hook for order history
export function useOrderHistory(params?: {
  page?: number;
  limit?: number;
}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchOrderHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await orderService.getOrderHistory(params);
      
      setOrders(response.data);
      setPagination(response.pagination);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [params?.page, params?.limit]);

  return {
    orders,
    loading,
    error,
    pagination,
    fetchOrderHistory,
    refetch: fetchOrderHistory,
  };
}

// Hook for canceling orders
export function useCancelOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cancelOrder = useCallback(async (orderId: string): Promise<Order> => {
    try {
      setLoading(true);
      setError(null);
      
      const order = await orderService.cancelOrder(orderId);
      return order;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    cancelOrder,
    loading,
    error,
  };
}
