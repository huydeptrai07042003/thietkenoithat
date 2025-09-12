import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRouter, privateRouter } from './routes';
import DefaultLayout from './layouts/defaultLayout';
import { Fragment } from 'react';
import ScrollToTop from './Components/scrollToTop';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ProtectedRoute from './layouts/components/ProtectedRoute';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            {publicRouter.map((page, index) => {
              const Page = page.component;
              let Layout: React.ElementType = DefaultLayout;
              if (page.layout === null) {
                Layout = Fragment;
              } else if (page.layout) {
                Layout = page.layout;
              }
              return (
                <Route
                  key={index}
                  path={page.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
            {/* Private Routes */}
            {privateRouter.map((page, index) => {
              const Page = page.component;
              let Layout: React.ElementType = DefaultLayout;
              if (page.layout === null) {
                Layout = Fragment;
              } else if (page.layout) {
                Layout = page.layout;
              }
              return (
                <Route
                  key={index}
                  path={page.path}
                  element={
                    <ProtectedRoute role={page.role}>
                      <Layout>
                        <Page />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
