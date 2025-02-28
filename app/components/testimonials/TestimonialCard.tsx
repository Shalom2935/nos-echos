'use client';

import { useState } from 'react';
import { ThumbsUp, MessageSquare, MoreHorizontal, Flag, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import styles from '@/app/styles/testimonials/TestimonialCard.module.scss';

interface Comment {
  author: string;
  role: string;
  content: string;
  avatar?: string;
  date?: string;
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
  const [newComment, setNewComment] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>(comments);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      author: 'Vous',
      role: 'Utilisateur',
      content: newComment.trim(),
      date: new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    setLocalComments([...localComments, comment]);
    setNewComment('');
  };

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={styles.card__more}>
              <MoreHorizontal size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Flag className="mr-2 h-4 w-4" />
              <span>Signaler</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              <span>Modifier</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Supprimer</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
          className={`${styles.card__stat} ${showComments ? styles.card__stat_active : ''}`}
          onClick={onToggleComments}
        >
          <MessageSquare size={16} />
          <span>{localComments.length}</span>
        </button>
      </div>

      {showComments && (
        <div className={styles.card__commentsSection}>
          <div className={styles.card__commentForm}>
            <textarea
              placeholder="Partagez votre expérience ou votre soutien..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className={styles.buttons}>
              <Button
                variant="outline"
                onClick={() => setNewComment('')}
                className={styles.card__cancelButton}
              >
                Annuler
              </Button>
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className={styles.card__submitButton}
              >
                Publier
              </Button>
            </div>
          </div>

          {localComments.length > 0 && (
            <div className={styles.card__comments}>
              {localComments.map((comment, index) => (
                <div key={index} className={styles.card__comment}>
                  <div className={styles.card__commentHeader}>
                    <div className={styles.card__commentAuthorSection}>
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
                    <div className="flex items-center gap-2">
                      {comment.date && (
                        <span className={styles.card__commentDate}>
                          {comment.date}
                        </span>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className={styles.card__more}>
                            <MoreHorizontal size={16} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Flag className="mr-2 h-4 w-4" />
                            <span>Signaler</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Modifier</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Supprimer</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className={styles.card__commentContent}>
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}