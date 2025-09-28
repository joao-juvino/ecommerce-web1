"use client";
import { createContext, useContext, useState, useEffect } from "react";
import "./notification.css";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [show, setShow] = useState(false);
  const [duration, setDuration] = useState(5000);

  function showNotification(msg, type = "info", dur = 5000) {
    setMessage(msg);
    setType(type);
    setDuration(dur);
    setShow(true);
  }

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {show && (
        <div className={`notification ${type}`}>
          <span>{message}</span>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ animationDuration: `${duration}ms` }}
            ></div>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
