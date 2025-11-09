import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import FileUploadProvider from "@/lib/hooks/useUpload";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <main>
      <FileUploadProvider>
        <NavBar />
        {children}
        <Footer />
      </FileUploadProvider>
    </main>
  );
}
