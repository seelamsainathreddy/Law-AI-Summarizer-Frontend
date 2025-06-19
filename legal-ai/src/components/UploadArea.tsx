import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "./Loader";
import { SummaryCard } from "./SummaryCard";
import { PDFViewer } from './PdfViewer';
import { useAuth } from '../context/AuthContext';

export interface LegalSummary {
  summary: string;
  key_legal_clauses: string[];
  flagged_clauses: string[];
  plain_english_explanation: string;
}

export const UploadArea: React.FC = () => {
  const { token } = useAuth(); // get token, user, logout from context

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<LegalSummary | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null); 
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPdfUrl(URL.createObjectURL(selectedFile));

      setTimeout(() => {
        if (buttonRef.current) {
          const y = buttonRef.current.getBoundingClientRect().top + window.pageYOffset - 10;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setSummary(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/summarize", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      setSummary(data.summary);

      setTimeout(() => {
        summaryRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch (err) {
      alert("Failed to summarize document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 mt-10">
      {/* Header */}
  

      {/* Upload and Actions */}
      <Input type="file" accept="application/pdf" onChange={handleFileChange} />
      <div className="flex items-center gap-4">
        <Button
          ref={buttonRef}
          onClick={handleUpload}
          disabled={!file || loading}
        >
          {loading ? 'Uploading...' : 'Summarize PDF'}
        </Button>
        {loading && <Loader />}
      </div>

      {/* Preview and Summary */}
      {pdfUrl && <PDFViewer fileUrl={pdfUrl} />}
      {summary && (
        <div ref={summaryRef}>
          <SummaryCard summary={summary} />
        </div>
      )}
    </div>
  );
};
