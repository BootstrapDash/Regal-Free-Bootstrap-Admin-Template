'use strict'

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var del = require('del');
var replace = require('gulp-replace');
var injectPartials = require('gulp-inject-partials');
var inject = require('gulp-inject');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var merge = require('merge-stream');



gulp.task('sass', function () {
    return gulp.src('./scss/**/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        port: 3001,
        server: "./",
        ghostMode: false,
        notify: false
    });

    gulp.watch('scss/**/*.scss', gulp.series('sass'));
    gulp.watch('**/*.html').on('change', browserSync.reload);
    gulp.watch('js/**/*.js').on('change', browserSync.reload);

}));



// Static Server without watching scss files
gulp.task('serve:lite', function() {

    browserSync.init({
        server: "./",
        ghostMode: false,
        notify: false
    });

    gulp.watch('**/*.css').on('change', browserSync.reload);
    gulp.watch('**/*.html').on('change', browserSync.reload);
    gulp.watch('js/**/*.js').on('change', browserSync.reload);

});


/* inject partials like sidebar and navbar */
gulp.task('injectPartial', function () {
    return gulp.src("./**/*.html", { base: "./" })
      .pipe(injectPartials())
      .pipe(gulp.dest("."));
  });



/* inject Js and CCS assets into HTML */
gulp.task('injectCommonAssets', function () {
  return gulp.src('./**/*.html')
    .pipe(inject(gulp.src([
        './vendors/mdi/css/materialdesignicons.min.css', 
        './vendors/feather/feather.css',
        './vendors/base/vendor.bundle.base.css', 
        './vendors/base/vendor.bundle.base.js',
    ], {read: false}), {name: 'base', relative: true}))
    .pipe(inject(gulp.src([
        './css/*.css',
        './js/off-canvas.js', 
        './js/hoverable-collapse.js', 
        './js/template.js',
    ], {read: false}), {relative: true}))
    .pipe(gulp.dest('.'));
});

/* inject Js and CCS assets into HTML */
gulp.task('injectLayoutStyles', function () {
    return gulp.src('./**/*.html')
        .pipe(inject(gulp.src([
            './css/style.css', 
        ], {read: false}), {relative: true}))
        .pipe(gulp.dest('.'));
});

/*replace image path and linking after injection*/
gulp.task('replacePath', function(){
    var replacePath1 = gulp.src(['./pages/*/*.html'], { base: "./" })
        .pipe(replace('="images/', '="../../images/'))
        .pipe(replace('href="pages/', 'href="../../pages/'))
        .pipe(replace('href="docs/', 'href="../../docs/'))
        .pipe(replace('href="index.html"', 'href="../../index.html"'))
        .pipe(gulp.dest('.'));
    var replacePath2 = gulp.src(['./pages/*.html'], { base: "./" })
        .pipe(replace('="images/', '="../images/'))
        .pipe(replace('"pages/', '"../pages/'))
        .pipe(replace('href="index.html"', 'href="../index.html"'))
        .pipe(gulp.dest('.'));
    var replacePath3 = gulp.src(['./index.html'], { base: "./" })
        .pipe(replace('="images/', '="images/'))
        .pipe(gulp.dest('.'));
    return merge(replacePath1, replacePath2, replacePath3);
});

/*sequence for injecting partials and replacing paths*/
gulp.task('inject', gulp.series('injectPartial' , 'injectCommonAssets' , 'injectLayoutStyles', 'replacePath'));

gulp.task('clean:vendors', function () {
    return del([
      'vendors/**/*'
    ]);
});

/*Building vendor scripts needed for basic template rendering*/
gulp.task('buildBaseVendorScripts', function() {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js', 
        './node_modules/popper.js/dist/umd/popper.min.js', 
        './node_modules/bootstrap/dist/js/bootstrap.min.js', 
        './node_modules/perfect-scrollbar/dist/perfect-scrollbar.min.js'
    ])
      .pipe(concat('vendor.bundle.base.js'))
      .pipe(gulp.dest('./vendors/base'));
});

/*Building vendor styles needed for basic template rendering*/
gulp.task('buildBaseVendorStyles', function() {
    return gulp.src(['./node_modules/perfect-scrollbar/css/perfect-scrollbar.css'])
      .pipe(concat('vendor.bundle.base.css'))
      .pipe(gulp.dest('./vendors/base'));
});

