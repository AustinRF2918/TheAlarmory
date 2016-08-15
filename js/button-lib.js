/**
 * Takes a JQuery selector and questions if it has a class,
 * if it does, it adds classOne and removes classTwo.
 * @function
 * @param {JQuery object} $jElem - The JQuery selector that
 * we are using to get class data from.
 * @param {string} condition - The condition that will be 
 * questioned: basically if the JQuery object has this class,
 * the two classes stated later will be swapped.
 * @param {string} classOne - The class the will be added 
 * to our JQuery object in the case that the condition applies.
 * @param {string} classTwo - the class that will be removed
 * from our JQuery object in the case that the condition applies.
 */
function swapInCase($jElem, condition, classOne, classTwo) {
    if ($jElem.hasClass(condition)) {
	$jElem.addClass(classOne);
	$jElem.removeClass(classTwo);
    }
}

/**
 * A wrapper around swapInCase: basically questions if our 
 * button has the inactive class and if it does, removes it
 * and adds the active class, imaging using this for clicking
 * an inactive button.
 * @function
 * @param {JQuery object} $jElem - The element that will be 
 * questioned for the swapping function.
 */
function setActive( $jElem ) {
    swapInCase($jElem, "inactive", "active", "inactive");
};

/**
 * A wrapper around swapInCase: basically questions if our 
 * button has the active class and if it does, removes it
 * and adds the inactive class, imaging using this for clicking
 * an active button.
 * @function
 * @param {JQuery object} $jElem - The element that will be 
 * questioned for the swapping function.
 */

function setInactive($jElem) {
    swapInCase($jElem, "active", "inactive", "active");
};

/**
 * Represents a button on the DOM that has been stylized
 * and allows one to toggle the state of the UI
 * @constructor
 * @param {JQuery object} $selector - the JQuery selector 
 * of the button
 * @param {string} name - The unique name that we will 
 * potentially use within our API.
 * @param {bool} isActive - The state of the button on 
 * construction, maybe could be refactored as a state 
 * variable (integer) instead of bool. However, this 
 * would lead to more complex logic.
 * @param {string} activeClass - the actual CSS class
 * that will be appended to a button when it is set
 * to be active.
 */
function Button($selector, name, isActive, activeClass) {
    this.isActive = isActive;
    this.selector = $selector;
    this.name = name;
    this.activeClass = activeClass;
};

/**
 * Toggles the internal active class that is hooked to 
 * our object when it is constructed. 
 * @method
 */
Button.prototype.toggleActiveClass = function() {
    this.selector.toggleClass(this.activeClass);
};

/**
 * Forces the internal active class that is hooked to 
 * our object to be turned on. 
 * @method
 */
Button.prototype.switchActiveClassOn = function() {
    this.selector.addClass(this.activeClass);
};

/**
 * Forces the internal active class that is hooked to 
 * our object to be turned off.
 * @method
 */
Button.prototype.switchActiveClassOff = function() {
    this.selector.removeClass(this.activeClass);
};


/**
 * Represents a button of collections and their 
 * cooresponding page elements: this always takes no
 * parameters: we simply append Button and page 
 * objects as we go along.
 * @constructor
 */
function ButtonCollection() {
    this.buttonCollection = [];
    this.pageCollection = [];
}

/**
 * An abstraction for passing buttons into our collection:
 * functions by allowing a Button object to be passed and
 * then has the user enter a page element which will be 
 * hooked to said element: when the button is active, so
 * will the page element and it's active class.
 * @constructor
 * @param {Button} btn - The button which we are appending 
 * to our collection.
 * @param {JQuery Object} - The cooresponding JQuery object
 * that we are appending to our collection.
 */
ButtonCollection.prototype.appendButton = function(btn, $pe) {
    //Note that this looks redundant: It is not: the isActive
    //is a semantically construct meaning the entire button is
    //active from the programming side: it still, from the
    //styling side, needs to be messaged to be switched on.
    if (btn.isActive) {
	btn.switchActiveClassOn();
    } 

    var thisButtonCollection = this.buttonCollection;
    var thisPageCollection = this.pageCollection;
    var thisCollection = this;

    btn.selector.click(function(){
	thisCollection.clearActiveButtons();
	thisCollection.clearActivePages();

	setTimeout(function(){
	setActive($pe);
	btn.toggleActiveClass();
	}, 230);
    });

    this.buttonCollection.push(btn);
    this.pageCollection.push($pe);
};

/**
 * Clear all buttons that are selected as active in our container
 * class.
 @function
  */
ButtonCollection.prototype.clearActiveButtons = function() {
    this.buttonCollection.forEach(function(element, index, array) {
	array[index].switchActiveClassOff();
  });
};

/**
 * Clear all pages that are selected as active in our container
 * class.
 @function
  */
ButtonCollection.prototype.clearActivePages= function(){
    this.pageCollection.forEach(function(element, index, array) {
	setInactive(array[index]);
    });
};


