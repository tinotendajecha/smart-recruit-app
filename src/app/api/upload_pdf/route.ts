import path from "path";
import { writeFile } from "fs/promises";
import { existsSync, write } from "fs";
import { mkdir } from "fs/promises";
import embedPdfDocument from "./embed_document";




export const POST = async(req: Request) => {

    const formData = await req.formData()

    const file = formData.get('file')
    const fileBlob = formData.get('file') as Blob


    if(!file){
        return Response.json('Please Upload A PDF file', {status: 401})
    }

    const buffer = Buffer.from(await fileBlob.arrayBuffer());

    // Modify name and replace empty space with underscore
    const fileName = (file as File).name.replace(' ', '_')

    // Save the file in the public folder
    try {
        // make sure the public/assets folder exists
        const assetsDir = path.join(process.cwd(), "public/assets")
        
        if(!existsSync(assetsDir)){
            await mkdir(assetsDir, {recursive: true})
        }

        await writeFile(
            path.join(assetsDir, fileName),buffer
        )

        // Now write logic for chunking the pdf and convert to vector embeddings
        embedPdfDocument(fileName)

        return Response.json('Success', {status:200})
    } catch (error) {
        console.log(error)
        return Response.json('Internal Server Error!', {status:501})
    }

}