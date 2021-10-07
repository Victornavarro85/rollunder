import React from 'react';
import './css/Footers.css';
import { version } from '../../package.json';

const Footers = () => (
  <footer className="Footers d-none d-md-block">
    <div className="container">
      <span className="text-muted">
          Copyright (c) - Etheroll v
        {version}
      </span>
    </div>
  </footer>
);

export default Footers;
