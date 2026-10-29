import React from "react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
  rightElement?: React.ReactNode;
}

export function AuthInput({ label, icon, rightElement, ...props }: AuthInputProps) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className="relative flex items-center">
        <span className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
          {icon}
        </span>
        <input
          {...props}
          className={`w-full pl-10 ${rightElement ? "pr-10" : "pr-4"} py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0ba960] focus:ring-1 focus:ring-[#0ba960] transition-colors`}
        />
        {rightElement && (
          <div className="absolute right-3.5 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}
