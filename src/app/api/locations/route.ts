import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { error: 'Missing required parameter: q (query)' },
      { status: 400 }
    );
  }

  try {
    // Get API key from server environment variables
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    // Fallback to mock data
    if (!apiKey) {
      console.warn('API key not configured, using mock data');
      const { MOCK_LOCATIONS } = await import('../weather/mockData');
      // Simple filter for mock data
      const filtered = MOCK_LOCATIONS.filter(l => 
        l.name.toLowerCase().includes(query.toLowerCase())
      );
      return NextResponse.json(filtered);
    }

    // Fetch location data
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`
    );

    // Check if request was successful
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch location data' },
        { status: 500 }
      );
    }

    // Parse and return the response
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching location data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 