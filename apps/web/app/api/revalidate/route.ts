import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const { paths } = await request.json()

  if (Array.isArray(paths)) {
    paths.forEach((path: string) => revalidatePath(path, 'page'))
  } else if (typeof paths === 'string') {
    revalidatePath(paths, 'page')
  }

  return NextResponse.json({
    revalidated: true,
    paths,
    timestamp: new Date().toISOString(),
  })
}