import React, { useEffect, useState } from "react";

export interface LegalSummary {
  summary: string;
  key_legal_clauses: string[];
  flagged_clauses: string[];
  plain_english_explanation: string;
}

interface SummaryRecord {
  summary: LegalSummary;
  filename: string;
  uploaded_at: string; // ISO string
}

export const Dashboard: React.FC = () => {
  const [summaries, setSummaries] = useState<SummaryRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const BASE_URL = import.meta.env.VITE_API_URL;

  // Fetch summaries on mount
  useEffect(() => {
    const fetchSummaries = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");

        const res = await fetch(`${BASE_URL}/summaries`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error fetching summaries: ${res.statusText}`);
        }

        const data: SummaryRecord[] = await res.json();
        setSummaries(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchSummaries();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Summaries</h1>

      {loading && <p>Loading summaries...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && summaries.length === 0 && (
        <p>No summaries found. Upload some PDFs first!</p>
      )}

      <ul className="space-y-4">
        {summaries.map((record, idx) => (
          <li
            key={idx}
            className="border rounded-md p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleExpand(idx)}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{record.filename}</p>
                <p className="text-sm text-gray-500">
                  Uploaded: {formatDate(record.uploaded_at)}
                </p>
              </div>
              <div>
                {expandedIndex === idx ? (
                  <span className="text-sm text-blue-600">▲ Collapse</span>
                ) : (
                  <span className="text-sm text-blue-600">▼ Expand</span>
                )}
              </div>
            </div>

            {expandedIndex === idx && (
              <div className="mt-4 space-y-2 text-gray-700">
                <p>
                  <strong>Summary:</strong> {record.summary.summary}
                </p>
                <p>
                  <strong>Key Legal Clauses:</strong>{" "}
                  {record.summary.key_legal_clauses.join(", ")}
                </p>
                <p>
                  <strong>Flagged Clauses:</strong>{" "}
                  {record.summary.flagged_clauses.join(", ") || "None"}
                </p>
                <p>
                  <strong>Plain English Explanation:</strong>{" "}
                  {record.summary.plain_english_explanation}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
