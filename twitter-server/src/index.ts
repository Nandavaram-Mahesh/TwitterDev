import { initializeServer } from "./app";


async function init(){
    const app = await initializeServer()

    app.listen(process.env.PORT,()=>{console.log(`server is running on port:${process.env.PORT}`)})
    
} 

init() 