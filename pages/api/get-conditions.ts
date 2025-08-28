import { kv } from '@vercel/kv';

// This is the serverless function that the frontend will call
export default async function (request: Request) {
  try {
    const conditions = await kv.get('surf-conditions-data');

    if (!conditions) {
      return new Response(JSON.stringify({ error: 'No conditions data found. Please run the update job first.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(conditions), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' // Cache for 1 hour, serve stale for a day
      },
    });

  } catch (error) {
    console.error('Error fetching conditions from KV:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch conditions.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
