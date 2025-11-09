"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

type UploadFile = globalThis.File | null;

interface FileUploadContextValue {
  file: UploadFile;
  setFile: (f: UploadFile) => void;
  removeFile: () => void;
  isAnalyzing: boolean;
  analyze: () => Promise<void>;
}

const FileUploadContext = createContext<FileUploadContextValue | undefined>(
  undefined
);

export function FileUploadProvider({ children }: { children: ReactNode }) {
  const [file, setFile] = useState<UploadFile>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const removeFile = () => setFile(null);

  const analyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    try {
      await new Promise((res) => setTimeout(res, 4000));
    } finally {
      setIsAnalyzing(false);
    }
  };
  const value: FileUploadContextValue = {
    file,
    setFile,
    removeFile,
    isAnalyzing,
    analyze,
  };

  return React.createElement(FileUploadContext.Provider, { value }, children);
}

export function useFileUpload() {
  const ctx = useContext(FileUploadContext);
  if (!ctx)
    throw new Error("useFileUpload must be used within FileUploadProvider");
  return ctx;
}

export default FileUploadProvider;
