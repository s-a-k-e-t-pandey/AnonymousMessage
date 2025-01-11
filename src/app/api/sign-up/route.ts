import dbConnect from "@/lib/dbConnect";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import bcrypt from "bcryptjs";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    await dbConnect();
    try{
        const {username, email, password} = await req.json();
        const existingUser = await UserModel.findOne({username, isVerified: true});
        if(existingUser){
            return NextResponse.json({
                success: false,
                message: "User already exists"
            }, {
                status: 400
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryDate = new Date();
        const existingUserByEmail = await UserModel.findOne({email});
        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return NextResponse.json({
                    success: false,
                    message: "User already registered"
                },{
                    status: 400
                })
            }else{
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now()+3600000);
                await existingUserByEmail.save();
            }
        }else{
            expiryDate.setDate(expiryDate.getDate() + 1);

            const user = await UserModel.create({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                isVerified: false,
                verifyCodeExpiry: Date,
                isAcceptingMessages: true,
                messages: []
            });
            await user.save();

            //send verification email
            const emailResponse = await sendVerificationEmail(
                email,
                username,
                verifyCode
            )
            if(!emailResponse.success){
                return Response.json({
                    success: true,
                    message: emailResponse.message
                },{
                    status: 500
                })
            }
        }
        return NextResponse.json({
            success: true,
            message: "user registered Successfully"
        },{
            status: 201
        })
    }catch(err){
        console.error("Error while registring", err);
        return NextResponse.json({
            success: false,
            message: "Error Registring User"
        }, {
            status: 500
        })
    }
}