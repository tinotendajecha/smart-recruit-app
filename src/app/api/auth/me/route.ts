import prisma from "@/utils/dbconfig";




export async function GET(req:Request){
    try {
        // Implement get user data here
    } catch (error) {
        return new Response(JSON.stringify({message: 'Internal Server Error on Me route'}), {
            status: 500
        })
    }
}