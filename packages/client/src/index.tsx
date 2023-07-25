import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

import 'animate.css';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

function ReactApp(): JSX.Element {
  return <App />;
}

root.render(<ReactApp />);
