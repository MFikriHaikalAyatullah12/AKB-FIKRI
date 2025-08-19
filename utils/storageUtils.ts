import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Utility function to safely clear corrupted AsyncStorage data
 * This helps prevent JSON parse errors on app startup
 */
export const clearCorruptedStorageData = async () => {
  try {
    console.log('Clearing potentially corrupted storage data...');
    
    // List of keys that might contain corrupted data
    const keysToCheck = [
      '@fashionstore:auth_token',
      '@fashionstore:refresh_token', 
      '@fashionstore:user_data',
      'AUTH_EXPIRES_IN',
    ];

    // Remove all keys
    await AsyncStorage.multiRemove(keysToCheck);
    
    console.log('Storage data cleared successfully');
  } catch (error) {
    console.error('Error clearing storage data:', error);
  }
};

/**
 * Utility function to safely parse JSON from AsyncStorage
 */
export const safeJsonParse = <T>(jsonString: string | null, fallback: T): T => {
  if (!jsonString) return fallback;
  
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('JSON parse error:', error);
    return fallback;
  }
};

/**
 * Utility function to safely get and parse data from AsyncStorage
 */
export const safeAsyncStorageGet = async <T>(key: string, fallback: T): Promise<T> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return safeJsonParse(value, fallback);
  } catch (error) {
    console.error(`Error getting ${key} from AsyncStorage:`, error);
    return fallback;
  }
};
