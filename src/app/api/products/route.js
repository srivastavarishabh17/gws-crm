export async function GET() {
  try {
    const response = await fetch('https://auth.gws365.in/api/v1.0/product');
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
