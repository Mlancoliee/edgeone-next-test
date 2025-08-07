export async function POST(request) {
  const data = await request.formData();
  return Response.json({
    status: "success",
    received: Object.fromEntries(data)
  });
}