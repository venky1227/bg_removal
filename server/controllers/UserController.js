// import {Webhook} from 'svix'
// import userModel from '../models/userModel.js';

// // API Controller funtion to Manage CLerk User with database
// // http://localhost:4000/api/user/webhooks
// const clerkWebhooks = async (req,res) => {
//     try {
        
//         // Create a Svix instance with clerk webhook secret.
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET); 

//         await whook.verify(JSON.stringify(req.body),{
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"]
//         })

//         const {data, type} = req.body

//         switch (type) {
//             case "user.created": {

//                 const userData = {
//                     clerkId: data.id,
//                     email: data.email_addresses[0].email_address,
//                     firstName: data.first_name,
//                     lastName: data.last_name,
//                     photo: data.image_url
//                 }


//                 await userModel.create(userData)
//                 res.json({})

//                 break;
//             }
                
//             case "user.updated": {

                
//                 const userData = {
//                     email: data.email_addresses[0].email_address,
//                     firstName: data.first_name,
//                     lastName: data.last_name,
//                     photo: data.image_url,
//                 }
//                 await userModel.findOneAndUpdate({clerkId:data.id},userData)
//                 res.json({})

//                 break;
//             }
//             case "user.deleted": {

//                 await userModel.findOneAndDelete({clerkId:data.id})
//                 res.json({})

//                 break;
//             }
                 
        
//             default:
//                 break;
//         }

//     } catch (error) {
//         console.log(error.message);
//         res.json({success:false,message:error.message})
//     }
// }



// export {clerkWebhooks} 

// api/user/webhooks.js
import { Webhook } from 'svix';
import userModel from '../../models/userModel.js';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Your webhook logic here
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        try {
            await whook.verify(JSON.stringify(req.body), {
                "svix-id": req.headers["svix-id"],
                "svix-timestamp": req.headers["svix-timestamp"],
                "svix-signature": req.headers["svix-signature"]
            });

            const { data, type } = req.body;

            switch (type) {
                case "user.created":
                    const userData = {
                        clerkId: data.id,
                        email: data.email_addresses[0].email_address,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        photo: data.image_url,
                    };

                    await userModel.create(userData);
                    res.json({ success: true, message: 'User created successfully' });
                    break;

                case "user.updated":
                    const updatedUserData = {
                        email: data.email_addresses[0].email_address,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        photo: data.image_url,
                    };
                    await userModel.findOneAndUpdate({ clerkId: data.id }, updatedUserData);
                    res.json({ success: true, message: 'User updated successfully' });
                    break;

                case "user.deleted":
                    await userModel.findOneAndDelete({ clerkId: data.id });
                    res.json({ success: true, message: 'User deleted successfully' });
                    break;

                default:
                    res.status(400).json({ success: false, message: 'Unhandled webhook event type' });
                    break;
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
