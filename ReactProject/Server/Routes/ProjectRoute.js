import { Router, json } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { authenticate } from "../Middileware/author.js";
import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config()
const Route = Router();
Route.use(json())
const SecretKey = process.env.SecretKey;

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: { type: String, unique: true },
    password: String,
    role: String
})
const BlogDetails = new mongoose.Schema({
    name: String,
    email: String,
    cateogry: String,
    location: String,
    blogid: { type: String, unique: true },
    date: String,
    blog: String, 
    
})
const User = mongoose.model('UserDetais', userSchema)
const Blogs = mongoose.model('BlogDetails', BlogDetails)
mongoose.connect('mongodb://localhost:27017/BlogProjects')

Route.post('/signup', async (req, res) => {
    try {                                   //error handling using try catch method
        console.log("Hi")
        const data = req.body;
        console.log(data.FirstName)
        const { FirstName,
            LastName,
            UserName,
            Password,
            Role } = data;
        console.log(FirstName)

        const newPass = await (bcrypt.hash(Password, 10));
        console.log(newPass)
        const existingUser = await User.findOne({ userName: UserName })
        console.log(existingUser);

        if (existingUser) {
            res.status(400).json({ message: "User already exits" })
        } else {
            const newUser = new User({
                firstName: FirstName,
                lastName: LastName,
                userName: UserName,
                password: newPass,
                role: Role

            })
            await newUser.save()
            res.status(201).json({ Message: "Data Saved" })
            console.log(newUser)
        }


    }
    catch (error) {
        res.status(500).json(error);
    }


})
Route.post('/login', async (req, res) => {

    try {
        const data = req.body;
        const { UserName, Password } = data;

        const result = await User.findOne({ userName: UserName })
        console.log(result);

        if (result) {
            console.log(Password)
            const invalid = await bcrypt.compare(Password, result.password);
            console.log(invalid);
            if (invalid) {

                const token = jwt.sign({ UserName: UserName, Role: result.role }, SecretKey, { expiresIn: "1h" })
                console.log(token)
                res.cookie('authToken', token, {
                    httpOnly: true
                });
                res.status(200).json({ message: "Login Succesfully",result })
            }
            else {

                res.status(403).json({ Message: "Password Is Correct" })
            }

        }
        else {
            res.status(403).json({ message: "User is not exisit" })
        }

    } catch (error) {
        console.error(error);

    }
})
Route.post('/addblog', async (req, res) => {
    const data = req.body
    const { 
        Name,
        Email,
        Cateogry,
        Location,
        Date,
        Blog,
        Blogid,
     } = data
    // console.log(Name)
    console.log(Cateogry)

    const existinblog = await Blogs.findOne({ blogid: Blogid })
    console.log(existinblog);
    if (existinblog) {
        res.status(400).json({ message: "Blog already exits" })

    } else {
        const newBlog = new Blogs({
            name: Name,
            email: Email,
            cateogry: Cateogry,
            location: Location,
            date: Date,
            blogid: Blogid,
            blog: Blog

        })
        await newBlog.save()
        res.status(201).json({ Message: "Blog Added" })
        console.log(newBlog)
        // console.log(newBlog.Cateogry);

    }
})
Route.patch('/update', async (req, res) => {
    const data = req.body
    const { BlogId,
        newName,
        newEmail,
        newCategory,
        newLocation,
        newDate,
        newBlog} = data

        const result = await Blogs.findOneAndUpdate({blogid:BlogId})

        if(result){
            result.name=newName || result.name
            result.email=newEmail || result.email
            result.cateogry=newCategory || result.cateogry
            result.location=newLocation || result.location
            result.date=newDate || result.date
            result.blog=newBlog || result.blog
            await result.save()
            res.status(200).json({message:"Blog Updated Succesfully"})
            console.log(result);
            
        
        }
        else{
            res.status(400).json({message:"Blog NotFound"})
        }
})
//Search Bar
Route.get('/search/:data',async (req, res) => {
    try {
        const { data } = req.params; 
        if (data) {
            const result = await Blogs.find({
                $or: [
                    { name: data },
                    { location: data},
                    { cateogry:data}
                ]
            });                      
            res.status(200).json(result);
        } else {
            res.status(400).json({message:'Not Found'});
        }
    } catch (err) {
        res.status(500).json({message:"Server Error"})
    }
});
//Delete
Route.delete('/detele/:id',async(req,res)=>{
    const Id =req.params.id

    const result=await Blogs.findOneAndDelete({blogid:Id})

    if(result){
        res.status(200).json({message:"Blog Detele succesFully"})
        
    }else{
        res.status(400).json({message:"Blog NotFound"})
    }

})
//Admin Delete user name
Route.delete('/removeuser/:name',async(req,res)=>{
    const Name =req.params.name

    const result=await User.findOneAndDelete({userName:Name})

    if(result){
        res.status(200).json({message:"User Detele succesFully"})
        
    }else{
        res.status(400).json({message:"User NotFound"})
    }

})
Route.post('/addcomment', async (req, res) => {
    const data=req.body
    const { BlogId,Name,Comment,date } = data

    const result= await Blogs.findOne({blogid:BlogId})
         
        
    console.log(result)

    if(result){
        res.status(200).json({message:"Comment added",Name,Comment,date})
       
    }else{
        res.status(400).json({message:"Blog NotFound"})
    }
})
// Route.get('/viewUser/:name',authenticate,async(req,res)=>{
//     const Name =req.params.name
//     const result=await User.find({userName:Name})
//   try {
//     if(req.Role=="admin"){
//         if(result){
//             res.status(200).json({message:"UserDetails",result});
//         }else{
//             res.status(400).json({message:"User NotFound"});

