// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';


// Authentication Components for Auth 0
import AuthService from './auth-session/src/auth-utils/AuthService'
// Authentication Components for Auth 0

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

const auth = new AuthService(process.env.AUTH0_CLIENTID,
 process.env.AUTH0_DOMAIN);

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const isloggedIn = (nextState, replace) => {

  if(auth.loggedIn()){
    replace({ pathname: '/' })
  }
}


export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      auth: auth,
      onEnter: requireAuth,
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
      path: '/login',
      name: 'Login',
      auth: auth,
      onEnter: isloggedIn,
      getComponent(nextState, cb) {
        import('./auth-session/src/views/Login')
          .then(loadModule(cb))
          .catch(errorLoading);
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

