
import { DataSource } from "typeorm"
import { Note } from "./entity/Note"
// import { SharedNote } from "./entity/SharedNote"
import { User } from "./entity/User"
import { Auth } from "./entity/auth.entity"
// import { Note } from "./entity/Note"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "testingfunctionalities",
    synchronize: true,
    logging: false,
    entities: [User,Note,Auth],
    migrations: [],
    subscribers: [],
})
