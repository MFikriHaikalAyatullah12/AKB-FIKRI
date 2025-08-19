import { LoginRequest, LoginResponse, RegisterRequest, User } from '../types/api';

// Mock data untuk development/testing
const mockUsers: Array<User & { password: string }> = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '+1234567890',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    dateOfBirth: '1990-01-01',
    gender: 'male' as const,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  {
    id: '2',
    firstName: 'Fikri',
    lastName: 'Member',
    email: 'fikri123@gmail.com',
    password: 'ayatullah1945',
    phone: '+62812345678',
    avatar: 'https://ui-avatars.com/api/?name=Fikri+Member&background=E53E3E&color=ffffff&size=200',
    dateOfBirth: '1995-01-01',
    gender: 'male' as const,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  }
];

const generateMockTokens = () => ({
  accessToken: `mock_access_token_${Date.now()}`,
  refreshToken: `mock_refresh_token_${Date.now()}`,
  expiresIn: 3600
});

class MockAuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(
      u => u.email.toLowerCase() === credentials.email.toLowerCase() && 
           u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const { password, ...userWithoutPassword } = user;
    const tokens = generateMockTokens();

    return {
      user: userWithoutPassword,
      tokens
    };
  }

  async register(userData: RegisterRequest): Promise<LoginResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if email already exists
    const existingUser = mockUsers.find(
      u => u.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Create new user
    const newUser: User & { password: string } = {
      id: `${Date.now()}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email.toLowerCase(),
      password: userData.password,
      phone: userData.phone || '',
      avatar: `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=E53E3E&color=ffffff&size=200`,
      dateOfBirth: '',
      gender: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to mock database
    mockUsers.push(newUser);

    const { password, ...userWithoutPassword } = newUser;
    const tokens = generateMockTokens();

    return {
      user: userWithoutPassword,
      tokens
    };
  }

  async logout(): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock logout - in real app this would invalidate tokens
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      accessToken: `mock_access_token_${Date.now()}`
    };
  }

  async getCurrentUser(): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 300));
    // For mock, return the first user
    const { password, ...user } = mockUsers[0];
    return user;
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const { password, ...user } = mockUsers[0];
    return { ...user, ...userData };
  }

  async forgotPassword(email: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw new Error('Email not found');
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    // Mock password reset
  }
}

export const mockAuthService = new MockAuthService();