//         }
//     }else{
//         res.status(400).json({message:"User Is  Not Admin"})
//     }
    
//   } catch (error) {
//        res.status(500).json({message:"Server Error"})
    
//   }


// })
//Check Role for Dash
Route.get('/checkrole',authenticate,(req,res)=>{
    const result=req.Role
    if(result){
        res.json(result);
    }else{
        res.status(400).json({message:"Error"})
    }

})
Route.get('/checkuser',authenticate,(req,res)=>{
    const result=req.UserName
    if(result){
        res.json(result);
    }else{
        res.status(400).json({message:"Error"})
    }

})
//Grid view Blogs
Route.get('/ViewBlogs',async(req,res)=>{
    const blogdata= await Blogs.find({})
    if(blogdata){
        res.status(200).json({message:'Blog Lists Are Added',blogdata})
    }else{
        res.status(400).json({message:'Blogs Not Found'})
    }


})
//Admin view Blog
Route.get('/adminBlogs/:id',async(req,res)=>{
    const id = req.params.id;   
    const blogdata= await Blogs.findOne({blogid:id})
    if(blogdata){
        res.status(200).json({message:'Blog Lists Are Added',blogdata})
    }else{
        res.status(400).json({message:'Blogs Not Found'})
    }


})
//Display all User in Admin Dash
Route.get('/viewAllUser',async(req,res)=>{
    const Alluser= await User.find({})
    res.status(200).json({message:"Success",Alluser})
})
//logout 
Route.post('/logout', (req, res) => {
    res.clearCookie("authToken");
    res.status(200).json({ message: "Logout successfull" });
});

// Route.get('/Search/:name',async(req,res)=>{
//     const Name =req.params.name

//     const result=await Blogs.find({name:Name})

//     if(result){
//         res.status(200).json({message:"success result",result})
        
//     }else{
//         res.status(400).json({message:"Blog NotFound"})
//     }

// })
// Route.get('/',async(req,res)=>{
//     const { data } = req.params;
//     if(date){
//         const Details=await User.find({
//             $or:[
//                 {userName:data},
//                 {firstName:data}
//             ]
//         })
//         res.status(200).json(Details)
//     }
//     else{
//         res.status(404).json('NotFound')
//     }
// })


export { Route }