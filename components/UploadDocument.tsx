"use client";
import { useFileUpload } from "@/lib/hooks/useUpload";
import { CloudUpload, File as FileIcon, FolderUp, Search } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";

export default function UploadDocument() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { file, setFile, removeFile, isAnalyzing, analyze } = useFileUpload();
  const [isDragging, setIsDragging] = useState(false);
  const MAX_SIZE = 16 * 1024 * 1024;

  const openFileDialog = () => fileInputRef.current?.click();

  const handleFiles = useCallback((selected: FileList | null) => {
    if (!selected || selected.length === 0) return;
    const f = selected[0];
    if (f.size > MAX_SIZE) {
      alert("File too large. Maximum size is 16MB.");
      return;
    }
    if (!/\.pdf$/i.test(f.name)) {
      // keep message same as UI text — PDF only
      alert("Only PDF files are allowed.");
      return;
    }
    setFile(f);
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleFiles(e.target.files);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  // removeFile comes from context

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="upload-col isolate">
      <div className="upload-card flex flex-col gap-3 h-full w-[min(500px,100%)]">
        <h3 className="upload-title text-2xl text-center font-bold ">
          Upload Your 510(k) Document
        </h3>

        <div
          className={`upload-zone gap-4 flex-col flex items-center justify-center h-full ${
            isDragging ? "dragging" : ""
          }`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={openFileDialog}
          role="button"
          tabIndex={0}
          aria-label="Upload area - click or drop file"
        >
          <CloudUpload className="text-indigo-600 text-4xl scale-[3]" />
          <div className="my-3">
            <h5 className="upload-head font-semibold">
              Drag & Drop your PDF here
            </h5>
            <p className="upload-sub">or click to browse</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className=" hidden"
            onChange={onInputChange}
          />

          <button
            type="button"
            className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-[20px]"
            onClick={(e) => {
              e.stopPropagation();
              openFileDialog();
            }}
          >
            <FolderUp />
            Select File
          </button>

          <p className="upload-note">Maximum file size: 16MB | PDF only</p>
        </div>

        {file && (
          <div className="w-full">
            <div className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-[10px] bg-[#d1e7dd] ">
              <FileIcon className="scale-[1.1]" />
              <div className="file-meta">
                <div className="file-name text-sm">{file.name}</div>
                <div className="file-size text-[16px]">
                  {formatSize(file.size)}
                </div>
              </div>
              <button
                className="cursor-pointer ml-auto bg-rose-500 text-white rounded-full px-2 py-1"
                onClick={removeFile}
              >
                Remove
              </button>
            </div>
          </div>
        )}

        <button
          className="flex gap-2 items-center mt-3 bg-linear-30 from-indigo-800 via-indigo-600 to-indigo-800 hover:bg-indigo-950 transition-colors duration-500 mx-auto cursor-pointer w-fit text-white rounded-[20px] px-2 py-3"
          id="analyzeBtn"
          disabled={!file || isAnalyzing}
          onClick={async () => {
            if (!file) return;
            await analyze();
          }}
        >
          <Search />
          {isAnalyzing ? "Scaning...." : "Analyze Document"}
        </button>
      </div>
    </div>
  );
}
