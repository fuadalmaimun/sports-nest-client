"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Link as LinkIcon, Lock, Eye, EyeOff } from "lucide-react";
import { SoccerBallIcon, GoogleIcon } from "@/components/auth/auth-icons";
import { AuthInput } from "@/components/auth/auth-input";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f8faf9]">
      <div className="w-full max-w-[420px] bg-white rounded-[28px] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden my-6">
        {/* Top Header Banner */}
        <div className="bg-[#0ba960] pt-8 pb-7 px-6 flex flex-col items-center text-center text-white">
          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center mb-4 border border-white/20">
            <SoccerBallIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
            Create Account
          </h1>
          <p className="text-emerald-50 text-sm font-medium opacity-90">
            Join SportNest for free today
          </p>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-7 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthInput
              label="FULL NAME"
              icon={<User className="w-4 h-4 text-slate-400" />}
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              required
            />

            <AuthInput
              label="EMAIL ADDRESS"
              icon={<Mail className="w-4 h-4 text-slate-400" />}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
            />

            <AuthInput
              label="PHOTO URL (OPTIONAL)"
              icon={<LinkIcon className="w-4 h-4 text-slate-400" />}
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://..."
            />

            <AuthInput
              label="PASSWORD"
              icon={<Lock className="w-4 h-4 text-slate-400" />}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              }
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#0ba960] hover:bg-[#089654] active:bg-[#068349] text-white font-bold rounded-xl transition-colors text-sm shadow-xs cursor-pointer mt-2"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-5">
            <div className="border-t border-slate-200/80 w-full absolute" />
            <span className="bg-white px-3 text-[12px] text-slate-400 font-medium relative z-10">
              or continue with
            </span>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl flex items-center justify-center gap-2.5 transition-colors text-sm shadow-2xs cursor-pointer"
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>

          {/* Footer Navigation Link */}
          <div className="text-center text-xs text-slate-500 font-medium pt-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#0ba960] font-bold hover:underline ml-0.5"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

