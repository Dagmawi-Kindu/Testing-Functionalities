import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne } from "typeorm"
import { User } from "./User"
// import { SharedNote } from "./SharedNote";

@Entity({ name: 'auth' })
export class Auth extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: number
    
    @Column()
    username: string   

    @Column()
    password: string

    @Column()
    isAdmin:boolean

    @OneToOne(
        () => User,
        user => user.auth
    )
    user:User

    // @OneToMany(() => SharedNote, sharedNote => sharedNote.target)
    // notesSharedWithYou: Note[];

    // @OneToMany(() => SharedNote, sharedNote => sharedNote.sender)
    // notesYouShared: Note[];

}
