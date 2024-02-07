import dotenv from 'dotenv'
import app from "./app";
import "./database"

dotenv.config()
async function main(){
    await app.listen(app.get('port'))
    console.log(`runing in port ${app.get('port')}`)
}

main()