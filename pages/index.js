import React from 'react';
import ChatBox from './components/chatbot';
import Footer from './components/footer';

export default function Home() {
  return (
    <div className="container">
      <ChatBox />
      <Footer />
    </div>
  );
}
