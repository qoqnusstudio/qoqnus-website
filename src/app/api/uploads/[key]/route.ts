import { NextResponse } from "next/server";
import { getUploadedImage } from "@/lib/blobs";

type Params = { params: Promise<{ key: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { key } = await params;
  const image = await getUploadedImage(key);

  if (!image) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(image.data, {
    headers: {
      "Content-Type": image.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
