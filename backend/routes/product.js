import express from "express";
import {deleteProduct, getAll,signup,update} from "../controller/product.controller.js";
const router=express.Router();


router.get("/",getAll);

router.post("/",signup);

router.put("/:id",update);

router.delete("/:id",deleteProduct);



export default router;