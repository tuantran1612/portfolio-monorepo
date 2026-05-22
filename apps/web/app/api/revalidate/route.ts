import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const { path, tag } = await request.json()

  if (tag) revalidateTag(tag)
  if (path) revalidatePath(path)

  return NextResponse.json({
    revalidated: true,
    path,
    tag,
    timestamp: new Date().toISOString(),
  })
}