/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link } from 'react-router-dom';

export interface NotFoundProps {}

export function NotFound(props: NotFoundProps) {
  return (
    <div className="grid-block main-content wrap regular-padding">
      <div className="grid-content small-12" style={{ marginTop: '200px' }}>
        <div style={{ textAlign: 'center' }}>
          <img style={{ marginBottom: '1.2rem' }} src="public/404.png" />
          <h3>404 page not found</h3>
          <p>This page does not exist.</p>
          <Link className="button" to={'/'}>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
