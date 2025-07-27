'use client';

import React, { useEffect } from 'react';

const reviews = [
  {
    name: 'John Doe',
    rating: 5,
    text: 'Excellent service and fast delivery. Highly recommended!',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    name: 'Jane Smith',
    rating: 4,
    text: 'Good quality products, but packaging could be improved.',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    name: 'Alex Johnson',
    rating: 3,
    text: 'Average experience. Support was helpful though.',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    name: 'Emily Brown',
    rating: 5,
    text: 'Loved the variety and the prices. Will shop again!',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    name: 'Michael Lee',
    rating: 2,
    text: 'Delivery was late and item was not as described.',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    name: 'Sophia Green',
    rating: 4,
    text: 'Great customer service and easy returns.',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
];

const ratingCounts = [0, 0, 0, 0, 0]; // index 0: 1 star, 4: 5 star
reviews.forEach(r => ratingCounts[r.rating - 1]++);

const totalReviews = reviews.length;
const overallRating = (
  reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
).toFixed(1);

const lastMonthRating = 4.8; // Example static value

function renderStars(rating: number) {
  return (
    <span>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{
            color: i < rating ? '#FFD700' : '#dbeafe',
            fontSize: '1.1rem',
            marginRight: 2,
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function renderReviewCard(
  name: string,
  rating: number,
  text: string,
  avatar: string
) {
  return (
    <div
      key={name + text}
      className="review-card"
      style={{
        background: '#f0f8ff',
        borderRadius: 16,
        boxShadow: '0 2px 8px rgba(0,51,102,0.07)',
        padding: '1.2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 0,
      }}
    >
      <img
        src={avatar}
        alt={name}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: 10,
          border: '2px solid #e0e7ef',
        }}
      />
      <div
        style={{
          fontWeight: 600,
          color: '#003366',
          fontSize: '1.05rem',
          marginBottom: 2,
        }}
      >
        {name}
      </div>
      <div style={{ marginBottom: 6 }}>{renderStars(rating)}</div>
      <div
        style={{
          color: '#333',
          fontSize: '0.97rem',
          textAlign: 'center',
          lineHeight: 1.5,
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default function RatingsAndReviews() {
  // Calculate rating percentages
  const ratingPercents = ratingCounts.map(
    count => (count / totalReviews) * 100
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fff',
        fontFamily: 'Arial, system-ui, sans-serif',
        padding: '2.5rem 1rem 2rem 1rem',
      }}
    >
      {/* Top Section */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'flex-start',
          marginBottom: '2.5rem',
        }}
      >
        {/* Rating Bar Chart */}
        <div
          style={{
            flex: '2 1 320px',
            minWidth: 260,
            maxWidth: 420,
            background: '#f0f8ff',
            borderRadius: 16,
            boxShadow: '0 2px 8px rgba(0,51,102,0.07)',
            padding: '1.5rem 1.2rem',
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: '#003366',
              fontSize: '1.1rem',
              marginBottom: 18,
            }}
          >
            Ratings Overview
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[5, 4, 3, 2, 1].map((star, idx) => {
              const percent = ratingPercents[5 - star];
              return (
                <div
                  key={star}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      color: '#003366',
                      fontWeight: 600,
                      width: 32,
                      display: 'inline-block',
                    }}
                  >
                    {star} <span style={{ color: '#FFD700' }}>★</span>
                  </span>
                  <div
                    style={{
                      flex: 1,
                      background: '#e0e7ef',
                      borderRadius: 8,
                      height: 16,
                      overflow: 'hidden',
                      marginRight: 8,
                    }}
                  >
                    <div
                      style={{
                        width: `${percent}%`,
                        background:
                          'linear-gradient(90deg, #3b82f6 60%, #2563eb 100%)',
                        height: '100%',
                        borderRadius: 8,
                        transition: 'width 0.6s cubic-bezier(.4,2,.6,1)',
                      }}
                    ></div>
                  </div>
                  <span
                    style={{
                      color: '#003366',
                      fontSize: '0.98rem',
                      minWidth: 36,
                      textAlign: 'right',
                    }}
                  >
                    {Math.round(percent)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {/* Summary Cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            flex: '1 1 180px',
            minWidth: 180,
          }}
        >
          <div
            style={{
              background: '#f0f8ff',
              borderRadius: 16,
              boxShadow: '0 2px 8px rgba(0,51,102,0.07)',
              padding: '1.2rem 1.5rem',
              color: '#003366',
              fontWeight: 600,
              fontSize: '1.08rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            Overall rating:
            <span style={{ fontSize: '2.1rem', fontWeight: 700, color: '#2563eb', margin: '0.2rem 0' }}>
              {overallRating}
            </span>
            <span style={{ fontSize: '1rem', color: '#003366', fontWeight: 400 }}>
              from {totalReviews} users
            </span>
          </div>
          <div
            style={{
              background: '#f0f8ff',
              borderRadius: 16,
              boxShadow: '0 2px 8px rgba(0,51,102,0.07)',
              padding: '1.2rem 1.5rem',
              color: '#003366',
              fontWeight: 600,
              fontSize: '1.08rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            Last month:
            <span style={{ fontSize: '2.1rem', fontWeight: 700, color: '#2563eb', margin: '0.2rem 0' }}>
              {lastMonthRating}
            </span>
          </div>
        </div>
      </div>
      {/* Review Cards Grid */}
      <div
        className="review-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {reviews.map(r =>
          renderReviewCard(r.name, r.rating, r.text, r.avatar)
        )}
      </div>
      <style>{`
        @media (max-width: 900px) {
          .review-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 600px) {
          .review-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}