import '@testing-library/jest-dom';

// Mock ResizeObserver for recharts and other libs
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
  configurable: true,
  value: 800,
});
Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
  configurable: true,
  value: 400,
});