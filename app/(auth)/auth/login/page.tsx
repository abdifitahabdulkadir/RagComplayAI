import AuthForm from "@/components/AuthForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Rag ComplyAI",
  description:
    "Login to Rag ComplyAI to access your secure dashboard, manage compliance documents, and utilize AI-powered analytics. Fast, secure login for regulatory and FDA documentation management.",
  keywords: [
    "login",
    "user authentication",
    "dashboard access",
    "compliance platform",
    "secure sign in",
    "Rag ComplyAI",
  ],
};
export default function LoginPage() {
  return <AuthForm formType="login" />;
}
