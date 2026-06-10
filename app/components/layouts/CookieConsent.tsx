"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Shield, BarChart3, Settings, Eye } from "lucide-react";

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [functionalConsent, setFunctionalConsent] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("staffton-cookie-consent");
    if (!consent) {
      // Show banner if no consent choice is saved
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500); // Small delay for better UX
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted) return null;

  const saveConsent = (functional: boolean, analytics: boolean) => {
    const preferences = {
      essential: true,
      security: true,
      functional,
      analytics,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("staffton-cookie-consent", JSON.stringify(preferences));
    
    // Dispatch custom event to notify other components/scripts if needed
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: preferences }));
    }
    
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    saveConsent(true, true);
  };

  const handleRejectNonEssential = () => {
    saveConsent(false, false);
  };

  const handleSavePreferences = () => {
    saveConsent(functionalConsent, analyticsConsent);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-[460px] z-[9999] overflow-hidden"
        >
          {/* Glassmorphic Card Container */}
          <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 flex flex-col gap-4 relative">
            
            {/* Header / Banner Text */}
            {!showSettings ? (
              <>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#0F9D94]/10 rounded-xl text-[#0F9D94] shrink-0">
                    <Cookie className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-[16px] font-bold text-slate-900 flex items-center gap-2">
                      Cookie Preference & Consent
                    </h4>
                    <p className="text-[13px] leading-relaxed text-slate-600">
                      We use cookies to improve your experience, enhance security, analyze platform usage, and provide better services. You can manage your cookie preferences at any time. Read our{" "}
                      <Link
                        href="/cookie-policy"
                        className="text-[#0F9D94] hover:underline font-semibold"
                      >
                        Cookie Policy
                      </Link>{" "}
                      for details.
                    </p>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5 mt-2">
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 inline-flex h-10 items-center justify-center rounded-xl bg-[#0F9D94] text-white text-[13px] font-bold hover:bg-[#0c857d] active:scale-[0.98] transition-all"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={handleRejectNonEssential}
                    className="flex-1 inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-[13px] font-semibold bg-slate-50 hover:bg-slate-100 active:scale-[0.98] transition-all"
                  >
                    Reject Non-Essential
                  </button>
                </div>

                {/* Settings Toggle Link */}
                <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-1 text-[12px]">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="inline-flex items-center gap-1 text-slate-500 hover:text-[#0F9D94] font-semibold transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    Customize Preferences
                  </button>
                  <span className="text-slate-400">Staffton Health</span>
                </div>
              </>
            ) : (
              // Settings Detail Interface
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-[#0F9D94]" />
                    Cookie Preferences
                  </h4>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Scrollable list of preferences */}
                <div className="flex flex-col gap-3.5 max-h-[260px] overflow-y-auto pr-1">
                  
                  {/* Category: Essential */}
                  <div className="flex items-start justify-between gap-4 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-start gap-3">
                      <Shield className="w-4.5 h-4.5 text-[#0F9D94] mt-0.5 shrink-0" />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[12px] font-bold text-slate-900">Essential (Required)</span>
                        <span className="text-[11px] leading-relaxed text-slate-500">
                          Required for login, security, OTP verification, and basic operations. Cannot be disabled.
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#0F9D94] bg-[#0F9D94]/10 px-2 py-0.5 rounded-md font-bold self-start mt-0.5">
                      Always Active
                    </span>
                  </div>

                  {/* Category: Security */}
                  <div className="flex items-start justify-between gap-4 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-start gap-3">
                      <Shield className="w-4.5 h-4.5 text-[#0F9D94] mt-0.5 shrink-0" />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[12px] font-bold text-slate-900">Security (Required)</span>
                        <span className="text-[11px] leading-relaxed text-slate-500">
                          Detects suspicious activity, prevents fraud, and safeguards candidate & recruiter data.
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#0F9D94] bg-[#0F9D94]/10 px-2 py-0.5 rounded-md font-bold self-start mt-0.5">
                      Always Active
                    </span>
                  </div>

                  {/* Category: Functional */}
                  <div className="flex items-start justify-between gap-4 p-2.5 rounded-xl border border-slate-150">
                    <div className="flex items-start gap-3">
                      <Eye className="w-4.5 h-4.5 text-slate-500 mt-0.5 shrink-0" />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[12px] font-bold text-slate-900">Functional</span>
                        <span className="text-[11px] leading-relaxed text-slate-500">
                          Remembers your dashboard settings, search filters, and preferences.
                        </span>
                      </div>
                    </div>
                    
                    {/* Toggle Switch */}
                    <button
                      onClick={() => setFunctionalConsent(!functionalConsent)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        functionalConsent ? "bg-[#0F9D94]" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          functionalConsent ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Category: Analytics */}
                  <div className="flex items-start justify-between gap-4 p-2.5 rounded-xl border border-slate-150">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="w-4.5 h-4.5 text-slate-500 mt-0.5 shrink-0" />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[12px] font-bold text-slate-900">Analytics</span>
                        <span className="text-[11px] leading-relaxed text-slate-500">
                          Helps us understand platform usage, feature popularity, and load speeds.
                        </span>
                      </div>
                    </div>
                    
                    {/* Toggle Switch */}
                    <button
                      onClick={() => setAnalyticsConsent(!analyticsConsent)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        analyticsConsent ? "bg-[#0F9D94]" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          analyticsConsent ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                </div>

                {/* Customize Action Buttons */}
                <div className="flex gap-2.5 mt-2 border-t border-slate-100 pt-3">
                  <button
                    onClick={handleSavePreferences}
                    className="flex-1 inline-flex h-10 items-center justify-center rounded-xl bg-[#0F9D94] text-white text-[13px] font-bold hover:bg-[#0c857d] active:scale-[0.98] transition-all"
                  >
                    Save Preferences
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 text-[13px] font-semibold hover:bg-slate-50 active:scale-[0.98] transition-all"
                  >
                    Back
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
