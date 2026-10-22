import React, { useState, useRef } from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  UploadCloud,
  FileCheck,
  ArrowRight,
  Lock,
  Cpu,
  Database,
  BrainCircuit,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface ResumeUploaderProps {
  onStartAnalysis: (file: File) => void;
  onSelectSample: (sampleKey: 'ai' | 'embedded' | 'data') => void;
  isProcessing?: boolean;
  error?: string | null;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  onStartAnalysis,
  onSelectSample,
  isProcessing,
  error,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (file: File) => {
    setLocalError(null);
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'pdf' && ext !== 'docx' && ext !== 'doc' && ext !== 'txt') {
      setLocalError('Unsupported file format. Please upload a PDF or DOCX resume.');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setLocalError('File exceeds 15MB limit.');
      return;
    }
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = () => {
    if (selectedFile) {
      onStartAnalysis(selectedFile);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-center py-4">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111318]">
          Upload your resume for real-time intelligence.
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] max-w-lg mx-auto">
          Every competency, domain confidence, career match, and roadmap milestone is derived deterministically from your resume evidence.
        </p>
      </div>

      {(error || localError) && (
        <div className="p-4 rounded-xl bg-[#FEF3F2] border border-[#FECDCA] text-[#B42318] text-xs flex items-start gap-3 text-left">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-semibold block">Analysis Error</span>
            <span>{error || localError}</span>
          </div>
        </div>
      )}

      {/* Clean Minimal Dropzone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`p-10 rounded-xl border transition-all text-center space-y-4 bg-white shadow-xs ${
          dragActive
            ? 'border-[#2457D6] bg-[#F0F4FE]/40 ring-2 ring-[#2457D6]/20'
            : selectedFile
            ? 'border-[#CDE9DA] bg-[#EDF7F2]/20'
            : 'border-[#E6E7E5] hover:border-[#C8CAC5]'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.doc"
          onChange={handleChange}
          className="hidden"
        />

        <div className="w-12 h-12 rounded-full bg-[#F7F7F5] border border-[#E6E7E5] flex items-center justify-center text-[#667085] mx-auto">
          <UploadCloud className="w-6 h-6" />
        </div>

        {selectedFile ? (
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-[#CDE9DA] text-[#167A4A] text-xs font-mono font-medium shadow-xs">
              <FileCheck className="w-4 h-4 text-[#167A4A]" />
              <span className="font-semibold">{selectedFile.name}</span>
              <span className="text-[#8E98A8]">|</span>
              <span>{(selectedFile.size / 1024).toFixed(1)} KB</span>
            </div>
            <p className="text-[11px] text-[#667085]">
              Document ready for deterministic extraction & skill verification.
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            <p className="text-xs sm:text-sm font-medium text-[#111318]">
              Drag & drop your PDF / DOCX resume, or{' '}
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-[#2457D6] hover:underline font-semibold"
              >
                browse files
              </button>
            </p>
            <p className="text-[11px] text-[#8E98A8] font-mono">
              Supported: PDF, DOCX (Max 15MB) • Zero Hallucinations Guaranteed
            </p>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          {selectedFile && (
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleUploadSubmit}
              disabled={isProcessing}
              className="w-full sm:w-auto text-xs font-semibold px-6 gap-2"
            >
              Run Pipeline Analysis
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Privacy & Trust Notice */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-[#8E98A8] font-mono pt-2">
        <Lock className="w-3.5 h-3.5 text-[#8E98A8]" />
        <span>Your resume is parsed locally with evidence traceability and zero permanent data retention.</span>
      </div>
    </div>
  );
};
