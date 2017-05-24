// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage/sagas'),
          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/adminDashboard',
      name: 'dashboardPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/DashboardPage/reducer'),
          import('containers/DashboardPage/sagas'),
          import('containers/DashboardPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('dashboardPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/authorization',
      name: 'authorization',
      getComponent(location, cb) {
        import('containers/Authorization')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/instituteDashboard',
      name: 'instituteDashboard',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/InstituteDashboard/reducer'),
          import('containers/InstituteDashboard/sagas'),
          import('containers/InstituteDashboard'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('instituteDashboard', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/athleteDashboard',
      name: 'athleteDashboard',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/AthleteDashboard/reducer'),
          import('containers/AthleteDashboard/sagas'),
          import('containers/AthleteDashboard'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('athleteDashboard', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/login',
      name: 'loginPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/LoginPage/reducer'),
          import('containers/LoginPage/sagas'),
          import('containers/LoginPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('loginPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }
  ];
}

