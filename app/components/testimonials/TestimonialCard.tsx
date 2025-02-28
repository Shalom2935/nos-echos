'use client';

import { useState } from 'react';
import { ThumbsUp, MessageSquare, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import styles from '@/app/styles/testimonials/TestimonialCard.module.scss';

interface Comment {
  author: string;
  role: string;
  content: string;
  avatar?: string;
}

interface TestimonialCardProps {
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  content: string;
  stats: {
    likes: number;
    comments: number;
    views: number;
  };
  comments: Comment[];
  showComments: boolean;
  onToggleComments: () => void;
}

export default function TestimonialCard({ 
  author, 
  content, 
  stats, 
  comments,
  showComments,
  onToggleComments
}: TestimonialCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <div className={styles.card__author}>
          <div className={styles.card__avatar}>
            {author.avatar ? (
              <img src={author.avatar} alt={author.name} />
            ) : (
              <div className={styles.card__avatarPlaceholder}>
                {author.name.charAt(0)}
              </div>
            )}
          </div>
          <div className={styles.card__authorInfo}>
            <h3>{author.name}</h3>
            <p>{author.role}</p>
          </div>
        </div>
        <button className={styles.card__more}>
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      <div className={styles.card__content}>
        <p>{content}</p>
      </div>
      
      <div className={styles.card__footer}>
        <button 
          className={`${styles.card__stat} ${liked ? styles.card__stat_active : ''}`}
          onClick={() => setLiked(!liked)}
        >
          <ThumbsUp size={16} />
          <span>{stats.likes + (liked ? 1 : 0)}</span>
        </button>
        <button 
          className={styles.card__stat}
          onClick={onToggleComments}
        >
          <MessageSquare size={16} />
          <span>{stats.comments}</span>
        </button>
        <div className={styles.card__stat}>
          <Eye size={16} />
          <span>{stats.views}</span>
        </div>
      </div>

      {showComments && comments.length > 0 && (
        <div className={styles.card__comments}>
          {comments.map((comment, index) => (
            <div key={index} className={styles.card__comment}>
              <div className={styles.card__commentHeader}>
                <div className={styles.card__commentAvatar}>
                  {comment.avatar ? (
                    <img src={comment.avatar} alt={comment.author} />
                  ) : (
                    <div className={styles.card__avatarPlaceholder}>
                      {comment.author.charAt(0)}
                    </div>
                  )}
                </div>
                <div className={styles.card__commentAuthor}>
                  <h4>{comment.author}</h4>
                  <p>{comment.role}</p>
                </div>
              </div>
              <p className={styles.card__commentContent}>{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}