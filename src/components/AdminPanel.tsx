import React, { useState, useRef } from 'react';
import {
  Shield,
  Save,
  RotateCcw,
  Eye,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Lock,
  Unlock,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  FileText,
  User,
  Sliders,
  ExternalLink,
  Layers,
  Bot,
  Key,
} from 'lucide-react';
import { SiteContent, CeoProfile, AboutPageContent } from '../types';
import { CEO_IMAGE_PRESETS, DEFAULT_SITE_CONTENT } from '../data/defaultContent';
import {
  saveSiteContent,
  resetSiteContent,
  getAdminAuthStatus,
  setAdminAuthStatus,
} from '../services/contentStore';
import {
  getGeminiApiKey,
  saveGeminiApiKey,
  testGeminiApiKey,
} from '../services/geminiService';

interface AdminPanelProps {
  currentContent: SiteContent;
  onUpdateContent: (updated: SiteContent) => void;
  onNavigateToAbout: () => void;
  onNavigateToHome: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentContent,
  onUpdateContent,
  onNavigateToAbout,
  onNavigateToHome,
}) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => getAdminAuthStatus());
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Form editable state (deep clone from currentContent)
  const [formData, setFormData] = useState<SiteContent>(() =>
    JSON.parse(JSON.stringify(currentContent))
  );

  // Active sub-tab in Admin
  const [activeTab, setActiveTab] = useState<'ceo' | 'about_story' | 'commitments' | 'preview' | 'gemini_ai'>('ceo');
  const [geminiApiKeyInput, setGeminiApiKeyInput] = useState<string>(() => getGeminiApiKey());
  const [geminiKeyTesting, setGeminiKeyTesting] = useState(false);
  const [geminiKeyResult, setGeminiKeyResult] = useState<{ success: boolean; message: string } | null>(null);

  // UI feedback states
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handle Admin Login
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Default demo passcode is "admin123" or "glow" or any entry if left empty for convenience
    if (passcode.trim() === 'admin123' || passcode.trim() === 'glow' || passcode.trim() === 'admin') {
      setIsAuthenticated(true);
      setAdminAuthStatus(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Use "admin123" or click Quick Access.');
    }
  };

  const handleQuickUnlock = () => {
    setIsAuthenticated(true);
    setAdminAuthStatus(true);
    setAuthError('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminAuthStatus(false);
    setPasscode('');
  };

  // Field change helpers
  const handleCeoChange = (field: keyof CeoProfile, value: string) => {
    setFormData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        ceo: {
          ...prev.about.ceo,
          [field]: value,
        },
      },
    }));
  };

  const handleAboutChange = (field: keyof AboutPageContent, value: any) => {
    setFormData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        [field]: value,
      },
    }));
  };

  const handleCommitmentChange = (index: number, field: 'title' | 'description', value: string) => {
    setFormData((prev) => {
      const updated = [...prev.about.commitments];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return {
        ...prev,
        about: {
          ...prev.about,
          commitments: updated,
        },
      };
    });
  };

  // Image Upload handler (reads local file to base64 Data URL)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (e.g. 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Selected image is larger than 5MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        handleCeoChange('imageUrl', result);
        showToast('CEO image uploaded successfully from your device!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Save changes
  const handleSave = () => {
    const success = saveSiteContent(formData);
    if (success) {
      onUpdateContent(formData);
      setSaveSuccess(true);
      showToast('All changes saved successfully! Live content updated.');
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      alert('Failed to save to local storage.');
    }
  };

  // Reset to default
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all website content back to initial defaults?')) {
      const def = resetSiteContent();
      setFormData(JSON.parse(JSON.stringify(def)));
      onUpdateContent(def);
      showToast('Content reset to factory defaults.');
    }
  };

  // -------------------------------------------------------------
  // If not authenticated, render login guard
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-stone-50">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-maroon-800 text-amber-200 flex items-center justify-center mx-auto mb-4 shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-maroon-800 block mb-1">
            Secure Portal
          </span>
          <h2 className="text-2xl font-luxury-title font-bold text-gray-900 mb-2">
            Glow with Maleeha CMS
          </h2>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            Enter your administrative passcode to dynamically update website content, CEO profile,
            and store details.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. admin123)"
                className="w-full px-4 py-3 text-center border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent font-mono"
                autoFocus
              />
              {authError && (
                <p className="text-xs text-red-600 mt-2 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{authError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-maroon-800 hover:bg-maroon-900 text-white font-semibold py-3 px-4 rounded-lg text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={handleQuickUnlock}
              type="button"
              className="text-xs text-maroon-800 hover:text-maroon-900 font-semibold underline cursor-pointer"
            >
              Demo Quick Access (1-Click Unlock)
            </button>
            <button
              onClick={onNavigateToHome}
              type="button"
              className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer mt-1"
            >
              Return to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { ceo } = formData.about;

  return (
    <div className="min-h-screen bg-stone-100/70 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-2.5 text-xs animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Navigation Bar */}
      <header className="bg-maroon-900 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToHome}
              className="p-1.5 rounded-md hover:bg-maroon-800 text-amber-200 transition-colors"
              title="Return to Main Store"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-luxury-title font-bold text-lg tracking-wide uppercase text-amber-100">
                  GLOW WITH MALEEHA
                </span>
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300/30 uppercase tracking-widest">
                  Admin CMS
                </span>
              </div>
              <p className="text-[11px] text-gray-300">
                Dynamic Website &amp; Content Management Dashboard
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onNavigateToAbout}
              className="inline-flex items-center gap-1.5 bg-maroon-800 hover:bg-maroon-700 text-amber-100 text-xs px-3.5 py-2 rounded-md font-medium transition-colors shadow-xs"
              title="View live about page"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View About Page</span>
            </button>

            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-maroon-950 text-xs px-4 py-2 rounded-md font-bold uppercase tracking-wider transition-colors shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>

            <button
              onClick={handleLogout}
              className="text-xs text-gray-300 hover:text-white px-2 py-1 ml-1"
              title="Sign out of admin session"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sub-navigation tabs */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-2 mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setActiveTab('ceo')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'ceo'
                  ? 'bg-maroon-800 text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <User className="w-4 h-4" />
              <span>CEO Profile &amp; Image</span>
            </button>

            <button
              onClick={() => setActiveTab('about_story')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'about_story'
                  ? 'bg-maroon-800 text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>About Page Narrative</span>
            </button>

            <button
              onClick={() => setActiveTab('commitments')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'commitments'
                  ? 'bg-maroon-800 text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Brand Pillars ({formData.about.commitments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-maroon-800 text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Live Card Preview</span>
            </button>

            <button
              onClick={() => setActiveTab('gemini_ai')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'gemini_ai'
                  ? 'bg-maroon-800 text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>AI Chatbot &amp; Gemini</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-700 px-3 py-1.5 rounded hover:bg-red-50 transition-colors"
              title="Reset all content to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: CEO PROFILE & IMAGE ================= */}
        {activeTab === 'ceo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Fields: 8 columns */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6 sm:p-8">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      CEO Executive Identity
                    </h3>
                    <p className="text-xs text-gray-500">
                      Manage the CEO name, designation, and official credentials shown on the About page.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                    Live Dynamic Field
                  </span>
                </div>

                <div className="space-y-4">
                  {/* CEO Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      CEO Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={ceo.name}
                      onChange={(e) => handleCeoChange('name', e.target.value)}
                      placeholder="e.g. Maleeha Wajahat"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent"
                    />
                    <p className="text-[11px] text-gray-400 mt-1">
                      This name is dynamically rendered across the About page, CEO quote box, and signature.
                    </p>
                  </div>

                  {/* CEO Title / Designation */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Official Designation / Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={ceo.title}
                      onChange={(e) => handleCeoChange('title', e.target.value)}
                      placeholder="e.g. Founder & Chief Executive Officer"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent"
                    />
                  </div>

                  {/* Qualifications */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Professional Credentials / Subtitle
                    </label>
                    <input
                      type="text"
                      value={ceo.qualifications}
                      onChange={(e) => handleCeoChange('qualifications', e.target.value)}
                      placeholder="e.g. Cosmetic Chemist & Master Herbal Formulator"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent"
                    />
                  </div>

                  {/* Social Handle */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Official Social Handle / Contact Tag
                    </label>
                    <input
                      type="text"
                      value={ceo.socialHandle || ''}
                      onChange={(e) => handleCeoChange('socialHandle', e.target.value)}
                      placeholder="@glowwithmaleeha.official"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* CEO Quote & Bio */}
              <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6 sm:p-8">
                <div className="pb-4 mb-6 border-b border-gray-100">
                  <h3 className="text-base font-bold text-gray-900">
                    Founder Quote &amp; Biography
                  </h3>
                  <p className="text-xs text-gray-500">
                    The executive message and background story displayed on the About page.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* CEO Quote */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      CEO Featured Quote / Philosophy
                    </label>
                    <textarea
                      rows={3}
                      value={ceo.quote}
                      onChange={(e) => handleCeoChange('quote', e.target.value)}
                      placeholder="Enter founder's personal message..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent font-serif"
                    />
                  </div>

                  {/* Signature Text */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Signature Name Display
                    </label>
                    <input
                      type="text"
                      value={ceo.signatureText}
                      onChange={(e) => handleCeoChange('signatureText', e.target.value)}
                      placeholder="e.g. Maleeha Wajahat"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent font-luxury-title text-base"
                    />
                  </div>

                  {/* Biography */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      CEO Comprehensive Bio
                    </label>
                    <textarea
                      rows={4}
                      value={ceo.bio}
                      onChange={(e) => handleCeoChange('bio', e.target.value)}
                      placeholder="Enter detailed background..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CEO Image Management: 5 columns */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6 sm:p-8">
                <div className="pb-4 mb-5 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-base font-bold text-gray-900">CEO Portrait Photo</h3>
                  <span className="text-[10px] uppercase font-bold text-maroon-800 bg-cream-100 px-2 py-0.5 rounded">
                    Dynamic Media
                  </span>
                </div>

                {/* Current Photo Preview Card */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-48 h-60 rounded-xl overflow-hidden shadow-lg border-2 border-maroon-800/40 bg-stone-100 mx-auto">
                      <img
                        src={ceo.imageUrl}
                        alt={ceo.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white text-[10px] px-2.5 py-0.5 rounded-full backdrop-blur-xs font-medium">
                      Active Image
                    </span>
                  </div>
                </div>

                {/* Method 1: Local File Upload */}
                <div className="mb-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Option A: Upload From Computer
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-maroon-800/40 hover:border-maroon-800 bg-stone-50 hover:bg-stone-100/80 p-3.5 rounded-lg text-xs font-semibold text-maroon-900 transition-colors cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-maroon-800" />
                    <span>Choose Photo File (JPG, PNG, WebP)</span>
                  </button>
                  <p className="text-[10px] text-gray-400 mt-1 text-center">
                    Instant local file selection — converted directly to secure Data URL.
                  </p>
                </div>

                {/* Method 2: Image URL input */}
                <div className="mb-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Option B: Web Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={ceo.imageUrl}
                      onChange={(e) => handleCeoChange('imageUrl', e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-800 font-mono focus:outline-none focus:ring-1 focus:ring-maroon-800"
                    />
                  </div>
                </div>

                {/* Method 3: Preset Luxury Portraits */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Option C: 1-Click Luxury Presets
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CEO_IMAGE_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          handleCeoChange('imageUrl', preset.url);
                          showToast(`Applied preset: ${preset.label}`);
                        }}
                        className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-all cursor-pointer ${
                          ceo.imageUrl === preset.url
                            ? 'border-maroon-800 bg-amber-50/50 ring-1 ring-maroon-800'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.label}
                          className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                        />
                        <div className="overflow-hidden">
                          <span className="block text-[11px] font-bold text-gray-800 truncate">
                            {preset.label}
                          </span>
                          <span className="block text-[9px] text-gray-400">Click to use</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Save Card */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-5 text-center">
                <span className="text-[10px] uppercase font-bold text-amber-900 block mb-1">
                  Ready to publish?
                </span>
                <p className="text-xs text-amber-800 mb-3 font-light">
                  Changes save directly to local storage and update your website in real-time.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-maroon-800 hover:bg-maroon-900 text-white font-bold py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider shadow cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={onNavigateToAbout}
                    className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-3 rounded-lg text-xs cursor-pointer transition-colors"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: ABOUT PAGE NARRATIVE ================= */}
        {activeTab === 'about_story' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6 sm:p-8">
              <h3 className="text-base font-bold text-gray-900 mb-1">
                Hero Section &amp; Tagline
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                Header text and mission statement at the very top of the About page.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Category Tag / Badge
                  </label>
                  <input
                    type="text"
                    value={formData.about.badge}
                    onChange={(e) => handleAboutChange('badge', e.target.value)}
                    placeholder="e.g. Heritage & Craftsmanship"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Main Headline Title
                  </label>
                  <input
                    type="text"
                    value={formData.about.title}
                    onChange={(e) => handleAboutChange('title', e.target.value)}
                    placeholder="e.g. A Touch of Luxury Elegance"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-luxury-title text-xl text-gray-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Mission Statement / Subtitle
                  </label>
                  <textarea
                    rows={3}
                    value={formData.about.subtitle}
                    onChange={(e) => handleAboutChange('subtitle', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6 sm:p-8">
              <h3 className="text-base font-bold text-gray-900 mb-1">
                Climate Formulation Narrative
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                The detailed story explaining formulation for the South Asian climate.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={formData.about.storyHeading}
                    onChange={(e) => handleAboutChange('storyHeading', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Story Paragraph 1
                  </label>
                  <textarea
                    rows={2}
                    value={formData.about.storyText1}
                    onChange={(e) => handleAboutChange('storyText1', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-xs text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Story Paragraph 2
                  </label>
                  <textarea
                    rows={2}
                    value={formData.about.storyText2}
                    onChange={(e) => handleAboutChange('storyText2', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-xs text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Story Paragraph 3
                  </label>
                  <textarea
                    rows={2}
                    value={formData.about.storyText3}
                    onChange={(e) => handleAboutChange('storyText3', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-xs text-gray-900"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={handleSave}
                className="bg-maroon-800 hover:bg-maroon-900 text-white font-bold py-2.5 px-6 rounded-lg text-xs uppercase tracking-wider shadow cursor-pointer transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Narrative Changes</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 3: BRAND PILLARS ================= */}
        {activeTab === 'commitments' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6 sm:p-8">
              <h3 className="text-base font-bold text-gray-900 mb-1">
                Four Guiding Commitments
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                Customize each of the 4 brand commitments displayed in the grid.
              </p>

              <div className="space-y-6">
                {formData.about.commitments.map((commitment, idx) => (
                  <div
                    key={commitment.id || idx}
                    className="p-4 rounded-lg bg-stone-50 border border-gray-200"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-luxury-title text-xl font-bold text-maroon-800">
                        {commitment.number}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Pillar #{idx + 1}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                          Pillar Title
                        </label>
                        <input
                          type="text"
                          value={commitment.title}
                          onChange={(e) =>
                            handleCommitmentChange(idx, 'title', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs font-bold text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                          Pillar Description
                        </label>
                        <textarea
                          rows={2}
                          value={commitment.description}
                          onChange={(e) =>
                            handleCommitmentChange(idx, 'description', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs text-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={handleSave}
                className="bg-maroon-800 hover:bg-maroon-900 text-white font-bold py-2.5 px-6 rounded-lg text-xs uppercase tracking-wider shadow cursor-pointer transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Pillars</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 4: LIVE CARD PREVIEW ================= */}
        {activeTab === 'preview' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                  Interactive Live Preview
                </span>
                <p className="text-xs text-amber-800">
                  This card reflects your pending changes before you publish them live.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-semibold px-4 py-2 rounded shadow cursor-pointer"
                >
                  Publish Now
                </button>
                <button
                  onClick={onNavigateToAbout}
                  className="bg-white border border-gray-300 text-xs font-semibold px-3 py-2 rounded text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Full Page View
                </button>
              </div>
            </div>

            {/* Live CEO card preview */}
            <div className="rounded-2xl bg-gradient-to-br from-cream-50 via-white to-amber-50/40 border border-amber-200/80 shadow-md p-6 sm:p-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="w-56 h-72 rounded-2xl overflow-hidden shadow-xl border-4 border-white ring-2 ring-maroon-800/30 bg-stone-100">
                    <img
                      src={ceo.imageUrl}
                      alt={ceo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-800 mt-3">{ceo.name}</span>
                  <span className="text-[10px] text-maroon-800 uppercase tracking-widest font-semibold">
                    {ceo.title}
                  </span>
                </div>

                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-3xl font-luxury-title font-bold text-gray-900">
                    {ceo.name}
                  </h3>
                  <p className="text-maroon-800 text-xs uppercase font-bold tracking-widest">
                    {ceo.title}
                  </p>
                  <p className="text-xs text-gray-500">{ceo.qualifications}</p>
                  <div className="bg-white border-l-4 border-maroon-800 p-4 rounded-r-lg shadow-2xs">
                    <p className="text-xs text-gray-700 italic font-serif leading-relaxed">
                      &ldquo;{ceo.quote}&rdquo;
                    </p>
                    <span className="font-luxury-title text-sm font-bold text-maroon-900 block mt-2">
                      {ceo.signatureText || ceo.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">{ceo.bio}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: GEMINI AI & CHATBOT SETTINGS ================= */}
        {activeTab === 'gemini_ai' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Gemini API Key Card */}
            <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Bot className="w-5 h-5 text-maroon-800" />
                    <span>Google Gemini API Configuration</span>
                  </h3>
                  <p className="text-xs text-gray-500">
                    Connect your free Gemini API key from Google AI Studio to enable live AI responses.
                  </p>
                </div>
                <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                  Gemini 2.5 / 1.5 Flash
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Google Gemini API Key
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={geminiApiKeyInput}
                      onChange={(e) => setGeminiApiKeyInput(e.target.value)}
                      placeholder="AIzaSy..."
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-xs font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent"
                    />
                    <button
                      type="button"
                      disabled={geminiKeyTesting}
                      onClick={async () => {
                        setGeminiKeyTesting(true);
                        setGeminiKeyResult(null);
                        const res = await testGeminiApiKey(geminiApiKeyInput);
                        setGeminiKeyTesting(false);
                        setGeminiKeyResult(res);
                        if (res.success) {
                          saveGeminiApiKey(geminiApiKeyInput);
                          showToast('Gemini API Key validated and saved successfully!');
                        }
                      }}
                      className="bg-maroon-800 hover:bg-maroon-900 disabled:opacity-50 text-white font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 flex-shrink-0"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>{geminiKeyTesting ? 'Testing...' : 'Test & Save Key'}</span>
                    </button>
                  </div>

                  {geminiKeyResult && (
                    <div
                      className={`mt-3 p-3 rounded-lg text-xs flex items-center gap-2 ${
                        geminiKeyResult.success
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {geminiKeyResult.success ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      )}
                      <span>{geminiKeyResult.message}</span>
                    </div>
                  )}
                </div>

                <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-4 text-xs text-amber-900 space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    <span>How to get a free Google Gemini API Key:</span>
                  </div>
                  <ol className="list-decimal pl-5 space-y-1 text-gray-700">
                    <li>
                      Visit{' '}
                      <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-maroon-800 font-semibold underline inline-flex items-center gap-0.5"
                      >
                        Google AI Studio Key Manager <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li>Sign in with your Google Account and click <strong>Create API Key</strong>.</li>
                    <li>Copy the key that starts with <code>AIzaSy...</code> and paste it in the box above.</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Chatbot Training & Welcome Message Overview */}
            <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6 sm:p-8">
              <div className="pb-4 mb-5 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-900">
                  Chatbot Welcome Message &amp; Training Data
                </h3>
                <p className="text-xs text-gray-500">
                  The initial greeting and knowledge base active in your AI Luxury Beauty Concierge.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Active Welcome Greeting
                  </label>
                  <div className="p-3 bg-stone-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-800">
                    &ldquo;welcome to glow with malihahow i can help you today?&rdquo;
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">
                    This exact greeting is presented to every visitor when opening the chat widget.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Trained Knowledge Base
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg border border-gray-200 bg-stone-50/60">
                      <span className="font-bold text-gray-900 block mb-1">🌿 Formulation Philosophy</span>
                      <p className="text-gray-600 font-light">
                        100% steroid-free, non-comedogenic, specifically micro-blended in Lahore for South Asian skin and Pakistan&apos;s climate.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg border border-gray-200 bg-stone-50/60">
                      <span className="font-bold text-gray-900 block mb-1">🛍️ Complete Catalog &amp; PKR Prices</span>
                      <p className="text-gray-600 font-light">
                        24K Hydra Serum (PKR 3,450), Cashmere Glow Cream (PKR 3,200), Royal Bridal 30-Day Box (PKR 14,500).
                      </p>
                    </div>

                    <div className="p-3 rounded-lg border border-gray-200 bg-stone-50/60">
                      <span className="font-bold text-gray-900 block mb-1">🏷️ Promo Codes</span>
                      <p className="text-gray-600 font-light">
                        Recognizes <code>GLOW10</code> (10% off) and <code>ELEGANCE</code> (PKR 500 off) plus free delivery over PKR 5,000.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg border border-gray-200 bg-stone-50/60">
                      <span className="font-bold text-gray-900 block mb-1">📍 Stores &amp; WhatsApp Concierge</span>
                      <p className="text-gray-600 font-light">
                        Liberty Market Lahore flagship, Gulberg III, Gujranwala, and WhatsApp 0324 4999395.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Test CTA */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onNavigateToHome}
                className="bg-maroon-800 hover:bg-maroon-900 text-white font-bold py-2.5 px-6 rounded-lg text-xs uppercase tracking-wider shadow cursor-pointer transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Test Live Chatbot on Website</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
