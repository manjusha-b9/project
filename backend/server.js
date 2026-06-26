require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose");
const cors=require("cors");
// const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const app=express();
app.use(cors());
app.use(express.json());


//connect to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB").then

(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB",err);
}
);

//create user schema and model
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
});
const User=mongoose.model("User",userSchema);

//create product schema and model
const productSchema=new mongoose.Schema({
    id:Number,
    name:String,
    description:String,
    price:Number,
    image:String,
    category:String,
    stock:Number
});
const Product=mongoose.model("Product",productSchema);


// Order Model
const orderSchema = new mongoose.Schema({
    userId: String,

    orderItems: [
        {
            name: String,
            quantity: Number,
            price: Number
        }
    ],

    shippingAddress: {
        address: String,
        city: String,
        postalCode: String
    },
        totalPrice: Number,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("Order", orderSchema);


//get all products
app.get("/products",async(req,res)=>{
    try{
        const products=await Product.find();    

        res.json(products);
    }catch(err){
        res.status(500).json({message:"Error fetching products",error:err});
    }   
});
//get product by id
app.get("/products/:id",async(req,res)=>{
  try{
    const product = await Product.findOne({ id: Number(req.params.id) });
    if(!product){
        return res.status(404).json({
            message:"Product not found"
        });
    }
    res.json(product);
  }  catch(error){
    res.status(500).json({
        message:"error fetching product",
        error
    });
  }
}); 



//create new product

app.post("/products/add", async (req, res) => {

    try {

        const product = new Product(req.body);

        await product.save();

        res.status(201).json(product);

    } catch (error) {

        res.status(500).json(error);

    }

});
// Update Product
app.put("/products/update/:id", async (req, res) => {

    try {

        const updatedProduct = await Product.findOneAndUpdate(
           { id: Number(req.params.id) }, req.body, { returnDocument:'after'}
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "product not found" });
        }

        res.json(updatedProduct);

    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error', error: String(error) });
    }
});

// Delete Product
app.delete("/products/delete/:id", async (req, res) => {

    try {

        await Product.findOneAndDelete({id:Number(req.params.id)});

        res.json({
            message: "Product Deleted"
        });

    } catch (error) {

        res.status(500).json(error);

    }


});
//place order
app.post("/order", async (req, res) => {

    try {

        const order = new Order(req.body);

        await order.save();

        res.status(201).json(order);

    } catch (error) {

        res.status(500).json(error);

    }

});
// Get All Orders
app.get("/orders", async (req, res) => {

    try {

        const orders = await Order.find();

        res.json(orders);

    } catch (error) {

        res.status(500).json(error);

    }

});
// Get Order By Id
app.get("/orders/:id", async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        res.json(order);

    } catch (error) {

        res.status(404).json({
            message: "Order Not Found"
        });

    }

});
//run server
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
}
);