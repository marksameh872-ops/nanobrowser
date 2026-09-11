import React, { useState, useRef } from 'react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading = false }) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleVoiceCommand = () => {
    const windowAuth = window as unknown as {
      SpeechRecognition?: new () => any;
      webkitSpeechRecognition?: new () => any;
    };

    const SpeechRecognition = windowAuth.SpeechRecognition || windowAuth.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("المتصفح لا يدعم التعرف على الصوت");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-EG';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (transcript && transcript.trim() !== '') {
        setInputText(transcript);
        onSendMessage(transcript);
        setInputText('');
      }
    };

    recognition.onerror = () => setIsListening(false);

    recognition.start();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col items-center">
      <div className="flex flex-col items-center justify-center mb-3">
        <button
          type="button"
          onClick={handleVoiceCommand}
          disabled={isLoading}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-xl transition-all duration-300 transform active:scale-95 ${
            isListening
              ? 'bg-red-600 text-white animate-pulse ring-4 ring-red-300'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="اضغط وتحدث وسينفذ فوراً"
        >
          🎤
        </button>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
          {isListening ? '🎙️ جاري الاستماع إلى أمرك...' : 'اضغط وتحدث وسينفذ فوراً'}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="اكتب أمرك هنا أو استخدم المايك..."
          rows={1}
          disabled={isLoading}
          className="flex-1 resize-none rounded-lg border border-gray-300 dark:border-gray-700 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          إرسال
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
