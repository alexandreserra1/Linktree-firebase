import { InputHTMLAttributes } from "react";

// src/components/input/index.tsx
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export function Input(props: InputProps) {
    return (
      <input
        className="border-0 h-10 rounded-md outline-none px-2 mb-3"
        {...props}
      />
    );
  }
  