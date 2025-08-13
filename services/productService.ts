import {
    ApiResponse,
    Category,
    PaginatedResponse,
    Product,
    SearchFilters,
    SearchRequest,
} from '../types/api';
import { API_CONFIG } from '../utils/config';
import { apiClient } from './apiClient';

class ProductService {
  async getProducts(params?: {
    page?: number;
    limit?: number;
    categoryId?: string;
  }): Promise<PaginatedResponse<Product>> {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
        API_CONFIG.ENDPOINTS.PRODUCTS,
        { params }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await apiClient.get<ApiResponse<Product>>(
        `${API_CONFIG.ENDPOINTS.PRODUCT_BY_ID}/${id}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch product');
    }
  }

  async getFeaturedProducts(limit?: number): Promise<Product[]> {
    try {
      const response = await apiClient.get<ApiResponse<Product[]>>(
        API_CONFIG.ENDPOINTS.FEATURED_PRODUCTS,
        { params: { limit } }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch featured products');
    }
  }

  async searchProducts(searchParams: SearchRequest): Promise<PaginatedResponse<Product>> {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
        API_CONFIG.ENDPOINTS.PRODUCT_SEARCH,
        { params: searchParams }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Search failed');
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const response = await apiClient.get<ApiResponse<Category[]>>(
        API_CONFIG.ENDPOINTS.CATEGORIES
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  }

  async getCategoryById(id: string): Promise<Category> {
    try {
      const response = await apiClient.get<ApiResponse<Category>>(
        `${API_CONFIG.ENDPOINTS.CATEGORIES}/${id}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch category');
    }
  }

  async getProductsByCategory(
    categoryId: string,
    params?: { page?: number; limit?: number }
  ): Promise<PaginatedResponse<Product>> {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
        `${API_CONFIG.ENDPOINTS.CATEGORIES}/${categoryId}/products`,
        { params }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch category products');
    }
  }

  // Filter and sorting utilities
  filterProducts(products: Product[], filters: SearchFilters): Product[] {
    let filtered = [...products];

    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.name.toLowerCase().includes(query)
      );
    }

    if (filters.categoryId) {
      filtered = filtered.filter(product => product.category.id === filters.categoryId);
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(product => product.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(product => product.price <= filters.maxPrice!);
    }

    if (filters.sizes && filters.sizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes?.some(size => filters.sizes!.includes(size))
      );
    }

    if (filters.colors && filters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors?.some(color => filters.colors!.includes(color.name))
      );
    }

    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(product =>
        product.brand && filters.brands!.includes(product.brand)
      );
    }

    if (filters.rating !== undefined) {
      filtered = filtered.filter(product => product.rating >= filters.rating!);
    }

    if (filters.inStockOnly) {
      filtered = filtered.filter(product => product.isInStock);
    }

    // Sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let aValue: any, bValue: any;

        switch (filters.sortBy) {
          case 'name':
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'rating':
            aValue = a.rating;
            bValue = b.rating;
            break;
          case 'newest':
            aValue = new Date(a.createdAt);
            bValue = new Date(b.createdAt);
            break;
          case 'popularity':
            aValue = a.reviewCount;
            bValue = b.reviewCount;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return filters.sortOrder === 'desc' ? 1 : -1;
        if (aValue > bValue) return filters.sortOrder === 'desc' ? -1 : 1;
        return 0;
      });
    }

    return filtered;
  }
}

export const productService = new ProductService();
