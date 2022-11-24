import "reflect-metadata"
import { User } from "../entity/User"
import { Note } from "../entity/Note"
import { AppDataSource } from "../data-source" 

const userRepository = AppDataSource.getRepository(User);
const noteRepository = AppDataSource.getRepository(Note);

export const getNote = async (req, res) => {
    const n = await noteRepository.find();
    if (!n) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Note database is empty'
        })
    }
    res.status(200).json({
        status: 'sucess',
        data: {n}
    })
}
export const createNote = async (req, res) => {
    try {
        const uid = req.params.id;
        const checkUser = await userRepository.findOneBy({ id: uid });
        console.log(checkUser)
        if (!checkUser) {
            return res.status(404).json({
                status: 'Fail',
                message: 'User not found!'
            })
        }

        const note = new Note();
        note.text = req.body.text;
        note.user = checkUser;

        await noteRepository.save(note);
        res.status(200).json({
            status: 'success',
            message: 'Note created sucessfully!',
            data: {
                note
            }
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
export const updateNote = async (req, res) => {
    try {
        const nid = req.params.id;
        const foundNote = await noteRepository.findOneBy({ id: nid });
        console.log(foundNote)
        if (!foundNote) {
            return res.status(404).json({
                status: 'Fail',
                message: 'User not found!'
            })
        }
        foundNote.text = req.body.text != null ? req.body.text : foundNote.text;        

        await noteRepository.save(foundNote);
        res.status(200).json({
            status: 'success',
            message: 'Note updated sucessfully!',
            data: {
                foundNote
            }
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const deleteNote = async (req, res) => {
    try {
        const nid = req.params.id;
        const foundNote = await noteRepository.findOneBy({ id: nid });
        console.log(foundNote)
        if (!foundNote) {
            return res.status(404).json({
                status: 'Fail',
                message: 'User not found!'
            })
        }       

        await noteRepository.delete(nid);
        res.status(200).json({
            status: 'success',
            message: 'Note deleted sucessfully!',            
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

