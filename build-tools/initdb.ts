import dotenv from "dotenv";
import fs from "fs-extra";
import { Client } from "pg";

const init = async () => {
    dotenv.config();
    // Create an instance of the PostgreSQL client
    const client = new Client();
    try {
        // Connect to DB
        await client.connect();
        // Read contents of initdb.pgsql
        const sql = await fs.readFile("./build-tools/initdb.pgsql", { encoding: "UTF-8"} );
        // tslint:disable-next-line:no-console
        console.log(sql);
        // Split the file into separate statements
        const statements = sql.split(/;\s*$/m);
        // tslint:disable-next-line:no-console
        console.log(statements);
        for ( const statement of statements ) {
            if ( statement.length > 3 ) {
                await client.query( statement );
            }
        }
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.log(err);
        throw err;
    } finally {
        // close the database
        await client.end();
    }
};

init().then(() => {
    // tslint:disable-next-line:no-console
    console.log("finished");
}).catch(() => {
    // tslint:disable-next-line:no-console
    console.log("finished with errors");
});
