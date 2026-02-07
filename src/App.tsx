import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const JsonFormatter = lazy(() => import('./pages/JsonFormatter'));
const SqlFormatter = lazy(() => import('./pages/SqlFormatter'));
const TextComparison = lazy(() => import('./pages/TextComparison'));
const About = lazy(() => import('./pages/About'));

// Loading component
const Loading = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          } />
          <Route path="json-formatter" element={
            <Suspense fallback={<Loading />}>
              <JsonFormatter />
            </Suspense>
          } />
          <Route path="sql-formatter" element={
            <Suspense fallback={<Loading />}>
              <SqlFormatter />
            </Suspense>
          } />
          <Route path="text-comparison" element={
            <Suspense fallback={<Loading />}>
              <TextComparison />
            </Suspense>
          } />
          <Route path="about" element={
            <Suspense fallback={<Loading />}>
              <About />
            </Suspense>
          } />
        </Route>
      </Routes>
    </>
  )
}

export default App
