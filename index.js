'use strict';

var gm = require('gulp-gm');

module.exports = function(maxWidth, maxHeight){
  var maxRatio = maxWidth / maxHeight;

  return gm(function(gmfile, done){
    gmfile.size(function(err, size){
      var imageHeight;
      var imageWidth;
      var imageRatio;
      var newHeight;
      var newWidth;

      imageHeight = size.height;
      imageWidth = size.width;
      imageRatio = imageWidth / imageHeight;

      if(imageRatio > maxRatio){//image may be too wide
        if(imageWidth > maxWidth){//image is too wide
          newWidth = maxWidth;
          newHeight = maxWidth / imageRatio;
        }//else do nothing
      } else if(imageRatio === maxRatio){//image is the same
        if(imageWidth > maxWidth){//image is too wide
          newWidth = maxWidth;
          newHeight = maxWidth / imageRatio;
        }
      } else {//image may be too tall
        if(imageHeight > maxHeight){
          newHeight = maxHeight;
          newWidth = maxHeight * imageRatio;
        }//else do nothing
      }

      if(newWidth){
        done(null, gmfile.resize(newWidth, newHeight));
      } else {
        done(null, gmfile);
      }
    });
  });
};
