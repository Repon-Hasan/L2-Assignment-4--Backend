import app from "./app";
const port=process.env.PORT || 4000

async function server() {
    app.listen(port,()=>{
    console.log(`Server Running at:${port}`)
})
}
server()