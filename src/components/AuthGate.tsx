import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  Sparkles, 
  Lock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  KeyRound, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck,
  Crown
} from 'lucide-react';

interface AuthGateProps {
  onAuthenticate: (user: UserProfile) => void;
  onContinueAsGuest?: () => void;
}

export const AuthGate: React.FC<AuthGateProps> = ({ 
  onAuthenticate, 
  onContinueAsGuest 
}) => {
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  
  // Sign In state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCity, setRegCity] = useState('Lahore');
  const [regAddress, setRegAddress] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Status state
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [welcomeUser, setWelcomeUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Helper to get registered users
  const getStoredUsers = (): UserProfile[] => {
    try {
      const data = localStorage.getItem('gwm_registered_users');
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    // Default demo account for immediate testing
    return [
      {
        id: 'user-default-1',
        name: 'Maliha Wajahat',
        email: 'malihawajahat18@gmail.com',
        phone: '0324 4999395',
        password: 'password123',
        city: 'Lahore',
        address: 'Liberty Market, Gulberg III',
        joinedAt: new Date().toLocaleDateString(),
        tier: 'Platinum Tier',
      },
    ];
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!loginIdentifier.trim()) {
      setError('Please enter your email or WhatsApp number.');
      return;
    }
    if (!loginPassword.trim()) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const users = getStoredUsers();
      const identifier = loginIdentifier.trim().toLowerCase();
      
      const found = users.find(
        (u) => 
          u.email.toLowerCase() === identifier || 
          u.phone.replace(/[\s-]/g, '') === identifier.replace(/[\s-]/g, '')
      );

      if (!found) {
        setIsLoading(false);
        setError('No account found with this email or WhatsApp number. Please create a VIP account below.');
        return;
      }

      if (found.password && found.password !== loginPassword) {
        setIsLoading(false);
        setError('Incorrect password. Please try again.');
        return;
      }

      // Success
      setIsLoading(false);
      setIsSuccess(true);
      setWelcomeUser(found);
      localStorage.setItem('gwm_current_user', JSON.stringify(found));
      
      setTimeout(() => {
        onAuthenticate(found);
      }, 1200);
    }, 500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!regName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setError('Please enter a valid Gmail / Email address.');
      return;
    }
    if (!regPhone.trim() || regPhone.trim().length < 8) {
      setError('Please enter your WhatsApp mobile number.');
      return;
    }
    if (!regPassword || regPassword.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    setIsLoading(true);

    const users = getStoredUsers();
    const emailExists = users.some(
      (u) => u.email.toLowerCase() === regEmail.trim().toLowerCase()
    );

    if (emailExists) {
      setIsLoading(false);
      setError('An account with this email already exists. Please Sign In.');
      return;
    }

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: regName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim(),
      password: regPassword,
      city: regCity.trim() || 'Lahore',
      address: regAddress.trim() || '',
      joinedAt: new Date().toLocaleDateString(),
      tier: 'VIP Patron',
    };

    // Save to registered users list
    users.unshift(newUser);
    try {
      localStorage.setItem('gwm_registered_users', JSON.stringify(users));
      localStorage.setItem('gwm_current_user', JSON.stringify(newUser));
    } catch {
      // ignore
    }

    // Also sync registration to connected Google Sheet
    const googleSheetUrl = (import.meta as any).env?.VITE_GOOGLE_SHEET_URL;
    if (googleSheetUrl) {
      try {
        const formData = new FormData();
        formData.append('Name', newUser.name);
        formData.append('Gmail', newUser.email);
        formData.append('WhatsApp', newUser.phone);
        formData.append('Service', `New Member Registration (${newUser.city})`);
        formData.append('Message', `Registered VIP Account on website with city: ${newUser.city}`);
        formData.append('Timestamp', new Date().toLocaleString());

        fetch(googleSheetUrl, {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        }).catch(() => {});
      } catch {
        // ignore
      }
    }

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setWelcomeUser(newUser);

      setTimeout(() => {
        onAuthenticate(newUser);
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-stone-950 via-maroon-950 to-stone-900 overflow-y-auto">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-maroon-800/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Main Luxury Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-amber-300/30 my-8 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Luxury Top Header Banner */}
        <div className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 text-white px-6 py-6 text-center relative border-b border-amber-400/20">
          <div className="w-14 h-14 rounded-full border-2 border-amber-300/50 bg-white/10 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <span className="font-luxury-title text-2xl font-bold text-amber-200 tracking-wider">
              GM
            </span>
          </div>

          <h2 className="font-luxury-title font-bold text-2xl tracking-wide text-amber-50">
            GLOW WITH MALEEHA
          </h2>
          <p className="text-xs text-amber-200/90 font-light flex items-center justify-center gap-1 mt-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Private Luxury Beauty &amp; Skincare Boutique
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 bg-black/30 border border-amber-400/30 rounded-full px-3 py-1 text-[11px] text-amber-200">
            <Lock className="w-3 h-3 text-amber-300" />
            <span>VIP Authentication Required to Enter</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {isSuccess && welcomeUser ? (
            /* Success Entrance Screen */
            <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold block mb-1">
                  Access Granted
                </span>
                <h3 className="font-luxury-title text-2xl font-bold text-gray-900">
                  Welcome, {welcomeUser.name}!
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Unlocking your private access to Glow with Maleeha...
                </p>
              </div>

              <div className="bg-stone-50 border border-amber-100 rounded-lg p-3 text-xs text-gray-600 font-mono">
                Member Tier: <span className="font-bold text-maroon-800">{welcomeUser.tier}</span>
              </div>
            </div>
          ) : (
            <div>
              {/* Tab Switcher */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-stone-100 rounded-lg mb-5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setError(null);
                  }}
                  className={`py-2 rounded-md transition-all cursor-pointer ${
                    mode === 'signin'
                      ? 'bg-white text-maroon-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setError(null);
                  }}
                  className={`py-2 rounded-md transition-all cursor-pointer ${
                    mode === 'register'
                      ? 'bg-white text-maroon-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Create VIP Account
                </button>
              </div>

              {error && (
                <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-lg text-xs font-medium">
                  {error}
                </div>
              )}

              {/* Form Mode: SIGN IN */}
              {mode === 'signin' ? (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address or WhatsApp Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <User className="w-4 h-4 text-maroon-800" />
                      </div>
                      <input
                        type="text"
                        required
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder="yourname@gmail.com or 0324 4999395"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-stone-50 border border-gray-300 rounded-md focus:outline-none focus:border-maroon-800 focus:bg-white focus:ring-1 focus:ring-maroon-800 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <KeyRound className="w-4 h-4 text-maroon-800" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full text-xs pl-9 pr-10 py-2.5 bg-stone-50 border border-gray-300 rounded-md focus:outline-none focus:border-maroon-800 focus:bg-white focus:ring-1 focus:ring-maroon-800 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Sign In Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-700 hover:from-maroon-800 hover:to-maroon-900 text-white font-medium text-xs sm:text-sm py-3 px-4 rounded-md shadow-lg border border-amber-300/30 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-60"
                    >
                      {isLoading ? (
                        <span>Authenticating...</span>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4 text-amber-300" />
                          <span>Sign In &amp; Enter Boutique</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Demo Quick Fill */}
                  <div className="pt-1 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setLoginIdentifier('malihawajahat18@gmail.com');
                        setLoginPassword('password123');
                      }}
                      className="text-[11px] text-amber-800 hover:text-maroon-900 underline font-medium cursor-pointer"
                    >
                      Quick Fill VIP Demo Credentials
                    </button>
                  </div>
                </form>
              ) : (
                /* Form Mode: REGISTER / CREATE VIP ACCOUNT */
                <form onSubmit={handleRegister} className="space-y-3.5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <User className="w-4 h-4 text-maroon-800" />
                      </div>
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. Ayesha Khan"
                        className="w-full text-xs pl-9 pr-3 py-2 bg-stone-50 border border-gray-300 rounded-md focus:outline-none focus:border-maroon-800 focus:bg-white focus:ring-1 focus:ring-maroon-800"
                      />
                    </div>
                  </div>

                  {/* Gmail */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Gmail / Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Mail className="w-4 h-4 text-maroon-800" />
                      </div>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full text-xs pl-9 pr-3 py-2 bg-stone-50 border border-gray-300 rounded-md focus:outline-none focus:border-maroon-800 focus:bg-white font-mono"
                      />
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      WhatsApp Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Phone className="w-4 h-4 text-emerald-600" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="0324 4999395"
                        className="w-full text-xs pl-9 pr-3 py-2 bg-stone-50 border border-gray-300 rounded-md focus:outline-none focus:border-emerald-600 focus:bg-white font-mono"
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Delivery City
                      </label>
                      <select
                        value={regCity}
                        onChange={(e) => setRegCity(e.target.value)}
                        className="w-full text-xs px-2.5 py-2 bg-stone-50 border border-gray-300 rounded-md focus:outline-none focus:border-maroon-800 focus:bg-white"
                      >
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Gujranwala">Gujranwala</option>
                        <option value="Multan">Multan</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value="Sialkot">Sialkot</option>
                        <option value="Other">Other City</option>
                      </select>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Create Password <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Min. 4 chars"
                        className="w-full text-xs px-2.5 py-2 bg-stone-50 border border-gray-300 rounded-md focus:outline-none focus:border-maroon-800 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Submit Registration */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-700 hover:from-maroon-800 hover:to-maroon-900 text-white font-medium text-xs sm:text-sm py-3 px-4 rounded-md shadow-lg border border-amber-300/30 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-60"
                    >
                      {isLoading ? (
                        <span>Registering VIP Account...</span>
                      ) : (
                        <>
                          <Crown className="w-4 h-4 text-amber-300" />
                          <span>Register &amp; Unlock Access</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Guest option */}
              {onContinueAsGuest && (
                <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                  <button
                    type="button"
                    onClick={onContinueAsGuest}
                    className="text-xs text-gray-500 hover:text-gray-800 font-medium cursor-pointer"
                  >
                    Continue as Guest Explorer →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
