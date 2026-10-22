import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, ResumeExtractedProfile, AnalyzeResumeResponse } from '../types';
import { analyzeResume, analyzeSample } from '../services/resumeService';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  toggleRole: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notificationsCount: number;
  clearNotifications: () => void;
  
  // Real Resume Intelligence State
  candidateProfile: ResumeExtractedProfile | null;
  analysisResult: AnalyzeResumeResponse | null;
  isAnalyzing: boolean;
  analysisError: string | null;
  setCandidateProfile: (profile: ResumeExtractedProfile | null) => void;
  setAnalysisResult: (result: AnalyzeResumeResponse | null) => void;
  analyzeResumeFile: (file: File) => Promise<AnalyzeResumeResponse>;
  analyzeSampleResume: (sampleKey: 'ai' | 'embedded' | 'data') => Promise<AnalyzeResumeResponse>;
  clearAnalysis: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('candidate');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notificationsCount, setNotificationsCount] = useState<number>(3);

  // Resume Intelligence State initialized from sessionStorage
  const [candidateProfile, setCandidateProfileState] = useState<ResumeExtractedProfile | null>(() => {
    try {
      const saved = sessionStorage.getItem('cpe_candidate_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [analysisResult, setAnalysisResultState] = useState<AnalyzeResumeResponse | null>(() => {
    try {
      const saved = sessionStorage.getItem('cpe_analysis_result');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const setCandidateProfile = (profile: ResumeExtractedProfile | null) => {
    setCandidateProfileState(profile);
    if (profile) {
      sessionStorage.setItem('cpe_candidate_profile', JSON.stringify(profile));
    } else {
      sessionStorage.removeItem('cpe_candidate_profile');
    }
  };

  const setAnalysisResult = (result: AnalyzeResumeResponse | null) => {
    setAnalysisResultState(result);
    if (result) {
      sessionStorage.setItem('cpe_analysis_result', JSON.stringify(result));
      setCandidateProfile(result.candidateProfile);
    } else {
      sessionStorage.removeItem('cpe_analysis_result');
      setCandidateProfile(null);
    }
  };

  const clearAnalysis = () => {
    setCandidateProfileState(null);
    setAnalysisResultState(null);
    setAnalysisError(null);
    sessionStorage.removeItem('cpe_candidate_profile');
    sessionStorage.removeItem('cpe_analysis_result');
  };

  const toggleRole = () => {
    setRole((prev) => (prev === 'candidate' ? 'employer' : 'candidate'));
  };

  const clearNotifications = () => {
    setNotificationsCount(0);
  };

  const analyzeResumeFile = async (file: File): Promise<AnalyzeResumeResponse> => {
    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const data = await analyzeResume(file);
      setAnalysisResult(data);
      setRole('candidate');
      setIsAnalyzing(false);
      return data;
    } catch (err: any) {
      const msg = err.message || 'Resume intelligence service is unavailable. Please make sure the analysis backend is running.';
      setAnalysisError(msg);
      setIsAnalyzing(false);
      throw err;
    }
  };

  const analyzeSampleResume = async (sampleKey: 'ai' | 'embedded' | 'data'): Promise<AnalyzeResumeResponse> => {
    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const data = await analyzeSample(sampleKey);
      setAnalysisResult(data);
      setRole('candidate');
      setIsAnalyzing(false);
      return data;
    } catch (err: any) {
      const msg = err.message || 'Resume intelligence service is unavailable. Please make sure the analysis backend is running.';
      setAnalysisError(msg);
      setIsAnalyzing(false);
      throw err;
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        toggleRole,
        searchQuery,
        setSearchQuery,
        notificationsCount,
        clearNotifications,
        candidateProfile,
        analysisResult,
        isAnalyzing,
        analysisError,
        setCandidateProfile,
        setAnalysisResult,
        analyzeResumeFile,
        analyzeSampleResume,
        clearAnalysis,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
