import prisma from "@/utils/dbconfig";
import bcrypt from 'bcrypt';


interface User{
    name : string,
    surname: string,
    email: string,
    password: string,
    role: string,
    createdAt: Date,
    updatedAt: Date
}

export async function POST(req: Request){
    try {
        // Implement register company here
        
        // Destructure the form data
        const user: User  = await req.json()

        if (!user){
            return new Response(JSON.stringify({message: 'All User fields are required!'}))
        }

        // Check if user exists in database
        const userAlreadyExists = await prisma.user.findFirst({
            where : {
                email : user.email
            }
        })

        if (userAlreadyExists){
            return new Response(JSON.stringify({message: 'User Aleady exists!'}))
        }

        // Now hash the password
        const saltrounds = 10
        // const passwordHash = await bcrypt.hash(user.password, saltrounds)
        const passwordHash = await bcrypt.hash(user.password, saltrounds)

        // Now save the user to prisma
        const register_user = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: passwordHash,
                surname: user.surname,
                role: user.role
            }
        })

        return new Response(JSON.stringify({
            message: 'User created!',
            register_user
        }), {
            status: 200
        })

    } catch (error) {
        console.log(`Error: ${error}`)
        return new Response(JSON.stringify({message: 'Internal Server Error on Register Company'}), {
            status: 500
        })
    }
}