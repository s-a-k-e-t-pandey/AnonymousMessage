import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { url } from "inspector";


export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: "onboarding@messagereciler.com",
            to: email,
            subject: "Verify your email",
            react: VerificationEmail({username, otp: verifyCode}),
        });
        return {success: true, message: "Verification email sent successfully"};
    }catch(emailErr){
        console.error("Error while sending verification email", emailErr);
        return {success: false, message:"Error while sending verification email"};
    }
}