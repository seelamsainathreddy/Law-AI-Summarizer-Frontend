import React, { useEffect, useState } from "react";
import HomeNavbar from "@/components/layout/HomeNavbar";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

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
  const { user, logout } = useAuth();
  const [summaries, setSummaries] = useState<SummaryRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());
  const BASE_URL = import.meta.env.VITE_API_URL;

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
    setExpandedIndices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <>
      <HomeNavbar user={user ?? undefined} onLogout={logout} />
      <div className="max-w-5xl mx-auto p-6 pt-28">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800 tracking-tight">
          Your Legal Summaries
        </h1>

        {loading && <p>Loading summaries...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && summaries.length === 0 && (
          <p>No summaries found. Upload some PDFs first!</p>
        )}

        <ul className="space-y-6">
          {summaries.map((record, idx) => (
            <li
              key={idx}
              className="rounded-2xl border border-gray-200 shadow-sm p-6 transition hover:shadow-md bg-white cursor-pointer"
              onClick={() => toggleExpand(idx)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {record.filename}
                  </p>
                  <p className="text-sm text-gray-500">
                    Uploaded: {formatDate(record.uploaded_at)}
                  </p>
                </div>
                <div className="text-sm text-green-700 font-medium">
                  {expandedIndices.has(idx) ? "▲ Collapse" : "▼ Expand"}
                </div>
              </div>

              <AnimatePresence>
                {expandedIndices.has(idx) && (
                  <motion.div
                    key="expand"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
          <div className="mt-4 space-y-4 text-sm leading-relaxed border-t border-gray-100 pt-4">
  <p>
    <span className="font-semibold">Summary:</span>{" "}
    {record.summary.summary}
  </p>
  <p>
    <span className="font-semibold text-green-700">Key Legal Clauses:</span>{" "}
    {record.summary.key_legal_clauses.join(", ")}
  </p>
  <p>
    <span className="font-semibold text-orange-400">Flagged Clauses:</span>{" "}
    {record.summary.flagged_clauses.join(", ") || "None"}
  </p>
  <p>
    <span className="font-semibold">Plain English Explanation:</span>{" "}
    {record.summary.plain_english_explanation}
  </p>
</div>

                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
