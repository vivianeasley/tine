Number.isInteger = Number.isInteger || function(value) {
    return typeof value === "number" && 
           isFinite(value) && 
           Math.floor(value) === value;
};
var SETTINGS = (function ( ) {

  // Public Variables
  var SE = { };

  // Story Settings
  SE.speedy      = false;
  SE.waitSeconds = 1;

  // Private Variables

  // var privateVariable = 1;
    
  // Public Functions
  // SE.init = function ( ) {
    
  // };


  // Private Functions
  


  return SE;
}( ));

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

var MAIN = (function ( ) {

  // Public Variables
  var MA = { };
  // MA.moduleProperty = 2;

  // Private Variables
  var fText       = 0;
  var fID         = 0;
  var fCount      = 0;
  var fRebuilding = false;

  var fGame        = document.querySelector('.game');
  var fMainWrapper = document.querySelector('.main-wrapper');
    
  // Public Functions
  MA.init = function ( ) {
    checkLocalStorage( );
    MA.nextBubble( );
  };

  // Main game logic. Calls a timeout funct that wauts then call nextBubble. Decides how to proceed with bubble display.

  MA.nextBubble = function ( ) {
    if ( Number.isInteger(pData[fID].text[fText]) ) {
      buildWaitText( );

      TIMER.wait( pData[fID].text[fText], MA.nextBubble )
      fText++;
      return;
    }

    // This mostly deals with rebuilding the story from save or when rewinding the story. 
    // It triggers when all text has been displayed in a story object.

    if ( fText > pData[fID].text.length ) {
      if ( fRebuilding !== true ) {
        buildTextOptions( );
        fText = 0;
        return;
      } else {
        buildBubble( pData[fID].options[SAVE.saveData[fCount]].text, 'player' )
        fText = 0;
        fID   = pData[fID].options[SAVE.saveData[fCount]].id;
        fCount++;

        if ( fCount === SAVE.saveData.length ) {
          fRebuilding     = false;
          SETTINGS.speedy = false;
          MA.nextBubble( );
          fText = 0;
          return;
        } else {
          MA.nextBubble( );
        }
      }
      return;
    }

    // If there is still text to display this calls the build text bubble, sets the timer to wait, etc. 
    buildBubble( pData[fID].text[fText], 'character' );
    TIMER.wait( SETTINGS.waitSeconds, MA.nextBubble );
    fText++;

  };

  // Private Functions

  // This build both the players and the protagonists text bubbles

  function buildBubble ( content, type ) {
    if ( content === undefined || type === undefined ) {
      return;
    }

    var image;
    var element = document.createElement('div');
    element.classList.add('bubble', type);

    if ( content[0] !== '^' ) {
      element.textContent = content; 
    } else {
      image = document.createElement('img');
      image.src = content.substr(1);
      image.classList.add('phone-image');

      element.appendChild(image);
    }
    

    var innerElement = document.createElement('div');
    if ( type === 'character') {
      innerElement.classList.add('tail-left');
    } else {
      innerElement.classList.add('tail-right');
      element.addEventListener("click", function ( ) {rewindAlert( this );}, false);
    }

    element.appendChild(innerElement);

    fMainWrapper.appendChild(element);

    element.classList.add('bounce-in-element');

  }

  // This creates the small waiting text when the game pauses more than the standard amount.

  function buildWaitText ( ) {
    var element = document.createElement('div');
    element.classList.add('waiting');
    element.textContent = 'waiting...';
    fMainWrapper.appendChild(element);

  }

  // Renders the players test options

  function buildTextOptions ( ) {
    if ( pData[fID].options.length <= 0 ) {
      alert(pGameOverMessage);
      return;
    }

    for (var i = 0; i < pData[fID].options.length; i++) {
      renderTextOption( pData[fID].options[i].text, pData[fID].options[i].id );
    }

  }

  function renderTextOption ( content, target ) {
    var element = document.createElement('div');
    element.classList.add('player-input-wrapper');
    element.addEventListener("click", function ( ) { chooseElement( this, content, target ); }, false);

    var innerElement = document.createElement('div');
    innerElement.classList.add('player-input');
    innerElement.textContent = content; 

    element.appendChild(innerElement);
    fMainWrapper.appendChild(element);
    element.classList.add('bounce-in-element')
  }

  function chooseElement ( node, content, target ) {
    var textElements = document.querySelectorAll('.player-input-wrapper');
    var elementId;

    for (var i = 0; i < textElements.length; i++) {
      if ( textElements[i] === node ) {
        SAVE.updateSave( i );
        saveGame( SAVE.saveData );
      }
      
    };

    for (var j = 0; j < textElements.length; j++) {
      fMainWrapper.removeChild(textElements[j]);
    }

    buildBubble( content, 'player' );
    fID   = target;
    fText = 0;
    MA.nextBubble( );
  }

  // Rewinding from save

  function rewindAlert ( node ) {
    var nodesArray;

    if (window.confirm("Do you really want to rewind to this point in the story? You will lose everything past this point.")) { 
      TIMER.killTimer( );
      allPlayerNodes( findId );
    }

    return;

    function findId ( ) {
      for (var i = 0; i < nodesArray.length; i++) {
        if ( node === nodesArray[i] ) {
          rewind( i );
        }
      }
    }

    function allPlayerNodes ( callback ) {
      nodesArray = document.querySelectorAll('.player');
      callback( );
    }
  }

  function rewind ( id ) {
    if ( SAVE.saveData.length < 2 ) {
      console.log('too few');
      return;
    }

    SAVE.saveData = SAVE.saveData.slice( 0, id )
    rebuildGame( );
  }


  function rebuildGame ( ) {
    fText           = 0;
    fID             = 0;
    var bubbles     = document.querySelectorAll('.bubble');
    SETTINGS.speedy = true;

    if ( bubbles.length !== 0 ) {
      removeAll( );
    }
    addAll( );
    return;
    
    function removeAll ( ) {
      fMainWrapper.remove(bubbles);
      var element = document.createElement('div');
      element.classList.add('main-wrapper');
      fGame.appendChild(element);

      fMainWrapper = element;
    }

    function addAll ( ) {
      fCount      = 0;
      fRebuilding = true;
      MA.nextBubble( );

    }
  }

  // This saves and checks local storage for your game

  function checkLocalStorage ( ) {
    var emptyArray = [];
    var charactersStorage ;
    if(typeof(Storage) !== "undefined") {
      if ( localStorage.getItem("tineSave") ) {
        charactersStorage = localStorage.getItem("tineSave");
        SAVE.saveData     = JSON.parse(charactersStorage);
        console.log(SAVE.saveData)
        renderSavedGame( );

      } else {
        return;
      }

    } else {
        alert('Your browser does not support saving this game between sessions. Upgrade!');
    }

  }

  function renderSavedGame ( ) {
    if (window.confirm("Would you want to start from where you left off?")) { 
      rebuildGame( );
    } else {
      saveGame( emptyArray );
    }
  }

  function saveGame ( array ) {
    localStorage.setItem("tineSave", JSON.stringify(array));
  }

  return MA;
}( ));

MAIN.init( );
