export async function GET(request) {
  console.log(request)
  return new Response('Hello, Next.js!')
}
