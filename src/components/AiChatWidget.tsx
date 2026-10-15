import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  RotateCcw,
  Sparkles,
  AlertCircle,
  ShieldAlert,
  Clock
} from 'lucide-react';
import { MarkdownMessage } from './MarkdownMessage';
import { API_URL } from '../config/api';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

const QUICK_PROMPTS = [
  { label: 'EcoPlugify IoT Specs', prompt: 'What are the hardware specifications and architecture of EcoPlugify?' },
  { label: 'Verified Tech Skills', prompt: 'What are Muhammad Aziz\'s core production skills and tech stack?' },
  { label: 'Availability & Roles', prompt: 'What type of engineering roles is Aziz currently open for?' },
  { label: 'Direct Contact Info', prompt: 'How can I contact Muhammad Aziz Saddique directly?' }
];

const INITIAL_MESSAGE: ChatMessage = {
  role: 'assistant',
  text: `**AZ // ASSISTANT Online**\n\nI am grounded in Muhammad Aziz Saddique's verified portfolio and engineering systems.\n\nAsk me about:\n- **EcoPlugify** (IoT hardware, ESP32, and mobile app)\n- **Full-Stack Systems** (React, React Native, Node.js, Express)\n- **Robotics & Telemetry** (ROS 2, Python, MQTT)\n- **Career Availability & Roles**`
};

export interface AiChatWidgetProps {
  defaultOpen?: boolean;
  onClose?: () => void;
}

