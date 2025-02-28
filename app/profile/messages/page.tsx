'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Send } from 'lucide-react';
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

  const handleSend = () => {
    if (!message.trim()) return;
    // Handle sending message
    console.log('Send message:', message);
    setMessage('');
  };

  return (
    <div className={styles.messages}>
      <div className={styles.messages__sidebar}>
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
              onClick={() => setSelectedConversation(conversation)}
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

      <div className={styles.chat}>
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