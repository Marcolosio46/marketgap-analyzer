import { NextRequest, NextResponse } from 'next/server';
import { jungleScoutClient } from '@/lib/junglescout-client';

/**
 * POST /api/categories/sync
 * Syncs categories from Jungle Scout for a specific market
 * 
 * Body:
 * {
 *   market: "ES" | "FR" | "DE" | "UK" | "COM" | "IT"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { market } = body;

    if (!market) {
      return NextResponse.json(
        { error: 'Market is required' },
        { status: 400 }
      );
    }

    const validMarkets = ['ES', 'FR', 'DE', 'UK', 'COM', 'IT'];
    if (!validMarkets.includes(market)) {
      return NextResponse.json(
        { error: `Invalid market. Must be one of: ${validMarkets.join(', ')}` },
        { status: 400 }
      );
    }

    console.log(`🔄 Starting category sync for market: ${market}`);

    // Call Jungle Scout API to get categories
    const result = await jungleScoutClient.getCategories(market);

    if (!result.success) {
      console.error(`❌ Failed to sync categories for ${market}:`, result.error);
      return NextResponse.json(
        { 
          error: result.error,
          market,
          synced: 0,
        },
        { status: 500 }
      );
    }

    const categories = result.data || [];

    console.log(`✅ Successfully synced ${categories.length} categories for ${market}`);

    return NextResponse.json({
      success: true,
      market,
      synced: categories.length,
      categories: categories.slice(0, 10), // Return first 10 for preview
      credits_used: result.credits_used,
      message: `Synced ${categories.length} categories for ${market}`,
    });

  } catch (error) {
    console.error('❌ Error in category sync:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/categories/sync
 * Get sync status for all markets
 */
export async function GET() {
  try {
    console.log('📊 Checking API health...');

    // Check if API is working
    const result = await jungleScoutClient.checkCredits();

    if (!result.success) {
      return NextResponse.json(
        { 
          error: result.error,
          status: 'error',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      status: 'healthy',
      api_status: 'connected',
      credits_info: result.data,
      markets: ['ES', 'FR', 'DE', 'UK', 'COM', 'IT'],
      message: 'API is healthy and ready for sync',
    });

  } catch (error) {
    console.error('❌ Error checking API status:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Unknown error',
        status: 'error',
      },
      { status: 500 }
    );
  }
}
