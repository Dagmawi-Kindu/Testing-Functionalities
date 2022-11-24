import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User"
// import { SharedNote} from "./SharedNote"

@Entity({ name: 'notes' })
export class Note extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column()
    text: string

    @ManyToOne(
        () => User,
        user => user.notes
    )
    @JoinColumn({
        name: 'user_id'
    })
    user: User
    



//     @OneToMany(() => SharedNote, sharedNote => sharedNote.note)
//     shares: SharedNote[];

    

}
