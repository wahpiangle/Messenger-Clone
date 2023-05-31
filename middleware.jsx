import { withAuth } from 'next-auth/middleware'

export default withAuth({
    pages:{
        signIn:'/'
    }
})

export const config = {
    //redirect to signIn page if user is not authenticated
    matcher: [
        "/users/:path*",
        "/conversations/:path*"
    ]
}