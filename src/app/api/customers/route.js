import ConnectDB from "@/helper/db";
import { Customer } from "@/models/customer";
import { NextResponse } from "next/server";

ConnectDB();


//API to Create a User
export async function POST(request){
    const {name,email,password,gender,DOB} = await request.json();
    const newCustomer = new Customer({
        name,email,password,gender,DOB,profilePicture:""
    });
    //<<<<<<<<<<<<<<<<Profile Picture is manually Sending..... It needs to be updated after an account,..
    //meanwhile show default avatars>>>>>>>>>>>>>>>>>>>>

    //<<<<<<<<<<<<<<<<<<<<<<<<<<<PASSWORD HASHING IS  NEEDED>>>>>>>>>>>>>>>>>>>>>>>>>>
    try{
        newCustomer.save();
        const response = NextResponse.json(newCustomer,{            //<REMOVE no need to return : Before Deployment>
            message:"User Created Successfully",
            success:true,
            status:201
        })
        return response;
    }catch(error){
        console.log("Unable to Register the User");
        const response = NextResponse.json({
            message:"Error Occured! User is not Created!",
            success:false,
            status:502    
        })
        return response;
    }
}