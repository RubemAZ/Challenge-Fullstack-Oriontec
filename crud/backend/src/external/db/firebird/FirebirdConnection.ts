import { env } from 'node:process';
import firebird from 'node-firebird';
 
const options: firebird.Options = {
    host: 'localhost',
    port: 3050,
    database: `${process.cwd()}/${env.DATABASE_URL}`,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
}

class FirebirdConnection {
    public static getConnection(): Promise<firebird.Database> {
        console.log(options, process.env.DB_HOST)
        return new Promise((resolve, reject) => {
            firebird.attach(options, (err, db) => {
                if (err) {
                    console.log('CONNECTION ERROR', err)
                    return reject(err);
                }
                resolve(db);
            });
        });
    }
}
export default FirebirdConnection;
