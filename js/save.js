var SAVE = (function ( ) {

  // Public Variables
  var SA = { };

  // Public Variables
  SA.saveData = [ ];

  // Private Variables
    
  // Public Functions
  SA.updateSave = function ( optionId ) {
    var id = [];
    id.push( optionId );

    SA.saveData.push.apply( SA.saveData, id );
    
  };


  // Private Functions
  


  return SA;
}( ));
