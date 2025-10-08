import mongoose from "mongoose";
import Products from "../models/product.model.js";

export const getAll=async(req,res)=>{
    try {
        const products=await Products.find({});
        res.status(200).json({success:true,data:products});
    } catch (error) {
        console.log("error in fetching products:",error.message);
        return res.status(500).json({message:"internal server error"})
    }
}


export const signup=async(req,res)=>{
    const {name , price , image}=req.body;//user body

    if(!name||!price||!image){
        return res.status(400).json({success:false,message:"please provide all feilds"});
    }
    const newProduct=new Products({name , price , image})

    try {
        await newProduct.save();
        return res.status(201).json({success:true,data:newProduct})
    } catch (error) {
        console.log("error in create product:",error.message);
        return res.status(500).json({success:false,message:"server error"});
    }
}


export const update=async(req,res)=>{
    const{id}=req.params;

    const product=req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,meesage:"invalid product id"});
    }

    try {
        const updatedProduct=await Products.findByIdAndUpdate(id,product,{new:true});
        return res.status(200).json({success:true,data:updatedProduct});
    } catch (error) {
        return res.status(500).json({success:false,message:"inter server error"});
    }
}


export const deleteProduct=async(req,res)=>{
    const{id}=req.params;
    
    try {
         await Products.findByIdAndDelete(id);
         return res.status(200).json({ success:true , message:"product dleted successfully"});
    } catch (error) {
        return res.status(500).json({message:"internal server error"});
    }
}