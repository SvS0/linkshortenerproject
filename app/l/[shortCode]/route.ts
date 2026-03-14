import { NextRequest, NextResponse } from "next/server";
import { getLinkByShortCode } from "@/data/links";
import db from "@/db";
import { links } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> },
) {
  const { shortCode } = await params;

  // Fetch the link by short code
  const link = await getLinkByShortCode(shortCode);

  if (!link) {
    return new NextResponse("Link not found", { status: 404 });
  }

  // Increment click count
  await db
    .update(links)
    .set({ clicks: sql`${links.clicks} + 1` })
    .where(eq(links.id, link.id));

  // Redirect to the original URL
  return NextResponse.redirect(link.originalUrl, { status: 307 });
}
