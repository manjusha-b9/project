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
    userId:String,
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
    orderId:Number,
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

        const lastproduct=await Product.findOne().sort({id:-1});
        //genarate id
        const nextId=lastproduct?lastproduct.id+1:1;
        const product=new Product({
            id:nextId,
            ...req.body
        })

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
app.post("/orders/add", async (req, res) => {

    try {
        //find the last order
        const lastOrder=await Order.findOne().sort({orderId:-1});
        //genarate next orderid
        const nextOrderId=lastOrder ? lastOrder.orderId +1:1;


        const order = new Order({ 
            orderId:nextOrderId,
            userId: req.body.userId,

            orderItems: req.body.orderItems,

            shippingAddress: req.body.shippingAddress,

            totalPrice: req.body.totalPrice
        });

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
app.get("/orders/:userId", async (req, res) => {

    try {

        const order = await Order.find({userId:req.params.userId});

        res.json(order);

    } catch (error) {

        res.status(404).json({
            message: "Order Not Found"
        });

    }

});

//registor user

app.post('/register',async(req,res)=>{
    try{
        const count=await User.countDocuments();
        const userId='U'+String(count+1).padStart(3,'0');
        const user=new User({
            userId,
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });
        await user.save();
        res.status(201).json(user);
    } catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }
})
//login form

app.post('/login',async(req,res)=>{
    try{
        const user=await User.findOne({
            email:req.body.email,
            password:req.body.password
        });
        if(!user){
            return res.status(401).json({
                message:"Invalid Email Or Password"
            });
        }
        res.status(200).json(user);

    }catch(error){
        res.status(500).json(error);
    }
})
//run server
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
}
);