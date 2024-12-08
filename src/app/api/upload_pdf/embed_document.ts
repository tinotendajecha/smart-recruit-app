import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";


// Make vector embeddings for the uplaoded pdf document
const embedPdfDocument = async(pdfName:string)=>{
    const pdfPath = `public/assets/${pdfName}`

    // load the document
    const loader = new PDFLoader(pdfPath)

    const documents = await loader.load()

    console.log(documents[0])
}


export default embedPdfDocument;