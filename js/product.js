var PROD = (function ( ) {

  // Public Variables
  var PR = { };
  // PR.moduleProperty = 2;

  // Private Variables
  var imageArray = [ 'assets/jeans.jpg', 'assets/jeans2.jpg', 'assets/jeans3.jpg', 'assets/jeans4.jpg' ]

  // Nodes
  var fMainImage   = document.querySelector('.main-content-image');
  var fImageThumbs = document.querySelectorAll('.main-content-image-thumb');

  // Public Functions

  // Get nodes
  PR.init = function ( ) {
    setImages( );
    attachEvents( );
  };





  // Private Functions
  function setImages ( ) {
    for (var i = 0; i < imageArray.length; i++) {
      fImageThumbs[i].style.backgroundImage = 'url('+imageArray[i]+')';
    }
  }

  function attachEvents ( ) {
    for (var i = 0; i < fImageThumbs.length; i++) {
      fImageThumbs[i].addEventListener("click", changeImage, false);
    }
  }

  function changeImage ( ) {
    var num = findImage( this );
    replaceImage( imageArray[num] );

    var selectedClass = document.querySelector('.selected');

    selectedClass.classList.remove('selected');
    fImageThumbs[num].classList.add('selected');
  }

  function findImage ( element ) {
    for (var i = 0; i < fImageThumbs.length; i++) {
      if ( fImageThumbs[i] === element ) {
        return i;
      }
    }
  }

  function replaceImage ( imageUrl ) {
    fMainImage.src = imageUrl;
  }


  return PR;
}( ));



PROD.init( );


