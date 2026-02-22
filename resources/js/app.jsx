import '../scss/app.scss';
import { createRoot } from 'react-dom/client';
import MainApp from './MainApp';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<MainApp />);
}
