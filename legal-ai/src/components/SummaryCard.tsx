// src/components/SummaryCard.tsx
import React from 'react';
import type { LegalSummary } from './UploadArea';

export const SummaryCard: React.FC<{ summary: LegalSummary }> = ({ summary }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md space-y-6">
      <section>
        <h2 className="text-xl font-bold mb-2">📄 Summary</h2>
        <p>{summary.summary}</p>
      </section>

      {summary.key_legal_clauses?.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-2">📌 Key Legal Clauses</h2>
          <ul className="list-disc list-inside space-y-1">
            {summary.key_legal_clauses.map((clause, index) => (
              <li key={index}>{clause}</li>
            ))}
          </ul>
        </section>
      )}

      {summary.flagged_clauses?.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-2">🚩 Flagged Clauses</h2>
          <ul className="list-disc list-inside space-y-1 text-red-600">
            {summary.flagged_clauses.map((clause, index) => (
              <li key={index}>{clause}</li>
            ))}
          </ul>
        </section>
      )}

      {summary.plain_english_explanation && (
        <section>
          <h2 className="text-xl font-bold mb-2">🗣️ Plain English Explanation</h2>
          <p>{summary.plain_english_explanation}</p>
        </section>
      )}
    </div>
  );
};

