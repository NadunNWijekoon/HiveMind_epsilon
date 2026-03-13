
import { NextResponse } from 'next/server';

/**
 * REST API endpoint for IoT devices (e.g. ESP32) to send sensor data.
 * Expected JSON:
 * {
 *  "device_id": "hive_01",
 *  "temperature": 34.5,
 *  "humidity": 70,
 *  "weight": 42.1,
 *  "bee_activity": 120
 * }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { device_id, temperature, humidity, weight, bee_activity } = body;

    // Validate data
    if (!device_id || temperature === undefined) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    // Logic to check alert ranges
    const alerts = [];
    if (temperature > 38) {
      alerts.push({ severity: 'high', message: `High temperature detected: ${temperature}°C` });
    }
    if (humidity > 85) {
      alerts.push({ severity: 'medium', message: `High humidity detected: ${humidity}%` });
    }

    console.log(`Received data from ${device_id}: Temp=${temperature}, Humidity=${humidity}`);

    return NextResponse.json({ 
      success: true, 
      received_at: new Date().toISOString(),
      alerts_triggered: alerts 
    });
    
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
