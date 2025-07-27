'use client';

import React, { useState } from 'react';

type User = {
  id: number;
  name: string;
  avatar: string;
  item: string;
};

const initialPurchased: User[] = [
  { id: 1, name: 'Ravi Kumar', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', item: 'Smartphone' },
  { id: 2, name: 'Anita Sharma', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', item: 'Shoes' },
  { id: 3, name: 'Vikram Singh', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', item: 'Groceries' },
  { id: 4, name: 'Priya Patel', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', item: 'Laptop' },
  { id: 5, name: 'Amit Joshi', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', item: 'Headphones' },
  { id: 6, name: 'Meena Joshi', avatar: 'https://randomuser.me/api/portraits/women/6.jpg', item: 'Vegetables' },
  { id: 7, name: 'Suresh Raina', avatar: 'https://randomuser.me/api/portraits/men/7.jpg', item: 'Books' },
  { id: 8, name: 'Kavita Rao', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', item: 'Dress' },
  { id: 9, name: 'Rahul Verma', avatar: 'https://randomuser.me/api/portraits/men/9.jpg', item: 'Shoes' },
  { id: 10, name: 'Sunita Yadav', avatar: 'https://randomuser.me/api/portraits/women/10.jpg', item: 'Groceries' },
  { id: 11, name: 'Ajay Mehra', avatar: 'https://randomuser.me/api/portraits/men/11.jpg', item: 'Mobile Cover' },
  { id: 12, name: 'Pooja Singh', avatar: 'https://randomuser.me/api/portraits/women/12.jpg', item: 'Handbag' },
];

const initialRequests: User[] = [
  { id: 101, name: 'Deepak Kumar', avatar: 'https://randomuser.me/api/portraits/men/13.jpg', item: 'Vegetables' },
  { id: 102, name: 'Meena Joshi', avatar: 'https://randomuser.me/api/portraits/women/14.jpg', item: 'Laptop' },
  { id: 103, name: 'Rohit Sharma', avatar: 'https://randomuser.me/api/portraits/men/15.jpg', item: 'Shoes' },
  { id: 104, name: 'Anjali Gupta', avatar: 'https://randomuser.me/api/portraits/women/16.jpg', item: 'Books' },
  { id: 105, name: 'Sanjay Sethi', avatar: 'https://randomuser.me/api/portraits/men/17.jpg', item: 'Smartphone' },
  { id: 106, name: 'Kiran Desai', avatar: 'https://randomuser.me/api/portraits/women/18.jpg', item: 'Dress' },
  { id: 107, name: 'Vikas Jain', avatar: 'https://randomuser.me/api/portraits/men/19.jpg', item: 'Groceries' },
];

// Modular function to render a user card for Purchased Users
function renderUserCard(user: User) {
  return (
    <div
      key={user.id}
      className="user-card"
      style={{
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 4px 16px rgba(38, 132, 255, 0.10), 0 1.5px 4px #e6f2ff',
        padding: '1.2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'transform 0.18s, box-shadow 0.18s',
        cursor: 'pointer',
        border: '2px solid #e6f2ff',
      }}
    >
      <img
        src={user.avatar}
        alt={user.name}
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: 10,
          border: '2.5px solid #e6f2ff',
        }}
      />
      <div style={{ fontWeight: 600, color: '#003366', fontSize: '1.08rem', marginBottom: 2 }}>
        {user.name}
      </div>
      <div style={{ color: '#2684ff', fontSize: '0.98rem', fontWeight: 500 }}>{user.item}</div>
    </div>
  );
}

// Modular function to render a request user card
function renderRequestCard(user: User, moveToPurchased: (id: number) => void) {
  return (
    <div
      key={user.id}
      className="request-card"
      style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 8px rgba(38, 132, 255, 0.10)',
        padding: '1rem 1.2rem',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        marginBottom: 12,
        border: '2px solid #e6f2ff',
        transition: 'box-shadow 0.18s',
      }}
    >
      <img
        src={user.avatar}
        alt={user.name}
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid #e6f2ff',
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, color: '#003366', fontSize: '1.05rem' }}>{user.name}</div>
        <div style={{ color: '#2684ff', fontSize: '0.97rem', fontWeight: 500 }}>{user.item}</div>
      </div>
      <button
        onClick={() => moveToPurchased(user.id)}
        style={{
          background: 'linear-gradient(90deg, #2684ff 60%, #0056b3 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '0.5rem 1.1rem',
          fontWeight: 600,
          fontSize: '1rem',
          cursor: 'pointer',
          boxShadow: '0 1.5px 4px #e6f2ff',
          transition: 'background 0.18s, transform 0.18s',
        }}
        className="move-btn"
      >
        Move to Purchased
      </button>
    </div>
  );
}

