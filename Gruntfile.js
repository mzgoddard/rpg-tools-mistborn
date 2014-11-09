module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    webpack: {
      main: require('./webpack.config'),
      'main-build': require('./webpack.config.build'),
    },

    'webpack-dev-server': {
      main: {
        webpack: require('./webpack.config'),
        keepAlive: true,
      },
    },

    copy: {
      index: {
        files: [{
          expand: true,
          cwd: 'src/www',
          src: '**',
          dest: 'dist',
        }],
      },
    },
  });

  grunt.registerTask('default', ['copy', 'webpack-dev-server']);
  grunt.registerTask('release', ['copy', 'webpack:main-build']);
};
