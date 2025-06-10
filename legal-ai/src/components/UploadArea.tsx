// src/components/UploadArea.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "./Loader";
import { SummaryCard } from "./SummaryCard";

export interface LegalSummary {
  summary: string;
  key_legal_clauses: string[];
  flagged_clauses: string[];
  plain_english_explanation: string;
}

export const UploadArea: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<LegalSummary | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
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
        body: formData,
      });

      const data = await response.json();
      setSummary(data);
    } catch (err) {
      alert("Failed to summarize document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 mt-10">
      <Input type="file" accept="application/pdf" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={!file || loading}>
        {loading ? "Uploading..." : "Summarize PDF"}
      </Button>
      {loading && <Loader />}
      {summary && <SummaryCard summary={summary} />}
    </div>
  );
};