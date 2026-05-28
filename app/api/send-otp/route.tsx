import connectDB from "@/lib/db";
import { EmailTemplate } from "../../../components/email-template";
import { Resend } from "resend";
import Otp from "../../../lib/models/otp";
import bcrypt from "bcryptjs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { name, email } = body;
    const createOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp = await bcrypt.hash(createOtp, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const existingUser = await Otp.findOne({
      email,
    });
    if (existingUser) {
      existingUser.otp = otp;
      await existingUser.save();
    } else {
      const user = await Otp.create({
        email,
        otp,
        expiresAt,
      });
      if (!user) {
        return Response.json("otp model failed to store", { status: 500 });
      }
    }

    const { data, error } = await resend.emails.send({
      from: "Job Tracker <onboarding@resend.dev>",
      to: [email],
      subject: "Verify your email",
      react: <EmailTemplate firstName={name} otp={createOtp} />,
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
