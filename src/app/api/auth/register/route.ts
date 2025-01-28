import prisma from "@/utils/dbconfig";
import bcrypt from 'bcrypt';


interface User_And_Company_Data{
    name : string,
    surname: string,
    email: string,
    password: string,
    role: string,
    createdAt: Date,
    updatedAt: Date,
    cityLocation: string,
    companyName: string,
    companyWebsite:string,
    countryLocation:string,
    organizationSize: string,
    servicesProvided: string,
}

export async function POST(req: Request){
    try {
        // Implement register company here
        
        // Destructure the form data
        const userAndCompanyData: User_And_Company_Data  = await req.json()


        if (!userAndCompanyData){
            return new Response(JSON.stringify({message: 'All User fields are required!'}))
        }

        // Check if user exists in database
        const userAlreadyExists = await prisma.user.findFirst({
            where : {
                email : userAndCompanyData.email
            }
        })

        if (userAlreadyExists){
            return new Response(JSON.stringify({message: 'User Already exists!'}),{status: 401})
        }

        // Now hash the password
        const saltrounds = 10
        // const passwordHash = await bcrypt.hash(user.password, saltrounds)
        const passwordHash = await bcrypt.hash(userAndCompanyData.password, saltrounds)

        // Now save the user to prisma
        const register_user = await prisma.user.create({
            data: {
                name: userAndCompanyData.name,
                email: userAndCompanyData.email,
                password: passwordHash,
                surname: userAndCompanyData.surname,
                role: userAndCompanyData.role
            }
        })

        // Save the company data as well
        const register_company = await prisma.company.create({
            data: {
                company_name: userAndCompanyData.companyName,
                organization_size: userAndCompanyData.organizationSize,
                country: userAndCompanyData.countryLocation,
                city: userAndCompanyData.cityLocation,
                services_provided: userAndCompanyData.servicesProvided,
                company_website: userAndCompanyData.companyWebsite
            }
        })

        // Now create a relation between company and user
        const company_user_pivot = await prisma.company_User.create({
            data: {
                company_id: register_company.id,
                user_id: register_user.id
            }
        })

        if(register_user && register_company && company_user_pivot){
            return new Response(JSON.stringify({
                message: 'User and company succesfully registered!',
                register_user,
                register_company
            }), {
                status: 200
            })
        }

    } catch (error) {
        console.log(`Error: ${error}`)
        return new Response(JSON.stringify({message: 'Internal Server Error when Registering Company'}), {
            status: 500
        })
    }
}