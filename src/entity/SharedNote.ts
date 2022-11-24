// import { Entity, Column, BaseEntity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm"
// import { User } from "./User";
// import { Note } from "./Note";


// @Entity({ name: 'sharedNotes' })
// export class SharedNote extends BaseEntity {

//     @PrimaryColumn()
//     targetId: number;
//     @ManyToOne(() => User, user => user.notesSharedWithYou)
//     //@JoinColumn({ name: "targetID" })
//     target: User;

//     @PrimaryColumn()
//     senderID: number
//     @ManyToOne(() => User, user => user.notesYouShared)
//     //@JoinColumn({ name: "senderID" })
//     sender: User;

//     @PrimaryColumn()
//     noteId: number
//     @ManyToOne(() => Note, note => note.shares)
//    // @JoinColumn({ name: "noteID" })
//     note: Note;



// }