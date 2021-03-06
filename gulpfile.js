var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function (mix) {
  mix
    .less(
      'app.less'
    )
    .styles([
      'style.css',
          'angucomplete-alt.css',
          'toastr.min.css',
          'angularPrint.css'
    ])
    .scripts([
      'libs/**/*.js',
      'app.js',
      'appRoutes.js',
      'controllers/**/*.js',
      'services/**/*.js',
          'filters/**/**.js',
      'directives/**/*.js',
          'dirPagination.js',
          'ui-bootstrap.js',
          'ui-bootstrap-tpls.js',
          'angucomplete-alt.js',
          'toastr.js'

    ])
    .version([
      'css/all.css',
      'js/all.js'
    ])
    .copy(
    'public/js/all.js.map', 'public/build/js/all.js.map'
  )
    .copy(
    'public/css/all.css.map', 'public/build/css/all.css.map'
  );
});