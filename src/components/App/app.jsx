import React, { useState, useEffect } from 'react';
import Options from '../Options/options'
import Feedback from '../Feedback/feedback';
import Notification from '../Notification/notification';
import styles from './app.module.css';

const STORAGE_KEY = 'goit-react-hw-02-feedback';

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  // Yerel depolamadan yükle
  useEffect(() => {
    const storedFeedback = localStorage.getItem(STORAGE_KEY);
    if (storedFeedback) {
      setFeedback(JSON.parse(storedFeedback));
    }
  }, []);

  // Durum değiştiğinde kaydet
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (type) => {
    setFeedback((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positivePercentage = totalFeedback
    ? Math.round((feedback.good / totalFeedback) * 100)
    : 0;

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Sip Happens Café</h1>
      <p className={styles.description}>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>

      <Options
        options={Object.keys(feedback)}
        onLeaveFeedback={updateFeedback}
        onReset={resetFeedback}
        showReset={totalFeedback > 0}
      />

      {totalFeedback > 0 ? (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          total={totalFeedback}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification message="No feedback given" />
      )}
    </div>
  );
};

export default App;
