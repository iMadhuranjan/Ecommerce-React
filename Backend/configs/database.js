const mongoose=require('mongoose');

const connectDB=async()=>{
    return await mongoose.connect("mongodb+srv://kushwaham709:UeXHUo3ufjj0IhrI@ecommercebackend.mdslk.mongodb.net/?retryWrites=true&w=majority&appName=EcommerceBackend");
}

module.exports=connectDB;