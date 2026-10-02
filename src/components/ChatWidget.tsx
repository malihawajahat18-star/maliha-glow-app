import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  RotateCcw,
  Key,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  MessageSquare,
  Bot,
  User,
  ShoppingBag,
  Eye,
  Heart,
} from 'lucide-react';
import { ChatMessage } from '../types/chat';
import {
  generateGeminiReply,
  getGeminiApiKey,
  saveGeminiApiKey,
  testGeminiApiKey,
} from '../services/geminiService';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface ChatWidgetProps {
  onQuickViewProduct?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

const DEFAULT_WELCOME_MESSAGE = 'welcome to glow with malihahow i can help you today?';

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  onQuickViewProduct,
  onAddToCart,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [keyStatus, setKeyStatus] = useState<{ testing: boolean; message: string | null; success: boolean | null }>({
    testing: false,
    message: null,
    success: null,
  });

  const [hasConfiguredKey, setHasConfiguredKey] = useState<boolean>(() => !!getGeminiApiKey());

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: DEFAULT_WELCOME_MESSAGE,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 200);
      const currentKey = getGeminiApiKey();
      setApiKeyInput(currentKey);
      setHasConfiguredKey(!!currentKey);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      const replyText = await generateGeminiReply(newMessages);

      // Check if reply references any specific products
      const lowerReply = replyText.toLowerCase();
      const matchedProducts = PRODUCTS.filter(
        (p) =>
          lowerReply.includes(p.name.toLowerCase()) ||
          (p.subPillTag && lowerReply.includes(p.subPillTag.toLowerCase()))
      ).slice(0, 2);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProductIds: matchedProducts.map((p) => p.id),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: 'I apologize, I am temporarily having trouble reaching our skincare server. You can also message our human specialists directly on WhatsApp at 0324 4999395.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: DEFAULT_WELCOME_MESSAGE,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSaveApiKey = async () => {
    setKeyStatus({ testing: true, message: null, success: null });
    const res = await testGeminiApiKey(apiKeyInput);
    setKeyStatus({ testing: false, message: res.message, success: res.success });
    if (res.success) {
      saveGeminiApiKey(apiKeyInput);
      setHasConfiguredKey(true);
      setTimeout(() => setShowSettings(false), 1500);
    }
  };

  // Quick Starter Prompts
  const quickPrompts = [
    { label: '❄️ Winter Hydration Routine', query: 'What is the best winter hydration routine for dry skin?' },
    { label: '👰 Royal Bridal Box', query: 'Tell me about the Royal Bridal Radiance 30-Day Box' },
    { label: '🏷️ Available Discounts', query: 'What discount codes are currently active?' },
    { label: '📍 Lahore Stores', query: 'Where are your stores located in Lahore?' },
    { label: '👩‍🔬 About Maleeha', query: 'Who is Maleeha Wajahat and what makes her formulas unique?' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* ================= EXPANDED CHAT WINDOW ================= */}
      {isOpen && (
        <div className="mb-3 w-[92vw] sm:w-[390px] h-[580px] max-h-[82vh] bg-white rounded-2xl shadow-2xl border border-amber-200/80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Luxury Header */}
          <div className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-700 text-white px-4 py-3.5 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full border border-amber-300/60 bg-gradient-to-tr from-amber-100 to-white flex items-center justify-center p-0.5 shadow-inner">
                  <span className="font-luxury-title font-bold text-xs text-maroon-900">GM</span>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-maroon-900 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-luxury-title font-bold text-sm tracking-wide text-amber-50">
                    Glow with Maleeha
                  </h3>
                  <span className="bg-amber-400/20 text-amber-200 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider border border-amber-300/30">
                    AI Concierge
                  </span>
                </div>
                <p className="text-[10px] text-amber-100/70 font-light flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                  <span>Powered by Google Gemini</span>
                </p>
              </div>
            </div>

            {/* Header Action Icons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-1.5 rounded-full transition-colors ${
                  showSettings ? 'bg-amber-400/30 text-amber-200' : 'hover:bg-maroon-800 text-amber-100/80 hover:text-white'
                }`}
                title="Configure Gemini API Key"
              >
                <Key className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-full hover:bg-maroon-800 text-amber-100/80 hover:text-white transition-colors"
                title="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-maroon-800 text-amber-100/80 hover:text-white transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ================= IN-CHAT SETTINGS DRAWER ================= */}
          {showSettings && (
            <div className="bg-stone-50 border-b border-gray-200 p-4 animate-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-maroon-800" />
                  <span>Google Gemini API Key</span>
                </span>
                <span className="text-[10px] text-gray-400">Direct AI Connection</span>
              </div>
              <p className="text-[11px] text-gray-600 mb-2 leading-relaxed">
                Connect your Gemini key for real-time generative responses. Get a free key at{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-maroon-800 font-semibold underline inline-flex items-center gap-0.5"
                >
                  <span>Google AI Studio</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </p>

              <div className="flex gap-2 mb-2">
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-maroon-800"
                />
                <button
                  onClick={handleSaveApiKey}
                  disabled={keyStatus.testing}
                  className="bg-maroon-800 hover:bg-maroon-900 disabled:opacity-50 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  {keyStatus.testing ? 'Testing...' : 'Save & Test'}
                </button>
              </div>

              {keyStatus.message && (
                <p
                  className={`text-[11px] flex items-center gap-1 ${
                    keyStatus.success ? 'text-emerald-700' : 'text-red-600'
                  }`}
                >
                  {keyStatus.success ? (
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  )}
                  <span>{keyStatus.message}</span>
                </p>
              )}
            </div>
          )}

          {/* ================= CHAT MESSAGES BODY ================= */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-50/60 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-maroon-900 text-amber-200 border border-amber-300/40 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5 shadow-xs">
                    GM
                  </div>
                )}

                <div className={`max-w-[82%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-maroon-800 text-white rounded-tr-none'
                        : 'bg-white text-gray-800 border border-amber-100 rounded-tl-none font-light'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span
                      className={`block text-[9px] mt-1 text-right ${
                        msg.sender === 'user' ? 'text-amber-200/70' : 'text-gray-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Product Recommendation Cards (if bot mentioned a product) */}
                  {msg.recommendedProductIds && msg.recommendedProductIds.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {msg.recommendedProductIds.map((prodId) => {
                        const product = PRODUCTS.find((p) => p.id === prodId);
                        if (!product) return null;
                        return (
                          <div
                            key={product.id}
                            className="bg-white rounded-xl p-2.5 border border-amber-200/80 shadow-xs flex items-center justify-between gap-2.5"
                          >
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-11 h-11 rounded-lg object-cover flex-shrink-0 border border-gray-100"
                            />
                            <div className="flex-1 min-w-0">
                              <span className="font-bold text-gray-900 text-[11px] block truncate">
                                {product.name}
                              </span>
                              <span className="text-[10px] text-maroon-800 font-bold block">
                                PKR {product.price.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              {onQuickViewProduct && (
                                <button
                                  onClick={() => onQuickViewProduct(product)}
                                  className="p-1.5 rounded-md hover:bg-stone-100 text-gray-600 transition-colors cursor-pointer"
                                  title="Quick View"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {onAddToCart && (
                                <button
                                  onClick={() => onAddToCart(product)}
                                  className="bg-maroon-800 hover:bg-maroon-900 text-white text-[10px] font-bold px-2 py-1 rounded transition-colors cursor-pointer"
                                >
                                  + Cart
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-full bg-maroon-900 text-amber-200 border border-amber-300/40 flex items-center justify-center font-bold text-[10px] flex-shrink-0 shadow-xs">
                  GM
                </div>
                <div className="bg-white border border-amber-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-maroon-800 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-maroon-800 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-maroon-800 rounded-full animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-cream-50/80 border-t border-b border-amber-100/60 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp.query)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-amber-50 text-[10.5px] font-medium text-gray-700 border border-gray-200 hover:border-maroon-800/40 transition-colors shadow-2xs cursor-pointer flex-shrink-0"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about skincare, bridal routines, delivery..."
                className="flex-1 text-xs border border-gray-300 focus:border-maroon-800 rounded-full px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-maroon-800 font-sans"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="w-9 h-9 rounded-full bg-maroon-800 hover:bg-maroon-900 disabled:opacity-40 text-white flex items-center justify-center transition-all shadow cursor-pointer flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1.5 px-2">
              <span>{hasConfiguredKey ? '✨ Gemini AI Connected' : '✨ Brand Knowledge Concierge'}</span>
              <a
                href="https://wa.me/923244999395"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline font-medium"
              >
                WhatsApp Advisor: 0324 4999395
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================= FLOATING LAUNCHER BUTTON ================= */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-700 hover:from-maroon-800 hover:to-maroon-900 text-white px-4 py-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl border-2 border-amber-300/60 hover:border-amber-300 transition-all duration-300 transform hover:scale-105 cursor-pointer"
        aria-label="Open AI Skincare Concierge"
      >
        {/* Glowing pulse ring */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-200 opacity-30 group-hover:opacity-75 blur-xs transition duration-300 animate-pulse" />

        <div className="relative flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-amber-400/20 border border-amber-300/60 flex items-center justify-center flex-shrink-0 shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          </div>

          <div className="text-left hidden sm:block">
            <span className="font-luxury-nav text-xs font-bold tracking-wider uppercase block leading-tight text-amber-100">
              {isOpen ? 'Close Concierge' : 'Ask AI Beauty Concierge'}
            </span>
            <span className="text-[9.5px] text-amber-200/80 tracking-wide block leading-tight font-light">
              Trained by Glow with Maleeha
            </span>
          </div>

          <span className="sm:hidden font-luxury-nav text-xs font-bold tracking-wider uppercase">
            {isOpen ? 'Close' : 'Ask AI'}
          </span>
        </div>

        {/* Unread Indicator Badge */}
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-maroon-900 rounded-full animate-ping" />
        )}
      </button>
    </div>
  );
};
