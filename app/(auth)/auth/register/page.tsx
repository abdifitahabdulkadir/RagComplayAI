import AuthForm from "@/components/AuthForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Register | Rag ComplyAI",
  description:
    "Register for Rag ComplyAI to create your secure account, manage regulatory and FDA compliance documents, and leverage powerful AI analytics. Start your compliance journey with a fast and secure signup process.",
  keywords: [
    "register",
    "sign up",
    "user registration",
    "create account",
    "compliance platform",
    "Rag ComplyAI",
    "FDA documentation",
    "AI analytics",
  ],
};
export default function RegisterPage() {
  return <AuthForm formType="register" />;
}
