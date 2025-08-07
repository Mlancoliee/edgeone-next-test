import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(request: Request) {
  const data = await request.formData();
  return Response.json({
    status: "success",
    received: Object.fromEntries(data)
  });
}



// type Data = {
//   name: string;
// };

// export default function POST(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>,
// ) {
//   res.status(200).json({ name: "John Doe"});
// }