/*Scripts for addons*/
gulp.task('copyAddonsScripts', function() {
    var aScript1 = gulp.src(['node_modules/chart.js/dist/Chart.min.js'])
        .pipe(gulp.dest('./vendors/chart.js'));
    var aScript2 = gulp.src(['node_modules/jquery-bar-rating/dist/jquery.barrating.min.js'])
        .pipe(gulp.dest('./vendors/jquery-bar-rating'));
    var aScript3 = gulp.src(['node_modules/progressbar.js/dist/progressbar.min.js'])
        .pipe(gulp.dest('./vendors/progressbar.js'));
    var aScript4 = gulp.src(['node_modules/progressbar.js/dist/progressbar.min.js'])
        .pipe(gulp.dest('./vendors/progressbar.js'));
    var aScript5 = gulp.src(['node_modules/jquery-file-upload/js/jquery.uploadfile.min.js'])
        .pipe(gulp.dest('./vendors/jquery-file-upload'));
    var aScript6 = gulp.src(['node_modules/jquery.repeater/jquery.repeater.min.js'])
        .pipe(gulp.dest('./vendors/jquery.repeater'));
    var aScript7 = gulp.src(['node_modules/typeahead.js/dist/typeahead.bundle.min.js'])
        .pipe(gulp.dest('./vendors/typeahead.js'));
    var aScript8 = gulp.src(['node_modules/select2/dist/js/select2.min.js'])
        .pipe(gulp.dest('./vendors/select2'));
    var aScript9 = gulp.src(['node_modules/jquery-bar-rating/dist/jquery.barrating.min.js.map'])
        .pipe(gulp.dest('./vendors/jquery-bar-rating'));
    var aScript10 = gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js.map'])
        .pipe(gulp.dest('./vendors/base'));
    return merge(aScript1, aScript2, aScript3, aScript4, aScript5, aScript6, aScript7, aScript8, aScript9, aScript10);
});


/*Styles for addons*/
gulp.task('copyAddonsStyles', function() {   
    var aStyle1 = gulp.src(['./node_modules/font-awesome/css/font-awesome.min.css'])
        .pipe(gulp.dest('./vendors/font-awesome/css'));
    var aStyle2 = gulp.src(['./node_modules/font-awesome/fonts/*'])
        .pipe(gulp.dest('./vendors/font-awesome/fonts'));
    var aStyle3 = gulp.src(['./node_modules/flag-icon-css/css/flag-icon.min.css'])
        .pipe(gulp.dest('./vendors/flag-icon-css/css'));
    var aStyle4 = gulp.src(['./node_modules/flag-icon-css/flags/**/*'])
        .pipe(gulp.dest('./vendors/flag-icon-css/flags'));
    var aStyle5 = gulp.src(['node_modules/jquery-bar-rating/dist/themes/fontawesome-stars.css'])
        .pipe(gulp.dest('./vendors/jquery-bar-rating'));
    var aStyle6 = gulp.src(['node_modules/jquery-bar-rating/dist/themes/fontawesome-stars-o.css'])
        .pipe(gulp.dest('./vendors/jquery-bar-rating'));
    var aStyle7 = gulp.src(['node_modules/jquery-file-upload/css/uploadfile.css'])
        .pipe(gulp.dest('./vendors/jquery-file-upload'));
    var aStyle8 = gulp.src(['node_modules/select2/dist/css/select2.min.css'])
        .pipe(gulp.dest('./vendors/select2')); 
    var aStyle9 = gulp.src(['node_modules/select2-bootstrap-theme/dist/select2-bootstrap.min.css'])
        .pipe(gulp.dest('./vendors/select2-bootstrap-theme'));
    var aStyle10 = gulp.src(['./node_modules/puse-icons-feather/feather.css'])
        .pipe(gulp.dest('./vendors/feather'));
    var aStyle11 = gulp.src(['./node_modules/puse-icons-feather/fonts/*'])
        .pipe(gulp.dest('./vendors/feather/fonts'));
    var aStyle12 = gulp.src(['./node_modules/@mdi/font/css/materialdesignicons.min.css'])
        .pipe(gulp.dest('./vendors/mdi/css'));
    var aStyle13 = gulp.src(['./node_modules/@mdi/font/fonts/*'])
        .pipe(gulp.dest('./vendors/mdi/fonts'));
    var aStyle14 = gulp.src(['./node_modules/@mdi/font/css/materialdesignicons.min.css.map'])
        .pipe(gulp.dest('./vendors/mdi/css'));
    return merge(aStyle1, aStyle2, aStyle3, aStyle4, aStyle5, aStyle6, aStyle7, aStyle8, aStyle9, aStyle10, aStyle11, aStyle12, aStyle13, aStyle14);
});

/*sequence for building vendor scripts and styles*/
gulp.task('bundleVendors', gulp.series('clean:vendors', 'buildBaseVendorStyles','buildBaseVendorScripts', 'copyAddonsStyles', 'copyAddonsScripts'));

gulp.task('default', gulp.series('serve'));