// Modular function to switch category
function switchCategory(
  current: 'purchased' | 'request',
  setCategory: React.Dispatch<React.SetStateAction<'purchased' | 'request'>>
) {
  setCategory(current === 'purchased' ? 'request' : 'purchased');
}

export default function CustomersDashboard() {
  const [category, setCategory] = useState<'purchased' | 'request'>('purchased');
  const [purchased, setPurchased] = useState<User[]>(initialPurchased);
  const [requests, setRequests] = useState<User[]>(initialRequests);

  // Move user from requests to purchased
  function moveToPurchased(userId: number) {
    const user = requests.find(u => u.id === userId);
    if (user) {
      setRequests(reqs => reqs.filter(u => u.id !== userId));
      setPurchased(pur => [...pur, { ...user, id: pur.length + 1 }]);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fff',
        fontFamily: 'Arial, system-ui, sans-serif',
        padding: '2.5rem 1rem 2rem 1rem',
      }}
    >
      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 0,
          marginBottom: '2.2rem',
          borderBottom: '2.5px solid #e6f2ff',
          maxWidth: 520,
        }}
      >
        <button
          onClick={() => switchCategory('purchased', setCategory)}
          style={{
            flex: 1,
            background: category === 'purchased' ? '#2684ff' : '#e6f2ff',
            color: category === 'purchased' ? '#fff' : '#003366',
            border: 'none',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 0,
            borderBottom: category === 'purchased' ? '3px solid #0056b3' : 'none',
            fontWeight: 700,
            fontSize: '1.08rem',
            padding: '0.9rem 0',
            cursor: 'pointer',
            transition: 'background 0.18s, color 0.18s',
            outline: 'none',
          }}
        >
          Purchased Users
        </button>
        <button
          onClick={() => switchCategory('request', setCategory)}
          style={{
            flex: 1,
            background: category === 'request' ? '#2684ff' : '#e6f2ff',
            color: category === 'request' ? '#fff' : '#003366',
            border: 'none',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 12,
            borderBottom: category === 'request' ? '3px solid #0056b3' : 'none',
            fontWeight: 700,
            fontSize: '1.08rem',
            padding: '0.9rem 0',
            cursor: 'pointer',
            transition: 'background 0.18s, color 0.18s',
            outline: 'none',
          }}
        >
          Request Users
        </button>
      </div>
      {/* Purchased Users Grid */}
      {category === 'purchased' && (
        <div
          className="purchased-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            maxWidth: 900,
            margin: '0 auto',
          }}
        >
          {purchased.slice(0, 12).map(user => renderUserCard(user))}
        </div>
      )}
      {/* Request Users List */}
      {category === 'request' && (
        <div
          className="request-list"
          style={{
            maxWidth: 600,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}
        >
          {requests.length === 0 && (
            <div style={{ color: '#003366', fontWeight: 500, textAlign: 'center', marginTop: 30 }}>
              No pending requests.
            </div>
          )}
          {requests.map(user => renderRequestCard(user, moveToPurchased))}
        </div>
      )}
      <style>{`
        .user-card:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 8px 24px rgba(38, 132, 255, 0.18), 0 2px 8px #e6f2ff;
          border-color: #2684ff;
        }
        .request-card:hover {
          box-shadow: 0 6px 18px rgba(38, 132, 255, 0.13);
          border-color: #2684ff;
        }
        .move-btn:hover {
          background: linear-gradient(90deg, #0056b3 60%, #2684ff 100%);
          transform: scale(1.06);
        }
        @media (max-width: 900px) {
          .purchased-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 600px) {
          .purchased-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}