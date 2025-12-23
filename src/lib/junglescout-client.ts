/**
 * Jungle Scout API Client
 * Handles all API calls to Jungle Scout with error handling and credit tracking
 */

interface JungleScoutCategory {
  id: string;
  name: string;
  parent_id?: string;
  level: number;
}

interface JungleScoutBrand {
  name: string;
  asin: string;
  price: number;
  revenue_estimate: number;
  rating: number;
  review_count: number;
  product_count: number;
}

interface JungleScoutResponse {
  success: boolean;
  data?: any;
  error?: string;
  credits_used?: number;
}

class JungleScoutClient {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.JUNGLE_SCOUT_API_KEY || '';
    this.baseUrl = process.env.JUNGLE_SCOUT_API_BASE_URL || 'https://api.junglescout.com';

    if (!this.apiKey) {
      console.warn('⚠️ JUNGLE_SCOUT_API_KEY not configured');
    }
  }

  /**
   * Get all categories for a specific market
   */
  async getCategories(market: string): Promise<JungleScoutResponse> {
    try {
      console.log(`📥 Fetching categories for market: ${market}`);

      const response = await fetch(`${this.baseUrl}/v2/categories`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(30000), // 30 second timeout
      });

      if (!response.ok) {
        const error = await response.text();
        console.error(`❌ Jungle Scout API error: ${response.status}`, error);
        return {
          success: false,
          error: `API Error: ${response.status} - ${error}`,
          credits_used: 0,
        };
      }

      const data = await response.json();

      // Filter categories by market
      const categories = data.categories || [];
      const filteredCategories = categories.filter((cat: any) => 
        cat.marketplace === market || cat.market === market
      );

      console.log(`✅ Retrieved ${filteredCategories.length} categories for ${market}`);

      return {
        success: true,
        data: filteredCategories,
        credits_used: 50, // Approximate credits per category fetch
      };
    } catch (error) {
      console.error('❌ Error fetching categories:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        credits_used: 0,
      };
    }
  }

  /**
   * Get top brands for a specific category and market
   */
  async getTopBrands(
    categoryId: string,
    market: string,
    limit: number = 200
  ): Promise<JungleScoutResponse> {
    try {
      console.log(`📥 Fetching top ${limit} brands for category ${categoryId} in ${market}`);

      const response = await fetch(`${this.baseUrl}/v2/brands`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category_id: categoryId,
          marketplace: market,
          limit: limit,
          sort_by: 'revenue',
          sort_order: 'desc',
        }),
        signal: AbortSignal.timeout(30000),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error(`❌ Jungle Scout API error: ${response.status}`, error);
        return {
          success: false,
          error: `API Error: ${response.status}`,
          credits_used: 0,
        };
      }

      const data = await response.json();
      const brands = data.brands || [];

      console.log(`✅ Retrieved ${brands.length} brands for category ${categoryId}`);

      return {
        success: true,
        data: brands,
        credits_used: Math.ceil(limit / 50) * 10, // Approximate credits
      };
    } catch (error) {
      console.error('❌ Error fetching brands:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        credits_used: 0,
      };
    }
  }

  /**
   * Get brand details
   */
  async getBrandDetails(brandName: string, market: string): Promise<JungleScoutResponse> {
    try {
      console.log(`📥 Fetching details for brand: ${brandName} in ${market}`);

      const response = await fetch(`${this.baseUrl}/v2/brand-details`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand_name: brandName,
          marketplace: market,
        }),
        signal: AbortSignal.timeout(30000),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error(`❌ Jungle Scout API error: ${response.status}`, error);
        return {
          success: false,
          error: `API Error: ${response.status}`,
          credits_used: 0,
        };
      }

      const data = await response.json();

      return {
        success: true,
        data: data,
        credits_used: 5,
      };
    } catch (error) {
      console.error('❌ Error fetching brand details:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        credits_used: 0,
      };
    }
  }

  /**
   * Check API health and credits remaining
   */
  async checkCredits(): Promise<JungleScoutResponse> {
    try {
      console.log('📥 Checking API credits...');

      const response = await fetch(`${this.baseUrl}/v2/account`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        return {
          success: false,
          error: `API Error: ${response.status}`,
          credits_used: 0,
        };
      }

      const data = await response.json();

      console.log(`✅ Credits remaining: ${data.credits_remaining || 'Unknown'}`);

      return {
        success: true,
        data: data,
        credits_used: 0,
      };
    } catch (error) {
      console.error('❌ Error checking credits:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        credits_used: 0,
      };
    }
  }
}

// Export singleton instance
export const jungleScoutClient = new JungleScoutClient();
export type { JungleScoutCategory, JungleScoutBrand, JungleScoutResponse };
