var TIMER = (function ( ) {

  // Public Variables
  var TI = { };
  // TI.moduleProperty = 2;

  // Private Variables
  var fTimer;

  // var privateVariable = 1;
    
  // Public Functions
  TI.wait = function ( time, callback ) {

    if ( SETTINGS.speedy === true ) {

      window.setTimeout(callback, 10);
      // callback( );
      return;
    }

    var timePassed = 0;
    var timeTarget = time*1000;

    startTimer( );

    return;

    function startTimer ( ) {
      fTimer = setTimeout(function(){ timerLoop( ); }, 1000);
    }

    function timerLoop ( ) {
      if ( timePassed >= timeTarget ) {
        callback( );
        return;
      }
      timePassed += 1000;
      startTimer( );
    }
  };

  TI.killTimer = function ( ) {
    clearTimeout(fTimer);
  }

  // Private Functions



  return TI;
}( ));
