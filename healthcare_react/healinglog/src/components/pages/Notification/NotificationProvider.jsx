import React, { createContext, useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { BASE_URL } from '../../services/config';

// 알림 데이터를 전역으로 제공할 Context 생성
export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // 웹소켓 연결 생성
    const socket = new SockJS(`${BASE_URL}/api/websocket`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000, // 5초 후 자동 재연결
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      }, //토큰 전송
      onConnect: () => {
        // 서버에서 오는 알림 구독
        client.subscribe('/topic/notifications', (message) => {
          const notification = message.body;
          setMessages((prevMessages) => [...prevMessages, notification]);

          // 브라우저 알림 표시
          if (Notification.permission === 'granted') {
            new Notification('새로운 알림', {
              body: notification,
              icon: '/img/logo.png',
              requireInteraction: true,
            });
          } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
              if (permission === 'granted') {
                new Notification('새로운 알림', {
                  body: notification,
                  requireInteraction: true,
                });
              }
            });
          }
        });
      },
      onStompError: (frame) => {
        console.error('❌ 웹소켓 오류:', frame);
      },
    });

    client.activate();

    // 컴포넌트 언마운트 시 연결 종료
    return () => {
      client.deactivate();
    };
  }, []);

  return <NotificationContext.Provider value={{ messages }}>{children}</NotificationContext.Provider>;
};

export default NotificationProvider;
