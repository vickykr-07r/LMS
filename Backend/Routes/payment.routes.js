import express from "express"
import { RazorpayOrder, verifypayment } from "../Controllers/orderController";
export let paymentRouter=express.Router();

paymentRouter.post("/razorpay-order",RazorpayOrder)
paymentRouter.post("/verifypayment",verifypayment)

