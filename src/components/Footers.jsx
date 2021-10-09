import React from 'react';
import './css/Footers.css';
import { version } from '../../package.json';

const Footers = () => (
  <footer className="Footers d-none d-md-block">
    <div className="container">
      <span className="text-muted">
          <a href="how-it-works.html">How it works?</a> - <a href="provably-fair.html">Provably fair</a> - support@rollunder.com - Provably fair roll dice game based on BNB Network.
      </span>
    </div>
  </footer>
);

export default Footers;
