'use client';

import { useState, useEffect } from 'react';
import { Conversation } from '@/app/types/conversation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Send, ChevronDown } from 'lucide-react';
import styles from './page.module.scss';

const conversations = [
  {
    id: 1,
    name: 'Dr. Sarah Smith',
    role: 'Psychologue',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop',
    lastMessage: 'Merci de partager votre histoire...',
    timestamp: '14:30',
    unread: true
  },
  {
    id: 2,
    name: 'Dr. John Doe',
    role: 'Conseiller',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&h=100&auto=format&fit=crop',
    lastMessage: 'Je comprends votre situation...',
    timestamp: 'Hier',
    unread: false
  }
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [message, setMessage] = useState('');
  const [isMobileViewActive, setIsMobileViewActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;
    console.log('Send message:', message);
    setMessage('');
  };

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setIsMobileViewActive(true);
    }
  };

  const handleBackToList = () => {
    setIsMobileViewActive(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    setCurrentY(currentY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    const diff = currentY - startY;
    if (diff > 100) {
      handleBackToList();
    }
    setIsDragging(false);
    setStartY(0);
    setCurrentY(0);
  };

  return (
    <div className={styles.messages}>
      <div className={`${styles.messages__sidebar} ${isMobileViewActive ? styles.messages__sidebar_hidden : ''}`}>
        <div className={styles.messages__search}>
          <Search size={20} />
          <Input 
            type="text" 
            placeholder="Rechercher une conversation..."
            className={styles.messages__searchInput}
          />
        </div>

        <div className={styles.conversations}>
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              className={`${styles.conversation} ${
                selectedConversation.id === conversation.id ? styles.conversation_active : ''
              }`}
              onClick={() => handleConversationSelect(conversation)}
            >
              <div className={styles.conversation__avatar}>
                <img src={conversation.avatar} alt={conversation.name} />
              </div>
              <div className={styles.conversation__info}>
                <div className={styles.conversation__header}>
                  <h3>{conversation.name}</h3>
                  <span>{conversation.timestamp}</span>
                </div>
                <p className={styles.conversation__role}>{conversation.role}</p>
                <p className={styles.conversation__preview}>{conversation.lastMessage}</p>
              </div>
              {conversation.unread && <div className={styles.conversation__unread} />}
            </button>
          ))}
        </div>
      </div>

      <div 
        className={`${styles.chat} ${isMobileViewActive ? styles.chat_active : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.chat__header}>
          <div className={styles.chat__user}>
            <img 
              src={selectedConversation.avatar} 
              alt={selectedConversation.name}
              className={styles.chat__avatar}
            />
            <div>
              <h2>{selectedConversation.name}</h2>
              <p>{selectedConversation.role}</p>
            </div>
          </div>
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBackToList}
              className={styles.chat__backButton}
            >
              <ChevronDown size={24} />
            </Button>
          )}
        </div>

        <div className={styles.chat__messages}>
          {/* Messages will be displayed here */}
        </div>

        <div className={styles.chat__input}>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} size="icon">
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}