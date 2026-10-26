import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResumeUploader } from '../../components/resume/ResumeUploader';
import { ProcessingSteps } from '../../components/resume/ProcessingSteps';
import { useApp } from '../../context/AppContext';
import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResumeUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRole, analyzeResumeFile, analyzeSampleResume, isAnalyzing, analysisError } = useApp();
  const [activeStep, setActiveStep] = useState<'upload' | 'processing'>('upload');
  const [currentFileName, setCurrentFileName] = useState('');
  const [isDone, setIsDone] = useState(false);

  const handleStartAnalysis = async (file: File) => {
    setCurrentFileName(file.name);
    setActiveStep('processing');
    setIsDone(false);

    try {
      await analyzeResumeFile(file);
      setIsDone(true);
      setTimeout(() => {
        setRole('candidate');
        navigate('/candidate');
      }, 900);
    } catch (err) {
      // analysisError is captured in AppContext
    }
  };

  const handleSelectSample = async (sampleKey: 'ai' | 'embedded' | 'data') => {
    const titles = {
      ai: 'Elena Rostova (AI & ML Engineer)',
      embedded: 'Vikram Patel (Embedded Firmware)',
      data: 'Marcus Chen (Data Systems)',
    };
    setCurrentFileName(titles[sampleKey] || `Sample Candidate (${sampleKey})`);
    setActiveStep('processing');
    setIsDone(false);

    try {
      await analyzeSampleResume(sampleKey);
      setIsDone(true);
      setTimeout(() => {
        setRole('candidate');
        navigate('/candidate');
      }, 900);
    } catch (err) {
      // analysisError is captured in AppContext
    }
  };

  const handleRetry = () => {
    setActiveStep('upload');
    setIsDone(false);
  };

  const handleProceed = () => {
    setRole('candidate');
    navigate('/candidate');
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#111318] flex flex-col justify-between p-6 sm:p-12">
      {/* Top Bar */}
      <div className="flex items-center justify-between max-w-4xl w-full mx-auto">
        <Link to="/" className="flex items-center gap-2 text-xs font-semibold text-[#111318] font-mono">
          <div className="w-5 h-5 rounded-md bg-[#111318] flex items-center justify-center text-white">
            <Compass className="w-3 h-3" />
          </div>
          <span>CAREER PATH EXPLORER</span>
        </Link>
        <Link to="/" className="text-xs text-[#667085] hover:text-[#111318]">
          Back to home
        </Link>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center my-8">
        {activeStep === 'upload' ? (
          <ResumeUploader
            onStartAnalysis={handleStartAnalysis}
            onSelectSample={handleSelectSample}
            isProcessing={isAnalyzing}
            error={analysisError}
          />
        ) : (
          <ProcessingSteps
            fileName={currentFileName}
            isCompleted={isDone}
            error={analysisError}
            onRetry={handleRetry}
            onProceed={handleProceed}
          />
        )}
      </main>

      {/* Footer */}
      <div className="text-center text-[11px] text-[#8E98A8] font-mono">
        Career Path Explorer · Evidence-First Resume Intelligence Engine
      </div>
    </div>
  );
};
