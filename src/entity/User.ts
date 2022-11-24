import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne,OneToMany, JoinColumn} from "typeorm"
import { Note } from "./Note"
import { Auth } from "./auth.entity"
import { type } from "os"
// import { SharedNote } from "./SharedNote";

@Entity({name:'users'})
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    DOB: number

    @Column()
    email: string

    @Column()
    secret_key: string

    @Column({
        default:'default.jpg'
    })
    photo: string
    
    @Column('simple-array', { nullable: true })
    images: string[]
    @OneToMany(
        () => Note,
        note => note.user
    )
    notes: Note[]

    @OneToOne(
        () => Auth,
        auth=>auth.user
    )
    @JoinColumn()
    auth:Auth

    // @OneToMany(() => SharedNote, sharedNote => sharedNote.target)
    // notesSharedWithYou: Note[];

    // @OneToMany(() => SharedNote, sharedNote => sharedNote.sender)
    // notesYouShared: Note[];

}
