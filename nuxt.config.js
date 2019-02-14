module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-client',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'A simple authentication nuxt project'}
    ],
    script: [
      {src: '/js/index.js'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},

  css: ['~assets/main.css', './node_modules/bulma/css/bulma.css', 'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],

  plugins: ['~/plugins/mixins/user.js', '~/plugins/vee-validate.js', '~/plugins/calcDateDiff.js', {
    src: '~/plugins/nuxt-quill-plugin',
    ssr: false
  },
    {
      src: '~/plugins/echo-client.js',
      ssr: false
    },
  ],
  modules: ['@nuxtjs/auth', '@nuxtjs/axios'],

  axios: {
    baseURL: 'http://localhost:8000/api/v1/auth'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: 'login', method: 'post', propertyName: 'token'},
          user: {url: 'user', method: 'get', propertyName: ''},
          logout: {url: 'logout', method: 'post'}
        }
      }
    }
  },
  // Env property
  env: {
    profileUrl: 'http://localhost:8000/storage/profile_images/',
    baseApiUrl: 'http://localhost:8000/api/v1/auth/',
    authStrat: 'local'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    // extend(config, {isDev, isClient}) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
};

