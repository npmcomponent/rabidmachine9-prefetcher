/**
 * prefetcher will automate prefecthing of hrefs 
 * on a specified  target class 
 *
 * @author   rabidmachine9 (<https://github.com/rabidmachine9>)
 * @see      <http://rabidmachine9.github.io/prefetcher/>
 */


module.exports = prefetcher;

/**
 *@desc gives back href links with specified class name
 *@param string className the name of our target html class
 *@return array - all href values of target class
 */
function hrefLinks(className){
	elementsToPrefetch = document.getElementsByClassName(className);
	var hrefs = [];
	Array.prototype.forEach.call(elementsToPrefetch, function(el){
		hrefs.push(el.getAttribute('href'));
	});
	return unique(hrefs);
}

/**
 *@desc prefetches-prerenders target links by inserting them to <head>
 *@param string className the name of target html class
 *
 */

function prefetcher(className){
	var hrefs = hrefLinks(className);
	Array.prototype.forEach.call(hrefs, function(el){
		var prefetchLink = document.createElement('link');
		var head = document.getElementsByTagName('head').item(0);
		prefetchLink.setAttribute('rel', 'prerender prefetch');
		prefetchLink.setAttribute('href', el);
		head.appendChild(prefetchLink);   
	});
}

/**
 *@desc remove duplicate values from an array
 *@param array someArray the array to be filtered
 *@return array the result array without duplicates
 */
function unique(someArray){
  var theArray = someArray;
  var arrayLength = theArray.length;
  var uniqueArray = [];
  for(var i=0;i<arrayLength;i++){
    var value = someArray.shift();
    if(someArray.hasOwnProperty(value)){
      continue;
    }  
    uniqueArray.push(value);
  }
  return uniqueArray;
}

