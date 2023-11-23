import "reflect-metadata";
import app from "./socket";
import { AppDataSource } from "./db";
import { config } from "dotenv";

config()

const port  = process.env.APP_PORT || 4001;

async function main() {
    try {
        await AppDataSource.initialize();
        app.listen(port)
        console.log("listen server🥺", port);
    } catch (error) {
        console.error(error)
    }

}

main();
