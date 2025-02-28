'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import styles from './page.module.scss';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    messages: true,
    comments: true
  });

  const handleDeleteAccount = () => {
    // Handle account deletion
    console.log('Delete account');
  };

  return (
    <div className={styles.settings}>
      <h1>Paramètres</h1>

      <section className={styles.section}>
        <h2>Notifications</h2>
        <div className={styles.settings__list}>
          <div className={styles.settings__item}>
            <div>
              <h3>Notifications par email</h3>
              <p>Recevoir des notifications par email</p>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications(prev => ({ ...prev, email: e.target.checked }))}
              />
              <span className={styles.switch__slider} />
            </label>
          </div>

          <div className={styles.settings__item}>
            <div>
              <h3>Messages</h3>
              <p>Notifications pour les nouveaux messages</p>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={notifications.messages}
                onChange={(e) => setNotifications(prev => ({ ...prev, messages: e.target.checked }))}
              />
              <span className={styles.switch__slider} />
            </label>
          </div>

          <div className={styles.settings__item}>
            <div>
              <h3>Commentaires</h3>
              <p>Notifications pour les nouveaux commentaires</p>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={notifications.comments}
                onChange={(e) => setNotifications(prev => ({ ...prev, comments: e.target.checked }))}
              />
              <span className={styles.switch__slider} />
            </label>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Danger</h2>
        <div className={styles.danger}>
          <div>
            <h3>Supprimer le compte</h3>
            <p>Cette action est irréversible. Toutes vos données seront supprimées définitivement.</p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Supprimer mon compte</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer votre compte ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. Toutes vos données personnelles, témoignages et messages seront supprimés définitivement.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount}>
                  Supprimer définitivement
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>
    </div>
  );
}