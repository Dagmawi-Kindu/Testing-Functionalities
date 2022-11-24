require('dotenv').config();
import "reflect-metadata";
const Chapa = require('./chapa.js')
const multer = require('multer')
const sharp=require('sharp')
import { User } from "../entity/User";
import { Note } from "../entity/Note";
// import { SharedNote } from "../entity/SharedNote";
import { AppDataSource } from "../data-source"
const userRepository = AppDataSource.getRepository(User);
import { Auth } from "../entity/auth.entity";

// const multerStorage = multer.diskStorage({
    
//     destination: (req, file, cb) => {
//         cb(null, `D:/TestingFunctionalities/TestingFunctionalities/src/Images/Users`)
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `user-${req.params.id}-${Date.now()}.${ext}`);
//     }
// });

// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image')) {
//         cb(null, true);
//     }
//     else {
//         cb((res) => {
//             res.status(400).json({
//                 "message": "Not an image!"
//             })
//         }),false
//     }
// }
// const upload = multer({
//     storage: multerStorage,
//     fileFilter: multerFilter
// });
// export const uploadUserPhoto = upload.single('photo');
// export const resizeUserPhoto = async (req, res, next) => {
//     if (!req.file) return next();
//     req.file.filename = `user-${Date.now()}.jpeg`
//     await sharp(req.file.buffer)
//         .resize(500, 500)
//         .toFormat('jpeg')
//         .jpeg({ quality: 90 })
//         .toFile(`D:/TestingFunctionalities/TestingFunctionalities/src/Images/Users/${req.file.filename}`);
//     next();
// };

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }
    else {
        cb((res) => {
            res.status(400).json({
                "message": "Not an image!"
            })
        }),false
    }
}
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
export const uploadUserPhoto = upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'images', maxCount: 3 }
]);
// upload.sigle('image');
// upload.array('images', 5);
export const resizeUserPhoto = async (req, res, next) => {
    if (!req.files.photo || !req.files.images) return next();
    //photo
    req.body.photo = `user-${Date.now()}.jpeg`  
    await sharp(req.files.photo[0].buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        
        .toFile(`C:/Users/Dagim Kennedy/Testing-Functionalities/src/Images/Users/${req.body.photo}`);
   //images
    req.body.images = [];
    await Promise.all(
        req.files.images.map(async (file, i) => {
            const filename = `images-${Date.now()}-${i + 1}.jpeg`;
            await sharp(file.buffer)
                .resize(500, 500)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`C:/Users/Dagim Kennedy/Testing-Functionalities/src/Images/Users/${filename}`);
            req.body.images.push(filename);
        })
    );
     
    next();
};


//Search user
export const getUser = async (req, res) => {
   // const u = await userRepository.findOneBy( {firstName: req.body.firstName, lastName: req.body.lastName})
    const u = await userRepository.find();
    res.status(200).json({
        status: 'sucess',        
        data: {
            u,
        },
    });
};
//Creating user
export const createUser = async (req, res) => {
   
    const authRepository = AppDataSource.getRepository(Auth)
    
    let foundAuth = await authRepository.findOne({
        where: {
            id:req.user.id
        }
    })
    
    const user = new User();
    
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.DOB = req.body.DOB;
    user.email = req.body.email;
    user.secret_key = req.body.secret_key;   
    user.auth = foundAuth   
    user.photo = req.body.photo
    user.images =req.body.images
    
    await userRepository.save(user);
    // res.writeHead({
    //     'Content-type':'application/json'
    // })
    res.status(200).json({
        status: 'success',
        user
    });
    
    
};
//Updating user
export const updateUser = async (req, res) => {
    
    try {
        const id = req.params.id;

        const foundUser = await userRepository.findOneBy({ id: id })
        if (!foundUser)
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid ID'
            })
      
        console.log(req.file)
        console.log(req.body)
        foundUser.firstName = req.body.firstName != null ? req.body.firstName : foundUser.firstName
        foundUser.lastName = req.body.lastName != null ? req.body.lastName : foundUser.lastName
        foundUser.email = req.body.email != null ? req.body.email : foundUser.email
        foundUser.secret_key = req.body.secret_key != null ? req.body.secret_key : foundUser.secret_key        
        foundUser.photo = req.file != null ? req.file.filename : foundUser.photo
       
        await userRepository.save(foundUser)

        res.status(200).json({
            status: 'sucess',
            message: foundUser
        });

    }
    catch (err) {
        res.status(500).json({
            "message": err.message
        })
    }
};
// (req, res, next, val) => {
//     console.log(`User id is ${val}`)
//     const id = req.params.id;
//     console.log(id)
//     const checkAvail = userRepository.findOne(id);
//     console.log(checkAvail)
//     if (!checkAvail) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         })
//     }
//     next();
// }

//Deleting user
export const deleteUser = async (req, res) => {

    try {
        const id = req.params.id;
        
        const foundUser = await userRepository.findOneBy({ id: id })
        if (!foundUser)
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid ID'
            })
        await userRepository.delete(id)

        res.status(200).json({
            status: 'sucess',
            message: 'User deleted successfully!',
        });
        
    }
    catch (err) {
        res.status(500).json({
            "message":err.message
        })
    }       
    
    // let foundUser = userRepository.findOneBy({ firstName: req.body.firstName, lastName: req.body.lastName })

//     let userID: number = userRepository.findOneBy({firstName: req.body.firstName, lastName: req.body.lastName}).then((user) => {return user.id});
//     console.log(userID);
//   //userRepository.delete(userID)
//     userRepository.delete({found})      
    
};

//Making payment
export const makePayment = async (req, res) => {
    try {
        const id = req.params.id;

        const foundUser = await userRepository.findOneBy({ id: id })
        if (!foundUser)
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid ID'
            })    
        if (foundUser.secret_key == null) {
            return res.status(404).json({
                status: 'Failed',
                message: "Key not found!"
            })
        }
        
        let myChapa = new Chapa(foundUser.secret_key)

        const customerInfo = {
            amount: req.body.amount,
            currency: req.body.currency,
            email: foundUser.email,
            first_name: foundUser.firstName,
            last_name: foundUser.lastName,
            // tx_ref: 'tx-x12345',
            callback_url: 'https://chapa.co', // your callback URL  
            subaccounts: [{
                id: '80a510ea-7497-4499-8b49-ac13a3ab7d07'
            }
            ]
        }
        

        myChapa
            .initialize(customerInfo, { autoRef: true })
            .then((response) => {
                /*
                response:
                    {
                    message: 'Hosted Link',
                    status: 'success' || 'failed',
                    data: {
                        checkout_url: 'https://checkout.chapa.co/checkout/payment/:token'
                    },
                    tx_ref: 'generated-token' // this will be the auto generated reference
                    }
                */
                //console.log(response)
                // saveReference(response.tx_ref)
                res.status(200).json(response)
            })
            .catch((e) => console.log(e)) // catch errors

    }
    catch (err) {
        res.status(500).json({
            "message": err.message
        })
    }
};