export const AiChatWidget: React.FC<AiChatWidgetProps> = ({ defaultOpen = false, onClose }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  // Auto-scroll chat to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClearHistory = () => {
    setMessages([INITIAL_MESSAGE]);
    setErrorNotice(null);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading || text.length > 1000) return;

    setErrorNotice(null);
    setInputMessage('');

    // Append user message
    const updatedMessages: ChatMessage[] = [...messages, { role: 'user', text }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Build untrusted history (max 10 recent items excluding the initial greeting)
      // Map 'assistant' role to 'model' as required by Gemini backend schema
      const historyPayload = updatedMessages
        .slice(0, -1) // exclude current message
        .filter((_, idx) => idx > 0) // exclude static greeting
        .slice(-10) // cap to last 10
        .map((m) => ({
          role: (m.role === 'assistant' ? 'model' : 'user') as 'model' | 'user',
          text: m.text.slice(0, 4000)
        }));

      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          history: historyPayload
        })
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);
      } else if (response.status === 429) {
        setErrorNotice('Transmission limit reached: Too many requests from your connection. Please wait a moment before sending another query.');
      } else if (response.status === 503) {
        setErrorNotice('AI Assistant is currently unconfigured or offline. Please contact Aziz directly via the contact form or email at azizsaddiquesaddique@gmail.com.');
      } else if (response.status === 400) {
        const validationMsg = data?.errors?.message?.[0] || data?.message || 'Invalid query format.';
        setErrorNotice(validationMsg);
      } else {
        setErrorNotice(data?.message || 'The assistant encountered an unexpected processing glitch. Please try again.');
      }
    } catch {
      setErrorNotice('Network communication error: Unable to connect to backend AI gateway. Please verify your connection or email directly at azizsaddiquesaddique@gmail.com.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative font-body-regular">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Portfolio Assistant"
          aria-expanded={isOpen}
          className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-surface-container-high/90 hover:bg-surface-container-highest backdrop-blur-xl border border-secondary/50 text-on-surface shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_0_24px_rgba(170,224,46,0.35)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping absolute -top-0.5 -right-0.5 opacity-75" />
            <span className="w-2 h-2 rounded-full bg-secondary absolute -top-0.5 -right-0.5" />
            <Bot className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col text-left">

            <span className="font-mono-code text-[9px] text-outline leading-tight hidden sm:inline">
              ONLINE
            </span>
          </div>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI Portfolio Assistant Window"
          className="fixed bottom-20 right-3 left-3 sm:left-auto sm:right-4 sm:w-[420px] lg:bottom-6 lg:right-6 h-[540px] max-h-[calc(100vh-140px)] lg:max-h-[620px] z-50 flex flex-col rounded-2xl bg-surface-container-lowest/95 backdrop-blur-2xl border border-outline-variant/30 shadow-[0_12px_48px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-200"
        >
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-surface-container-low/90 border-b border-outline-variant/20 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high border border-secondary/30 flex items-center justify-center shrink-0 text-secondary">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse shrink-0" />
                  <span className="font-mono-label text-xs sm:text-mono-label font-bold text-secondary tracking-widest truncate">
                    AZ // ASSISTANT
                  </span>
                </div>
                <span className="font-mono-code text-[10px] text-outline truncate">
                  PORTFOLIO_INTELLIGENCE
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handleClearHistory}
                title="Clear conversation history"
                aria-label="Clear conversation history"
                className="p-1.5 rounded-lg text-outline hover:text-secondary hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleClose}
                title="Close assistant"
                aria-label="Close assistant window"
                className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Strip (Visible on start or whenever history is short) */}
          {messages.length <= 1 && (
            <div className="p-2.5 bg-surface-container/50 border-b border-outline-variant/10 shrink-0">
              <span className="block font-mono-label text-[9px] uppercase tracking-wider text-outline mb-1.5 px-1">
                Suggested Telemetry Queries:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((qp) => (
                  <button
                    key={qp.label}
                    onClick={() => handleSendMessage(qp.prompt)}
                    disabled={isLoading}
                    className="px-2.5 py-1 rounded-md bg-surface-container-high/70 hover:bg-surface-container-highest hover:text-secondary border border-outline-variant/20 font-mono-code text-[11px] text-on-surface-variant transition-colors disabled:opacity-50 text-left"
                  >
                    {qp.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Scroll Area */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 scroll-smooth">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'
                  }`}
              >
                <span className="font-mono-label text-[9px] tracking-wider uppercase mb-1 text-outline px-1">
                  {msg.role === 'user' ? 'TRANSMITTER // USER' : 'AZ_ASSISTANT'}
                </span>
                <div
                  className={`max-w-[92%] sm:max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-body-sm leading-relaxed overflow-hidden ${msg.role === 'user'
                    ? 'bg-secondary text-on-secondary font-medium rounded-tr-sm shadow-[0_2px_8px_rgba(170,224,46,0.25)] whitespace-pre-wrap break-words'
                    : 'bg-surface-container/90 text-on-surface border border-outline-variant/20 rounded-tl-sm'
                    }`}
                >
                  {msg.role === 'assistant' ? (
                    <MarkdownMessage content={msg.text} />
                  ) : (
                    <span className="break-words">{msg.text}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex flex-col items-start">
                <span className="font-mono-label text-[9px] tracking-wider uppercase mb-1 text-secondary px-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  PROCESSING...
                </span>
                <div className="bg-surface-container/90 border border-secondary/30 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce" />
                  <span className="font-mono-code text-[11px] text-outline ml-1">Formulating verified reply...</span>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {errorNotice && (
              <div className="p-3 rounded-lg bg-error/10 border border-error/30 text-error flex items-start gap-2 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-mono-code font-bold uppercase text-[10px]">TRANSMISSION FAULT</span>
                  <span>{errorNotice}</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-surface-container-low/90 border-t border-outline-variant/20 shrink-0">
            <div className="relative flex flex-col">
              <textarea
                ref={inputRef}
                rows={2}
                value={inputMessage}
                maxLength={1000}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about EcoPlugify, ROS 2, or skills... (Enter to send)"
                disabled={isLoading}
                aria-label="Message to AI assistant"
                className="w-full pl-3 pr-10 py-2 rounded-xl bg-surface-container text-on-surface placeholder:text-outline/60 font-body-regular text-xs sm:text-body-sm focus:bg-surface-container-high focus:outline-none resize-none transition-colors border border-transparent focus:border-secondary/40"
              />

              <div className="flex items-center justify-between mt-1.5 px-1">
                <div className="flex items-center gap-1.5 text-[9px] font-mono-code text-outline">
                  <span className={inputMessage.length > 900 ? 'text-error font-bold' : ''}>
                    {inputMessage.length}/1000
                  </span>
                  <span>•</span>
                  <span>Shift+Enter for newline</span>
                </div>

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isLoading}
                  aria-label="Send message"
                  className="p-1.5 rounded-lg bg-secondary text-on-secondary hover:brightness-110 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Privacy Notice */}
            <p className="text-[9px] text-outline text-center mt-1.5 font-mono-label leading-tight">
              Powered by AZ//System.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiChatWidget;
