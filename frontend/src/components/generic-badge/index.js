import React from 'react';
import './style.scss';

export const GenericBadge = ({value, colors}) => {
  return (
    <div className="badge-container">
      <span className={`generic-badge-style ${colors}`}>{value}</span>
    </div>
  );
};
