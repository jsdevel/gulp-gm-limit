'use strict';

describe('gulp-gm-limit', function(){
  var maxWidth  = 100;
  var maxHeight = 50;
  var gulp = require('gulp');
  var gulpGm = require('gulp-gm');
  var gulpGmLimit = require('..');
  var es = require('event-stream');
  var dist = './dist/';

  it('should resize images that are too tall', function(done){
    gulp.src('./test/fixtures/too-tall-different-ratio-100x100.png')
    .pipe(gulpGmLimit(maxWidth, maxHeight))
    .pipe(gulp.dest(dist))
    .pipe(gulpGm(function(gmFile, cb){
      gmFile.size(function(err, size){
        size.height.should.equal(50);
        size.width.should.equal(50);
        cb(null, gmFile);
        done(err);
      });
    }));
  });

  it('should resize images that are too wide', function(done){
    gulp.src('./test/fixtures/too-wide-different-ratio-300x125.png')
    .pipe(gulpGmLimit(maxWidth, maxHeight))
    .pipe(gulpGm(function(gmFile, cb){
      gmFile.size(function(err, size){
        size.width.should.equal(100);
        size.height.should.equal(42);
        cb(null, gmFile);
        done(err);
      });
    }));
  });

  it('should resize images that are too wide and of the same ratio', function(done){
    gulp.src('./test/fixtures/too-wide-same-ratio-200x100.png')
    .pipe(gulpGmLimit(maxWidth, maxHeight))
    .pipe(gulpGm(function(gmFile, cb){
      gmFile.size(function(err, size){
        size.width.should.equal(100);
        size.height.should.equal(50);
        cb(null, gmFile);
        done(err);
      });
    }));
  });

  it('should not resize images that are neither too wide or too tall', function(done){
    gulp.src('./test/fixtures/same-size-100x50.png')
    .pipe(gulpGmLimit(maxWidth, maxHeight))
    .pipe(gulpGm(function(gmFile, cb){
      gmFile.size(function(err, size){
        size.width.should.equal(100);
        size.height.should.equal(50);
        cb(null, gmFile);
        done(err);
      });
    }));
  });

  it('should not resize images that are equal in width and shorter', function(done){
    gulp.src('./test/fixtures/same-width-different-ratio-100x20.png')
    .pipe(gulpGmLimit(maxWidth, maxHeight))
    .pipe(gulpGm(function(gmFile, cb){
      gmFile.size(function(err, size){
        size.width.should.equal(100);
        size.height.should.equal(20);
        cb(null, gmFile);
        done(err);
      });
    }));
  });

  it('should not resize images that are equal in height and thinner', function(done){
    gulp.src('./test/fixtures/same-height-different-ratio-10x50.png')
    .pipe(gulpGmLimit(maxWidth, maxHeight))
    .pipe(gulpGm(function(gmFile, cb){
      gmFile.size(function(err, size){
        size.width.should.equal(10);
        size.height.should.equal(50);
        cb(null, gmFile);
        done(err);
      });
    }));
  });
});
