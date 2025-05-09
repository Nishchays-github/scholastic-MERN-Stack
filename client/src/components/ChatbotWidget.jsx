import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

const ChatbotWidget = () => {
  const [showBot, setShowBot] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showBot && (
        <div className="w-80 h-96 shadow-xl rounded-lg overflow-hidden">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
      <button
        onClick={() => setShowBot(!showBot)}
        className="mt-4 px-4 py-2 rounded-full bg-purple-700 text-white shadow-lg hover:bg-purple-800 transition"
      >
        {showBot ? "Close Chat" : "Need Help?"}
      </button>
    </div>
  );
};

export default ChatbotWidget;
