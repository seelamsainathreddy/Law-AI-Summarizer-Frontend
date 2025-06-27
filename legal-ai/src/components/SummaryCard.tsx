import React, { useState } from 'react';
import type { LegalSummary } from './UploadArea';
import { Button } from "@/components/ui/button";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<SectionProps> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Hide" : "Show"}
        </Button>
      </div>
      {isOpen && <div className="pl-2">{children}</div>}
    </div>
  );
};

export const SummaryCard: React.FC<{ summary: LegalSummary }> = ({ summary }) => {

  console.log("SummaryCard summary prop:", summary);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md space-y-6">
      <CollapsibleSection title="Summary">
        <p>{summary.summary}</p>
      </CollapsibleSection>

      {summary.key_legal_clauses?.length > 0 && (
        <CollapsibleSection title="Key Legal Clauses">
          <ul className="list-disc list-inside space-y-1">
            {summary.key_legal_clauses.map((clause, index) => (
              <li key={index}>{clause}</li>
            ))}
          </ul>
        </CollapsibleSection>
      )}

      {summary.flagged_clauses?.length > 0 && (
        <CollapsibleSection title="Flagged Clauses">
          <ul className="list-disc list-inside space-y-1 text-red-600">
            {summary.flagged_clauses.map((clause, index) => (
              <li key={index}>{clause}</li>
            ))}
          </ul>
        </CollapsibleSection>
      )}

      {summary.plain_english_explanation && (
        <CollapsibleSection title="Plain English Explanation">
          <p>{summary.plain_english_explanation}</p>
        </CollapsibleSection>
      )}
    </div>
  );
};
