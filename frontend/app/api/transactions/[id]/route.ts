import { transactions } from '../route'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const index = transactions.findIndex((t) => t.id === id)
  if (index === -1) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }
  transactions[index] = { ...transactions[index], ...body }
  return Response.json(transactions[index])
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const index = transactions.findIndex((t) => t.id === id)
  if (index === -1) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }
  transactions.splice(index, 1)
  return Response.json({ success: true, message: 'Deleted' })
}
