import mongoose, { Document,Schema } from "mongoose";

interface IOtp extends Document {
  email: string,
  otp: string,
  expiresAt: Date,
}

const otpSchema = new Schema<IOtp>(
  {
    email: {
      type: String,
      required: true,
    },
    otp:{
        type:String,
        required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      expires: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Otp || mongoose.model<IOtp>("Otp",otpSchema);
