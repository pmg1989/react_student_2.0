// import { appConstants } from 'constants'

// function isLogin () {
//   return !!sessionStorage.getItem(appConstants.UTOKEN)
// }
//
// function redirectToLogin (nextState, replace) {
//   if (!isLogin()) {
//     replace({
//       pathname: '/login',
//       state: { nextPathname: nextState.location.pathname, nextSearch: location.search },
//     })
//   }
// }
//
// function redirectToHome (nextState, replace) {
//   if (isLogin()) {
//     replace('/')
//   }
// }

const Routes = [
  {
    path: '/',
    component: require('./containers/App'),
    // onEnter: redirectToLogin,
    getIndexRoute (location, cb) {
      require.ensure([], (require) => {
        cb(null, { component: require('./containers/Home') })
      }, 'home')
    },
    childRoutes: [
      {
        path: 'progress/:contractId/:categoryId',
        getComponent (location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./containers/Progress'))
          }, 'progress')
        },
      },
      {
        path: 'reserve/:contractId/:categoryId',
        getComponent (location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./containers/Reserve'))
          }, 'reserve')
        },
      },
      {
        path: 'review/:lessonId',
        getComponent (location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./containers/Review'))
          }, 'review')
        },
      },
      {
        path: 'feedback/:contractId/:categoryId',
        getComponent (location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./containers/Feedback'))
          }, 'feedback')
        },
      },
      {
        path: 'feedback/:lessonId',
        getComponent (location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./containers/Feedback/Detail'))
          }, 'feedback-detail')
        },
      },
      {
        path: 'practice/:categoryId',
        getComponent (location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./containers/Practice'))
          }, 'practice')
        },
      },
      {
        path: 'practice/:categoryId/:index',
        getComponent (location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./containers/Practice/Detail'))
          }, 'practice-detail')
        },
      },
    ],
  },
  {
    path: 'introduce',
    getComponent (location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./containers/Introduce'))
      }, 'introduce')
    },
  },
  {
    path: 'share',
    childRoutes: [
      {
        path: 'record',
        getComponent (location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./containers/Share/Record'))
          }, 'share-record')
        },
      },
    ],
  },
  {
    path: 'login',
    getComponent (location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./containers/Login'))
      }, 'login')
    },
  },
  // {
  //   path: 'demo/:id/:detail',
  //   getComponent (location, cb) {
  //     require.ensure([], (require) => {
  //       cb(null, require('./containers/Demo'))
  //     }, 'demo')
  //   },
  // },
  {
    path: '*',
    name: 'error',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./containers/Error'))
      }, 'error')
    },
  },
]

export default Routes
