import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [
    createChatBotMessage("Hi there! How can I help you with Scholastic today?")
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#7e22ce",
    },
    chatButton: {
      backgroundColor: "#7e22ce",
    },
  },
};

export default config;







// import React from 'react';

// const ChatContainer = () => {
//   return (
//     <div className="flex-1 flex items-center justify-center px-4">
//       <div className="text-center space-y-2">
//         <p className="text-gray-500 text-lg font-medium">
//           No messages yet
//         </p>
//         <p className="text-gray-400 text-sm">
//           Start the conversation by typing a message below.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ChatContainer;
