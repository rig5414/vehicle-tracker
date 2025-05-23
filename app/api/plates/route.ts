import { NextRequest, NextResponse } from "next/server";

// GET /api/plates - Get all plate sightings with optional filtering
export async function GET(request: NextRequest) {
  try {
    // Return mock data for now
    return NextResponse.json({
      success: true,
      data: [
        {
          id: 1,
          plateNumber: "ABC123",
          timestamp: new Date().toISOString(),
          location: "Test Location",
          latitude: 51.505,
          longitude: -0.09,
        }
      ]
    });
  } catch (error) {
    console.error("Error in GET /api/plates:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST /api/plates - Create a new plate sighting
export async function POST(request: NextRequest) {
  try {
    return NextResponse.json(
      { success: true, message: "Feature coming soon" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/plates:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
