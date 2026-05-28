import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  otp: string;
}

export function EmailTemplate({
  firstName,
  otp,
}: EmailTemplateProps) {
  return (
    <div className="bg-gray-100 px-5 py-10 font-sans">
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          Verify Your Email
        </h1>

        <p className="mb-5 text-base text-gray-600">
          Hi {firstName},
        </p>

        <p className="text-base leading-6 text-gray-600">
          Use the verification code below to complete your signup.
        </p>

        <div className="my-8 text-center">
          <span className="inline-block rounded-xl bg-gray-900 px-8 py-4 text-3xl font-bold tracking-[8px] text-white">
            {otp}
          </span>
        </div>

        <p className="text-sm leading-5 text-gray-500">
          This OTP will expire in 10 minutes.
        </p>

        <p className="mt-5 text-sm leading-5 text-gray-500">
          If you didn’t request this, you can safely ignore this email.
        </p>

        <hr className="my-8 border-gray-200" />

        <p className="text-center text-xs text-gray-400">
          Job Application Tracker
        </p>
      </div>
    </div>
  );
}