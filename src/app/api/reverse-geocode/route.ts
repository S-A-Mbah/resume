import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Missing required parameters: lat, lon' },
      { status: 400 }
    );
  }

  try {
    // Get API key from server environment variables
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    // Fallback to mock data
    if (!apiKey) {
      console.warn('API key not configured, using mock data');
      const { MOCK_REVERSE_GEOCODE } = await import('../weather/mockData');
      return NextResponse.json({ ...MOCK_REVERSE_GEOCODE, lat: Number(lat), lon: Number(lon) });
    }

    // Fetch reverse geocoding data
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
    );

    // Check if request was successful
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch location data' },
        { status: 500 }
      );
    }

    // Parse the response
    const data = await response.json();
    
    // Return the first location or null if none found
    return NextResponse.json(data.length > 0 ? data[0] : null);
  } catch (error) {
    console.error('Error fetching location data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 