/*!
 * jQuery JavaScript Library v3.1.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2016-09-22T22:30Z
 */

( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			resolve.call( undefined, value );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.call( undefined, value );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && jQuery.nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

function manipulationTarget( elem, content ) {
	if ( jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE <=9 only
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val,
		valueIsBorderBox = true,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE <=11 only
	// Running getBoundingClientRect on a disconnected node
	// in IE throws an error.
	if ( elem.getClientRects().length ) {
		val = elem.getBoundingClientRect()[ name ];
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function raf() {
	if ( timerId ) {
		window.requestAnimationFrame( raf );
		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off or if document is hidden
	if ( jQuery.fx.off || document.hidden ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.requestAnimationFrame ?
			window.requestAnimationFrame( raf ) :
			window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	if ( window.cancelAnimationFrame ) {
		window.cancelAnimationFrame( timerId );
	} else {
		window.clearInterval( timerId );
	}

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( jQuery.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win, rect, doc,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		// Make sure element is not hidden (display: none)
		if ( rect.width || rect.height ) {
			doc = elem.ownerDocument;
			win = getWindow( doc );
			docElem = doc.documentElement;

			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		}

		// Return zeros for disconnected and hidden elements (gh-2310)
		return rect;
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.parseJSON = JSON.parse;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}





return jQuery;
} );
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
/*
 Highcharts JS v5.0.0 (2016-09-29)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/

(function(K,a){"object"===typeof module&&module.exports?module.exports=K.document?a(K):a:K.Highcharts=a(K)})("undefined"!==typeof window?window:this,function(K){K=function(){var a=window,A=a.document,y=a.navigator&&a.navigator.userAgent||"",E=A&&A.createElementNS&&!!A.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,G=/(edge|msie|trident)/i.test(y)&&!window.opera,t=!E,g=/Firefox/.test(y),d=g&&4>parseInt(y.split("Firefox/")[1],10);return a.Highcharts?a.Highcharts.error(16,!0):{product:"Highcharts",
version:"5.0.0",deg2rad:2*Math.PI/360,doc:A,hasBidiBug:d,isMS:G,isWebKit:/AppleWebKit/.test(y),isFirefox:g,isTouchDevice:/(Mobile|Android|Windows Phone)/.test(y),SVG_NS:"http://www.w3.org/2000/svg",idCounter:0,chartCount:0,seriesTypes:{},svg:E,vml:t,win:a,charts:[],marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){}}}();(function(a){var A=[],y=a.charts,E=a.doc,G=a.win;a.error=function(a,g){var d="Highcharts error #"+a+": www.highcharts.com/errors/"+a;if(g)throw Error(d);
G.console&&console.log(d)};a.Fx=function(a,g,d){this.options=g;this.elem=a;this.prop=d};a.Fx.prototype={dSetter:function(){var a=this.paths[0],g=this.paths[1],d=[],m=this.now,r=a.length,n;if(1===m)d=this.toD;else if(r===g.length&&1>m)for(;r--;)n=parseFloat(a[r]),d[r]=isNaN(n)?a[r]:m*parseFloat(g[r]-n)+n;else d=g;this.elem.attr("d",d)},update:function(){var a=this.elem,g=this.prop,d=this.now,m=this.options.step;if(this[g+"Setter"])this[g+"Setter"]();else a.attr?a.element&&a.attr(g,d):a.style[g]=d+
this.unit;m&&m.call(a,d,this)},run:function(a,g,d){var m=this,r=function(a){return r.stopped?!1:m.step(a)},n;this.startTime=+new Date;this.start=a;this.end=g;this.unit=d;this.now=this.start;this.pos=0;r.elem=this.elem;r()&&1===A.push(r)&&(r.timerId=setInterval(function(){for(n=0;n<A.length;n++)A[n]()||A.splice(n--,1);A.length||clearInterval(r.timerId)},13))},step:function(a){var g=+new Date,d,m=this.options;d=this.elem;var r=m.complete,n=m.duration,p=m.curAnim,b;if(d.attr&&!d.element)d=!1;else if(a||
g>=n+this.startTime){this.now=this.end;this.pos=1;this.update();a=p[this.prop]=!0;for(b in p)!0!==p[b]&&(a=!1);a&&r&&r.call(d);d=!1}else this.pos=m.easing((g-this.startTime)/n),this.now=this.start+(this.end-this.start)*this.pos,this.update(),d=!0;return d},initPath:function(t,g,d){function m(a){for(l=a.length;l--;)"M"!==a[l]&&"L"!==a[l]||a.splice(l+1,0,a[l+1],a[l+2],a[l+1],a[l+2])}function r(a,f){for(;a.length<e;){a[0]=f[e-a.length];var c=a.slice(0,B);[].splice.apply(a,[0,0].concat(c));q&&(c=a.slice(a.length-
B),[].splice.apply(a,[a.length,0].concat(c)),l--)}a[0]="M"}function n(a,f){for(var b=(e-a.length)/B;0<b&&b--;)c=a.slice().splice(a.length/h-B,B*h),c[0]=f[e-B-b*B],v&&(c[B-6]=c[B-2],c[B-5]=c[B-1]),[].splice.apply(a,[a.length/h,0].concat(c)),q&&b--}g=g||"";var p,b=t.startX,k=t.endX,v=-1<g.indexOf("C"),B=v?7:3,e,c,l;g=g.split(" ");d=d.slice();var q=t.isArea,h=q?2:1,f;v&&(m(g),m(d));if(b&&k){for(l=0;l<b.length;l++)if(b[l]===k[0]){p=l;break}else if(b[0]===k[k.length-b.length+l]){p=l;f=!0;break}void 0===
p&&(g=[])}g.length&&a.isNumber(p)&&(e=d.length+p*h*B,f?(r(g,d),n(d,g)):(r(d,g),n(g,d)));return[g,d]}};a.extend=function(a,g){var d;a||(a={});for(d in g)a[d]=g[d];return a};a.merge=function(){var t,g=arguments,d,m={},r=function(n,d){var b,k;"object"!==typeof n&&(n={});for(k in d)d.hasOwnProperty(k)&&(b=d[k],a.isObject(b,!0)&&"renderTo"!==k&&"number"!==typeof b.nodeType?n[k]=r(n[k]||{},b):n[k]=d[k]);return n};!0===g[0]&&(m=g[1],g=Array.prototype.slice.call(g,2));d=g.length;for(t=0;t<d;t++)m=r(m,g[t]);
return m};a.pInt=function(a,g){return parseInt(a,g||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(t,g){return t&&"object"===typeof t&&(!g||!a.isArray(t))};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)};a.erase=function(a,g){for(var d=a.length;d--;)if(a[d]===g){a.splice(d,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=
function(t,g,d){var m,r;if(a.isString(g))a.defined(d)?t.setAttribute(g,d):t&&t.getAttribute&&(r=t.getAttribute(g));else if(a.defined(g)&&a.isObject(g))for(m in g)t.setAttribute(m,g[m]);return r};a.splat=function(t){return a.isArray(t)?t:[t]};a.syncTimeout=function(a,g,d){if(g)return setTimeout(a,g,d);a.call(0,d)};a.pick=function(){var a=arguments,g,d,m=a.length;for(g=0;g<m;g++)if(d=a[g],void 0!==d&&null!==d)return d};a.css=function(t,g){a.isMS&&!a.svg&&g&&void 0!==g.opacity&&(g.filter="alpha(opacity="+
100*g.opacity+")");a.extend(t.style,g)};a.createElement=function(t,g,d,m,r){t=E.createElement(t);var n=a.css;g&&a.extend(t,g);r&&n(t,{padding:0,border:"none",margin:0});d&&n(t,d);m&&m.appendChild(t);return t};a.extendClass=function(t,g){var d=function(){};d.prototype=new t;a.extend(d.prototype,g);return d};a.pad=function(a,g,d){return Array((g||2)+1-String(a).length).join(d||0)+a};a.relativeLength=function(a,g){return/%$/.test(a)?g*parseFloat(a)/100:parseFloat(a)};a.wrap=function(a,g,d){var m=a[g];
a[g]=function(){var a=Array.prototype.slice.call(arguments);a.unshift(m);return d.apply(this,a)}};a.getTZOffset=function(t){var g=a.Date;return 6E4*(g.hcGetTimezoneOffset&&g.hcGetTimezoneOffset(t)||g.hcTimezoneOffset||0)};a.dateFormat=function(t,g,d){if(!a.defined(g)||isNaN(g))return a.defaultOptions.lang.invalidDate||"";t=a.pick(t,"%Y-%m-%d %H:%M:%S");var m=a.Date,r=new m(g-a.getTZOffset(g)),n,p=r[m.hcGetHours](),b=r[m.hcGetDay](),k=r[m.hcGetDate](),v=r[m.hcGetMonth](),B=r[m.hcGetFullYear](),e=a.defaultOptions.lang,
c=e.weekdays,l=e.shortWeekdays,q=a.pad,m=a.extend({a:l?l[b]:c[b].substr(0,3),A:c[b],d:q(k),e:q(k,2," "),w:b,b:e.shortMonths[v],B:e.months[v],m:q(v+1),y:B.toString().substr(2,2),Y:B,H:q(p),k:p,I:q(p%12||12),l:p%12||12,M:q(r[m.hcGetMinutes]()),p:12>p?"AM":"PM",P:12>p?"am":"pm",S:q(r.getSeconds()),L:q(Math.round(g%1E3),3)},a.dateFormats);for(n in m)for(;-1!==t.indexOf("%"+n);)t=t.replace("%"+n,"function"===typeof m[n]?m[n](g):m[n]);return d?t.substr(0,1).toUpperCase()+t.substr(1):t};a.formatSingle=function(t,
g){var d=/\.([0-9])/,m=a.defaultOptions.lang;/f$/.test(t)?(d=(d=t.match(d))?d[1]:-1,null!==g&&(g=a.numberFormat(g,d,m.decimalPoint,-1<t.indexOf(",")?m.thousandsSep:""))):g=a.dateFormat(t,g);return g};a.format=function(t,g){for(var d="{",m=!1,r,n,p,b,k=[],v;t;){d=t.indexOf(d);if(-1===d)break;r=t.slice(0,d);if(m){r=r.split(":");n=r.shift().split(".");b=n.length;v=g;for(p=0;p<b;p++)v=v[n[p]];r.length&&(v=a.formatSingle(r.join(":"),v));k.push(v)}else k.push(r);t=t.slice(d+1);d=(m=!m)?"}":"{"}k.push(t);
return k.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(t,g,d,m,r){var n,p=t;d=a.pick(d,1);n=t/d;g||(g=[1,2,2.5,5,10],!1===m&&(1===d?g=[1,2,5,10]:.1>=d&&(g=[1/d])));for(m=0;m<g.length&&!(p=g[m],r&&p*d>=t||!r&&n<=(g[m]+(g[m+1]||g[m]))/2);m++);return p*d};a.stableSort=function(a,g){var d=a.length,m,r;for(r=0;r<d;r++)a[r].safeI=r;a.sort(function(a,d){m=g(a,d);return 0===m?a.safeI-d.safeI:m});for(r=0;r<d;r++)delete a[r].safeI};
a.arrayMin=function(a){for(var g=a.length,d=a[0];g--;)a[g]<d&&(d=a[g]);return d};a.arrayMax=function(a){for(var g=a.length,d=a[0];g--;)a[g]>d&&(d=a[g]);return d};a.destroyObjectProperties=function(a,g){for(var d in a)a[d]&&a[d]!==g&&a[d].destroy&&a[d].destroy(),delete a[d]};a.discardElement=function(t){var g=a.garbageBin;g||(g=a.createElement("div"));t&&g.appendChild(t);g.innerHTML=""};a.correctFloat=function(a,g){return parseFloat(a.toPrecision(g||14))};a.setAnimation=function(t,g){g.renderer.globalAnimation=
a.pick(t,g.options.chart.animation,!0)};a.animObject=function(t){return a.isObject(t)?a.merge(t):{duration:t?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(t,g,d,m){t=+t||0;g=+g;var r=a.defaultOptions.lang,n=(t.toString().split(".")[1]||"").length,p,b,k=Math.abs(t);-1===g?g=Math.min(n,20):a.isNumber(g)||(g=2);p=String(a.pInt(k.toFixed(g)));b=3<p.length?p.length%3:0;d=a.pick(d,r.decimalPoint);m=a.pick(m,
r.thousandsSep);t=(0>t?"-":"")+(b?p.substr(0,b)+m:"");t+=p.substr(b).replace(/(\d{3})(?=\d)/g,"$1"+m);g&&(m=Math.abs(k-p+Math.pow(10,-Math.max(g,n)-1)),t+=d+m.toFixed(g).slice(2));return t};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(t,g){var d;return"width"===g?Math.min(t.offsetWidth,t.scrollWidth)-a.getStyle(t,"padding-left")-a.getStyle(t,"padding-right"):"height"===g?Math.min(t.offsetHeight,t.scrollHeight)-a.getStyle(t,"padding-top")-a.getStyle(t,"padding-bottom"):
(d=G.getComputedStyle(t,void 0))&&a.pInt(d.getPropertyValue(g))};a.inArray=function(a,g){return g.indexOf?g.indexOf(a):[].indexOf.call(g,a)};a.grep=function(a,g){return[].filter.call(a,g)};a.map=function(a,g){for(var d=[],m=0,r=a.length;m<r;m++)d[m]=g.call(a[m],a[m],m,a);return d};a.offset=function(a){var g=E.documentElement;a=a.getBoundingClientRect();return{top:a.top+(G.pageYOffset||g.scrollTop)-(g.clientTop||0),left:a.left+(G.pageXOffset||g.scrollLeft)-(g.clientLeft||0)}};a.stop=function(a){for(var g=
A.length;g--;)A[g].elem===a&&(A[g].stopped=!0)};a.each=function(a,g,d){return Array.prototype.forEach.call(a,g,d)};a.addEvent=function(a,g,d){function m(n){n.target=n.srcElement||G;d.call(a,n)}var r=a.hcEvents=a.hcEvents||{};a.addEventListener?a.addEventListener(g,d,!1):a.attachEvent&&(a.hcEventsIE||(a.hcEventsIE={}),a.hcEventsIE[d.toString()]=m,a.attachEvent("on"+g,m));r[g]||(r[g]=[]);r[g].push(d)};a.removeEvent=function(t,g,d){function m(a,b){t.removeEventListener?t.removeEventListener(a,b,!1):
t.attachEvent&&(b=t.hcEventsIE[b.toString()],t.detachEvent("on"+a,b))}function r(){var a,b;if(t.nodeName)for(b in g?(a={},a[g]=!0):a=p,a)if(p[b])for(a=p[b].length;a--;)m(b,p[b][a])}var n,p=t.hcEvents,b;p&&(g?(n=p[g]||[],d?(b=a.inArray(d,n),-1<b&&(n.splice(b,1),p[g]=n),m(g,d)):(r(),p[g]=[])):(r(),t.hcEvents={}))};a.fireEvent=function(t,g,d,m){var r;r=t.hcEvents;var n,p;d=d||{};if(E.createEvent&&(t.dispatchEvent||t.fireEvent))r=E.createEvent("Events"),r.initEvent(g,!0,!0),a.extend(r,d),t.dispatchEvent?
t.dispatchEvent(r):t.fireEvent(g,r);else if(r)for(r=r[g]||[],n=r.length,d.target||a.extend(d,{preventDefault:function(){d.defaultPrevented=!0},target:t,type:g}),g=0;g<n;g++)(p=r[g])&&!1===p.call(t,d)&&d.preventDefault();m&&!d.defaultPrevented&&m(d)};a.animate=function(t,g,d){var m,r="",n,p,b;a.isObject(d)||(m=arguments,d={duration:m[2],easing:m[3],complete:m[4]});a.isNumber(d.duration)||(d.duration=400);d.easing="function"===typeof d.easing?d.easing:Math[d.easing]||Math.easeInOutSine;d.curAnim=a.merge(g);
for(b in g)p=new a.Fx(t,d,b),n=null,"d"===b?(p.paths=p.initPath(t,t.d,g.d),p.toD=g.d,m=0,n=1):t.attr?m=t.attr(b):(m=parseFloat(a.getStyle(t,b))||0,"opacity"!==b&&(r="px")),n||(n=g[b]),n.match&&n.match("px")&&(n=n.replace(/px/g,"")),p.run(m,n,r)};a.seriesType=function(t,g,d,m,r){var n=a.getOptions(),p=a.seriesTypes;n.plotOptions[t]=a.merge(n.plotOptions[g],d);p[t]=a.extendClass(p[g]||function(){},m);p[t].prototype.type=t;r&&(p[t].prototype.pointClass=a.extendClass(a.Point,r));return p[t]};G.jQuery&&
(G.jQuery.fn.highcharts=function(){var t=[].slice.call(arguments);if(this[0])return t[0]?(new (a[a.isString(t[0])?t.shift():"Chart"])(this[0],t[0],t[1]),this):y[a.attr(this[0],"data-highcharts-chart")]});E&&!E.defaultView&&(a.getStyle=function(t,g){var d;d={width:"clientWidth",height:"clientHeight"}[g];if(t.style[g])return a.pInt(t.style[g]);"opacity"===g&&(g="filter");if(d)return t.style.zoom=1,Math.max(t[d]-2*a.getStyle(t,"padding"),0);d=t.currentStyle[g.replace(/\-(\w)/g,function(a,d){return d.toUpperCase()})];
"filter"===g&&(d=d.replace(/alpha\(opacity=([0-9]+)\)/,function(a,d){return d/100}));return""===d?1:a.pInt(d)});Array.prototype.forEach||(a.each=function(a,g,d){for(var m=0,r=a.length;m<r;m++)if(!1===g.call(d,a[m],m,a))return m});Array.prototype.indexOf||(a.inArray=function(a,g){var d,m=0;if(g)for(d=g.length;m<d;m++)if(g[m]===a)return m;return-1});Array.prototype.filter||(a.grep=function(a,g){for(var d=[],m=0,r=a.length;m<r;m++)g(a[m],m)&&d.push(a[m]);return d})})(K);(function(a){var A=a.each,y=a.isNumber,
E=a.map,G=a.merge,t=a.pInt;a.Color=function(g){if(!(this instanceof a.Color))return new a.Color(g);this.init(g)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[t(a[1]),t(a[2]),t(a[3]),parseFloat(a[4],10)]}},{regex:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function(a){return[t(a[1],16),t(a[2],16),t(a[3],16),1]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
parse:function(a){return[t(a[1]),t(a[2]),t(a[3]),1]}}],names:{white:"#ffffff",black:"#000000"},init:function(g){var d,m,r,n;if((this.input=g=this.names[g]||g)&&g.stops)this.stops=E(g.stops,function(d){return new a.Color(d[1])});else for(r=this.parsers.length;r--&&!m;)n=this.parsers[r],(d=n.regex.exec(g))&&(m=n.parse(d));this.rgba=m||[]},get:function(a){var d=this.input,m=this.rgba,r;this.stops?(r=G(d),r.stops=[].concat(r.stops),A(this.stops,function(d,p){r.stops[p]=[r.stops[p][0],d.get(a)]})):r=m&&
y(m[0])?"rgb"===a||!a&&1===m[3]?"rgb("+m[0]+","+m[1]+","+m[2]+")":"a"===a?m[3]:"rgba("+m.join(",")+")":d;return r},brighten:function(a){var d,m=this.rgba;if(this.stops)A(this.stops,function(d){d.brighten(a)});else if(y(a)&&0!==a)for(d=0;3>d;d++)m[d]+=t(255*a),0>m[d]&&(m[d]=0),255<m[d]&&(m[d]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this}};a.color=function(g){return new a.Color(g)}})(K);(function(a){var A,y,E=a.addEvent,G=a.animate,t=a.attr,g=a.charts,d=a.color,m=a.css,r=a.createElement,
n=a.defined,p=a.deg2rad,b=a.destroyObjectProperties,k=a.doc,v=a.each,B=a.extend,e=a.erase,c=a.grep,l=a.hasTouch,q=a.isArray,h=a.isFirefox,f=a.isMS,u=a.isObject,D=a.isString,H=a.isWebKit,F=a.merge,I=a.noop,C=a.pick,w=a.pInt,J=a.removeEvent,M=a.stop,x=a.svg,z=a.SVG_NS,N=a.win;A=a.SVGElement=function(){return this};A.prototype={opacity:1,SVG_NS:z,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textShadow".split(" "),init:function(a,f){this.element=
"span"===f?r(f):k.createElementNS(this.SVG_NS,f);this.renderer=a},animate:function(a,f,L){f=C(f,this.renderer.globalAnimation,!0);M(this);f?(L&&(f.complete=L),G(this,a,f)):this.attr(a,null,L);return this},colorGradient:function(O,f,L){var c=this.renderer,x,z,e,u,b,h,l,D,d,C,k,w=[],H;O.linearGradient?z="linearGradient":O.radialGradient&&(z="radialGradient");if(z){e=O[z];b=c.gradients;l=O.stops;C=L.radialReference;q(e)&&(O[z]=e={x1:e[0],y1:e[1],x2:e[2],y2:e[3],gradientUnits:"userSpaceOnUse"});"radialGradient"===
z&&C&&!n(e.gradientUnits)&&(u=e,e=F(e,c.getRadialAttr(C,u),{gradientUnits:"userSpaceOnUse"}));for(k in e)"id"!==k&&w.push(k,e[k]);for(k in l)w.push(l[k]);w=w.join(",");b[w]?C=b[w].attr("id"):(e.id=C="highcharts-"+a.idCounter++,b[w]=h=c.createElement(z).attr(e).add(c.defs),h.radAttr=u,h.stops=[],v(l,function(O){0===O[1].indexOf("rgba")?(x=a.color(O[1]),D=x.get("rgb"),d=x.get("a")):(D=O[1],d=1);O=c.createElement("stop").attr({offset:O[0],"stop-color":D,"stop-opacity":d}).add(h);h.stops.push(O)}));H=
"url("+c.url+"#"+C+")";L.setAttribute(f,H);L.gradient=w;O.toString=function(){return H}}},applyTextShadow:function(a){var c=this.element,L,x=-1!==a.indexOf("contrast"),z={},e=this.renderer.forExport,u=this.renderer.forExport||void 0!==c.style.textShadow&&!f;x&&(z.textShadow=a=a.replace(/contrast/g,this.renderer.getContrast(c.style.fill)));if(H||e)z.textRendering="geometricPrecision";u?this.css(z):(this.fakeTS=!0,this.ySetter=this.xSetter,L=[].slice.call(c.getElementsByTagName("tspan")),v(a.split(/\s?,\s?/g),
function(a){var O=c.firstChild,f,x;a=a.split(" ");f=a[a.length-1];(x=a[a.length-2])&&v(L,function(a,L){var z;0===L&&(a.setAttribute("x",c.getAttribute("x")),L=c.getAttribute("y"),a.setAttribute("y",L||0),null===L&&c.setAttribute("y",0));z=a.cloneNode(1);t(z,{"class":"highcharts-text-shadow",fill:f,stroke:f,"stroke-opacity":1/Math.max(w(x),3),"stroke-width":x,"stroke-linejoin":"round"});c.insertBefore(z,O)})}))},attr:function(a,f,L){var c,x=this.element,z,e=this,u;"string"===typeof a&&void 0!==f&&
(c=a,a={},a[c]=f);if("string"===typeof a)e=(this[a+"Getter"]||this._defaultGetter).call(this,a,x);else{for(c in a)f=a[c],u=!1,this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c)&&(z||(this.symbolAttr(a),z=!0),u=!0),!this.rotation||"x"!==c&&"y"!==c||(this.doTransform=!0),u||(u=this[c+"Setter"]||this._defaultSetter,u.call(this,f,c,x),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c)&&this.updateShadows(c,f,u));this.doTransform&&(this.updateTransform(),
this.doTransform=!1)}L&&L();return e},updateShadows:function(a,f,c){for(var x=this.shadows,z=x.length;z--;)c.call(x[z],"height"===a?Math.max(f-(x[z].cutHeight||0),0):"d"===a?this.d:f,a,x[z])},addClass:function(a,f){var c=this.attr("class")||"";-1===c.indexOf(a)&&(f||(a=(c+(c?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==t(this.element,"class").indexOf(a)},removeClass:function(a){t(this.element,"class",(t(this.element,"class")||"").replace(a,""));
return this},symbolAttr:function(a){var f=this;v("x y r start end width height innerR anchorX anchorY".split(" "),function(c){f[c]=C(a[c],f[c])});f.attr({d:f.renderer.symbols[f.symbolName](f.x,f.y,f.width,f.height,f)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,f){var c,x={},z;f=f||a.strokeWidth||0;z=Math.round(f)%2/2;a.x=Math.floor(a.x||this.x||0)+z;a.y=Math.floor(a.y||this.y||0)+z;a.width=Math.floor((a.width||this.width||0)-2*
z);a.height=Math.floor((a.height||this.height||0)-2*z);n(a.strokeWidth)&&(a.strokeWidth=f);for(c in a)this[c]!==a[c]&&(this[c]=x[c]=a[c]);return x},css:function(a){var c=this.styles,L={},z=this.element,e,u,b="";e=!c;a&&a.color&&(a.fill=a.color);if(c)for(u in a)a[u]!==c[u]&&(L[u]=a[u],e=!0);if(e){e=this.textWidth=a&&a.width&&"text"===z.nodeName.toLowerCase()&&w(a.width)||this.textWidth;c&&(a=B(c,L));this.styles=a;e&&!x&&this.renderer.forExport&&delete a.width;if(f&&!x)m(this.element,a);else{c=function(a,
O){return"-"+O.toLowerCase()};for(u in a)b+=u.replace(/([A-Z])/g,c)+":"+a[u]+";";t(z,"style",b)}this.added&&e&&this.renderer.buildText(this)}return this},strokeWidth:function(){return this["stroke-width"]||0},on:function(a,f){var c=this,x=c.element;l&&"click"===a?(x.ontouchstart=function(a){c.touchEventFired=Date.now();a.preventDefault();f.call(x,a)},x.onclick=function(a){(-1===N.navigator.userAgent.indexOf("Android")||1100<Date.now()-(c.touchEventFired||0))&&f.call(x,a)}):x["on"+a]=f;return this},
setRadialReference:function(a){var f=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;f&&f.radAttr&&f.animate(this.renderer.getRadialAttr(a,f.radAttr));return this},translate:function(a,f){return this.attr({translateX:a,translateY:f})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,f=this.translateY||0,c=this.scaleX,x=this.scaleY,z=this.inverted,e=this.rotation,u=this.element;z&&(a+=this.attr("width"),
f+=this.attr("height"));a=["translate("+a+","+f+")"];z?a.push("rotate(90) scale(-1,1)"):e&&a.push("rotate("+e+" "+(u.getAttribute("x")||0)+" "+(u.getAttribute("y")||0)+")");(n(c)||n(x))&&a.push("scale("+C(c,1)+" "+C(x,1)+")");a.length&&u.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,f,c){var x,z,u,b,h={};z=this.renderer;u=z.alignedObjects;var l,q;if(a){if(this.alignOptions=a,this.alignByTranslate=f,!c||D(c))this.alignTo=
x=c||"renderer",e(u,this),u.push(this),c=null}else a=this.alignOptions,f=this.alignByTranslate,x=this.alignTo;c=C(c,z[x],z);x=a.align;z=a.verticalAlign;u=(c.x||0)+(a.x||0);b=(c.y||0)+(a.y||0);"right"===x?l=1:"center"===x&&(l=2);l&&(u+=(c.width-(a.width||0))/l);h[f?"translateX":"x"]=Math.round(u);"bottom"===z?q=1:"middle"===z&&(q=2);q&&(b+=(c.height-(a.height||0))/q);h[f?"translateY":"y"]=Math.round(b);this[this.placed?"animate":"attr"](h);this.placed=!0;this.alignAttr=h;return this},getBBox:function(a,
c){var x,z=this.renderer,u,e,b,l=this.element,D=this.styles,q=this.textStr,F,d=l.style,k,w=z.cache,H=z.cacheKeys,n;e=C(c,this.rotation);b=e*p;u=D&&D.fontSize;void 0!==q&&(n=q.toString().replace(/[0-9]/g,"0")+["",e||0,u,l.style.width].join());n&&!a&&(x=w[n]);if(!x){if(l.namespaceURI===this.SVG_NS||z.forExport){try{k=this.fakeTS&&function(a){v(l.querySelectorAll(".highcharts-text-shadow"),function(f){f.style.display=a})},h&&d.textShadow?(F=d.textShadow,d.textShadow=""):k&&k("none"),x=l.getBBox?B({},
l.getBBox()):{width:l.offsetWidth,height:l.offsetHeight},F?d.textShadow=F:k&&k("")}catch(r){}if(!x||0>x.width)x={width:0,height:0}}else x=this.htmlGetBBox();z.isSVG&&(z=x.width,u=x.height,f&&D&&"11px"===D.fontSize&&"16.9"===u.toPrecision(3)&&(x.height=u=14),e&&(x.width=Math.abs(u*Math.sin(b))+Math.abs(z*Math.cos(b)),x.height=Math.abs(u*Math.cos(b))+Math.abs(z*Math.sin(b))));if(n&&0<x.height){for(;250<H.length;)delete w[H.shift()];w[n]||H.push(n);w[n]=x}}return x},show:function(a){return this.attr({visibility:a?
"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var f=this;f.animate({opacity:0},{duration:a||150,complete:function(){f.attr({y:-9999})}})},add:function(a){var f=this.renderer,c=this.element,x;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&f.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)x=this.zIndexSetter();x||(a?a.element:f.box).appendChild(c);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var f=
a.parentNode;f&&f.removeChild(a)},destroy:function(){var a=this.element||{},f=this.renderer.isSVG&&"SPAN"===a.nodeName&&this.parentGroup,c,x;a.onclick=a.onmouseout=a.onmouseover=a.onmousemove=a.point=null;M(this);this.clipPath&&(this.clipPath=this.clipPath.destroy());if(this.stops){for(x=0;x<this.stops.length;x++)this.stops[x]=this.stops[x].destroy();this.stops=null}this.safeRemoveChild(a);for(this.destroyShadows();f&&f.div&&0===f.div.childNodes.length;)a=f.parentGroup,this.safeRemoveChild(f.div),
delete f.div,f=a;this.alignTo&&e(this.renderer.alignedObjects,this);for(c in this)delete this[c];return null},shadow:function(a,f,c){var x=[],z,u,e=this.element,b,l,h,D;if(!a)this.destroyShadows();else if(!this.shadows){l=C(a.width,3);h=(a.opacity||.15)/l;D=this.parentInverted?"(-1,-1)":"("+C(a.offsetX,1)+", "+C(a.offsetY,1)+")";for(z=1;z<=l;z++)u=e.cloneNode(0),b=2*l+1-2*z,t(u,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":h*z,"stroke-width":b,transform:"translate"+D,fill:"none"}),c&&
(t(u,"height",Math.max(t(u,"height")-b,0)),u.cutHeight=b),f?f.element.appendChild(u):e.parentNode.insertBefore(u,e),x.push(u);this.shadows=x}return this},destroyShadows:function(){v(this.shadows||[],function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=C(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));
return a},dSetter:function(a,f,c){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");c.setAttribute(f,a);this[f]=a},dashstyleSetter:function(a){var f,c=this["stroke-width"];"inherit"===c&&(c=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(f=a.length;f--;)a[f]=w(a[f])*
c;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},titleSetter:function(a){var f=this.element.getElementsByTagName("title")[0];f||(f=k.createElementNS(this.SVG_NS,"title"),this.element.appendChild(f));f.firstChild&&f.removeChild(f.firstChild);f.appendChild(k.createTextNode(String(C(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){a!==this.textStr&&
(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,f,c){"string"===typeof a?c.setAttribute(f,a):a&&this.colorGradient(a,f,c)},visibilitySetter:function(a,f,c){"inherit"===a?c.removeAttribute(f):c.setAttribute(f,a)},zIndexSetter:function(a,f){var c=this.renderer,x=this.parentGroup,c=(x||c).element||c.box,z,u,e=this.element,b;z=this.added;var l;n(a)&&(e.zIndex=a,a=+a,this[f]===a&&(z=!1),this[f]=a);if(z){(a=this.zIndex)&&x&&(x.handleZ=!0);x=c.childNodes;
for(l=0;l<x.length&&!b;l++)z=x[l],u=z.zIndex,z!==e&&(w(u)>a||!n(a)&&n(u))&&(c.insertBefore(e,z),b=!0);b||c.appendChild(e)}return b},_defaultSetter:function(a,f,c){c.setAttribute(f,a)}};A.prototype.yGetter=A.prototype.xGetter;A.prototype.translateXSetter=A.prototype.translateYSetter=A.prototype.rotationSetter=A.prototype.verticalAlignSetter=A.prototype.scaleXSetter=A.prototype.scaleYSetter=function(a,f){this[f]=a;this.doTransform=!0};A.prototype.opacitySetter=A.prototype.displaySetter=function(a,f,
c){this[f]=a;c.setAttribute(f,a)};A.prototype["stroke-widthSetter"]=A.prototype.strokeSetter=function(a,f,c){this[f]=a;this.stroke&&this["stroke-width"]?(A.prototype.fillSetter.call(this,this.stroke,"stroke",c),c.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===f&&0===a&&this.hasStroke&&(c.removeAttribute("stroke"),this.hasStroke=!1)};y=a.SVGRenderer=function(){this.init.apply(this,arguments)};y.prototype={Element:A,SVG_NS:z,init:function(a,f,c,x,z,u){var e;x=
this.createElement("svg").attr({version:"1.1","class":"highcharts-root"}).css(this.getStyle(x));e=x.element;a.appendChild(e);-1===a.innerHTML.indexOf("xmlns")&&t(e,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=e;this.boxWrapper=x;this.alignedObjects=[];this.url=(h||H)&&k.getElementsByTagName("base").length?N.location.href.replace(/#.*?$/,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(k.createTextNode("Created with Highcharts 5.0.0"));this.defs=
this.createElement("defs").add();this.allowHTML=u;this.forExport=z;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(f,c,!1);var b;h&&a.getBoundingClientRect&&(this.subPixelFix=f=function(){m(a,{left:0,top:0});b=a.getBoundingClientRect();m(a,{left:Math.ceil(b.left)-b.left+"px",top:Math.ceil(b.top)-b.top+"px"})},f(),E(N,"resize",f))},getStyle:function(a){return this.style=B({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},
a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();b(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.subPixelFix&&J(N,"resize",this.subPixelFix);return this.alignedObjects=null},createElement:function(a){var f=new this.Element;f.init(this,a);return f},draw:I,getRadialAttr:function(a,f){return{cx:a[0]-a[2]/2+f.cx*
a[2],cy:a[1]-a[2]/2+f.cy*a[2],r:f.r*a[2]}},buildText:function(a){for(var f=a.element,u=this,e=u.forExport,b=C(a.textStr,"").toString(),l=-1!==b.indexOf("<"),h=f.childNodes,D,q,F,d,n=t(f,"x"),H=a.styles,r=a.textWidth,J=H&&H.lineHeight,p=H&&H.textShadow,g=H&&"ellipsis"===H.textOverflow,N=h.length,B=r&&!a.added&&this.box,M=function(a){var f;f=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:H&&H.fontSize||u.style.fontSize||12;return J?w(J):u.fontMetrics(f,a).h};N--;)f.removeChild(h[N]);l||p||g||
r||-1!==b.indexOf(" ")?(D=/<.*class="([^"]+)".*>/,q=/<.*style="([^"]+)".*>/,F=/<.*href="(http[^"]+)".*>/,B&&B.appendChild(f),b=l?b.replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">').replace(/<a/g,"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(/<br.*?>/g):[b],b=c(b,function(a){return""!==a}),v(b,function(c,b){var l,h=0;c=c.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");l=c.split("|||");
v(l,function(c){if(""!==c||1===l.length){var C={},w=k.createElementNS(u.SVG_NS,"tspan"),v,J;D.test(c)&&(v=c.match(D)[1],t(w,"class",v));q.test(c)&&(J=c.match(q)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),t(w,"style",J));F.test(c)&&!e&&(t(w,"onclick",'location.href="'+c.match(F)[1]+'"'),m(w,{cursor:"pointer"}));c=(c.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"<").replace(/&gt;/g,">");if(" "!==c){w.appendChild(k.createTextNode(c));h?C.dx=0:b&&null!==n&&(C.x=n);t(w,C);f.appendChild(w);!h&&b&&(!x&&
e&&m(w,{display:"block"}),t(w,"dy",M(w)));if(r){C=c.replace(/([^\^])-/g,"$1- ").split(" ");v="nowrap"===H.whiteSpace;for(var p=1<l.length||b||1<C.length&&!v,N,B,Q=[],T=M(w),I=a.rotation,P=c,y=P.length;(p||g)&&(C.length||Q.length);)a.rotation=0,N=a.getBBox(!0),B=N.width,!x&&u.forExport&&(B=u.measureSpanWidth(w.firstChild.data,a.styles)),N=B>r,void 0===d&&(d=N),g&&d?(y/=2,""===P||!N&&.5>y?C=[]:(P=c.substring(0,P.length+(N?-1:1)*Math.ceil(y)),C=[P+(3<r?"\u2026":"")],w.removeChild(w.firstChild))):N&&
1!==C.length?(w.removeChild(w.firstChild),Q.unshift(C.pop())):(C=Q,Q=[],C.length&&!v&&(w=k.createElementNS(z,"tspan"),t(w,{dy:T,x:n}),J&&t(w,"style",J),f.appendChild(w)),B>r&&(r=B)),C.length&&w.appendChild(k.createTextNode(C.join(" ").replace(/- /g,"-")));a.rotation=I}h++}}})}),d&&a.attr("title",a.textStr),B&&B.removeChild(f),p&&a.applyTextShadow&&a.applyTextShadow(p)):f.appendChild(k.createTextNode(b.replace(/&lt;/g,"<").replace(/&gt;/g,">")))},getContrast:function(a){a=d(a).rgba;return 510<a[0]+
a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,c,x,z,u,e,b,l,h){var D=this.label(a,c,x,h,null,null,null,null,"button"),q=0;D.attr(F({padding:8,r:2},u));var C,w,d,k;u=F({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},u);C=u.style;delete u.style;e=F(u,{fill:"#e6e6e6"},e);w=e.style;delete e.style;b=F(u,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},b);d=b.style;delete b.style;l=F(u,{style:{color:"#cccccc"}},l);k=l.style;delete l.style;
E(D.element,f?"mouseover":"mouseenter",function(){3!==q&&D.setState(1)});E(D.element,f?"mouseout":"mouseleave",function(){3!==q&&D.setState(q)});D.setState=function(a){1!==a&&(D.state=q=a);D.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||0]);D.attr([u,e,b,l][a||0]).css([C,w,d,k][a||0])};D.attr(u).css(B({cursor:"default"},C));return D.on("click",function(a){3!==q&&z.call(D,a)})},crispLine:function(a,f){a[1]===
a[4]&&(a[1]=a[4]=Math.round(a[1])-f%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+f%2/2);return a},path:function(a){var f={fill:"none"};q(a)?f.d=a:u(a)&&B(f,a);return this.createElement("path").attr(f)},circle:function(a,f,c){a=u(a)?a:{x:a,y:f,r:c};f=this.createElement("circle");f.xSetter=f.ySetter=function(a,f,c){c.setAttribute("c"+f,a)};return f.attr(a)},arc:function(a,f,c,x,z,e){u(a)&&(f=a.y,c=a.r,x=a.innerR,z=a.start,e=a.end,a=a.x);a=this.symbol("arc",a||0,f||0,c||0,c||0,{innerR:x||0,start:z||
0,end:e||0});a.r=c;return a},rect:function(a,f,c,x,z,e){z=u(a)?a.r:z;var b=this.createElement("rect");a=u(a)?a:void 0===a?{}:{x:a,y:f,width:Math.max(c,0),height:Math.max(x,0)};void 0!==e&&(a.strokeWidth=e,a=b.crisp(a));a.fill="none";z&&(a.r=z);b.rSetter=function(a,f,c){t(c,{rx:a,ry:a})};return b.attr(a)},setSize:function(a,f,c){var x=this.alignedObjects,z=x.length;this.width=a;this.height=f;for(this.boxWrapper.animate({width:a,height:f},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+
" "+this.attr("height")})},duration:C(c,!0)?void 0:0});z--;)x[z].align()},g:function(a){var f=this.createElement("g");return a?f.attr({"class":"highcharts-"+a}):f},image:function(a,f,c,x,z){var u={preserveAspectRatio:"none"};1<arguments.length&&B(u,{x:f,y:c,width:x,height:z});u=this.createElement("image").attr(u);u.element.setAttributeNS?u.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):u.element.setAttribute("hc-svg-href",a);return u},symbol:function(a,f,c,x,z,u){var e=this,b,l=this.symbols[a],
D=n(f)&&l&&l(Math.round(f),Math.round(c),x,z,u),h=/^url\((.*?)\)$/,q,w,d={};l?(b=this.path(D),b.attr("fill","none"),B(b,{symbolName:a,x:f,y:c,width:x,height:z}),u&&B(b,u)):h.test(a)&&(q=a.match(h)[1],b=this.image(q),b.imgwidth=C(d[q]&&d[q].width,u&&u.width),b.imgheight=C(d[q]&&d[q].height,u&&u.height),w=function(){b.attr({width:b.width,height:b.height})},v(["width","height"],function(a){b[a+"Setter"]=function(a,f){var c={},x=this["img"+f];this[f]=a;n(x)&&(this.element&&this.element.setAttribute(f,
x),this.alignByTranslate||(c["width"===f?"translateX":"translateY"]=(this[f]-x)/2,this.attr(c)))}}),n(f)&&b.attr({x:f,y:c}),b.isImg=!0,n(b.imgwidth)&&n(b.imgheight)?w():(b.attr({width:0,height:0}),r("img",{onload:function(){var a=g[e.chartIndex];0===this.width&&(m(this,{position:"absolute",top:"-999em"}),k.body.appendChild(this));d[q]={width:this.width,height:this.height};b.imgwidth=this.width;b.imgheight=this.height;b.element&&w();this.parentNode&&this.parentNode.removeChild(this);e.imgCount--;if(!e.imgCount&&
a&&a.onload)a.onload()},src:q}),this.imgCount++));return b},symbols:{circle:function(a,f,c,x){var z=.166*c;return["M",a+c/2,f,"C",a+c+z,f,a+c+z,f+x,a+c/2,f+x,"C",a-z,f+x,a-z,f,a+c/2,f,"Z"]},square:function(a,f,c,x){return["M",a,f,"L",a+c,f,a+c,f+x,a,f+x,"Z"]},triangle:function(a,f,c,x){return["M",a+c/2,f,"L",a+c,f+x,a,f+x,"Z"]},"triangle-down":function(a,f,c,x){return["M",a,f,"L",a+c,f,a+c/2,f+x,"Z"]},diamond:function(a,f,c,x){return["M",a+c/2,f,"L",a+c,f+x/2,a+c/2,f+x,a,f+x/2,"Z"]},arc:function(a,
f,c,x,z){var u=z.start;c=z.r||c||x;var b=z.end-.001;x=z.innerR;var e=z.open,l=Math.cos(u),D=Math.sin(u),h=Math.cos(b),b=Math.sin(b);z=z.end-u<Math.PI?0:1;return["M",a+c*l,f+c*D,"A",c,c,0,z,1,a+c*h,f+c*b,e?"M":"L",a+x*h,f+x*b,"A",x,x,0,z,0,a+x*l,f+x*D,e?"":"Z"]},callout:function(a,f,c,x,z){var u=Math.min(z&&z.r||0,c,x),b=u+6,e=z&&z.anchorX;z=z&&z.anchorY;var l;l=["M",a+u,f,"L",a+c-u,f,"C",a+c,f,a+c,f,a+c,f+u,"L",a+c,f+x-u,"C",a+c,f+x,a+c,f+x,a+c-u,f+x,"L",a+u,f+x,"C",a,f+x,a,f+x,a,f+x-u,"L",a,f+u,
"C",a,f,a,f,a+u,f];e&&e>c&&z>f+b&&z<f+x-b?l.splice(13,3,"L",a+c,z-6,a+c+6,z,a+c,z+6,a+c,f+x-u):e&&0>e&&z>f+b&&z<f+x-b?l.splice(33,3,"L",a,z+6,a-6,z,a,z-6,a,f+u):z&&z>x&&e>a+b&&e<a+c-b?l.splice(23,3,"L",e+6,f+x,e,f+x+6,e-6,f+x,a+u,f+x):z&&0>z&&e>a+b&&e<a+c-b&&l.splice(3,3,"L",e-6,f,e,f-6,e+6,f,c-u,f);return l}},clipRect:function(f,c,x,z){var u="highcharts-"+a.idCounter++,b=this.createElement("clipPath").attr({id:u}).add(this.defs);f=this.rect(f,c,x,z,0).add(b);f.id=u;f.clipPath=b;f.count=0;return f},
text:function(a,f,c,z){var u=!x&&this.forExport,b={};if(z&&(this.allowHTML||!this.forExport))return this.html(a,f,c);b.x=Math.round(f||0);c&&(b.y=Math.round(c));if(a||0===a)b.text=a;a=this.createElement("text").attr(b);u&&a.css({position:"absolute"});z||(a.xSetter=function(a,f,c){var x=c.getElementsByTagName("tspan"),z,u=c.getAttribute(f),b;for(b=0;b<x.length;b++)z=x[b],z.getAttribute(f)===u&&z.setAttribute(f,a);c.setAttribute(f,a)});return a},fontMetrics:function(a,f){var c;a=a||this.style&&this.style.fontSize;
a=/px/.test(a)?w(a):/em/.test(a)?12*parseFloat(a):12;c=24>a?a+3:Math.round(1.2*a);return{h:c,b:Math.round(.8*c),f:a}},rotCorr:function(a,f,c){var x=a;f&&c&&(x=Math.max(x*Math.cos(f*p),4));return{x:-a/3*Math.sin(f*p),y:x}},label:function(a,f,c,x,z,u,b,e,l){var D=this,h=D.g("button"!==l&&"label"),q=h.text=D.text("",0,0,b).attr({zIndex:1}),C,w,d=0,k=3,H=0,r,p,g,N,m,M={},I,t,y=/^url\((.*?)\)$/.test(x),E=y,G,K,X,V;l&&h.addClass("highcharts-"+l);E=y;G=function(){return(I||0)%2/2};K=function(){var a=q.element.style,
f={};w=(void 0===r||void 0===p||m)&&n(q.textStr)&&q.getBBox();h.width=(r||w.width||0)+2*k+H;h.height=(p||w.height||0)+2*k;t=k+D.fontMetrics(a&&a.fontSize,q).b;E&&(C||(h.box=C=D.symbols[x]||y?D.symbol(x):D.rect(),C.addClass(("button"===l?"":"highcharts-label-box")+(l?" highcharts-"+l+"-box":"")),C.add(h),a=G(),f.x=a,f.y=(e?-t:0)+a),f.width=Math.round(h.width),f.height=Math.round(h.height),C.attr(B(f,M)),M={})};X=function(){var a=H+k,f;f=e?0:t;n(r)&&w&&("center"===m||"right"===m)&&(a+={center:.5,right:1}[m]*
(r-w.width));if(a!==q.x||f!==q.y)q.attr("x",a),void 0!==f&&q.attr("y",f);q.x=a;q.y=f};V=function(a,f){C?C.attr(a,f):M[a]=f};h.onAdd=function(){q.add(h);h.attr({text:a||0===a?a:"",x:f,y:c});C&&n(z)&&h.attr({anchorX:z,anchorY:u})};h.widthSetter=function(a){r=a};h.heightSetter=function(a){p=a};h["text-alignSetter"]=function(a){m=a};h.paddingSetter=function(a){n(a)&&a!==k&&(k=h.padding=a,X())};h.paddingLeftSetter=function(a){n(a)&&a!==H&&(H=a,X())};h.alignSetter=function(a){a={left:0,center:.5,right:1}[a];
a!==d&&(d=a,w&&h.attr({x:g}))};h.textSetter=function(a){void 0!==a&&q.textSetter(a);K();X()};h["stroke-widthSetter"]=function(a,f){a&&(E=!0);I=this["stroke-width"]=a;V(f,a)};h.strokeSetter=h.fillSetter=h.rSetter=function(a,f){"fill"===f&&a&&(E=!0);V(f,a)};h.anchorXSetter=function(a,f){z=a;V(f,Math.round(a)-G()-g)};h.anchorYSetter=function(a,f){u=a;V(f,a-N)};h.xSetter=function(a){h.x=a;d&&(a-=d*((r||w.width)+2*k));g=Math.round(a);h.attr("translateX",g)};h.ySetter=function(a){N=h.y=Math.round(a);h.attr("translateY",
N)};var ba=h.css;return B(h,{css:function(a){if(a){var f={};a=F(a);v(h.textProps,function(c){void 0!==a[c]&&(f[c]=a[c],delete a[c])});q.css(f)}return ba.call(h,a)},getBBox:function(){return{width:w.width+2*k,height:w.height+2*k,x:w.x-k,y:w.y-k}},shadow:function(a){a&&(K(),C&&C.shadow(a));return h},destroy:function(){J(h.element,"mouseenter");J(h.element,"mouseleave");q&&(q=q.destroy());C&&(C=C.destroy());A.prototype.destroy.call(h);h=D=K=X=V=null}})}};a.Renderer=y})(K);(function(a){var A=a.attr,y=
a.createElement,E=a.css,G=a.defined,t=a.each,g=a.extend,d=a.isFirefox,m=a.isMS,r=a.isWebKit,n=a.pInt,p=a.SVGRenderer,b=a.win,k=a.wrap;g(a.SVGElement.prototype,{htmlCss:function(a){var b=this.element;if(b=a&&"SPAN"===b.tagName&&a.width)delete a.width,this.textWidth=b,this.updateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=g(this.styles,a);E(this.element,a);return this},htmlGetBBox:function(){var a=this.element;"text"===a.nodeName&&(a.style.position=
"absolute");return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,b=this.element,e=this.translateX||0,c=this.translateY||0,l=this.x||0,q=this.y||0,h=this.textAlign||"left",f={left:0,center:.5,right:1}[h],u=this.styles;E(b,{marginLeft:e,marginTop:c});this.shadows&&t(this.shadows,function(a){E(a,{marginLeft:e+1,marginTop:c+1})});this.inverted&&t(b.childNodes,function(f){a.invertChild(f,b)});if("SPAN"===b.tagName){var D=
this.rotation,d=n(this.textWidth),k=u&&u.whiteSpace,p=[D,h,b.innerHTML,this.textWidth,this.textAlign].join();p!==this.cTT&&(u=a.fontMetrics(b.style.fontSize).b,G(D)&&this.setSpanRotation(D,f,u),E(b,{width:"",whiteSpace:k||"nowrap"}),b.offsetWidth>d&&/[ \-]/.test(b.textContent||b.innerText)&&E(b,{width:d+"px",display:"block",whiteSpace:k||"normal"}),this.getSpanCorrection(b.offsetWidth,u,f,D,h));E(b,{left:l+(this.xCorr||0)+"px",top:q+(this.yCorr||0)+"px"});r&&(u=b.offsetHeight);this.cTT=p}}else this.alignOnAdd=
!0},setSpanRotation:function(a,k,e){var c={},l=m?"-ms-transform":r?"-webkit-transform":d?"MozTransform":b.opera?"-o-transform":"";c[l]=c.transform="rotate("+a+"deg)";c[l+(d?"Origin":"-origin")]=c.transformOrigin=100*k+"% "+e+"px";E(this.element,c)},getSpanCorrection:function(a,b,e){this.xCorr=-a*e;this.yCorr=-b}});g(p.prototype,{html:function(a,b,e){var c=this.createElement("span"),l=c.element,q=c.renderer,h=q.isSVG,f=function(a,f){t(["display","opacity","visibility"],function(c){k(a,c+"Setter",function(a,
c,b,u){a.call(this,c,b,u);f[b]=c})})};c.textSetter=function(a){a!==l.innerHTML&&delete this.bBox;l.innerHTML=this.textStr=a;c.htmlUpdateTransform()};h&&f(c,c.element.style);c.xSetter=c.ySetter=c.alignSetter=c.rotationSetter=function(a,f){"align"===f&&(f="textAlign");c[f]=a;c.htmlUpdateTransform()};c.attr({text:a,x:Math.round(b),y:Math.round(e)}).css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize,position:"absolute"});l.style.whiteSpace="nowrap";c.css=c.htmlCss;h&&(c.add=function(a){var b,
e=q.box.parentNode,h=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)h.push(a),a=a.parentGroup;t(h.reverse(),function(a){var c,u=A(a.element,"class");u&&(u={className:u});b=a.div=a.div||y("div",u,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},b||e);c=b.style;g(a,{translateXSetter:function(f,b){c.left=f+"px";a[b]=f;a.doTransform=!0},translateYSetter:function(f,b){c.top=f+"px";a[b]=f;a.doTransform=
!0}});f(a,c)})}}else b=e;b.appendChild(l);c.added=!0;c.alignOnAdd&&c.htmlUpdateTransform();return c});return c}})})(K);(function(a){var A,y,E=a.createElement,G=a.css,t=a.defined,g=a.deg2rad,d=a.discardElement,m=a.doc,r=a.each,n=a.erase,p=a.extend;A=a.extendClass;var b=a.isArray,k=a.isNumber,v=a.isObject,B=a.merge;y=a.noop;var e=a.pick,c=a.pInt,l=a.SVGElement,q=a.SVGRenderer,h=a.win;a.svg||(y={docMode8:m&&8===m.documentMode,init:function(a,c){var b=["<",c,' filled="f" stroked="f"'],e=["position: ",
"absolute",";"],h="div"===c;("shape"===c||h)&&e.push("left:0;top:0;width:1px;height:1px;");e.push("visibility: ",h?"hidden":"visible");b.push(' style="',e.join(""),'"/>');c&&(b=h||"span"===c||"img"===c?b.join(""):a.prepVML(b),this.element=E(b));this.renderer=a},add:function(a){var c=this.renderer,b=this.element,e=c.box,h=a&&a.inverted,e=a?a.element||a:e;a&&(this.parentGroup=a);h&&c.invertChild(b,e);e.appendChild(b);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();
if(this.onAdd)this.onAdd();this.className&&this.attr("class",this.className);return this},updateTransform:l.prototype.htmlUpdateTransform,setSpanRotation:function(){var a=this.rotation,c=Math.cos(a*g),b=Math.sin(a*g);G(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11=",c,", M12=",-b,", M21=",b,", M22=",c,", sizingMethod='auto expand')"].join(""):"none"})},getSpanCorrection:function(a,c,b,h,l){var q=h?Math.cos(h*g):1,d=h?Math.sin(h*g):0,w=e(this.elemHeight,this.element.offsetHeight),
k;this.xCorr=0>q&&-a;this.yCorr=0>d&&-w;k=0>q*d;this.xCorr+=d*c*(k?1-b:b);this.yCorr-=q*c*(h?k?b:1-b:1);l&&"left"!==l&&(this.xCorr-=a*b*(0>q?-1:1),h&&(this.yCorr-=w*b*(0>d?-1:1)),G(this.element,{textAlign:l}))},pathToVML:function(a){for(var c=a.length,b=[];c--;)k(a[c])?b[c]=Math.round(10*a[c])-5:"Z"===a[c]?b[c]="x":(b[c]=a[c],!a.isArc||"wa"!==a[c]&&"at"!==a[c]||(b[c+5]===b[c+7]&&(b[c+7]+=a[c+7]>a[c+5]?1:-1),b[c+6]===b[c+8]&&(b[c+8]+=a[c+8]>a[c+6]?1:-1)));return b.join(" ")||"x"},clip:function(a){var c=
this,b;a?(b=a.members,n(b,c),b.push(c),c.destroyClip=function(){n(b,c)},a=a.getCSS(c)):(c.destroyClip&&c.destroyClip(),a={clip:c.docMode8?"inherit":"rect(auto)"});return c.css(a)},css:l.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&d(a)},destroy:function(){this.destroyClip&&this.destroyClip();return l.prototype.destroy.apply(this)},on:function(a,c){this.element["on"+a]=function(){var a=h.event;a.target=a.srcElement;c(a)};return this},cutOffPath:function(a,b){var e;a=a.split(/[ ,]/);
e=a.length;if(9===e||11===e)a[e-4]=a[e-2]=c(a[e-2])-10*b;return a.join(" ")},shadow:function(a,b,h){var l=[],q,d=this.element,k=this.renderer,w,n=d.style,r,x=d.path,z,p,v,g;x&&"string"!==typeof x.value&&(x="x");p=x;if(a){v=e(a.width,3);g=(a.opacity||.15)/v;for(q=1;3>=q;q++)z=2*v+1-2*q,h&&(p=this.cutOffPath(x.value,z+.5)),r=['<shape isShadow="true" strokeweight="',z,'" filled="false" path="',p,'" coordsize="10 10" style="',d.style.cssText,'" />'],w=E(k.prepVML(r),null,{left:c(n.left)+e(a.offsetX,1),
top:c(n.top)+e(a.offsetY,1)}),h&&(w.cutOff=z+1),r=['<stroke color="',a.color||"#000000",'" opacity="',g*q,'"/>'],E(k.prepVML(r),null,null,w),b?b.element.appendChild(w):d.parentNode.insertBefore(w,d),l.push(w);this.shadows=l}return this},updateShadows:y,setAttr:function(a,c){this.docMode8?this.element[a]=c:this.element.setAttribute(a,c)},classSetter:function(a){(this.added?this.element:this).className=a},dashstyleSetter:function(a,c,b){(b.getElementsByTagName("stroke")[0]||E(this.renderer.prepVML(["<stroke/>"]),
null,null,b))[c]=a||"solid";this[c]=a},dSetter:function(a,c,b){var e=this.shadows;a=a||[];this.d=a.join&&a.join(" ");b.path=a=this.pathToVML(a);if(e)for(b=e.length;b--;)e[b].path=e[b].cutOff?this.cutOffPath(a,e[b].cutOff):a;this.setAttr(c,a)},fillSetter:function(a,c,b){var e=b.nodeName;"SPAN"===e?b.style.color=a:"IMG"!==e&&(b.filled="none"!==a,this.setAttr("fillcolor",this.renderer.color(a,b,c,this)))},"fill-opacitySetter":function(a,c,b){E(this.renderer.prepVML(["<",c.split("-")[0],' opacity="',
a,'"/>']),null,null,b)},opacitySetter:y,rotationSetter:function(a,c,b){b=b.style;this[c]=b[c]=a;b.left=-Math.round(Math.sin(a*g)+1)+"px";b.top=Math.round(Math.cos(a*g))+"px"},strokeSetter:function(a,c,b){this.setAttr("strokecolor",this.renderer.color(a,b,c,this))},"stroke-widthSetter":function(a,c,b){b.stroked=!!a;this[c]=a;k(a)&&(a+="px");this.setAttr("strokeweight",a)},titleSetter:function(a,c){this.setAttr(c,a)},visibilitySetter:function(a,c,b){"inherit"===a&&(a="visible");this.shadows&&r(this.shadows,
function(b){b.style[c]=a});"DIV"===b.nodeName&&(a="hidden"===a?"-999em":0,this.docMode8||(b.style[c]=a?"visible":"hidden"),c="top");b.style[c]=a},displaySetter:function(a,c,b){b.style[c]=a},xSetter:function(a,c,b){this[c]=a;"x"===c?c="left":"y"===c&&(c="top");this.updateClipping?(this[c]=a,this.updateClipping()):b.style[c]=a},zIndexSetter:function(a,c,b){b.style[c]=a}},y["stroke-opacitySetter"]=y["fill-opacitySetter"],a.VMLElement=y=A(l,y),y.prototype.ySetter=y.prototype.widthSetter=y.prototype.heightSetter=
y.prototype.xSetter,y={Element:y,isIE8:-1<h.navigator.userAgent.indexOf("MSIE 8.0"),init:function(a,c,b){var e,h;this.alignedObjects=[];e=this.createElement("div").css({position:"relative"});h=e.element;a.appendChild(e.element);this.isVML=!0;this.box=h;this.boxWrapper=e;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(c,b,!1);if(!m.namespaces.hcv){m.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{m.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(l){m.styleSheets[0].cssText+=
"hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,c,b,e){var h=this.createElement(),l=v(a);return p(h,{members:[],count:0,left:(l?a.x:a)+1,top:(l?a.y:c)+1,width:(l?a.width:b)-1,height:(l?a.height:e)-1,getCSS:function(a){var c=a.element,f=c.nodeName,b=a.inverted,x=this.top-("shape"===f?c.offsetTop:0),z=this.left,c=z+this.width,e=x+this.height,x={clip:"rect("+Math.round(b?
z:x)+"px,"+Math.round(b?e:c)+"px,"+Math.round(b?c:e)+"px,"+Math.round(b?x:z)+"px)"};!b&&a.docMode8&&"DIV"===f&&p(x,{width:c+"px",height:e+"px"});return x},updateClipping:function(){r(h.members,function(a){a.element&&a.css(h.getCSS(a))})}})},color:function(c,b,e,h){var l=this,q,d=/^rgba/,k,n,p="none";c&&c.linearGradient?n="gradient":c&&c.radialGradient&&(n="pattern");if(n){var x,z,v=c.linearGradient||c.radialGradient,g,m,L,B,t,Q="";c=c.stops;var P,Y=[],y=function(){k=['<fill colors="'+Y.join(",")+
'" opacity="',L,'" o:opacity2="',m,'" type="',n,'" ',Q,'focus="100%" method="any" />'];E(l.prepVML(k),null,null,b)};g=c[0];P=c[c.length-1];0<g[0]&&c.unshift([0,g[1]]);1>P[0]&&c.push([1,P[1]]);r(c,function(c,f){d.test(c[1])?(q=a.color(c[1]),x=q.get("rgb"),z=q.get("a")):(x=c[1],z=1);Y.push(100*c[0]+"% "+x);f?(L=z,B=x):(m=z,t=x)});if("fill"===e)if("gradient"===n)e=v.x1||v[0]||0,c=v.y1||v[1]||0,g=v.x2||v[2]||0,v=v.y2||v[3]||0,Q='angle="'+(90-180*Math.atan((v-c)/(g-e))/Math.PI)+'"',y();else{var p=v.r,
A=2*p,G=2*p,Z=v.cx,aa=v.cy,W=b.radialReference,U,p=function(){W&&(U=h.getBBox(),Z+=(W[0]-U.x)/U.width-.5,aa+=(W[1]-U.y)/U.height-.5,A*=W[2]/U.width,G*=W[2]/U.height);Q='src="'+a.getOptions().global.VMLRadialGradientURL+'" size="'+A+","+G+'" origin="0.5,0.5" position="'+Z+","+aa+'" color2="'+t+'" ';y()};h.added?p():h.onAdd=p;p=B}else p=x}else d.test(c)&&"IMG"!==b.tagName?(q=a.color(c),h[e+"-opacitySetter"](q.get("a"),e,b),p=q.get("rgb")):(p=b.getElementsByTagName(e),p.length&&(p[0].opacity=1,p[0].type=
"solid"),p=c);return p},prepVML:function(a){var c=this.isIE8;a=a.join("");c?(a=a.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />'),a=-1===a.indexOf('style="')?a.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):a.replace('style="','style="display:inline-block;behavior:url(#default#VML);')):a=a.replace("<","<hcv:");return a},text:q.prototype.html,path:function(a){var c={coordsize:"10 10"};b(a)?c.d=a:v(a)&&p(c,a);return this.createElement("shape").attr(c)},circle:function(a,
c,b){var e=this.symbol("circle");v(a)&&(b=a.r,c=a.y,a=a.x);e.isCircle=!0;e.r=b;return e.attr({x:a,y:c})},g:function(a){var c;a&&(c={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement("div").attr(c)},image:function(a,c,b,e,h){var l=this.createElement("img").attr({src:a});1<arguments.length&&l.attr({x:c,y:b,width:e,height:h});return l},createElement:function(a){return"rect"===a?this.symbol(a):q.prototype.createElement.call(this,a)},invertChild:function(a,b){var e=this,h=b.style,
l="IMG"===a.tagName&&a.style;G(a,{flip:"x",left:c(h.width)-(l?c(l.top):1),top:c(h.height)-(l?c(l.left):1),rotation:-90});r(a.childNodes,function(c){e.invertChild(c,a)})},symbols:{arc:function(a,c,b,e,h){var l=h.start,q=h.end,d=h.r||b||e;b=h.innerR;e=Math.cos(l);var k=Math.sin(l),n=Math.cos(q),x=Math.sin(q);if(0===q-l)return["x"];l=["wa",a-d,c-d,a+d,c+d,a+d*e,c+d*k,a+d*n,c+d*x];h.open&&!b&&l.push("e","M",a,c);l.push("at",a-b,c-b,a+b,c+b,a+b*n,c+b*x,a+b*e,c+b*k,"x","e");l.isArc=!0;return l},circle:function(a,
c,b,e,h){h&&t(h.r)&&(b=e=2*h.r);h&&h.isCircle&&(a-=b/2,c-=e/2);return["wa",a,c,a+b,c+e,a+b,c+e/2,a+b,c+e/2,"e"]},rect:function(a,c,b,e,h){return q.prototype.symbols[t(h)&&h.r?"callout":"square"].call(0,a,c,b,e,h)}}},a.VMLRenderer=A=function(){this.init.apply(this,arguments)},A.prototype=B(q.prototype,y),a.Renderer=A);q.prototype.measureSpanWidth=function(a,c){var b=m.createElement("span"),e;e=m.createTextNode(a);b.appendChild(e);G(b,c);this.box.appendChild(b);e=b.offsetWidth;d(b);return e}})(K);(function(a){function A(){var m=
a.defaultOptions.global,r,n=m.useUTC,p=n?"getUTC":"get",b=n?"setUTC":"set";a.Date=r=m.Date||d.Date;r.hcTimezoneOffset=n&&m.timezoneOffset;r.hcGetTimezoneOffset=n&&m.getTimezoneOffset;r.hcMakeTime=function(a,b,d,e,c,l){var q;n?(q=r.UTC.apply(0,arguments),q+=G(q)):q=(new r(a,b,g(d,1),g(e,0),g(c,0),g(l,0))).getTime();return q};E("Minutes Hours Day Date Month FullYear".split(" "),function(a){r["hcGet"+a]=p+a});E("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "),function(a){r["hcSet"+
a]=b+a})}var y=a.color,E=a.each,G=a.getTZOffset,t=a.merge,g=a.pick,d=a.win;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0,VMLRadialGradientURL:"http://code.highcharts.com@product.cdnpath@/5.0.0/gfx/vml-radial-gradient.png"},chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},
title:{text:"Chart title",align:"center",margin:15,style:{color:"#333333",fontSize:"18px"},widthAdjust:-44},subtitle:{text:"",align:"center",style:{color:"#666666"},widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold"},
itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",
second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:y("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:'<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",
pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(d){a.defaultOptions=t(!0,a.defaultOptions,d);A();return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;A()})(K);(function(a){var A=a.arrayMax,y=a.arrayMin,E=a.defined,G=a.destroyObjectProperties,
t=a.each,g=a.erase,d=a.merge,m=a.pick;a.PlotLineOrBand=function(a,d){this.axis=a;d&&(this.options=d,this.id=d.id)};a.PlotLineOrBand.prototype={render:function(){var a=this,n=a.axis,p=n.horiz,b=a.options,k=b.label,v=a.label,g=b.to,e=b.from,c=b.value,l=E(e)&&E(g),q=E(c),h=a.svgElem,f=!h,u=[],D,H=b.color,F=m(b.zIndex,0),t=b.events,u={"class":"highcharts-plot-"+(l?"band ":"line ")+(b.className||"")},C={},w=n.chart.renderer,J=l?"bands":"lines",M=n.log2lin;n.isLog&&(e=M(e),g=M(g),c=M(c));q?(u={stroke:H,
"stroke-width":b.width},b.dashStyle&&(u.dashstyle=b.dashStyle)):l&&(H&&(u.fill=H),b.borderWidth&&(u.stroke=b.borderColor,u["stroke-width"]=b.borderWidth));C.zIndex=F;J+="-"+F;(H=n[J])||(n[J]=H=w.g("plot-"+J).attr(C).add());f&&(a.svgElem=h=w.path().attr(u).add(H));if(q)u=n.getPlotLinePath(c,h.strokeWidth());else if(l)u=n.getPlotBandPath(e,g,b);else return;if(f&&u&&u.length){if(h.attr({d:u}),t)for(D in b=function(c){h.on(c,function(b){t[c].apply(a,[b])})},t)b(D)}else h&&(u?(h.show(),h.animate({d:u})):
(h.hide(),v&&(a.label=v=v.destroy())));k&&E(k.text)&&u&&u.length&&0<n.width&&0<n.height&&!u.flat?(k=d({align:p&&l&&"center",x:p?!l&&4:10,verticalAlign:!p&&l&&"middle",y:p?l?16:10:l?6:-4,rotation:p&&!l&&90},k),this.renderLabel(k,u,l,F)):v&&v.hide();return a},renderLabel:function(a,d,p,b){var k=this.label,v=this.axis.chart.renderer;k||(k={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(p?"band":"line")+"-label "+(a.className||"")},k.zIndex=b,this.label=k=v.text(a.text,0,0,
a.useHTML).attr(k).add(),k.css(a.style));b=[d[1],d[4],p?d[6]:d[1]];d=[d[2],d[5],p?d[7]:d[2]];p=y(b);v=y(d);k.align(a,!1,{x:p,y:v,width:A(b)-p,height:A(d)-v});k.show()},destroy:function(){g(this.axis.plotLinesAndBands,this);delete this.axis;G(this)}};a.AxisPlotLineOrBandExtension={getPlotBandPath:function(a,d){var p=this.getPlotLinePath(d,null,null,!0),b=this.getPlotLinePath(a,null,null,!0);b&&p?(b.flat=b.toString()===p.toString(),b.push(p[4],p[5],p[1],p[2])):b=null;return b},addPlotBand:function(a){return this.addPlotBandOrLine(a,
"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(d,n){var p=(new a.PlotLineOrBand(this,d)).render(),b=this.userOptions;p&&(n&&(b[n]=b[n]||[],b[n].push(d)),this.plotLinesAndBands.push(p));return p},removePlotBandOrLine:function(a){for(var d=this.plotLinesAndBands,p=this.options,b=this.userOptions,k=d.length;k--;)d[k].id===a&&d[k].destroy();t([p.plotLines||[],b.plotLines||[],p.plotBands||[],b.plotBands||[]],function(b){for(k=b.length;k--;)b[k].id===
a&&g(b,b[k])})}}})(K);(function(a){var A=a.correctFloat,y=a.defined,E=a.destroyObjectProperties,G=a.isNumber,t=a.merge,g=a.pick,d=a.stop,m=a.deg2rad;a.Tick=function(a,d,p,b){this.axis=a;this.pos=d;this.type=p||"";this.isNew=!0;p||b||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,d=a.options,p=a.chart,b=a.categories,k=a.names,v=this.pos,m=d.labels,e=a.tickPositions,c=v===e[0],l=v===e[e.length-1],k=b?g(b[v],k[v],v):v,b=this.label,e=e.info,q;a.isDatetimeAxis&&e&&(q=d.dateTimeLabelFormats[e.higherRanks[v]||
e.unitName]);this.isFirst=c;this.isLast=l;d=a.labelFormatter.call({axis:a,chart:p,isFirst:c,isLast:l,dateTimeLabelFormat:q,value:a.isLog?A(a.lin2log(k)):k});y(b)?b&&b.attr({text:d}):(this.labelLength=(this.label=b=y(d)&&m.enabled?p.renderer.text(d,0,0,m.useHTML).css(t(m.style)).add(a.labelGroup):null)&&b.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var d=this.axis,p=a.x,b=d.chart.chartWidth,
k=d.chart.spacing,v=g(d.labelLeft,Math.min(d.pos,k[3])),k=g(d.labelRight,Math.max(d.pos+d.len,b-k[1])),B=this.label,e=this.rotation,c={left:0,center:.5,right:1}[d.labelAlign],l=B.getBBox().width,q=d.getSlotWidth(),h=q,f=1,u,D={};if(e)0>e&&p-c*l<v?u=Math.round(p/Math.cos(e*m)-v):0<e&&p+c*l>k&&(u=Math.round((b-p)/Math.cos(e*m)));else if(b=p+(1-c)*l,p-c*l<v?h=a.x+h*(1-c)-v:b>k&&(h=k-a.x+h*c,f=-1),h=Math.min(q,h),h<q&&"center"===d.labelAlign&&(a.x+=f*(q-h-c*(q-Math.min(l,h)))),l>h||d.autoRotation&&(B.styles||
{}).width)u=h;u&&(D.width=u,(d.options.labels.style||{}).textOverflow||(D.textOverflow="ellipsis"),B.css(D))},getPosition:function(a,d,p,b){var k=this.axis,v=k.chart,g=b&&v.oldChartHeight||v.chartHeight;return{x:a?k.translate(d+p,null,null,b)+k.transB:k.left+k.offset+(k.opposite?(b&&v.oldChartWidth||v.chartWidth)-k.right-k.left:0),y:a?g-k.bottom+k.offset-(k.opposite?k.height:0):g-k.translate(d+p,null,null,b)-k.transB}},getLabelPosition:function(a,d,p,b,k,v,g,e){var c=this.axis,l=c.transA,q=c.reversed,
h=c.staggerLines,f=c.tickRotCorr||{x:0,y:0},u=k.y;y(u)||(u=0===c.side?p.rotation?-8:-p.getBBox().height:2===c.side?f.y+8:Math.cos(p.rotation*m)*(f.y-p.getBBox(!1,0).height/2));a=a+k.x+f.x-(v&&b?v*l*(q?-1:1):0);d=d+u-(v&&!b?v*l*(q?1:-1):0);h&&(p=g/(e||1)%h,c.opposite&&(p=h-p-1),d+=c.labelOffset/h*p);return{x:a,y:Math.round(d)}},getMarkPath:function(a,d,p,b,k,v){return v.crispLine(["M",a,d,"L",a+(k?0:-p),d+(k?p:0)],b)},render:function(a,n,p){var b=this.axis,k=b.options,v=b.chart.renderer,m=b.horiz,
e=this.type,c=this.label,l=this.pos,q=k.labels,h=this.gridLine,f=e?e+"Tick":"tick",u=b.tickSize(f),D=this.mark,H=!D,F=q.step,t={},C=!0,w=b.tickmarkOffset,J=this.getPosition(m,l,w,n),M=J.x,J=J.y,x=m&&M===b.pos+b.len||!m&&J===b.pos?-1:1,z=e?e+"Grid":"grid",N=k[z+"LineWidth"],O=k[z+"LineColor"],S=k[z+"LineDashStyle"],z=g(k[f+"Width"],!e&&b.isXAxis?1:0),f=k[f+"Color"];p=g(p,1);this.isActive=!0;h||(t.stroke=O,t["stroke-width"]=N,S&&(t.dashstyle=S),e||(t.zIndex=1),n&&(t.opacity=0),this.gridLine=h=v.path().attr(t).addClass("highcharts-"+
(e?e+"-":"")+"grid-line").add(b.gridGroup));if(!n&&h&&(l=b.getPlotLinePath(l+w,h.strokeWidth()*x,n,!0)))h[this.isNew?"attr":"animate"]({d:l,opacity:p});u&&(b.opposite&&(u[0]=-u[0]),H&&(this.mark=D=v.path().addClass("highcharts-"+(e?e+"-":"")+"tick").add(b.axisGroup),D.attr({stroke:f,"stroke-width":z})),D[H?"attr":"animate"]({d:this.getMarkPath(M,J,u[0],D.strokeWidth()*x,m,v),opacity:p}));c&&G(M)&&(c.xy=J=this.getLabelPosition(M,J,c,m,q,w,a,F),this.isFirst&&!this.isLast&&!g(k.showFirstLabel,1)||this.isLast&&
!this.isFirst&&!g(k.showLastLabel,1)?C=!1:!m||b.isRadial||q.step||q.rotation||n||0===p||this.handleOverflow(J),F&&a%F&&(C=!1),C&&G(J.y)?(J.opacity=p,c[this.isNew?"attr":"animate"](J)):(d(c),c.attr("y",-9999)),this.isNew=!1)},destroy:function(){E(this,this.axis)}}})(K);(function(a){var A=a.addEvent,y=a.animObject,E=a.arrayMax,G=a.arrayMin,t=a.AxisPlotLineOrBandExtension,g=a.color,d=a.correctFloat,m=a.defaultOptions,r=a.defined,n=a.deg2rad,p=a.destroyObjectProperties,b=a.each,k=a.error,v=a.extend,B=
a.fireEvent,e=a.format,c=a.getMagnitude,l=a.grep,q=a.inArray,h=a.isArray,f=a.isNumber,u=a.isString,D=a.merge,H=a.normalizeTickInterval,F=a.pick,I=a.PlotLineOrBand,C=a.removeEvent,w=a.splat,J=a.syncTimeout,M=a.Tick;a.Axis=function(){this.init.apply(this,arguments)};a.Axis.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,style:{color:"#666666",
cursor:"default",fontSize:"11px"},x:0},minPadding:.01,maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,
labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textShadow:"1px 1px contrast, -1px -1px contrast, -1px 1px contrast, 1px -1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],
x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,c){var b=c.isX;this.chart=a;this.horiz=a.inverted?!b:b;this.isXAxis=b;this.coll=this.coll||(b?"xAxis":"yAxis");this.opposite=c.opposite;this.side=c.side||(this.horiz?this.opposite?0:2:this.opposite?1:3);this.setOptions(c);var f=this.options,e=f.type;this.labelFormatter=f.labels.formatter||this.defaultLabelFormatter;this.userOptions=c;this.minPixelPadding=0;this.reversed=f.reversed;this.visible=
!1!==f.visible;this.zoomEnabled=!1!==f.zoomEnabled;this.hasNames="category"===e||!0===f.categories;this.categories=f.categories||this.hasNames;this.names=this.names||[];this.isLog="logarithmic"===e;this.isDatetimeAxis="datetime"===e;this.isLinked=r(f.linkedTo);this.ticks={};this.labelEdge=[];this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=f.minRange||f.maxZoom;this.range=f.range;this.offset=f.offset||0;this.stacks={};this.oldStacks={};
this.stacksTouched=0;this.min=this.max=null;this.crosshair=F(f.crosshair,w(a.options.tooltip.crosshairs)[b?0:1],!1);var h,f=this.options.events;-1===q(this,a.axes)&&(b?a.axes.splice(a.xAxis.length,0,this):a.axes.push(this),a[this.coll].push(this));this.series=this.series||[];a.inverted&&b&&void 0===this.reversed&&(this.reversed=!0);this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;for(h in f)A(this,h,f[h]);this.isLog&&(this.val2lin=this.log2lin,this.lin2val=this.lin2log)},setOptions:function(a){this.options=
D(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],D(m[this.coll],a))},defaultLabelFormatter:function(){var c=this.axis,b=this.value,f=c.categories,h=this.dateTimeLabelFormat,l=m.lang.numericSymbols,q=l&&l.length,d,u=c.options.labels.format,c=c.isLog?b:c.tickInterval;if(u)d=e(u,this);else if(f)d=b;else if(h)d=a.dateFormat(h,b);else if(q&&1E3<=c)for(;q--&&
void 0===d;)f=Math.pow(1E3,q+1),c>=f&&0===10*b%f&&null!==l[q]&&0!==b&&(d=a.numberFormat(b/f,-1)+l[q]);void 0===d&&(d=1E4<=Math.abs(b)?a.numberFormat(b,-1):a.numberFormat(b,-1,void 0,""));return d},getSeriesExtremes:function(){var a=this,c=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();b(a.series,function(b){if(b.visible||!c.options.chart.ignoreHiddenSeries){var e=b.options,h=e.threshold,d;a.hasVisibleSeries=!0;a.isLog&&
0>=h&&(h=null);if(a.isXAxis)e=b.xData,e.length&&(b=G(e),f(b)||b instanceof Date||(e=l(e,function(a){return f(a)}),b=G(e)),a.dataMin=Math.min(F(a.dataMin,e[0]),b),a.dataMax=Math.max(F(a.dataMax,e[0]),E(e)));else if(b.getExtremes(),d=b.dataMax,b=b.dataMin,r(b)&&r(d)&&(a.dataMin=Math.min(F(a.dataMin,b),b),a.dataMax=Math.max(F(a.dataMax,d),d)),r(h)&&(a.threshold=h),!e.softThreshold||a.isLog)a.softThreshold=!1}})},translate:function(a,c,b,e,h,l){var d=this.linkedParent||this,q=1,u=0,k=e?d.oldTransA:d.transA;
e=e?d.oldMin:d.min;var w=d.minPixelPadding;h=(d.isOrdinal||d.isBroken||d.isLog&&h)&&d.lin2val;k||(k=d.transA);b&&(q*=-1,u=d.len);d.reversed&&(q*=-1,u-=q*(d.sector||d.len));c?(a=(a*q+u-w)/k+e,h&&(a=d.lin2val(a))):(h&&(a=d.val2lin(a)),"between"===l&&(l=.5),a=q*(a-e)*k+u+q*w+(f(l)?k*l*d.pointRange:0));return a},toPixels:function(a,c){return this.translate(a,!1,!this.horiz,null,!0)+(c?0:this.pos)},toValue:function(a,c){return this.translate(a-(c?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,
c,b,e,h){var l=this.chart,d=this.left,q=this.top,u,k,w=b&&l.oldChartHeight||l.chartHeight,C=b&&l.oldChartWidth||l.chartWidth,p;u=this.transB;var v=function(a,c,b){if(a<c||a>b)e?a=Math.min(Math.max(c,a),b):p=!0;return a};h=F(h,this.translate(a,null,null,b));a=b=Math.round(h+u);u=k=Math.round(w-h-u);f(h)?this.horiz?(u=q,k=w-this.bottom,a=b=v(a,d,d+this.width)):(a=d,b=C-this.right,u=k=v(u,q,q+this.height)):p=!0;return p&&!e?null:l.renderer.crispLine(["M",a,u,"L",b,k],c||1)},getLinearTickPositions:function(a,
c,b){var e,h=d(Math.floor(c/a)*a),l=d(Math.ceil(b/a)*a),q=[];if(c===b&&f(c))return[c];for(c=h;c<=l;){q.push(c);c=d(c+a);if(c===e)break;e=c}return q},getMinorTickPositions:function(){var a=this.options,c=this.tickPositions,b=this.minorTickInterval,f=[],e,h=this.pointRangePadding||0;e=this.min-h;var h=this.max+h,l=h-e;if(l&&l/b<this.len/3)if(this.isLog)for(h=c.length,e=1;e<h;e++)f=f.concat(this.getLogTickPositions(b,c[e-1],c[e],!0));else if(this.isDatetimeAxis&&"auto"===a.minorTickInterval)f=f.concat(this.getTimeTicks(this.normalizeTimeTickInterval(b),
e,h,a.startOfWeek));else for(c=e+(c[0]-e)%b;c<=h;c+=b)f.push(c);0!==f.length&&this.trimTicks(f,a.startOnTick,a.endOnTick);return f},adjustForMinRange:function(){var a=this.options,c=this.min,f=this.max,e,h=this.dataMax-this.dataMin>=this.minRange,l,d,q,u,k,w;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(r(a.min)||r(a.max)?this.minRange=null:(b(this.series,function(a){u=a.xData;for(d=k=a.xIncrement?1:u.length-1;0<d;d--)if(q=u[d]-u[d-1],void 0===l||q<l)l=q}),this.minRange=Math.min(5*l,this.dataMax-
this.dataMin)));f-c<this.minRange&&(w=this.minRange,e=(w-f+c)/2,e=[c-e,F(a.min,c-e)],h&&(e[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),c=E(e),f=[c+w,F(a.max,c+w)],h&&(f[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),f=G(f),f-c<w&&(e[0]=f-w,e[1]=F(a.min,f-w),c=E(e)));this.min=c;this.max=f},getClosest:function(){var a;this.categories?a=1:b(this.series,function(c){var b=c.closestPointRange;!c.noSharedTooltip&&r(b)&&(a=r(a)?Math.min(a,b):b)});return a},nameToX:function(a){var c=h(this.categories),
b=c?this.categories:this.names,f=a.options.x,e;a.series.requireSorting=!1;r(f)||(f=!1===this.options.nameToX?a.series.autoIncrement():q(a.name,b));-1===f?c||(e=b.length):e=f;this.names[e]=a.name;return e},updateNames:function(){var a=this;0<this.names.length&&(this.names.length=0,this.minRange=void 0,b(this.series||[],function(c){c.processedXData||(c.processData(),c.generatePoints());b(c.points,function(b,f){var e;b.options&&void 0===b.options.x&&(e=a.nameToX(b),e!==b.x&&(b.x=e,c.xData[f]=e))})}))},
setAxisTranslation:function(a){var c=this,f=c.max-c.min,e=c.axisPointRange||0,h,l=0,d=0,q=c.linkedParent,k=!!c.categories,w=c.transA,C=c.isXAxis;if(C||k||e)q?(l=q.minPointOffset,d=q.pointRangePadding):(h=c.getClosest(),b(c.series,function(a){var b=k?1:C?F(a.options.pointRange,h,0):c.axisPointRange||0;a=a.options.pointPlacement;e=Math.max(e,b);c.single||(l=Math.max(l,u(a)?0:b/2),d=Math.max(d,"on"===a?0:b))})),q=c.ordinalSlope&&h?c.ordinalSlope/h:1,c.minPointOffset=l*=q,c.pointRangePadding=d*=q,c.pointRange=
Math.min(e,f),C&&(c.closestPointRange=h);a&&(c.oldTransA=w);c.translationSlope=c.transA=w=c.len/(f+d||1);c.transB=c.horiz?c.left:c.bottom;c.minPixelPadding=w*l},minFromRange:function(){return this.max-this.range},setTickInterval:function(a){var e=this,h=e.chart,l=e.options,q=e.isLog,u=e.log2lin,w=e.isDatetimeAxis,C=e.isXAxis,p=e.isLinked,v=l.maxPadding,g=l.minPadding,D=l.tickInterval,n=l.tickPixelInterval,J=e.categories,m=e.threshold,M=e.softThreshold,t,I,y,A;w||J||p||this.getTickAmount();y=F(e.userMin,
l.min);A=F(e.userMax,l.max);p?(e.linkedParent=h[e.coll][l.linkedTo],h=e.linkedParent.getExtremes(),e.min=F(h.min,h.dataMin),e.max=F(h.max,h.dataMax),l.type!==e.linkedParent.options.type&&k(11,1)):(!M&&r(m)&&(e.dataMin>=m?(t=m,g=0):e.dataMax<=m&&(I=m,v=0)),e.min=F(y,t,e.dataMin),e.max=F(A,I,e.dataMax));q&&(!a&&0>=Math.min(e.min,F(e.dataMin,e.min))&&k(10,1),e.min=d(u(e.min),15),e.max=d(u(e.max),15));e.range&&r(e.max)&&(e.userMin=e.min=y=Math.max(e.min,e.minFromRange()),e.userMax=A=e.max,e.range=null);
B(e,"foundExtremes");e.beforePadding&&e.beforePadding();e.adjustForMinRange();!(J||e.axisPointRange||e.usePercentage||p)&&r(e.min)&&r(e.max)&&(u=e.max-e.min)&&(!r(y)&&g&&(e.min-=u*g),!r(A)&&v&&(e.max+=u*v));f(l.floor)&&(e.min=Math.max(e.min,l.floor));f(l.ceiling)&&(e.max=Math.min(e.max,l.ceiling));M&&r(e.dataMin)&&(m=m||0,!r(y)&&e.min<m&&e.dataMin>=m?e.min=m:!r(A)&&e.max>m&&e.dataMax<=m&&(e.max=m));e.tickInterval=e.min===e.max||void 0===e.min||void 0===e.max?1:p&&!D&&n===e.linkedParent.options.tickPixelInterval?
D=e.linkedParent.tickInterval:F(D,this.tickAmount?(e.max-e.min)/Math.max(this.tickAmount-1,1):void 0,J?1:(e.max-e.min)*n/Math.max(e.len,n));C&&!a&&b(e.series,function(a){a.processData(e.min!==e.oldMin||e.max!==e.oldMax)});e.setAxisTranslation(!0);e.beforeSetTickPositions&&e.beforeSetTickPositions();e.postProcessTickInterval&&(e.tickInterval=e.postProcessTickInterval(e.tickInterval));e.pointRange&&!D&&(e.tickInterval=Math.max(e.pointRange,e.tickInterval));a=F(l.minTickInterval,e.isDatetimeAxis&&e.closestPointRange);
!D&&e.tickInterval<a&&(e.tickInterval=a);w||q||D||(e.tickInterval=H(e.tickInterval,null,c(e.tickInterval),F(l.allowDecimals,!(.5<e.tickInterval&&5>e.tickInterval&&1E3<e.max&&9999>e.max)),!!this.tickAmount));this.tickAmount||(e.tickInterval=e.unsquish());this.setTickPositions()},setTickPositions:function(){var a=this.options,c,b=a.tickPositions,e=a.tickPositioner,f=a.startOnTick,h=a.endOnTick,l;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval=
"auto"===a.minorTickInterval&&this.tickInterval?this.tickInterval/5:a.minorTickInterval;this.tickPositions=c=b&&b.slice();!c&&(c=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),c.length>this.len&&(c=[c[0],c.pop()]),this.tickPositions=
c,e&&(e=e.apply(this,[this.min,this.max])))&&(this.tickPositions=c=e);this.isLinked||(this.trimTicks(c,f,h),this.min===this.max&&r(this.min)&&!this.tickAmount&&(l=!0,this.min-=.5,this.max+=.5),this.single=l,b||e||this.adjustTickAmount())},trimTicks:function(a,c,b){var e=a[0],f=a[a.length-1],h=this.minPointOffset||0;if(c)this.min=e;else for(;this.min-h>a[0];)a.shift();if(b)this.max=f;else for(;this.max+h<a[a.length-1];)a.pop();0===a.length&&r(e)&&a.push((f+e)/2)},alignToOthers:function(){var a={},
c,e=this.options;!1!==this.chart.options.chart.alignTicks&&!1!==e.alignTicks&&b(this.chart[this.coll],function(b){var e=b.options,e=[b.horiz?e.left:e.top,e.width,e.height,e.pane].join();b.series.length&&(a[e]?c=!0:a[e]=1)});return c},getTickAmount:function(){var a=this.options,c=a.tickAmount,b=a.tickPixelInterval;!r(a.tickInterval)&&this.len<b&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(c=2);!c&&this.alignToOthers()&&(c=Math.ceil(this.len/b)+1);4>c&&(this.finalTickAmt=c,c=5);this.tickAmount=
c},adjustTickAmount:function(){var a=this.tickInterval,c=this.tickPositions,b=this.tickAmount,e=this.finalTickAmt,f=c&&c.length;if(f<b){for(;c.length<b;)c.push(d(c[c.length-1]+a));this.transA*=(f-1)/(b-1);this.max=c[c.length-1]}else f>b&&(this.tickInterval*=2,this.setTickPositions());if(r(e)){for(a=b=c.length;a--;)(3===e&&1===a%2||2>=e&&0<a&&a<b-1)&&c.splice(a,1);this.finalTickAmt=void 0}},setScale:function(){var a,c;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();
c=this.len!==this.oldAxisLength;b(this.series,function(c){if(c.isDirtyData||c.isDirty||c.xAxis.isDirty)a=!0});c||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=c||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks()},
setExtremes:function(a,c,e,f,h){var l=this,d=l.chart;e=F(e,!0);b(l.series,function(a){delete a.kdTree});h=v(h,{min:a,max:c});B(l,"setExtremes",h,function(){l.userMin=a;l.userMax=c;l.eventArgs=h;e&&d.redraw(f)})},zoom:function(a,c){var b=this.dataMin,e=this.dataMax,f=this.options,h=Math.min(b,F(f.min,b)),f=Math.max(e,F(f.max,e));this.allowZoomOutside||(r(b)&&a<=h&&(a=h),r(e)&&c>=f&&(c=f));this.displayBtn=void 0!==a||void 0!==c;this.setExtremes(a,c,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var a=
this.chart,c=this.options,b=c.offsetLeft||0,e=this.horiz,f=F(c.width,a.plotWidth-b+(c.offsetRight||0)),h=F(c.height,a.plotHeight),l=F(c.top,a.plotTop),c=F(c.left,a.plotLeft+b),b=/%$/;b.test(h)&&(h=Math.round(parseFloat(h)/100*a.plotHeight));b.test(l)&&(l=Math.round(parseFloat(l)/100*a.plotHeight+a.plotTop));this.left=c;this.top=l;this.width=f;this.height=h;this.bottom=a.chartHeight-h-l;this.right=a.chartWidth-f-c;this.len=Math.max(e?f:h,0);this.pos=e?c:l},getExtremes:function(){var a=this.isLog,c=
this.lin2log;return{min:a?d(c(this.min)):this.min,max:a?d(c(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var c=this.isLog,b=this.lin2log,e=c?b(this.min):this.min,c=c?b(this.max):this.max;null===a?a=e:e>a?a=e:c<a&&(a=c);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(F(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var c=this.options,b=c[a+
"Length"],e=F(c[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(e&&b)return"inside"===c[a+"Position"]&&(b=-b),[b,e]},labelMetrics:function(){return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,this.ticks[0]&&this.ticks[0].label)},unsquish:function(){var a=this.options.labels,c=this.horiz,e=this.tickInterval,f=e,h=this.len/(((this.categories?1:0)+this.max-this.min)/e),l,d=a.rotation,q=this.labelMetrics(),u,k=Number.MAX_VALUE,w,C=function(a){a/=h||1;a=1<
a?Math.ceil(a):1;return a*e};c?(w=!a.staggerLines&&!a.step&&(r(d)?[d]:h<F(a.autoRotationLimit,80)&&a.autoRotation))&&b(w,function(a){var c;if(a===d||a&&-90<=a&&90>=a)u=C(Math.abs(q.h/Math.sin(n*a))),c=u+Math.abs(a/360),c<k&&(k=c,l=a,f=u)}):a.step||(f=C(q.h));this.autoRotation=w;this.labelRotation=F(l,d);return f},getSlotWidth:function(){var a=this.chart,c=this.horiz,b=this.options.labels,e=Math.max(this.tickPositions.length-(this.categories?0:1),1),f=a.margin[3];return c&&2>(b.step||0)&&!b.rotation&&
(this.staggerLines||1)*a.plotWidth/e||!c&&(f&&f-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,c=a.renderer,e=this.tickPositions,f=this.ticks,h=this.options.labels,l=this.horiz,d=this.getSlotWidth(),q=Math.max(1,Math.round(d-2*(h.padding||5))),k={},w=this.labelMetrics(),C=h.style&&h.style.textOverflow,p,v=0,g,F;u(h.rotation)||(k.rotation=h.rotation||0);b(e,function(a){(a=f[a])&&a.labelLength>v&&(v=a.labelLength)});this.maxLabelLength=v;if(this.autoRotation)v>q&&v>w.h?
k.rotation=this.labelRotation:this.labelRotation=0;else if(d&&(p={width:q+"px"},!C))for(p.textOverflow="clip",g=e.length;!l&&g--;)if(F=e[g],q=f[F].label)q.styles&&"ellipsis"===q.styles.textOverflow?q.css({textOverflow:"clip"}):f[F].labelLength>d&&q.css({width:d+"px"}),q.getBBox().height>this.len/e.length-(w.h-w.f)&&(q.specCss={textOverflow:"ellipsis"});k.rotation&&(p={width:(v>.5*a.chartHeight?.33*a.chartHeight:a.chartHeight)+"px"},C||(p.textOverflow="ellipsis"));if(this.labelAlign=h.align||this.autoLabelAlign(this.labelRotation))k.align=
this.labelAlign;b(e,function(a){var c=(a=f[a])&&a.label;c&&(c.attr(k),p&&c.css(D(p,c.specCss)),delete c.specCss,a.rotation=k.rotation)});this.tickRotCorr=c.rotCorr(w.b,this.labelRotation||0,0!==this.side)},hasData:function(){return this.hasVisibleSeries||r(this.min)&&r(this.max)&&!!this.tickPositions},getOffset:function(){var a=this,c=a.chart,e=c.renderer,f=a.options,h=a.tickPositions,l=a.ticks,d=a.horiz,q=a.side,u=c.inverted?[1,0,3,2][q]:q,k,w,C=0,p,v=0,g=f.title,D=f.labels,n=0,J=a.opposite,m=c.axisOffset,
c=c.clipOffset,H=[-1,1,1,-1][q],B,t=f.className,I=a.axisParent,y=this.tickSize("tick");k=a.hasData();a.showAxis=w=k||F(f.showEmpty,!0);a.staggerLines=a.horiz&&D.staggerLines;a.axisGroup||(a.gridGroup=e.g("grid").attr({zIndex:f.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(t||"")).add(I),a.axisGroup=e.g("axis").attr({zIndex:f.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(t||"")).add(I),a.labelGroup=e.g("axis-labels").attr({zIndex:D.zIndex||7}).addClass("highcharts-"+
a.coll.toLowerCase()+"-labels "+(t||"")).add(I));if(k||a.isLinked)b(h,function(c){l[c]?l[c].addLabel():l[c]=new M(a,c)}),a.renderUnsquish(),!1===D.reserveSpace||0!==q&&2!==q&&{1:"left",3:"right"}[q]!==a.labelAlign&&"center"!==a.labelAlign||b(h,function(a){n=Math.max(l[a].getLabelSize(),n)}),a.staggerLines&&(n*=a.staggerLines,a.labelOffset=n*(a.opposite?-1:1));else for(B in l)l[B].destroy(),delete l[B];g&&g.text&&!1!==g.enabled&&(a.axisTitle||((B=g.textAlign)||(B=(d?{low:"left",middle:"center",high:"right"}:
{low:J?"right":"left",middle:"center",high:J?"left":"right"})[g.align]),a.axisTitle=e.text(g.text,0,0,g.useHTML).attr({zIndex:7,rotation:g.rotation||0,align:B}).addClass("highcharts-axis-title").css(g.style).add(a.axisGroup),a.axisTitle.isNew=!0),w&&(C=a.axisTitle.getBBox()[d?"height":"width"],p=g.offset,v=r(p)?0:F(g.margin,d?5:10)),a.axisTitle[w?"show":"hide"](!0));a.renderLine();a.offset=H*F(f.offset,m[q]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};e=0===q?-a.labelMetrics().h:2===q?a.tickRotCorr.y:
0;v=Math.abs(n)+v;n&&(v=v-e+H*(d?F(D.y,a.tickRotCorr.y+8*H):D.x));a.axisTitleMargin=F(p,v);m[q]=Math.max(m[q],a.axisTitleMargin+C+H*a.offset,v,k&&h.length&&y?y[0]:0);f=f.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);c[u]=Math.max(c[u],f)},getLinePath:function(a){var c=this.chart,b=this.opposite,e=this.offset,f=this.horiz,h=this.left+(b?this.width:0)+e,e=c.chartHeight-this.bottom-(b?this.height:0)+e;b&&(a*=-1);return c.renderer.crispLine(["M",f?this.left:h,f?e:this.top,"L",f?c.chartWidth-this.right:
h,f?e:c.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,c=this.left,e=this.top,b=this.len,f=this.options.title,h=a?c:e,l=this.opposite,d=this.offset,q=f.x||0,u=f.y||0,k=this.chart.renderer.fontMetrics(f.style&&f.style.fontSize,this.axisTitle).f,
b={low:h+(a?0:b),middle:h+b/2,high:h+(a?b:0)}[f.align],c=(a?e+this.height:c)+(a?1:-1)*(l?-1:1)*this.axisTitleMargin+(2===this.side?k:0);return{x:a?b+q:c+(l?this.width:0)+d+q,y:a?c+u-(l?this.height:0)+d:b+u}},render:function(){var a=this,c=a.chart,e=c.renderer,h=a.options,l=a.isLog,d=a.lin2log,q=a.isLinked,u=a.tickPositions,k=a.axisTitle,w=a.ticks,C=a.minorTicks,p=a.alternateBands,v=h.stackLabels,g=h.alternateGridColor,D=a.tickmarkOffset,F=a.axisLine,n=c.hasRendered&&f(a.oldMin),m=a.showAxis,r=y(e.globalAnimation),
H,B;a.labelEdge.length=0;a.overlap=!1;b([w,C,p],function(a){for(var c in a)a[c].isActive=!1});if(a.hasData()||q)a.minorTickInterval&&!a.categories&&b(a.getMinorTickPositions(),function(c){C[c]||(C[c]=new M(a,c,"minor"));n&&C[c].isNew&&C[c].render(null,!0);C[c].render(null,!1,1)}),u.length&&(b(u,function(c,b){if(!q||c>=a.min&&c<=a.max)w[c]||(w[c]=new M(a,c)),n&&w[c].isNew&&w[c].render(b,!0,.1),w[c].render(b)}),D&&(0===a.min||a.single)&&(w[-1]||(w[-1]=new M(a,-1,null,!0)),w[-1].render(-1))),g&&b(u,
function(b,e){B=void 0!==u[e+1]?u[e+1]+D:a.max-D;0===e%2&&b<a.max&&B<=a.max+(c.polar?-D:D)&&(p[b]||(p[b]=new I(a)),H=b+D,p[b].options={from:l?d(H):H,to:l?d(B):B,color:g},p[b].render(),p[b].isActive=!0)}),a._addedPlotLB||(b((h.plotLines||[]).concat(h.plotBands||[]),function(c){a.addPlotBandOrLine(c)}),a._addedPlotLB=!0);b([w,C,p],function(a){var b,e,f=[],h=r.duration;for(b in a)a[b].isActive||(a[b].render(b,!1,0),a[b].isActive=!1,f.push(b));J(function(){for(e=f.length;e--;)a[f[e]]&&!a[f[e]].isActive&&
(a[f[e]].destroy(),delete a[f[e]])},a!==p&&c.hasRendered&&h?h:0)});F&&(F[F.isPlaced?"animate":"attr"]({d:this.getLinePath(F.strokeWidth())}),F.isPlaced=!0,F[m?"show":"hide"](!0));k&&m&&(k[k.isNew?"attr":"animate"](a.getTitlePosition()),k.isNew=!1);v&&v.enabled&&a.renderStackTotals();a.isDirty=!1},redraw:function(){this.visible&&(this.render(),b(this.plotLinesAndBands,function(a){a.render()}));b(this.series,function(a){a.isDirty=!0})},destroy:function(a){var c=this,e=c.stacks,f,h=c.plotLinesAndBands,
l;a||C(c);for(f in e)p(e[f]),e[f]=null;b([c.ticks,c.minorTicks,c.alternateBands],function(a){p(a)});if(h)for(a=h.length;a--;)h[a].destroy();b("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),function(a){c[a]&&(c[a]=c[a].destroy())});h=["names","series","userMax","userMin"];for(l in c)c.hasOwnProperty(l)&&-1===q(l,h)&&delete c[l]},drawCrosshair:function(a,c){var b,e=this.crosshair,f,h=this.cross;a||(a=this.cross&&this.cross.e);this.crosshair&&!1!==(r(c)||!F(e.snap,
!0))?(F(e.snap,!0)?r(c)&&(b=this.isXAxis?c.plotX:this.len-c.plotY):b=this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos,b=this.isRadial?this.getPlotLinePath(this.isXAxis?c.x:F(c.stackY,c.y))||null:this.getPlotLinePath(null,null,null,null,b)||null,null===b?this.hideCrosshair():(f=this.categories&&!this.isRadial,h||(this.cross=h=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(f?"category ":"thin ")+e.className).attr({zIndex:F(e.zIndex,2)}).add(),h.attr({stroke:e.color||
(f?g("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":F(e.width,1)}),e.dashStyle&&h.attr({dashstyle:e.dashStyle})),h.show().attr({d:b}),f&&h.attr({"stroke-width":this.transA}),this.cross.e=a)):this.hideCrosshair()},hideCrosshair:function(){this.cross&&this.cross.hide()}};v(a.Axis.prototype,t)})(K);(function(a){var A=a.Axis,y=a.Date,E=a.defaultOptions,G=a.defined,t=a.each,g=a.extend,d=a.getMagnitude,m=a.getTZOffset,r=a.grep,n=a.normalizeTickInterval,p=a.pick,b=a.timeUnits;A.prototype.getTimeTicks=
function(a,d,n,e){var c=[],l={},q=E.global.useUTC,h,f=new y(d-m(d)),u=y.hcMakeTime,D=a.unitRange,H=a.count;if(G(d)){f[y.hcSetMilliseconds](D>=b.second?0:H*Math.floor(f.getMilliseconds()/H));if(D>=b.second)f[y.hcSetSeconds](D>=b.minute?0:H*Math.floor(f.getSeconds()/H));if(D>=b.minute)f[y.hcSetMinutes](D>=b.hour?0:H*Math.floor(f[y.hcGetMinutes]()/H));if(D>=b.hour)f[y.hcSetHours](D>=b.day?0:H*Math.floor(f[y.hcGetHours]()/H));if(D>=b.day)f[y.hcSetDate](D>=b.month?1:H*Math.floor(f[y.hcGetDate]()/H));D>=
b.month&&(f[y.hcSetMonth](D>=b.year?0:H*Math.floor(f[y.hcGetMonth]()/H)),h=f[y.hcGetFullYear]());if(D>=b.year)f[y.hcSetFullYear](h-h%H);if(D===b.week)f[y.hcSetDate](f[y.hcGetDate]()-f[y.hcGetDay]()+p(e,1));d=1;if(y.hcTimezoneOffset||y.hcGetTimezoneOffset)f=f.getTime(),f=new y(f+m(f));h=f[y.hcGetFullYear]();e=f.getTime();for(var F=f[y.hcGetMonth](),I=f[y.hcGetDate](),C=!q||!!y.hcGetTimezoneOffset,w=(b.day+(q?m(f):6E4*f.getTimezoneOffset()))%b.day;e<n;)c.push(e),e=D===b.year?u(h+d*H,0):D===b.month?
u(h,F+d*H):!C||D!==b.day&&D!==b.week?e+D*H:u(h,F,I+d*H*(D===b.day?1:7)),d++;c.push(e);t(r(c,function(a){return D<=b.hour&&a%b.day===w}),function(a){l[a]="day"})}c.info=g(a,{higherRanks:l,totalRange:D*H});return c};A.prototype.normalizeTimeTickInterval=function(a,p){var g=p||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]],e=g[g.length-1],c=b[e[0]],l=e[1],
q;for(q=0;q<g.length&&!(e=g[q],c=b[e[0]],l=e[1],g[q+1]&&a<=(c*l[l.length-1]+b[g[q+1][0]])/2);q++);c===b.year&&a<5*c&&(l=[1,2,5]);g=n(a/c,l,"year"===e[0]?Math.max(d(a/c),1):1);return{unitRange:c,count:g,unitName:e[0]}}})(K);(function(a){var A=a.Axis,y=a.getMagnitude,E=a.map,G=a.normalizeTickInterval,t=a.pick;A.prototype.getLogTickPositions=function(a,d,m,r){var n=this.options,p=this.len,b=this.lin2log,k=this.log2lin,v=[];r||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),v=this.getLinearTickPositions(a,
d,m);else if(.08<=a)for(var p=Math.floor(d),B,e,c,l,q,n=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];p<m+1&&!q;p++)for(e=n.length,B=0;B<e&&!q;B++)c=k(b(p)*n[B]),c>d&&(!r||l<=m)&&void 0!==l&&v.push(l),l>m&&(q=!0),l=c;else d=b(d),m=b(m),a=n[r?"minorTickInterval":"tickInterval"],a=t("auto"===a?null:a,this._minorAutoInterval,n.tickPixelInterval/(r?5:1)*(m-d)/((r?p/this.tickPositions.length:p)||1)),a=G(a,null,y(a)),v=E(this.getLinearTickPositions(a,d,m),k),r||(this._minorAutoInterval=a/5);r||(this.tickInterval=
a);return v};A.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};A.prototype.lin2log=function(a){return Math.pow(10,a)}})(K);(function(a){var A=a.addEvent,y=a.dateFormat,E=a.each,G=a.extend,t=a.format,g=a.isNumber,d=a.map,m=a.merge,r=a.pick,n=a.splat,p=a.stop,b=a.syncTimeout,k=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,b){this.chart=a;this.options=b;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=b.split&&!a.inverted;
this.shared=b.shared||this.split;this.split?this.label=this.chart.renderer.g("tooltip"):(this.label=a.renderer.label("",0,0,b.shape||"callout",null,null,b.useHTML,null,"tooltip").attr({padding:b.padding,r:b.borderRadius,display:"none"}),this.label.attr({fill:b.backgroundColor,"stroke-width":b.borderWidth}).css(b.style).shadow(b.shadow));this.label.attr({zIndex:8}).add()},update:function(a){this.destroy();this.init(this.chart,m(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());
clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,b,e,c){var l=this,d=l.now,h=!1!==l.options.animation&&!l.isHidden&&(1<Math.abs(a-d.x)||1<Math.abs(b-d.y)),f=l.followPointer||1<l.len;G(d,{x:h?(2*d.x+a)/3:a,y:h?(d.y+b)/2:b,anchorX:f?void 0:h?(2*d.anchorX+e)/3:e,anchorY:f?void 0:h?(d.anchorY+c)/2:c});l.label.attr(d);h&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){l&&l.move(a,b,e,c)},32))},hide:function(a){var d=this;clearTimeout(this.hideTimer);
a=r(a,this.options.hideDelay,500);this.isHidden||(this.hideTimer=b(function(){d.label[a?"fadeOut":"hide"]();d.isHidden=!0},a))},getAnchor:function(a,b){var e,c=this.chart,l=c.inverted,q=c.plotTop,h=c.plotLeft,f=0,u=0,k,p;a=n(a);e=a[0].tooltipPos;this.followPointer&&b&&(void 0===b.chartX&&(b=c.pointer.normalize(b)),e=[b.chartX-c.plotLeft,b.chartY-q]);e||(E(a,function(a){k=a.series.yAxis;p=a.series.xAxis;f+=a.plotX+(!l&&p?p.left-h:0);u+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!l&&k?k.top-q:0)}),
f/=a.length,u/=a.length,e=[l?c.plotWidth-u:f,this.shared&&!l&&1<a.length&&b?b.chartY-q:l?c.plotHeight-f:u]);return d(e,Math.round)},getPosition:function(a,b,e){var c=this.chart,l=this.distance,d={},h=e.h||0,f,u=["y",c.chartHeight,b,e.plotY+c.plotTop,c.plotTop,c.plotTop+c.plotHeight],k=["x",c.chartWidth,a,e.plotX+c.plotLeft,c.plotLeft,c.plotLeft+c.plotWidth],p=!this.followPointer&&r(e.ttBelow,!c.inverted===!!e.negative),g=function(a,c,b,e,f,u){var k=b<e-l,w=e+l+b<c,C=e-l-b;e+=l;if(p&&w)d[a]=e;else if(!p&&
k)d[a]=C;else if(k)d[a]=Math.min(u-b,0>C-h?C:C-h);else if(w)d[a]=Math.max(f,e+h+b>c?e:e+h);else return!1},n=function(a,c,b,e){var f;e<l||e>c-l?f=!1:d[a]=e<b/2?1:e>c-b/2?c-b-2:e-b/2;return f},C=function(a){var c=u;u=k;k=c;f=a},w=function(){!1!==g.apply(0,u)?!1!==n.apply(0,k)||f||(C(!0),w()):f?d.x=d.y=0:(C(!0),w())};(c.inverted||1<this.len)&&C();w();return d},defaultFormatter:function(a){var b=this.points||n(this),e;e=[a.tooltipFooterHeaderFormatter(b[0])];e=e.concat(a.bodyFormatter(b));e.push(a.tooltipFooterHeaderFormatter(b[0],
!0));return e},refresh:function(a,b){var e=this.chart,c=this.label,l=this.options,d,h,f,u={},k,g=[];k=l.formatter||this.defaultFormatter;var u=e.hoverPoints,F=this.shared;clearTimeout(this.hideTimer);this.followPointer=n(a)[0].series.tooltipOptions.followPointer;f=this.getAnchor(a,b);d=f[0];h=f[1];!F||a.series&&a.series.noSharedTooltip?u=a.getLabelConfig():(e.hoverPoints=a,u&&E(u,function(a){a.setState()}),E(a,function(a){a.setState("hover");g.push(a.getLabelConfig())}),u={x:a[0].category,y:a[0].y},
u.points=g,this.len=g.length,a=a[0]);k=k.call(u,this);u=a.series;this.distance=r(u.tooltipOptions.distance,16);!1===k?this.hide():(this.isHidden&&(p(c),c.attr({opacity:1,display:"block"}).show()),this.split?this.renderSplit(k,e.hoverPoints):(c.attr({text:k.join?k.join(""):k}),c.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+r(a.colorIndex,u.colorIndex)),c.attr({stroke:l.borderColor||a.color||u.color||"#666666"}),this.updatePosition({plotX:d,plotY:h,negative:a.negative,ttBelow:a.ttBelow,
h:f[2]||0})),this.isHidden=!1)},renderSplit:function(b,d){var e=this,c=[],l=this.chart,q=l.renderer,h=!0,f=this.options,u;E(b.slice(0,b.length-1),function(a,b){var k=d[b-1]||{isHeader:!0,plotX:d[0].plotX},p=k.series||e,C=p.tt,w=k.series||{},g="highcharts-color-"+r(k.colorIndex,w.colorIndex,"none");C||(p.tt=C=q.label(null,null,null,k.isHeader&&"callout").addClass("highcharts-tooltip-box "+g).attr({padding:f.padding,r:f.borderRadius,fill:f.backgroundColor,stroke:k.color||w.color||"#333333","stroke-width":f.borderWidth}).add(e.label),
k.series&&(C.connector=q.path().addClass("highcharts-tooltip-connector "+g).attr({"stroke-width":w.options.lineWidth||2,stroke:k.color||w.color||"#666666"}).add(e.label),A(k.series,"hide",function(){var a=this.tt;a.connector=a.connector.destroy();a.destroy();this.tt=void 0})));C.isActive=!0;C.attr({text:a});w=C.getBBox();k.isHeader?(u=w.height,g=k.plotX+l.plotLeft-w.width/2):g=k.plotX+l.plotLeft-r(f.distance,16)-w.width;0>g&&(h=!1);w=(k.series&&k.series.yAxis&&k.series.yAxis.pos)+(k.plotY||0);w-=
l.plotTop;c.push({target:k.isHeader?l.plotHeight+u:w,rank:k.isHeader?1:0,size:p.tt.getBBox().height+1,point:k,x:g,tt:C})});E(l.series,function(a){var c=a.tt;c&&(c.isActive?c.isActive=!1:(c.connector=c.connector.destroy(),c.destroy(),a.tt=void 0))});a.distribute(c,l.plotHeight+u);E(c,function(a){var c=a.point,b=a.tt,e;e={display:void 0===a.pos?"none":"",x:h||c.isHeader?a.x:c.plotX+l.plotLeft+r(f.distance,16),y:a.pos+l.plotTop};c.isHeader&&(e.anchorX=c.plotX+l.plotLeft,e.anchorY=e.y-100);b.attr(e);
c.isHeader||b.connector.attr({d:["M",c.plotX+l.plotLeft,c.plotY+c.series.yAxis.pos,"L",h?c.plotX+l.plotLeft-r(f.distance,16):c.plotX+l.plotLeft+r(f.distance,16),a.pos+l.plotTop+b.getBBox().height/2]})})},updatePosition:function(a){var b=this.chart,e=this.label,e=(this.options.positioner||this.getPosition).call(this,e.width,e.height,a);this.move(Math.round(e.x),Math.round(e.y||0),a.plotX+b.plotLeft,a.plotY+b.plotTop)},getXDateFormat:function(a,b,e){var c;b=b.dateTimeLabelFormats;var l=e&&e.closestPointRange,
d,h={millisecond:15,second:12,minute:9,hour:6,day:3},f,u="millisecond";if(l){f=y("%m-%d %H:%M:%S.%L",a.x);for(d in k){if(l===k.week&&+y("%w",a.x)===e.options.startOfWeek&&"00:00:00.000"===f.substr(6)){d="week";break}if(k[d]>l){d=u;break}if(h[d]&&f.substr(h[d])!=="01-01 00:00:00.000".substr(h[d]))break;"week"!==d&&(u=d)}d&&(c=b[d])}else c=b.day;return c||b.year},tooltipFooterHeaderFormatter:function(a,b){var e=b?"footer":"header",c=a.series,l=c.tooltipOptions,d=l.xDateFormat,h=c.xAxis,f=h&&"datetime"===
h.options.type&&g(a.key),e=l[e+"Format"];f&&!d&&(d=this.getXDateFormat(a,l,h));f&&d&&(e=e.replace("{point.key}","{point.key:"+d+"}"));return t(e,{point:a,series:c})},bodyFormatter:function(a){return d(a,function(a){var b=a.series.tooltipOptions;return(b.pointFormatter||a.point.tooltipFormatter).call(a.point,b.pointFormat)})}}})(K);(function(a){var A=a.addEvent,y=a.attr,E=a.charts,G=a.color,t=a.css,g=a.defined,d=a.doc,m=a.each,r=a.extend,n=a.fireEvent,p=a.offset,b=a.pick,k=a.removeEvent,v=a.splat,
B=a.Tooltip,e=a.win;a.hasTouch=d&&void 0!==d.documentElement.ontouchstart;a.Pointer=function(a,b){this.init(a,b)};a.Pointer.prototype={init:function(a,e){this.options=e;this.chart=a;this.runChartClick=e.chart.events&&!!e.chart.events.click;this.pinchDown=[];this.lastValidTouch={};B&&e.tooltip.enabled&&(a.tooltip=new B(a,e.tooltip),this.followTouchMove=b(e.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(){var a=this.chart,b=a.options.chart.zoomType,e=/x/.test(b),b=/y/.test(b),
a=a.inverted;this.zoomX=e;this.zoomY=b;this.zoomHor=e&&!a||b&&a;this.zoomVert=b&&!a||e&&a;this.hasZoom=e||b},normalize:function(a,b){var d,h;a=a||e.event;a.target||(a.target=a.srcElement);h=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;b||(this.chartPosition=b=p(this.chart.container));void 0===h.pageX?(d=Math.max(a.x,a.clientX-b.left),h=a.y):(d=h.pageX-b.left,h=h.pageY-b.top);return r(a,{chartX:Math.round(d),chartY:Math.round(h)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};
m(this.chart.axes,function(e){b[e.isXAxis?"xAxis":"yAxis"].push({axis:e,value:e.toValue(a[e.horiz?"chartX":"chartY"])})});return b},runPointActions:function(c){var e=this.chart,q=e.series,h=e.tooltip,f=h?h.shared:!1,u=!0,k=e.hoverPoint,p=e.hoverSeries,g,n,C,w=[],J;if(!f&&!p)for(g=0;g<q.length;g++)if(q[g].directTouch||!q[g].options.stickyTracking)q=[];p&&(f?p.noSharedTooltip:p.directTouch)&&k?w=[k]:(f||!p||p.options.stickyTracking||(q=[p]),m(q,function(a){n=a.noSharedTooltip&&f;C=!f&&a.directTouch;
a.visible&&!n&&!C&&b(a.options.enableMouseTracking,!0)&&(J=a.searchPoint(c,!n&&1===a.kdDimensions))&&J.series&&w.push(J)}),w.sort(function(a,c){var b=a.distX-c.distX,e=a.dist-c.dist;return 0!==b?b:0!==e?e:a.series.group.zIndex>c.series.group.zIndex?-1:1}));if(f)for(g=w.length;g--;)(w[g].clientX!==w[0].clientX||w[g].series.noSharedTooltip)&&w.splice(g,1);if(w[0]&&(w[0]!==this.hoverPoint||h&&h.isHidden)){if(f&&!w[0].series.noSharedTooltip){for(g=0;0<=g;g--)w[g].onMouseOver(c,w[g]!==(p&&p.directTouch&&
k||w[0]));if(p&&p.directTouch&&k&&k!==w[0])k.onMouseOver(c,!1);w.length&&h&&h.refresh(w.sort(function(a,c){return a.series.index-c.series.index}),c)}else if(h&&h.refresh(w[0],c),!p||!p.directTouch)w[0].onMouseOver(c);this.prevKDPoint=w[0];u=!1}u&&(q=p&&p.tooltipOptions.followPointer,h&&q&&!h.isHidden&&(q=h.getAnchor([{}],c),h.updatePosition({plotX:q[0],plotY:q[1]})));this._onDocumentMouseMove||(this._onDocumentMouseMove=function(c){if(E[a.hoverChartIndex])E[a.hoverChartIndex].pointer.onDocumentMouseMove(c)},
A(d,"mousemove",this._onDocumentMouseMove));m(f?w:[b(k,w[0])],function(a){m(e.axes,function(b){(!a||a.series&&a.series[b.coll]===b)&&b.drawCrosshair(c,a)})})},reset:function(a,b){var e=this.chart,h=e.hoverSeries,f=e.hoverPoint,u=e.hoverPoints,p=e.tooltip,g=p&&p.shared?u:f;a&&g&&m(v(g),function(b){b.series.isCartesian&&void 0===b.plotX&&(a=!1)});if(a)p&&g&&(p.refresh(g),f&&(f.setState(f.state,!0),m(e.axes,function(a){a.crosshair&&a.drawCrosshair(null,f)})));else{if(f)f.onMouseOut();u&&m(u,function(a){a.setState()});
if(h)h.onMouseOut();p&&p.hide(b);this._onDocumentMouseMove&&(k(d,"mousemove",this._onDocumentMouseMove),this._onDocumentMouseMove=null);m(e.axes,function(a){a.hideCrosshair()});this.hoverX=this.prevKDPoint=e.hoverPoints=e.hoverPoint=null}},scaleGroups:function(a,b){var e=this.chart,h;m(e.series,function(f){h=a||f.getPlotBox();f.xAxis&&f.xAxis.zoomEnabled&&(f.group.attr(h),f.markerGroup&&(f.markerGroup.attr(h),f.markerGroup.clip(b?e.clipRect:null)),f.dataLabelsGroup&&f.dataLabelsGroup.attr(h))});e.clipRect.attr(b||
e.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,e=b.options.chart,h=a.chartX,f=a.chartY,d=this.zoomHor,k=this.zoomVert,p=b.plotLeft,g=b.plotTop,n=b.plotWidth,C=b.plotHeight,w,m=this.selectionMarker,v=this.mouseDownX,x=this.mouseDownY,r=e.panKey&&a[e.panKey+"Key"];m&&m.touch||(h<p?h=p:h>p+n&&(h=p+n),f<g?f=g:f>g+C&&(f=g+C),this.hasDragged=Math.sqrt(Math.pow(v-
h,2)+Math.pow(x-f,2)),10<this.hasDragged&&(w=b.isInsidePlot(v-p,x-g),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&w&&!r&&!m&&(this.selectionMarker=m=b.renderer.rect(p,g,d?1:n,k?1:C,0).attr({fill:e.selectionMarkerFill||G("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",zIndex:7}).add()),m&&d&&(h-=v,m.attr({width:Math.abs(h),x:(0<h?0:h)+v})),m&&k&&(h=f-x,m.attr({height:Math.abs(h),y:(0<h?0:h)+x})),w&&!m&&e.panning&&b.pan(a,e.panning)))},drop:function(a){var b=this,e=this.chart,
h=this.hasPinched;if(this.selectionMarker){var f={originalEvent:a,xAxis:[],yAxis:[]},d=this.selectionMarker,k=d.attr?d.attr("x"):d.x,p=d.attr?d.attr("y"):d.y,v=d.attr?d.attr("width"):d.width,B=d.attr?d.attr("height"):d.height,C;if(this.hasDragged||h)m(e.axes,function(e){if(e.zoomEnabled&&g(e.min)&&(h||b[{xAxis:"zoomX",yAxis:"zoomY"}[e.coll]])){var d=e.horiz,u="touchend"===a.type?e.minPixelPadding:0,q=e.toValue((d?k:p)+u),d=e.toValue((d?k+v:p+B)-u);f[e.coll].push({axis:e,min:Math.min(q,d),max:Math.max(q,
d)});C=!0}}),C&&n(e,"selection",f,function(a){e.zoom(r(a,h?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();h&&this.scaleGroups()}e&&(t(e.container,{cursor:e._cursor}),e.cancelClick=10<this.hasDragged,e.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);this.zoomOption();a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(c){E[a.hoverChartIndex]&&E[a.hoverChartIndex].pointer.drop(c)},
onDocumentMouseMove:function(a){var b=this.chart,e=this.chartPosition;a=this.normalize(a,e);!e||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(c){var b=E[a.hoverChartIndex];b&&(c.relatedTarget||c.toElement)&&(b.pointer.reset(),b.pointer.chartPosition=null)},onContainerMouseMove:function(c){var b=this.chart;g(a.hoverChartIndex)&&E[a.hoverChartIndex]&&E[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=
b.index);c=this.normalize(c);c.returnValue=!1;"mousedown"===b.mouseIsDown&&this.drag(c);!this.inClass(c.target,"highcharts-tracker")&&!b.isInsidePlot(c.chartX-b.plotLeft,c.chartY-b.plotTop)||b.openMenu||this.runPointActions(c)},inClass:function(a,b){for(var e;a;){if(e=y(a,"class")){if(-1!==e.indexOf(b))return!0;if(-1!==e.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;if(b&&a&&!b.options.stickyTracking&&
!this.inClass(a,"highcharts-tooltip")&&!this.inClass(a,"highcharts-series-"+b.index))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,e=b.hoverPoint,h=b.plotLeft,f=b.plotTop;a=this.normalize(a);b.cancelClick||(e&&this.inClass(a.target,"highcharts-tracker")?(n(e.series,"click",r(a,{point:e})),b.hoverPoint&&e.firePointEvent("click",a)):(r(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-h,a.chartY-f)&&n(b,"click",a)))},setDOMEvents:function(){var c=this,b=c.chart.container;b.onmousedown=
function(a){c.onContainerMouseDown(a)};b.onmousemove=function(a){c.onContainerMouseMove(a)};b.onclick=function(a){c.onContainerClick(a)};A(b,"mouseleave",c.onContainerMouseLeave);1===a.chartCount&&A(d,"mouseup",c.onDocumentMouseUp);a.hasTouch&&(b.ontouchstart=function(a){c.onContainerTouchStart(a)},b.ontouchmove=function(a){c.onContainerTouchMove(a)},1===a.chartCount&&A(d,"touchend",c.onDocumentTouchEnd))},destroy:function(){var c;k(this.chart.container,"mouseleave",this.onContainerMouseLeave);a.chartCount||
(k(d,"mouseup",this.onDocumentMouseUp),k(d,"touchend",this.onDocumentTouchEnd));clearInterval(this.tooltipTimeout);for(c in this)this[c]=null}}})(K);(function(a){var A=a.charts,y=a.each,E=a.extend,G=a.map,t=a.noop,g=a.pick;E(a.Pointer.prototype,{pinchTranslate:function(a,g,r,n,p,b){(this.zoomHor||this.pinchHor)&&this.pinchTranslateDirection(!0,a,g,r,n,p,b);(this.zoomVert||this.pinchVert)&&this.pinchTranslateDirection(!1,a,g,r,n,p,b)},pinchTranslateDirection:function(a,g,r,n,p,b,k,v){var t=this.chart,
e=a?"x":"y",c=a?"X":"Y",l="chart"+c,q=a?"width":"height",h=t["plot"+(a?"Left":"Top")],f,u,D=v||1,H=t.inverted,F=t.bounds[a?"h":"v"],I=1===g.length,C=g[0][l],w=r[0][l],J=!I&&g[1][l],M=!I&&r[1][l],x;r=function(){!I&&20<Math.abs(C-J)&&(D=v||Math.abs(w-M)/Math.abs(C-J));u=(h-w)/D+C;f=t["plot"+(a?"Width":"Height")]/D};r();g=u;g<F.min?(g=F.min,x=!0):g+f>F.max&&(g=F.max-f,x=!0);x?(w-=.8*(w-k[e][0]),I||(M-=.8*(M-k[e][1])),r()):k[e]=[w,M];H||(b[e]=u-h,b[q]=f);b=H?1/D:D;p[q]=f;p[e]=g;n[H?a?"scaleY":"scaleX":
"scale"+c]=D;n["translate"+c]=b*h+(w-b*C)},pinch:function(a){var m=this,r=m.chart,n=m.pinchDown,p=a.touches,b=p.length,k=m.lastValidTouch,v=m.hasZoom,B=m.selectionMarker,e={},c=1===b&&(m.inClass(a.target,"highcharts-tracker")&&r.runTrackerClick||m.runChartClick),l={};1<b&&(m.initiated=!0);v&&m.initiated&&!c&&a.preventDefault();G(p,function(a){return m.normalize(a)});"touchstart"===a.type?(y(p,function(a,c){n[c]={chartX:a.chartX,chartY:a.chartY}}),k.x=[n[0].chartX,n[1]&&n[1].chartX],k.y=[n[0].chartY,
n[1]&&n[1].chartY],y(r.axes,function(a){if(a.zoomEnabled){var c=r.bounds[a.horiz?"h":"v"],b=a.minPixelPadding,e=a.toPixels(g(a.options.min,a.dataMin)),d=a.toPixels(g(a.options.max,a.dataMax)),l=Math.max(e,d);c.min=Math.min(a.pos,Math.min(e,d)-b);c.max=Math.max(a.pos+a.len,l+b)}}),m.res=!0):n.length&&(B||(m.selectionMarker=B=E({destroy:t,touch:!0},r.plotBox)),m.pinchTranslate(n,p,e,B,l,k),m.hasPinched=v,m.scaleGroups(e,l),!v&&m.followTouchMove&&1===b?this.runPointActions(m.normalize(a)):m.res&&(m.res=
!1,this.reset(!1,0)))},touch:function(d,m){var r=this.chart,n;a.hoverChartIndex=r.index;1===d.touches.length?(d=this.normalize(d),r.isInsidePlot(d.chartX-r.plotLeft,d.chartY-r.plotTop)&&!r.openMenu?(m&&this.runPointActions(d),"touchmove"===d.type&&(r=this.pinchDown,n=r[0]?4<=Math.sqrt(Math.pow(r[0].chartX-d.chartX,2)+Math.pow(r[0].chartY-d.chartY,2)):!1),g(n,!0)&&this.pinch(d)):m&&this.reset()):2===d.touches.length&&this.pinch(d)},onContainerTouchStart:function(a){this.zoomOption();this.touch(a,!0)},
onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(d){A[a.hoverChartIndex]&&A[a.hoverChartIndex].pointer.drop(d)}})})(K);(function(a){var A=a.addEvent,y=a.charts,E=a.css,G=a.doc,t=a.extend,g=a.noop,d=a.Pointer,m=a.removeEvent,r=a.win,n=a.wrap;if(r.PointerEvent||r.MSPointerEvent){var p={},b=!!r.PointerEvent,k=function(){var a,b=[];b.item=function(a){return this[a]};for(a in p)p.hasOwnProperty(a)&&b.push({pageX:p[a].pageX,pageY:p[a].pageY,target:p[a].target});return b},v=function(b,
e,c,d){"touch"!==b.pointerType&&b.pointerType!==b.MSPOINTER_TYPE_TOUCH||!y[a.hoverChartIndex]||(d(b),d=y[a.hoverChartIndex].pointer,d[e]({type:c,target:b.currentTarget,preventDefault:g,touches:k()}))};t(d.prototype,{onContainerPointerDown:function(a){v(a,"onContainerTouchStart","touchstart",function(a){p[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){v(a,"onContainerTouchMove","touchmove",function(a){p[a.pointerId]={pageX:a.pageX,pageY:a.pageY};
p[a.pointerId].target||(p[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){v(a,"onDocumentTouchEnd","touchend",function(a){delete p[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,b?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,b?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(G,b?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});n(d.prototype,"init",function(a,b,c){a.call(this,b,c);this.hasZoom&&E(b.container,
{"-ms-touch-action":"none","touch-action":"none"})});n(d.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(A)});n(d.prototype,"destroy",function(a){this.batchMSEvents(m);a.call(this)})}})(K);(function(a){var A,y=a.addEvent,E=a.css,G=a.discardElement,t=a.defined,g=a.each,d=a.extend,m=a.isFirefox,r=a.marginNames,n=a.merge,p=a.pick,b=a.setAnimation,k=a.stableSort,v=a.win,B=a.wrap;A=a.Legend=function(a,c){this.init(a,c)};A.prototype={init:function(a,
c){this.chart=a;this.setOptions(c);c.enabled&&(this.render(),y(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},setOptions:function(a){var c=p(a.padding,8);this.options=a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=n(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.initialItemX=this.padding=c;this.initialItemY=c-5;this.itemHeight=this.maxItemWidth=0;this.symbolWidth=p(a.symbolWidth,16);this.pages=[]},update:function(a,c){var b=this.chart;this.setOptions(n(!0,
this.options,a));this.destroy();b.isDirtyLegend=b.isDirtyBox=!0;p(c,!0)&&b.redraw()},colorizeItem:function(a,c){a.legendGroup[c?"removeClass":"addClass"]("highcharts-legend-item-hidden");var b=this.options,d=a.legendItem,h=a.legendLine,f=a.legendSymbol,k=this.itemHiddenStyle.color,b=c?b.itemStyle.color:k,p=c?a.color||k:k,g=a.options&&a.options.marker,n={fill:p},m;d&&d.css({fill:b,color:b});h&&h.attr({stroke:p});if(f){if(g&&f.isMarker&&(n=a.pointAttribs(),!c))for(m in n)n[m]=k;f.attr(n)}},positionItem:function(a){var c=
this.options,b=c.symbolPadding,c=!c.rtl,d=a._legendItemPos,h=d[0],d=d[1],f=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(c?h:this.legendWidth-h-2*b-4,d);f&&(f.x=h,f.y=d)},destroyItem:function(a){var c=a.checkbox;g(["legendItem","legendLine","legendSymbol","legendGroup"],function(c){a[c]&&(a[c]=a[c].destroy())});c&&G(a.checkbox)},destroy:function(){var a=this.group,c=this.box;c&&(this.box=c.destroy());g(this.getAllItems(),function(a){g(["legendItem","legendGroup"],function(c){a[c]&&(a[c]=a[c].destroy())})});
a&&(this.group=a.destroy())},positionCheckboxes:function(a){var c=this.group.alignAttr,b,d=this.clipHeight||this.legendHeight,h=this.titleHeight;c&&(b=c.translateY,g(this.allItems,function(f){var k=f.checkbox,p;k&&(p=b+h+k.y+(a||0)+3,E(k,{left:c.translateX+f.checkboxOffset+k.x-20+"px",top:p+"px",display:p>b-6&&p<b+d-6?"":"none"}))}))},renderTitle:function(){var a=this.padding,c=this.options.title,b=0;c.text&&(this.title||(this.title=this.chart.renderer.label(c.text,a-3,a-4,null,null,null,null,null,
"legend-title").attr({zIndex:1}).css(c.style).add(this.group)),a=this.title.getBBox(),b=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:b}));this.titleHeight=b},setText:function(b){var c=this.options;b.legendItem.attr({text:c.labelFormat?a.format(c.labelFormat,b):c.labelFormatter.call(b)})},renderItem:function(a){var c=this.chart,b=c.renderer,d=this.options,h="horizontal"===d.layout,f=this.symbolWidth,k=d.symbolPadding,g=this.itemStyle,m=this.itemHiddenStyle,v=this.padding,r=
h?p(d.itemDistance,20):0,C=!d.rtl,w=d.width,J=d.itemMarginBottom||0,t=this.itemMarginTop,x=this.initialItemX,z=a.legendItem,B=!a.series,O=!B&&a.series.drawLegendSymbol?a.series:a,y=O.options,y=this.createCheckboxForItem&&y&&y.showCheckbox,L=d.useHTML;z||(a.legendGroup=b.g("legend-item").addClass("highcharts-"+O.type+"-series highcharts-color-"+a.colorIndex+" "+(a.options.className||"")+(B?"highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=z=b.text("",C?f+k:-k,this.baseline||
0,L).css(n(a.visible?g:m)).attr({align:C?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(g=g.fontSize,this.fontMetrics=b.fontMetrics(g,z),this.baseline=this.fontMetrics.f+3+t,z.attr("y",this.baseline)),O.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,z,L),y&&this.createCheckboxForItem(a));this.colorizeItem(a,a.visible);this.setText(a);b=z.getBBox();f=a.checkboxOffset=d.itemWidth||a.legendItemWidth||f+k+b.width+r+(y?20:0);this.itemHeight=k=Math.round(a.legendItemHeight||
b.height);h&&this.itemX-x+f>(w||c.chartWidth-2*v-x-d.x)&&(this.itemX=x,this.itemY+=t+this.lastLineHeight+J,this.lastLineHeight=0);this.maxItemWidth=Math.max(this.maxItemWidth,f);this.lastItemY=t+this.itemY+J;this.lastLineHeight=Math.max(k,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];h?this.itemX+=f:(this.itemY+=t+k+J,this.lastLineHeight=k);this.offsetWidth=w||Math.max((h?this.itemX-x-r:f)+v,this.offsetWidth)},getAllItems:function(){var a=[];g(this.chart.series,function(c){var b=c&&
c.options;c&&p(b.showInLegend,t(b.linkedTo)?!1:void 0,!0)&&(a=a.concat(c.legendItems||("point"===b.legendType?c.data:c)))});return a},adjustMargins:function(a,c){var b=this.chart,d=this.options,h=d.align.charAt(0)+d.verticalAlign.charAt(0)+d.layout.charAt(0);d.floating||g([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(f,k){f.test(h)&&!t(a[k])&&(b[r[k]]=Math.max(b[r[k]],b.legend[(k+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][k]*d[k%2?"x":"y"]+p(d.margin,12)+c[k]))})},render:function(){var a=
this,c=a.chart,b=c.renderer,p=a.group,h,f,u,n,m=a.box,v=a.options,r=a.padding;a.itemX=a.initialItemX;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;p||(a.group=p=b.g("legend").attr({zIndex:7}).add(),a.contentGroup=b.g().attr({zIndex:1}).add(p),a.scrollGroup=b.g().add(a.contentGroup));a.renderTitle();h=a.getAllItems();k(h,function(a,c){return(a.options&&a.options.legendIndex||0)-(c.options&&c.options.legendIndex||0)});v.reversed&&h.reverse();a.allItems=h;a.display=f=!!h.length;a.lastLineHeight=
0;g(h,function(c){a.renderItem(c)});u=(v.width||a.offsetWidth)+r;n=a.lastItemY+a.lastLineHeight+a.titleHeight;n=a.handleOverflow(n);n+=r;m||(a.box=m=b.rect().addClass("highcharts-legend-box").attr({r:v.borderRadius}).add(p),m.isNew=!0);m.attr({stroke:v.borderColor,"stroke-width":v.borderWidth||0,fill:v.backgroundColor||"none"}).shadow(v.shadow);0<u&&0<n&&(m[m.isNew?"attr":"animate"](m.crisp({x:0,y:0,width:u,height:n},m.strokeWidth())),m.isNew=!1);m[f?"show":"hide"]();a.legendWidth=u;a.legendHeight=
n;g(h,function(c){a.positionItem(c)});f&&p.align(d({width:u,height:n},v),!0,"spacingBox");c.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var c=this,b=this.chart,d=b.renderer,h=this.options,f=h.y,f=b.spacingBox.height+("top"===h.verticalAlign?-f:f)-this.padding,k=h.maxHeight,n,m=this.clipRect,v=h.navigation,r=p(v.animation,!0),C=v.arrowSize||12,w=this.nav,J=this.pages,t=this.padding,x,z=this.allItems,B=function(a){m.attr({height:a});c.contentGroup.div&&(c.contentGroup.div.style.clip=
"rect("+t+"px,9999px,"+(t+a)+"px,0)")};"horizontal"===h.layout&&(f/=2);k&&(f=Math.min(f,k));J.length=0;a>f&&!1!==v.enabled?(this.clipHeight=n=Math.max(f-20-this.titleHeight-t,0),this.currentPage=p(this.currentPage,1),this.fullHeight=a,g(z,function(a,c){var b=a._legendItemPos[1],e=Math.round(a.legendItem.getBBox().height),f=J.length;if(!f||b-J[f-1]>n&&(x||b)!==J[f-1])J.push(x||b),f++;c===z.length-1&&b+e-J[f-1]>n&&J.push(b);b!==x&&(x=b)}),m||(m=c.clipRect=d.clipRect(0,t,9999,0),c.contentGroup.clip(m)),
B(n),w||(this.nav=w=d.g().attr({zIndex:1}).add(this.group),this.up=d.symbol("triangle",0,0,C,C).on("click",function(){c.scroll(-1,r)}).add(w),this.pager=d.text("",15,10).addClass("highcharts-legend-navigation").css(v.style).add(w),this.down=d.symbol("triangle-down",0,0,C,C).on("click",function(){c.scroll(1,r)}).add(w)),c.scroll(0),a=f):w&&(B(b.chartHeight),w.hide(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,c){var d=this.pages,k=d.length,h=this.currentPage+
a,f=this.clipHeight,p=this.options.navigation,g=this.pager,n=this.padding;h>k&&(h=k);0<h&&(void 0!==c&&b(c,this.chart),this.nav.attr({translateX:n,translateY:f+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===h?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),g.attr({text:h+"/"+k}),this.down.attr({x:18+this.pager.getBBox().width,"class":h===k?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),this.up.attr({fill:1===h?p.inactiveColor:
p.activeColor}).css({cursor:1===h?"default":"pointer"}),this.down.attr({fill:h===k?p.inactiveColor:p.activeColor}).css({cursor:h===k?"default":"pointer"}),d=-d[h-1]+this.initialItemY,this.scrollGroup.animate({translateY:d}),this.currentPage=h,this.positionCheckboxes(d))}};a.LegendSymbolMixin={drawRectangle:function(a,c){var b=a.options,d=b.symbolHeight||a.fontMetrics.f,b=b.squareSymbol;c.legendSymbol=this.chart.renderer.rect(b?(a.symbolWidth-d)/2:0,a.baseline-d+1,b?d:a.symbolWidth,d,p(a.options.symbolRadius,
d/2)).addClass("highcharts-point").attr({zIndex:3}).add(c.legendGroup)},drawLineMarker:function(a){var c=this.options,b=c.marker,d=a.symbolWidth,h=this.chart.renderer,f=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var k;k={"stroke-width":c.lineWidth||0};c.dashStyle&&(k.dashstyle=c.dashStyle);this.legendLine=h.path(["M",0,a,"L",d,a]).addClass("highcharts-graph").attr(k).add(f);b&&!1!==b.enabled&&(c=b.radius,this.legendSymbol=b=h.symbol(this.symbol,d/2-c,a-c,2*c,2*c,b).addClass("highcharts-point").add(f),
b.isMarker=!0)}};(/Trident\/7\.0/.test(v.navigator.userAgent)||m)&&B(A.prototype,"positionItem",function(a,b){var d=this,k=function(){b._legendItemPos&&a.call(d,b)};k();setTimeout(k)})})(K);(function(a){var A=a.addEvent,y=a.animate,E=a.animObject,G=a.attr,t=a.doc,g=a.Axis,d=a.createElement,m=a.defaultOptions,r=a.discardElement,n=a.charts,p=a.css,b=a.defined,k=a.each,v=a.error,B=a.extend,e=a.fireEvent,c=a.getStyle,l=a.grep,q=a.isNumber,h=a.isObject,f=a.isString,u=a.Legend,D=a.marginNames,H=a.merge,
F=a.Pointer,I=a.pick,C=a.pInt,w=a.removeEvent,J=a.seriesTypes,M=a.splat,x=a.svg,z=a.syncTimeout,N=a.win,O=a.Renderer,S=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,b,c){return new S(a,b,c)};S.prototype={callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(f(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,c){var e,f=b.series;b.series=null;e=H(m,b);e.series=b.series=f;this.userOptions=b;this.respRules=[];var f=e.chart,d=f.events;
this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.callback=c;this.isResizing=0;this.options=e;this.axes=[];this.series=[];this.hasCartesianSeries=f.showAxes;var h;this.index=n.length;n.push(this);a.chartCount++;if(d)for(h in d)A(this,h,d[h]);this.xAxis=[];this.yAxis=[];this.pointCount=this.colorCounter=this.symbolCounter=0;this.firstRender()},initSeries:function(a){var b=this.options.chart;(b=J[a.type||b.type||b.defaultSeriesType])||v(17,!0);b=new b;b.init(this,a);return b},isInsidePlot:function(a,
b,c){var e=c?b:a;a=c?a:b;return 0<=e&&e<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(b){var c=this.axes,f=this.series,d=this.pointer,h=this.legend,p=this.isDirtyLegend,l,u,g=this.hasCartesianSeries,w=this.isDirtyBox,C=f.length,q=C,n=this.renderer,m=n.isHidden(),v=[];a.setAnimation(b,this);m&&this.cloneRenderTo();for(this.layOutTitles();q--;)if(b=f[q],b.options.stacking&&(l=!0,b.isDirty)){u=!0;break}if(u)for(q=C;q--;)b=f[q],b.options.stacking&&(b.isDirty=!0);k(f,function(a){a.isDirty&&
"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),p=!0);a.isDirtyData&&e(a,"updatedData")});p&&h.options.enabled&&(h.render(),this.isDirtyLegend=!1);l&&this.getStacks();g&&k(c,function(a){a.updateNames();a.setScale()});this.getMargins();g&&(k(c,function(a){a.isDirty&&(w=!0)}),k(c,function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,v.push(function(){e(a,"afterSetExtremes",B(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(w||l)&&a.redraw()}));w&&this.drawChartBox();k(f,
function(a){a.isDirty&&a.visible&&(!a.isCartesian||a.xAxis)&&a.redraw()});d&&d.reset(!0);n.draw();e(this,"redraw");m&&this.cloneRenderTo(!0);k(v,function(a){a.call()})},get:function(a){var b=this.axes,c=this.series,e,f;for(e=0;e<b.length;e++)if(b[e].options.id===a)return b[e];for(e=0;e<c.length;e++)if(c[e].options.id===a)return c[e];for(e=0;e<c.length;e++)for(f=c[e].points||[],b=0;b<f.length;b++)if(f[b].id===a)return f[b];return null},getAxes:function(){var a=this,b=this.options,c=b.xAxis=M(b.xAxis||
{}),b=b.yAxis=M(b.yAxis||{});k(c,function(a,b){a.index=b;a.isX=!0});k(b,function(a,b){a.index=b});c=c.concat(b);k(c,function(b){new g(a,b)})},getSelectedPoints:function(){var a=[];k(this.series,function(b){a=a.concat(l(b.points||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return l(this.series,function(a){return a.selected})},setTitle:function(a,b,c){var e=this,f=e.options,d;d=f.title=H(f.title,a);f=f.subtitle=H(f.subtitle,b);k([["title",a,d],["subtitle",b,f]],function(a,
b){var c=a[0],f=e[c],d=a[1],h=a[2];f&&d&&(e[c]=f=f.destroy());h&&h.text&&!f&&(e[c]=e.renderer.text(h.text,0,0,h.useHTML).attr({align:h.align,"class":"highcharts-"+c,zIndex:h.zIndex||4}).add(),e[c].update=function(a){e.setTitle(!b&&a,b&&a)},e[c].css(h.style))});e.layOutTitles(c)},layOutTitles:function(a){var b=0,c,e=this.renderer,f=this.spacingBox;k(["title","subtitle"],function(a){var c=this[a],h=this.options[a],d;c&&(d=h.style.fontSize,d=e.fontMetrics(d,c).b,c.css({width:(h.width||f.width+h.widthAdjust)+
"px"}).align(B({y:b+d+("title"===a?-3:2)},h),!1,"spacingBox"),h.floating||h.verticalAlign||(b=Math.ceil(b+c.getBBox().height)))},this);c=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&c&&(this.isDirtyBox=c,this.hasRendered&&I(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var a=this.options.chart,e=a.width,a=a.height,f=this.renderToClone||this.renderTo;b(e)||(this.containerWidth=c(f,"width"));b(a)||(this.containerHeight=c(f,"height"));this.chartWidth=Math.max(0,e||this.containerWidth||
600);this.chartHeight=Math.max(0,I(a,19<this.containerHeight?this.containerHeight:400))},cloneRenderTo:function(a){var b=this.renderToClone,c=this.container;if(a){if(b){for(;b.childNodes.length;)this.renderTo.appendChild(b.firstChild);r(b);delete this.renderToClone}}else c&&c.parentNode===this.renderTo&&this.renderTo.removeChild(c),this.renderToClone=b=this.renderTo.cloneNode(0),p(b,{position:"absolute",top:"-9999px",display:"block"}),b.style.setProperty&&b.style.setProperty("display","block","important"),
t.body.appendChild(b),c&&b.appendChild(c)},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var b,c=this.options,e=c.chart,h,k;b=this.renderTo;var l="highcharts-"+a.idCounter++,p;b||(this.renderTo=b=e.renderTo);f(b)&&(this.renderTo=b=t.getElementById(b));b||v(13,!0);h=C(G(b,"data-highcharts-chart"));q(h)&&n[h]&&n[h].hasRendered&&n[h].destroy();G(b,"data-highcharts-chart",this.index);b.innerHTML="";e.skipClone||b.offsetWidth||this.cloneRenderTo();
this.getChartSize();h=this.chartWidth;k=this.chartHeight;p=B({position:"relative",overflow:"hidden",width:h+"px",height:k+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"});this.container=b=d("div",{id:l},p,this.renderToClone||b);this._cursor=b.style.cursor;this.renderer=new (a[e.renderer]||O)(b,h,k,null,e.forExport,c.exporting&&c.exporting.allowHTML);this.setClassName(e.className);this.renderer.setStyle(e.style);this.renderer.chartIndex=this.index},
getMargins:function(a){var c=this.spacing,e=this.margin,f=this.titleOffset;this.resetMargins();f&&!b(e[0])&&(this.plotTop=Math.max(this.plotTop,f+this.options.title.margin+c[0]));this.legend.display&&this.legend.adjustMargins(e,c);this.extraBottomMargin&&(this.marginBottom+=this.extraBottomMargin);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);a||this.getAxisMargins()},getAxisMargins:function(){var a=this,c=a.axisOffset=[0,0,0,0],e=a.margin;a.hasCartesianSeries&&k(a.axes,function(a){a.visible&&
a.getOffset()});k(D,function(f,h){b(e[h])||(a[f]+=c[h])});a.setChartSize()},reflow:function(a){var e=this,f=e.options.chart,h=e.renderTo,d=b(f.width),k=f.width||c(h,"width"),f=f.height||c(h,"height"),h=a?a.target:N;if(!d&&!e.isPrinting&&k&&f&&(h===N||h===t)){if(k!==e.containerWidth||f!==e.containerHeight)clearTimeout(e.reflowTimeout),e.reflowTimeout=z(function(){e.container&&e.setSize(void 0,void 0,!1)},a?100:0);e.containerWidth=k;e.containerHeight=f}},initReflow:function(){var a=this,b=function(b){a.reflow(b)};
A(N,"resize",b);A(a,"destroy",function(){w(N,"resize",b)})},setSize:function(b,c,f){var h=this,d=h.renderer;h.isResizing+=1;a.setAnimation(f,h);h.oldChartHeight=h.chartHeight;h.oldChartWidth=h.chartWidth;void 0!==b&&(h.options.chart.width=b);void 0!==c&&(h.options.chart.height=c);h.getChartSize();b=d.globalAnimation;(b?y:p)(h.container,{width:h.chartWidth+"px",height:h.chartHeight+"px"},b);h.setChartSize(!0);d.setSize(h.chartWidth,h.chartHeight,f);k(h.axes,function(a){a.isDirty=!0;a.setScale()});
k(h.series,function(a){a.isDirty=!0});h.isDirtyLegend=!0;h.isDirtyBox=!0;h.layOutTitles();h.getMargins();h.setResponsive&&h.setResponsive(!1);h.redraw(f);h.oldChartHeight=null;e(h,"resize");z(function(){h&&e(h,"endResize",null,function(){--h.isResizing})},E(b).duration)},setChartSize:function(a){var b=this.inverted,c=this.renderer,e=this.chartWidth,f=this.chartHeight,h=this.options.chart,d=this.spacing,p=this.clipOffset,l,u,g,w;this.plotLeft=l=Math.round(this.plotLeft);this.plotTop=u=Math.round(this.plotTop);
this.plotWidth=g=Math.max(0,Math.round(e-l-this.marginRight));this.plotHeight=w=Math.max(0,Math.round(f-u-this.marginBottom));this.plotSizeX=b?w:g;this.plotSizeY=b?g:w;this.plotBorderWidth=h.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:d[3],y:d[0],width:e-d[3]-d[1],height:f-d[0]-d[2]};this.plotBox=c.plotBox={x:l,y:u,width:g,height:w};e=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(e,p[3])/2);c=Math.ceil(Math.max(e,p[0])/2);this.clipBox={x:b,y:c,width:Math.floor(this.plotSizeX-Math.max(e,
p[1])/2-b),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(e,p[2])/2-c))};a||k(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this,b=a.options.chart;k(["margin","spacing"],function(c){var e=b[c],f=h(e)?e:[e,e,e,e];k(["Top","Right","Bottom","Left"],function(e,h){a[c][h]=I(b[c+e],f[h])})});k(D,function(b,c){a[b]=I(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,
c=this.chartWidth,e=this.chartHeight,f=this.chartBackground,h=this.plotBackground,d=this.plotBorder,k,p=this.plotBGImage,l=a.backgroundColor,u=a.plotBackgroundColor,g=a.plotBackgroundImage,w,C=this.plotLeft,q=this.plotTop,n=this.plotWidth,m=this.plotHeight,v=this.plotBox,x=this.clipRect,r=this.clipBox,J="animate";f||(this.chartBackground=f=b.rect().addClass("highcharts-background").add(),J="attr");k=a.borderWidth||0;w=k+(a.shadow?8:0);l={fill:l||"none"};if(k||f["stroke-width"])l.stroke=a.borderColor,
l["stroke-width"]=k;f.attr(l).shadow(a.shadow);f[J]({x:w/2,y:w/2,width:c-w-k%2,height:e-w-k%2,r:a.borderRadius});J="animate";h||(J="attr",this.plotBackground=h=b.rect().addClass("highcharts-plot-background").add());h[J](v);h.attr({fill:u||"none"}).shadow(a.plotShadow);g&&(p?p.animate(v):this.plotBGImage=b.image(g,C,q,n,m).add());x?x.animate({width:r.width,height:r.height}):this.clipRect=b.clipRect(r);J="animate";d||(J="attr",this.plotBorder=d=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());
d.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});d[J](d.crisp({x:C,y:q,width:n,height:m},-d.strokeWidth()));this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,e=a.options.series,f,h;k(["inverted","angular","polar"],function(d){c=J[b.type||b.defaultSeriesType];h=b[d]||c&&c.prototype[d];for(f=e&&e.length;!h&&f--;)(c=J[e[f].type])&&c.prototype[d]&&(h=!0);a[d]=h})},linkSeries:function(){var a=this,b=a.series;k(b,function(a){a.linkedSeries.length=
0});k(b,function(b){var c=b.options.linkedTo;f(c)&&(c=":previous"===c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,b.visible=I(b.options.visible,c.options.visible,b.visible))})},renderSeries:function(){k(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&k(b.items,function(c){var e=B(b.style,c.style),f=C(e.left)+a.plotLeft,h=C(e.top)+a.plotTop+12;delete e.left;delete e.top;a.renderer.text(c.html,
f,h).attr({zIndex:2}).css(e).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,e,f,h;this.setTitle();this.legend=new u(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;e=this.plotHeight-=21;k(a,function(a){a.setScale()});this.getAxisMargins();f=1.1<c/this.plotWidth;h=1.05<e/this.plotHeight;if(f||h)k(a,function(a){(a.horiz&&f||!a.horiz&&h)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&
k(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=this;a=H(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(N.location.href=a.href)}).attr({align:a.position.align,
zIndex:8}).css(a.style).add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,c=b.axes,f=b.series,h=b.container,d,l=h&&h.parentNode;e(b,"destroy");n[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");w(b);for(d=c.length;d--;)c[d]=c[d].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(d=f.length;d--;)f[d]=f[d].destroy();k("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),
function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});h&&(h.innerHTML="",w(h),l&&r(h));for(d in b)delete b[d]},isReadyToRender:function(){var a=this;return x||N!=N.top||"complete"===t.readyState?!0:(t.attachEvent("onreadystatechange",function(){t.detachEvent("onreadystatechange",a.firstRender);"complete"===t.readyState&&a.firstRender()}),!1)},firstRender:function(){var a=this,b=a.options;if(a.isReadyToRender()){a.getContainer();e(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();
a.getAxes();k(b.series||[],function(b){a.initSeries(b)});a.linkSeries();e(a,"beforeRender");F&&(a.pointer=new F(a,b));a.render();a.renderer.draw();if(!a.renderer.imgCount&&a.onload)a.onload();a.cloneRenderTo(!0)}},onload:function(){k([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);e(this,"load");this.initReflow();this.onload=null}}})(K);(function(a){var A,y=a.each,E=a.extend,G=a.erase,t=a.fireEvent,g=a.format,d=a.isArray,m=a.isNumber,r=a.pick,
n=a.removeEvent;A=a.Point=function(){};A.prototype={init:function(a,b,d){this.series=a;this.color=a.color;this.applyOptions(b,d);a.options.colorByPoint?(b=a.options.colors||a.chart.options.colors,this.color=this.color||b[a.colorCounter],b=b.length,d=a.colorCounter,a.colorCounter++,a.colorCounter===b&&(a.colorCounter=0)):d=a.colorIndex;this.colorIndex=r(this.colorIndex,d);a.chart.pointCount++;return this},applyOptions:function(a,b){var d=this.series,g=d.options.pointValKey||d.pointValKey;a=A.prototype.optionsToObject.call(this,
a);E(this,a);this.options=this.options?E(this.options,a):a;a.group&&delete this.group;g&&(this.y=this[g]);this.isNull=r(this.isValid&&!this.isValid(),null===this.x||!m(this.y,!0));"name"in this&&void 0===b&&d.xAxis&&d.xAxis.hasNames&&(this.x=d.xAxis.nameToX(this));void 0===this.x&&d&&(this.x=void 0===b?d.autoIncrement(this):b);return this},optionsToObject:function(a){var b={},k=this.series,g=k.options.keys,n=g||k.pointArrayMap||["y"],e=n.length,c=0,l=0;if(m(a)||null===a)b[n[0]]=a;else if(d(a))for(!g&&
a.length>e&&(k=typeof a[0],"string"===k?b.name=a[0]:"number"===k&&(b.x=a[0]),c++);l<e;)g&&void 0===a[c]||(b[n[l]]=a[c]),c++,l++;else"object"===typeof a&&(b=a,a.dataLabels&&(k._hasPointLabels=!0),a.marker&&(k._hasPointMarkers=!0));return b},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")},getZone:function(){var a=
this.series,b=a.zones,a=a.zoneAxis||"y",d=0,g;for(g=b[d];this[a]>=g.value;)g=b[++d];g&&g.color&&!this.options.color&&(this.color=g.color);return g},destroy:function(){var a=this.series.chart,b=a.hoverPoints,d;a.pointCount--;b&&(this.setState(),G(b,this),b.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)n(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(d in this)this[d]=null},destroyElements:function(){for(var a=["graphic",
"dataLabel","dataLabelUpper","connector","shadowGroup"],b,d=6;d--;)b=a[d],this[b]&&(this[b]=this[b].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var b=this.series,d=b.tooltipOptions,n=r(d.valueDecimals,""),m=d.valuePrefix||"",e=d.valueSuffix||"";y(b.pointArrayMap||["y"],function(b){b="{point."+b;if(m||e)a=a.replace(b+
"}",m+b+"}"+e);a=a.replace(b+"}",b+":,."+n+"f}")});return g(a,{point:this,series:this.series})},firePointEvent:function(a,b,d){var g=this,n=this.series.options;(n.point.events[a]||g.options&&g.options.events&&g.options.events[a])&&this.importEvents();"click"===a&&n.allowPointSelect&&(d=function(a){g.select&&g.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});t(this,a,b,d)},visible:!0}})(K);(function(a){var A=a.addEvent,y=a.animObject,E=a.arrayMax,G=a.arrayMin,t=a.correctFloat,g=a.Date,d=a.defaultOptions,
m=a.defaultPlotOptions,r=a.defined,n=a.each,p=a.erase,b=a.error,k=a.extend,v=a.fireEvent,B=a.grep,e=a.isArray,c=a.isNumber,l=a.isString,q=a.merge,h=a.pick,f=a.removeEvent,u=a.splat,D=a.stableSort,H=a.SVGElement,F=a.syncTimeout,I=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",radius:4,states:{hover:{enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",
lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textShadow:"1px 1px contrast, -1px -1px contrast, -1px 1px contrast, 1px -1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3},{isCartesian:!0,
pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,b){var c=this,e,f,d=a.series,l=function(a,b){return h(a.options.index,a._i)-h(b.options.index,b._i)};c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();k(c,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});f=b.events;for(e in f)A(c,e,f[e]);if(f&&f.click||b.point&&b.point.events&&b.point.events.click||
b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();n(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(b.data,!1);c.isCartesian&&(a.hasCartesianSeries=!0);d.push(c);c._i=d.length-1;D(d,l);this.yAxis&&D(this.yAxis.series,l);n(d,function(a,b){a.index=b;a.name=a.name||"Series "+(b+1)})},bindAxes:function(){var a=this,c=a.options,e=a.chart,f;n(a.axisTypes||[],function(h){n(e[h],function(b){f=b.options;if(c[h]===f.index||void 0!==c[h]&&c[h]===f.id||void 0===c[h]&&0===f.index)b.series.push(a),
a[h]=b,b.isDirty=!0});a[h]||a.optionalAxis===h||b(18,!0)})},updateParallelArrays:function(a,b){var e=a.series,f=arguments,h=c(b)?function(c){var f="y"===c&&e.toYData?e.toYData(a):a[c];e[c+"Data"][b]=f}:function(a){Array.prototype[b].apply(e[a+"Data"],Array.prototype.slice.call(f,2))};n(e.parallelArrays,h)},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,e=a.pointIntervalUnit,b=h(b,a.pointStart,0);this.pointInterval=c=h(this.pointInterval,a.pointInterval,1);e&&(a=new g(b),"day"===e?
a=+a[g.hcSetDate](a[g.hcGetDate]()+c):"month"===e?a=+a[g.hcSetMonth](a[g.hcGetMonth]()+c):"year"===e&&(a=+a[g.hcSetFullYear](a[g.hcGetFullYear]()+c)),c=a-b);this.xIncrement=b+c;return b},setOptions:function(a){var b=this.chart,c=b.options.plotOptions,b=b.userOptions||{},e=b.plotOptions||{},f=c[this.type];this.userOptions=a;c=q(f,c.series,a);this.tooltipOptions=q(d.tooltip,d.plotOptions[this.type].tooltip,b.tooltip,e.series&&e.series.tooltip,e[this.type]&&e[this.type].tooltip,a.tooltip);null===f.marker&&
delete c.marker;this.zoneAxis=c.zoneAxis;a=this.zones=(c.zones||[]).slice();!c.negativeColor&&!c.negativeFillColor||c.zones||a.push({value:c[this.zoneAxis+"Threshold"]||c.threshold||0,className:"highcharts-negative",color:c.negativeColor,fillColor:c.negativeFillColor});a.length&&r(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return c},getCyclic:function(a,b,c){var e,f=this.userOptions,d=a+"Index",k=a+"Counter",l=c?c.length:h(this.chart.options.chart[a+"Count"],this.chart[a+
"Count"]);b||(e=h(f[d],f["_"+d]),r(e)||(f["_"+d]=e=this.chart[k]%l,this.chart[k]+=1),c&&(b=c[e]));void 0!==e&&(this[d]=e);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||m[this.type].color,this.chart.options.colors)},getSymbol:function(){var a=this.options.marker;this.getCyclic("symbol",a.symbol,this.chart.options.symbols);/^url/.test(this.symbol)&&(a.radius=0)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,setData:function(a,
f,d,k){var g=this,u=g.points,p=u&&u.length||0,q,m=g.options,r=g.chart,v=null,D=g.xAxis,t=m.turboThreshold,F=this.xData,H=this.yData,B=(q=g.pointArrayMap)&&q.length;a=a||[];q=a.length;f=h(f,!0);if(!1!==k&&q&&p===q&&!g.cropped&&!g.hasGroupedData&&g.visible)n(a,function(a,b){u[b].update&&a!==m.data[b]&&u[b].update(a,!1,null,!1)});else{g.xIncrement=null;g.colorCounter=0;n(this.parallelArrays,function(a){g[a+"Data"].length=0});if(t&&q>t){for(d=0;null===v&&d<q;)v=a[d],d++;if(c(v))for(d=0;d<q;d++)F[d]=this.autoIncrement(),
H[d]=a[d];else if(e(v))if(B)for(d=0;d<q;d++)v=a[d],F[d]=v[0],H[d]=v.slice(1,B+1);else for(d=0;d<q;d++)v=a[d],F[d]=v[0],H[d]=v[1];else b(12)}else for(d=0;d<q;d++)void 0!==a[d]&&(v={series:g},g.pointClass.prototype.applyOptions.apply(v,[a[d]]),g.updateParallelArrays(v,d));l(H[0])&&b(14,!0);g.data=[];g.options.data=g.userOptions.data=a;for(d=p;d--;)u[d]&&u[d].destroy&&u[d].destroy();D&&(D.minRange=D.userMinRange);g.isDirty=r.isDirtyBox=!0;g.isDirtyData=!!u;d=!1}"point"===m.legendType&&(this.processData(),
this.generatePoints());f&&r.redraw(d)},processData:function(a){var c=this.xData,e=this.yData,f=c.length,d;d=0;var h,k,l=this.xAxis,g,u=this.options;g=u.cropThreshold;var p=this.getExtremesFromAll||u.getExtremesFromAll,q=this.isCartesian,u=l&&l.val2lin,n=l&&l.isLog,m,v;if(q&&!this.isDirty&&!l.isDirty&&!this.yAxis.isDirty&&!a)return!1;l&&(a=l.getExtremes(),m=a.min,v=a.max);if(q&&this.sorted&&!p&&(!g||f>g||this.forceCrop))if(c[f-1]<m||c[0]>v)c=[],e=[];else if(c[0]<m||c[f-1]>v)d=this.cropData(this.xData,
this.yData,m,v),c=d.xData,e=d.yData,d=d.start,h=!0;for(g=c.length||1;--g;)f=n?u(c[g])-u(c[g-1]):c[g]-c[g-1],0<f&&(void 0===k||f<k)?k=f:0>f&&this.requireSorting&&b(15);this.cropped=h;this.cropStart=d;this.processedXData=c;this.processedYData=e;this.closestPointRange=k},cropData:function(a,b,c,e){var f=a.length,d=0,k=f,l=h(this.cropShoulder,1),g;for(g=0;g<f;g++)if(a[g]>=c){d=Math.max(0,g-l);break}for(c=g;c<f;c++)if(a[c]>e){k=c+l;break}return{xData:a.slice(d,k),yData:b.slice(d,k),start:d,end:k}},generatePoints:function(){var a=
this.options.data,b=this.data,c,e=this.processedXData,f=this.processedYData,d=this.pointClass,h=e.length,k=this.cropStart||0,l,g=this.hasGroupedData,p,q=[],n;b||g||(b=[],b.length=a.length,b=this.data=b);for(n=0;n<h;n++)l=k+n,g?(q[n]=(new d).init(this,[e[n]].concat(u(f[n]))),q[n].dataGroup=this.groupMap[n]):(b[l]?p=b[l]:void 0!==a[l]&&(b[l]=p=(new d).init(this,a[l],e[n])),q[n]=p),q[n].index=l;if(b&&(h!==(c=b.length)||g))for(n=0;n<c;n++)n!==k||g||(n+=h),b[n]&&(b[n].destroyElements(),b[n].plotX=void 0);
this.data=b;this.points=q},getExtremes:function(a){var b=this.yAxis,f=this.processedXData,d,h=[],k=0;d=this.xAxis.getExtremes();var l=d.min,g=d.max,u,p,n,q;a=a||this.stackedYData||this.processedYData||[];d=a.length;for(q=0;q<d;q++)if(p=f[q],n=a[q],u=(c(n,!0)||e(n))&&(!b.isLog||n.length||0<n),p=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(f[q+1]||p)>=l&&(f[q-1]||p)<=g,u&&p)if(u=n.length)for(;u--;)null!==n[u]&&(h[k++]=n[u]);else h[k++]=n;this.dataMin=G(h);this.dataMax=E(h)},
translate:function(){this.processedXData||this.processData();this.generatePoints();for(var a=this.options,b=a.stacking,e=this.xAxis,f=e.categories,d=this.yAxis,k=this.points,l=k.length,g=!!this.modifyValue,u=a.pointPlacement,p="between"===u||c(u),n=a.threshold,q=a.startFromThreshold?n:0,m,v,D,F,H=Number.MAX_VALUE,a=0;a<l;a++){var B=k[a],I=B.x,y=B.y;v=B.low;var A=b&&d.stacks[(this.negStacks&&y<(q?0:n)?"-":"")+this.stackKey],E;d.isLog&&null!==y&&0>=y&&(B.isNull=!0);B.plotX=m=t(Math.min(Math.max(-1E5,
e.translate(I,0,0,0,1,u,"flags"===this.type)),1E5));b&&this.visible&&!B.isNull&&A&&A[I]&&(F=this.getStackIndicator(F,I,this.index),E=A[I],y=E.points[F.key],v=y[0],y=y[1],v===q&&F.key===A[I].base&&(v=h(n,d.min)),d.isLog&&0>=v&&(v=null),B.total=B.stackTotal=E.total,B.percentage=E.total&&B.y/E.total*100,B.stackY=y,E.setOffset(this.pointXOffset||0,this.barW||0));B.yBottom=r(v)?d.translate(v,0,1,0,1):null;g&&(y=this.modifyValue(y,B));B.plotY=v="number"===typeof y&&Infinity!==y?Math.min(Math.max(-1E5,d.translate(y,
0,1,0,1)),1E5):void 0;B.isInside=void 0!==v&&0<=v&&v<=d.len&&0<=m&&m<=e.len;B.clientX=p?t(e.translate(I,0,0,0,1,u)):m;B.negative=B.y<(n||0);B.category=f&&void 0!==f[B.x]?f[B.x]:B.x;B.isNull||(void 0!==D&&(H=Math.min(H,Math.abs(m-D))),D=m)}this.closestPointRangePx=H},getValidPoints:function(a,b){var c=this.chart;return B(a||this.points||[],function(a){return b&&!c.isInsidePlot(a.plotX,a.plotY,c.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,e=b.renderer,f=b.inverted,
d=this.clipBox,h=d||b.clipBox,k=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,h.height,c.xAxis,c.yAxis].join(),l=b[k],g=b[k+"m"];l||(a&&(h.width=0,b[k+"m"]=g=e.clipRect(-99,f?-b.plotLeft:-b.plotTop,99,f?b.chartWidth:b.chartHeight)),b[k]=l=e.clipRect(h),l.count={length:0});a&&!l.count[this.index]&&(l.count[this.index]=!0,l.count.length+=1);!1!==c.clip&&(this.group.clip(a||d?l:b.clipRect),this.markerGroup.clip(g),this.sharedClipKey=k);a||(l.count[this.index]&&(delete l.count[this.index],
--l.count.length),0===l.count.length&&k&&b[k]&&(d||(b[k]=b[k].destroy()),b[k+"m"]&&(b[k+"m"]=b[k+"m"].destroy())))},animate:function(a){var b=this.chart,c=y(this.options.animation),e;a?this.setClip(c):(e=this.sharedClipKey,(a=b[e])&&a.animate({width:b.plotSizeX},c),b[e+"m"]&&b[e+"m"].animate({width:b.plotSizeX+99},c),this.animate=null)},afterAnimate:function(){this.setClip();v(this,"afterAnimate")},drawPoints:function(){var a=this.points,b=this.chart,e,f,d,l,g,u,p,n,q=this.options.marker,m,v,r,D=
this.markerGroup,t=h(q.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>2*q.radius);if(!1!==q.enabled||this._hasPointMarkers)for(d=a.length;d--;)l=a[d],e=Math.floor(l.plotX),f=l.plotY,n=l.graphic,m=l.marker||{},v=!!l.marker,g=t&&void 0===m.enabled||m.enabled,r=l.isInside,g&&c(f)&&null!==l.y?(g=q.radius,u=h(m.symbol,this.symbol),p=0===u.indexOf("url"),n?n[r?"show":"hide"](!0).animate(k({x:e-g,y:f-g},n.symbolName?{width:2*g,height:2*g}:{})):r&&(0<g||p)&&(l.graphic=n=b.renderer.symbol(u,
e-g,f-g,2*g,2*g,v?m:q).attr({r:g}).add(D)),n&&n.attr(this.pointAttribs(l,l.selected&&"select")),n&&n.addClass(l.getClassName(),!0)):n&&(l.graphic=n.destroy())},pointAttribs:function(a,b){var c=this.options.marker,e=a&&a.options,f=e&&e.marker||{},d=c.lineWidth,h=this.color,e=e&&e.color,k=a&&a.color,l,g;a&&this.zones.length&&(g=a.getZone())&&g.color&&(l=g.color);h=e||l||k||h;l=f.fillColor||c.fillColor||h;h=f.lineColor||c.lineColor||h;b&&(c=c.states[b],f=f.states&&f.states[b]||{},d=c.lineWidth||d+c.lineWidthPlus,
l=f.fillColor||c.fillColor||l,h=f.lineColor||c.lineColor||h);return{stroke:h,"stroke-width":d,fill:l}},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(I.navigator.userAgent),e,d=a.data||[],h,k,l;v(a,"destroy");f(a);n(a.axisTypes||[],function(b){(l=a[b])&&l.series&&(p(l.series,a),l.isDirty=l.forceRedraw=!0)});a.legendItem&&a.chart.legend.destroyItem(a);for(e=d.length;e--;)(h=d[e])&&h.destroy&&h.destroy();a.points=null;clearTimeout(a.animationTimeout);for(k in a)a[k]instanceof H&&
!a[k].survive&&(e=c&&"group"===k?"hide":"destroy",a[k][e]());b.hoverSeries===a&&(b.hoverSeries=null);p(b.series,a);for(k in a)delete a[k]},getGraphPath:function(a,b,c){var e=this,f=e.options,d=f.step,h,k=[],l=[],g;a=a||e.points;(h=a.reversed)&&a.reverse();(d={right:1,center:2}[d]||d&&3)&&h&&(d=4-d);!f.connectNulls||b||c||(a=this.getValidPoints(a));n(a,function(h,u){var p=h.plotX,n=h.plotY,q=a[u-1];(h.leftCliff||q&&q.rightCliff)&&!c&&(g=!0);h.isNull&&!r(b)&&0<u?g=!f.connectNulls:h.isNull&&!b?g=!0:
(0===u||g?q=["M",h.plotX,h.plotY]:e.getPointSpline?q=e.getPointSpline(a,h,u):d?(q=1===d?["L",q.plotX,n]:2===d?["L",(q.plotX+p)/2,q.plotY,"L",(q.plotX+p)/2,n]:["L",p,q.plotY],q.push("L",p,n)):q=["L",p,n],l.push(h.x),d&&l.push(h.x),k.push.apply(k,q),g=!1)});k.xMap=l;return e.graphPath=k},drawGraph:function(){var a=this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),e=[["graph","highcharts-graph",b.lineColor||this.color,b.dashStyle]];n(this.zones,function(c,f){e.push(["zone-graph-"+
f,"highcharts-graph highcharts-zone-graph-"+f+" "+(c.className||""),c.color||a.color,c.dashStyle||b.dashStyle])});n(e,function(e,f){var d=e[0],h=a[d];h?(h.endX=c.xMap,h.animate({d:c})):c.length&&(a[d]=a.chart.renderer.path(c).addClass(e[1]).attr({zIndex:1}).add(a.group),h={stroke:e[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},e[3]?h.dashstyle=e[3]:"square"!==b.linecap&&(h["stroke-linecap"]=h["stroke-linejoin"]="round"),h=a[d].attr(h).shadow(2>f&&b.shadow));h&&(h.startX=c.xMap,
h.isArea=c.isArea)})},applyZones:function(){var a=this,b=this.chart,c=b.renderer,e=this.zones,f,d,k=this.clips||[],l,g=this.graph,u=this.area,p=Math.max(b.chartWidth,b.chartHeight),q=this[(this.zoneAxis||"y")+"Axis"],m,v,r=b.inverted,D,t,F,H,B=!1;e.length&&(g||u)&&q&&void 0!==q.min&&(v=q.reversed,D=q.horiz,g&&g.hide(),u&&u.hide(),m=q.getExtremes(),n(e,function(e,n){f=v?D?b.plotWidth:0:D?0:q.toPixels(m.min);f=Math.min(Math.max(h(d,f),0),p);d=Math.min(Math.max(Math.round(q.toPixels(h(e.value,m.max),
!0)),0),p);B&&(f=d=q.toPixels(m.max));t=Math.abs(f-d);F=Math.min(f,d);H=Math.max(f,d);q.isXAxis?(l={x:r?H:F,y:0,width:t,height:p},D||(l.x=b.plotHeight-l.x)):(l={x:0,y:r?H:F,width:p,height:t},D&&(l.y=b.plotWidth-l.y));r&&c.isVML&&(l=q.isXAxis?{x:0,y:v?F:H,height:l.width,width:b.chartWidth}:{x:l.y-b.plotLeft-b.spacingBox.x,y:0,width:l.height,height:b.chartHeight});k[n]?k[n].animate(l):(k[n]=c.clipRect(l),g&&a["zone-graph-"+n].clip(k[n]),u&&a["zone-area-"+n].clip(k[n]));B=e.value>m.max}),this.clips=
k)},invertGroups:function(a){function b(){var e={width:c.yAxis.len,height:c.xAxis.len};n(["group","markerGroup"],function(b){c[b]&&c[b].attr(e).invert(a)})}var c=this,e=c.chart;c.xAxis&&(A(e,"resize",b),A(c,"destroy",function(){f(e,"resize",b)}),b(a),c.invertGroups=b)},plotGroup:function(a,b,c,e,f){var d=this[a],h=!d;h&&(this[a]=d=this.chart.renderer.g(b).attr({zIndex:e||.1}).add(f),d.addClass("highcharts-series-"+this.index+" highcharts-"+this.type+"-series highcharts-color-"+this.colorIndex+" "+
(this.options.className||"")));d.attr({visibility:c})[h?"attr":"animate"](this.getPlotBox());return d},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;a.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,e=a.options,f=!!a.animate&&b.renderer.isSVG&&y(e.animation).duration,d=a.visible?"inherit":"hidden",h=e.zIndex,k=a.hasRendered,l=b.seriesGroup,g=b.inverted;c=a.plotGroup("group",
"series",d,h,l);a.markerGroup=a.plotGroup("markerGroup","markers",d,h,l);f&&a.animate(!0);c.inverted=a.isCartesian?g:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(g);!1===e.clip||a.sharedClipKey||k||c.clip(b.clipRect);f&&a.animate();k||(a.animationTimeout=F(function(){a.afterAnimate()},f));a.isDirty=a.isDirtyData=!1;a.hasRendered=!0},redraw:function(){var a=
this.chart,b=this.isDirty||this.isDirtyData,c=this.group,e=this.xAxis,f=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:h(e&&e.left,a.plotLeft),translateY:h(f&&f.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdDimensions:1,kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,e=this.yAxis,f=this.chart.inverted;return this.searchKDTree({clientX:f?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:f?e.len-a.chartX+
e.pos:a.chartY-e.pos},b)},buildKDTree:function(){function a(c,e,f){var d,h;if(h=c&&c.length)return d=b.kdAxisArray[e%f],c.sort(function(a,b){return a[d]-b[d]}),h=Math.floor(h/2),{point:c[h],left:a(c.slice(0,h),e+1,f),right:a(c.slice(h+1),e+1,f)}}var b=this,c=b.kdDimensions;delete b.kdTree;F(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),c,c)},b.options.kdNow?0:1)},searchKDTree:function(a,b){function c(a,b,k,l){var g=b.point,u=e.kdAxisArray[k%l],q,n,p=g;n=r(a[f])&&r(g[f])?Math.pow(a[f]-
g[f],2):null;q=r(a[d])&&r(g[d])?Math.pow(a[d]-g[d],2):null;q=(n||0)+(q||0);g.dist=r(q)?Math.sqrt(q):Number.MAX_VALUE;g.distX=r(n)?Math.sqrt(n):Number.MAX_VALUE;u=a[u]-g[u];q=0>u?"left":"right";n=0>u?"right":"left";b[q]&&(q=c(a,b[q],k+1,l),p=q[h]<p[h]?q:g);b[n]&&Math.sqrt(u*u)<p[h]&&(a=c(a,b[n],k+1,l),p=a[h]<p[h]?a:p);return p}var e=this,f=this.kdAxisArray[0],d=this.kdAxisArray[1],h=b?"distX":"dist";this.kdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,this.kdDimensions,this.kdDimensions)}})})(K);
(function(a){function A(a,d,b,k,g){var m=a.chart.inverted;this.axis=a;this.isNegative=b;this.options=d;this.x=k;this.total=null;this.points={};this.stack=g;this.rightCliff=this.leftCliff=0;this.alignOptions={align:d.align||(m?b?"left":"right":"center"),verticalAlign:d.verticalAlign||(m?"middle":b?"bottom":"top"),y:r(d.y,m?4:b?14:-6),x:r(d.x,m?b?-6:6:0)};this.textAlign=d.textAlign||(m?b?"right":"left":"center")}var y=a.Axis,E=a.Chart,G=a.correctFloat,t=a.defined,g=a.destroyObjectProperties,d=a.each,
m=a.format,r=a.pick;a=a.Series;A.prototype={destroy:function(){g(this,this.axis)},render:function(a){var d=this.options,b=d.format,b=b?m(b,this):d.formatter.call(this);this.label?this.label.attr({text:b,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(b,null,null,d.useHTML).css(d.style).attr({align:this.textAlign,rotation:d.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,d){var b=this.axis,k=b.chart,g=k.inverted,m=b.reversed,m=this.isNegative&&!m||!this.isNegative&&m,e=b.translate(b.usePercentage?
100:this.total,0,0,0,1),b=b.translate(0),b=Math.abs(e-b),c=k.xAxis[0].translate(this.x)+a,l=k.plotHeight,m={x:g?m?e:e-b:c,y:g?l-c-d:m?l-e-b:l-e,width:g?b:d,height:g?d:b};if(g=this.label)g.align(this.alignOptions,null,m),m=g.alignAttr,g[!1===this.options.crop||k.isInsidePlot(m.x,m.y)?"show":"hide"](!0)}};E.prototype.getStacks=function(){var a=this;d(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});d(a.series,function(d){!d.options.stacking||!0!==d.visible&&!1!==a.options.chart.ignoreHiddenSeries||
(d.stackKey=d.type+r(d.options.stack,""))})};y.prototype.buildStacks=function(){var a=this.series,d,b=r(this.options.reversedStacks,!0),k=a.length,g;if(!this.isXAxis){this.usePercentage=!1;for(g=k;g--;)a[b?g:k-g-1].setStackedPoints();for(g=k;g--;)d=a[b?g:k-g-1],d.setStackCliffs&&d.setStackCliffs();if(this.usePercentage)for(g=0;g<k;g++)a[g].setPercentStacks()}};y.prototype.renderStackTotals=function(){var a=this.chart,d=a.renderer,b=this.stacks,k,g,m=this.stackTotalGroup;m||(this.stackTotalGroup=m=
d.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());m.translate(a.plotLeft,a.plotTop);for(k in b)for(g in a=b[k],a)a[g].render(m)};y.prototype.resetStacks=function(){var a=this.stacks,d,b;if(!this.isXAxis)for(d in a)for(b in a[d])a[d][b].touched<this.stacksTouched?(a[d][b].destroy(),delete a[d][b]):(a[d][b].total=null,a[d][b].cum=0)};y.prototype.cleanStacks=function(){var a,d,b;if(!this.isXAxis)for(d in this.oldStacks&&(a=this.stacks=this.oldStacks),a)for(b in a[d])a[d][b].cum=a[d][b].total};
a.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var a=this.processedXData,d=this.processedYData,b=[],k=d.length,g=this.options,m=g.threshold,e=g.startFromThreshold?m:0,c=g.stack,g=g.stacking,l=this.stackKey,q="-"+l,h=this.negStacks,f=this.yAxis,u=f.stacks,D=f.oldStacks,H,F,I,C,w,y,E;f.stacksTouched+=1;for(w=0;w<k;w++)y=a[w],E=d[w],H=this.getStackIndicator(H,y,this.index),C=H.key,I=(F=h&&E<(e?0:m))?q:l,u[I]||(u[I]=
{}),u[I][y]||(D[I]&&D[I][y]?(u[I][y]=D[I][y],u[I][y].total=null):u[I][y]=new A(f,f.options.stackLabels,F,y,c)),I=u[I][y],null!==E&&(I.points[C]=I.points[this.index]=[r(I.cum,e)],t(I.cum)||(I.base=C),I.touched=f.stacksTouched,0<H.index&&!1===this.singleStacks&&(I.points[C][0]=I.points[this.index+","+y+",0"][0])),"percent"===g?(F=F?l:q,h&&u[F]&&u[F][y]?(F=u[F][y],I.total=F.total=Math.max(F.total,I.total)+Math.abs(E)||0):I.total=G(I.total+(Math.abs(E)||0))):I.total=G(I.total+(E||0)),I.cum=r(I.cum,e)+
(E||0),null!==E&&(I.points[C].push(I.cum),b[w]=I.cum);"percent"===g&&(f.usePercentage=!0);this.stackedYData=b;f.oldStacks={}}};a.prototype.setPercentStacks=function(){var a=this,g=a.stackKey,b=a.yAxis.stacks,k=a.processedXData,m;d([g,"-"+g],function(d){for(var e=k.length,c,g;e--;)if(c=k[e],m=a.getStackIndicator(m,c,a.index),c=(g=b[d]&&b[d][c])&&g.points[m.key])g=g.total?100/g.total:0,c[0]=G(c[0]*g),c[1]=G(c[1]*g),a.stackedYData[e]=c[1]})};a.prototype.getStackIndicator=function(a,d,b){t(a)&&a.x===
d?a.index++:a={x:d,index:0};a.key=[b,d,a.index].join();return a}})(K);(function(a){var A=a.addEvent,y=a.animate,E=a.Axis,G=a.createElement,t=a.css,g=a.defined,d=a.each,m=a.erase,r=a.extend,n=a.fireEvent,p=a.inArray,b=a.isObject,k=a.merge,v=a.pick,B=a.Point,e=a.Series,c=a.seriesTypes,l=a.setAnimation,q=a.splat;r(a.Chart.prototype,{addSeries:function(a,b,c){var e,d=this;a&&(b=v(b,!0),n(d,"addSeries",{options:a},function(){e=d.initSeries(a);d.isDirtyLegend=!0;d.linkSeries();b&&d.redraw(c)}));return e},
addAxis:function(a,b,c,e){var d=b?"xAxis":"yAxis",g=this.options;a=k(a,{index:this[d].length,isX:b});new E(this,a);g[d]=q(g[d]||{});g[d].push(a);v(c,!0)&&this.redraw(e)},showLoading:function(a){var b=this,c=b.options,e=b.loadingDiv,d=c.loading,g=function(){e&&t(e,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};e||(b.loadingDiv=e=G("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=G("span",{className:"highcharts-loading-inner"},
null,e),A(b,"redraw",g));setTimeout(function(){e.className="highcharts-loading"});b.loadingSpan.innerHTML=a||c.lang.loading;t(e,r(d.style,{zIndex:10}));t(b.loadingSpan,d.labelStyle);b.loadingShown||(t(e,{opacity:0,display:""}),y(e,{opacity:d.style.opacity||.5},{duration:d.showDuration||0}));b.loadingShown=!0;g()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",y(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){t(b,
{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),propsRequireUpdateSeries:["chart.polar","chart.ignoreHiddenSeries","chart.type","colors","plotOptions"],update:function(a,b){var c,e={credits:"addCredits",title:"setTitle",
subtitle:"setSubtitle"},l=a.chart,m,n;if(l){k(!0,this.options.chart,l);"className"in l&&this.setClassName(l.className);if("inverted"in l||"polar"in l)this.propFromSeries(),m=!0;for(c in l)l.hasOwnProperty(c)&&(-1!==p("chart."+c,this.propsRequireUpdateSeries)&&(n=!0),-1!==p(c,this.propsRequireDirtyBox)&&(this.isDirtyBox=!0));"style"in l&&this.renderer.setStyle(l.style)}for(c in a){if(this[c]&&"function"===typeof this[c].update)this[c].update(a[c],!1);else if("function"===typeof this[e[c]])this[e[c]](a[c]);
"chart"!==c&&-1!==p(c,this.propsRequireUpdateSeries)&&(n=!0)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&k(!0,this.options.plotOptions,a.plotOptions);d(["xAxis","yAxis","series"],function(b){a[b]&&d(q(a[b]),function(a){var c=g(a.id)&&this.get(a.id)||this[b][0];c&&c.coll===b&&c.update(a,!1)},this)},this);m&&d(this.axes,function(a){a.update({},!1)});n&&d(this.series,function(a){a.update({},!1)});a.loading&&k(!0,this.options.loading,a.loading);l&&("width"in l||"height"in l)?this.setSize(l.width,
l.height):v(b,!0)&&this.redraw()},setSubtitle:function(a){this.setTitle(void 0,a)}});r(B.prototype,{update:function(a,c,e,d){function g(){k.applyOptions(a);null===k.y&&q&&(k.graphic=q.destroy());b(a,!0)&&(q&&q.element&&a&&a.marker&&a.marker.symbol&&(k.graphic=q.destroy()),a&&a.dataLabels&&k.dataLabel&&(k.dataLabel=k.dataLabel.destroy()));m=k.index;l.updateParallelArrays(k,m);p.data[m]=b(p.data[m],!0)?k.options:a;l.isDirty=l.isDirtyData=!0;!l.fixedBox&&l.hasCartesianSeries&&(n.isDirtyBox=!0);"point"===
p.legendType&&(n.isDirtyLegend=!0);c&&n.redraw(e)}var k=this,l=k.series,q=k.graphic,m,n=l.chart,p=l.options;c=v(c,!0);!1===d?g():k.firePointEvent("update",{options:a},g)},remove:function(a,b){this.series.removePoint(p(this,this.series.data),a,b)}});r(e.prototype,{addPoint:function(a,b,c,e){var d=this.options,g=this.data,k=this.chart,l=this.xAxis&&this.xAxis.names,q=d.data,m,n,p=this.xData,r,t;b=v(b,!0);m={series:this};this.pointClass.prototype.applyOptions.apply(m,[a]);t=m.x;r=p.length;if(this.requireSorting&&
t<p[r-1])for(n=!0;r&&p[r-1]>t;)r--;this.updateParallelArrays(m,"splice",r,0,0);this.updateParallelArrays(m,r);l&&m.name&&(l[t]=m.name);q.splice(r,0,a);n&&(this.data.splice(r,0,null),this.processData());"point"===d.legendType&&this.generatePoints();c&&(g[0]&&g[0].remove?g[0].remove(!1):(g.shift(),this.updateParallelArrays(m,"shift"),q.shift()));this.isDirtyData=this.isDirty=!0;b&&k.redraw(e)},removePoint:function(a,b,c){var e=this,d=e.data,g=d[a],k=e.points,q=e.chart,m=function(){k&&k.length===d.length&&
k.splice(a,1);d.splice(a,1);e.options.data.splice(a,1);e.updateParallelArrays(g||{series:e},"splice",a,1);g&&g.destroy();e.isDirty=!0;e.isDirtyData=!0;b&&q.redraw()};l(c,q);b=v(b,!0);g?g.firePointEvent("remove",null,m):m()},remove:function(a,b,c){function e(){d.destroy();g.isDirtyLegend=g.isDirtyBox=!0;g.linkSeries();v(a,!0)&&g.redraw(b)}var d=this,g=d.chart;!1!==c?n(d,"remove",null,e):e()},update:function(a,b){var e=this,g=this.chart,l=this.userOptions,q=this.type,m=a.type||l.type||g.options.chart.type,
n=c[q].prototype,p=["group","markerGroup","dataLabelsGroup"],t;if(m&&m!==q||void 0!==a.zIndex)p.length=0;d(p,function(a){p[a]=e[a];delete e[a]});a=k(l,{animation:!1,index:this.index,pointStart:this.xData[0]},{data:this.options.data},a);this.remove(!1,null,!1);for(t in n)this[t]=void 0;r(this,c[m||q].prototype);d(p,function(a){e[a]=p[a]});this.init(g,a);g.linkSeries();v(b,!0)&&g.redraw(!1)}});r(E.prototype,{update:function(a,b){var c=this.chart;a=c.options[this.coll][this.options.index]=k(this.userOptions,
a);this.destroy(!0);this.init(c,r(a,{events:void 0}));c.isDirtyBox=!0;v(b,!0)&&c.redraw()},remove:function(a){for(var b=this.chart,c=this.coll,e=this.series,g=e.length;g--;)e[g]&&e[g].remove(!1);m(b.axes,this);m(b[c],this);b.options[c].splice(this.options.index,1);d(b[c],function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;v(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}})})(K);(function(a){var A=a.color,y=
a.each,E=a.map,G=a.pick,t=a.Series,g=a.seriesType;g("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(){var a=[],g=[],r=this.xAxis,n=this.yAxis,p=n.stacks[this.stackKey],b={},k=this.points,v=this.index,t=n.series,e=t.length,c,l=G(n.options.reversedStacks,!0)?1:-1,q,h;if(this.options.stacking){for(q=0;q<k.length;q++)b[k[q].x]=k[q];for(h in p)null!==p[h].total&&g.push(h);g.sort(function(a,b){return a-b});c=E(t,function(){return this.visible});y(g,function(f,h){var k=
0,t,F;if(b[f]&&!b[f].isNull)a.push(b[f]),y([-1,1],function(a){var d=1===a?"rightNull":"leftNull",k=0,n=p[g[h+a]];if(n)for(q=v;0<=q&&q<e;)t=n.points[q],t||(q===v?b[f][d]=!0:c[q]&&(F=p[f].points[q])&&(k-=F[1]-F[0])),q+=l;b[f][1===a?"rightCliff":"leftCliff"]=k});else{for(q=v;0<=q&&q<e;){if(t=p[f].points[q]){k=t[1];break}q+=l}k=n.toPixels(k,!0);a.push({isNull:!0,plotX:r.toPixels(f,!0),plotY:k,yBottom:k})}})}return a},getGraphPath:function(a){var g=t.prototype.getGraphPath,r=this.options,n=r.stacking,
p=this.yAxis,b,k,v=[],B=[],e=this.index,c,l=p.stacks[this.stackKey],q=r.threshold,h=p.getThreshold(r.threshold),f,r=r.connectNulls||"percent"===n,u=function(b,f,g){var k=a[b];b=n&&l[k.x].points[e];var u=k[g+"Null"]||0;g=k[g+"Cliff"]||0;var m,r,k=!0;g||u?(m=(u?b[0]:b[1])+g,r=b[0]+g,k=!!u):!n&&a[f]&&a[f].isNull&&(m=r=q);void 0!==m&&(B.push({plotX:c,plotY:null===m?h:p.getThreshold(m),isNull:k}),v.push({plotX:c,plotY:null===r?h:p.getThreshold(r),doCurve:!1}))};a=a||this.points;n&&(a=this.getStackPoints());
for(b=0;b<a.length;b++)if(k=a[b].isNull,c=G(a[b].rectPlotX,a[b].plotX),f=G(a[b].yBottom,h),!k||r)r||u(b,b-1,"left"),k&&!n&&r||(B.push(a[b]),v.push({x:b,plotX:c,plotY:f})),r||u(b,b+1,"right");b=g.call(this,B,!0,!0);v.reversed=!0;k=g.call(this,v,!0,!0);k.length&&(k[0]="L");k=b.concat(k);g=g.call(this,B,!1,r);k.xMap=b.xMap;this.areaPath=k;return g},drawGraph:function(){this.areaPath=[];t.prototype.drawGraph.apply(this);var a=this,g=this.areaPath,r=this.options,n=[["area","highcharts-area",this.color,
r.fillColor]];y(this.zones,function(g,b){n.push(["zone-area-"+b,"highcharts-area highcharts-zone-area-"+b+" "+g.className,g.color||a.color,g.fillColor||r.fillColor])});y(n,function(n){var b=n[0],k=a[b];k?(k.endX=g.xMap,k.animate({d:g})):(k=a[b]=a.chart.renderer.path(g).addClass(n[1]).attr({fill:G(n[3],A(n[2]).setOpacity(G(r.fillOpacity,.75)).get()),zIndex:0}).add(a.group),k.isArea=!0);k.startX=g.xMap;k.shiftUnit=r.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(K);(function(a){var A=
a.extendClass,y=a.merge,E=a.pick,G=a.Series,t=a.seriesTypes;a.defaultPlotOptions.spline=y(a.defaultPlotOptions.line);t.spline=A(G,{type:"spline",getPointSpline:function(a,d,m){var r=d.plotX,n=d.plotY,p=a[m-1];m=a[m+1];var b,k,v,t;if(p&&!p.isNull&&!1!==p.doCurve&&m&&!m.isNull&&!1!==m.doCurve){a=p.plotY;v=m.plotX;m=m.plotY;var e=0;b=(1.5*r+p.plotX)/2.5;k=(1.5*n+a)/2.5;v=(1.5*r+v)/2.5;t=(1.5*n+m)/2.5;v!==b&&(e=(t-k)*(v-r)/(v-b)+n-t);k+=e;t+=e;k>a&&k>n?(k=Math.max(a,n),t=2*n-k):k<a&&k<n&&(k=Math.min(a,
n),t=2*n-k);t>m&&t>n?(t=Math.max(m,n),k=2*n-t):t<m&&t<n&&(t=Math.min(m,n),k=2*n-t);d.rightContX=v;d.rightContY=t}d=["C",E(p.rightContX,p.plotX),E(p.rightContY,p.plotY),E(b,r),E(k,n),r,n];p.rightContX=p.rightContY=null;return d}})})(K);(function(a){var A=a.seriesTypes.area.prototype,y=a.seriesType;y("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:A.getStackPoints,getGraphPath:A.getGraphPath,setStackCliffs:A.setStackCliffs,drawGraph:A.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(K);
(function(a){var A=a.animObject,y=a.color,E=a.each,G=a.extend,t=a.isNumber,g=a.merge,d=a.pick,m=a.Series,r=a.seriesType,n=a.stop,p=a.svg;r("column","line",{borderRadius:0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1,shadow:!1},select:{color:"#cccccc",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,
borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){m.prototype.init.apply(this,arguments);var a=this,d=a.chart;d.hasRendered&&E(d.series,function(d){d.type===a.type&&(d.isDirty=!0)})},getColumnMetrics:function(){var a=this,g=a.options,m=a.xAxis,n=a.yAxis,e=m.reversed,c,l={},q=0;!1===g.grouping?q=1:E(a.chart.series,function(e){var d=e.options,f=e.yAxis,h;e.type===a.type&&e.visible&&n.len===f.len&&n.pos===f.pos&&(d.stacking?(c=
e.stackKey,void 0===l[c]&&(l[c]=q++),h=l[c]):!1!==d.grouping&&(h=q++),e.columnIndex=h)});var h=Math.min(Math.abs(m.transA)*(m.ordinalSlope||g.pointRange||m.closestPointRange||m.tickInterval||1),m.len),f=h*g.groupPadding,u=(h-2*f)/q,g=Math.min(g.maxPointWidth||m.len,d(g.pointWidth,u*(1-2*g.pointPadding)));a.columnMetrics={width:g,offset:(u-g)/2+(f+((a.columnIndex||0)+(e?1:0))*u-h/2)*(e?-1:1)};return a.columnMetrics},crispCol:function(a,d,g,m){var e=this.chart,c=this.borderWidth,l=-(c%2?.5:0),c=c%2?
.5:1;e.inverted&&e.renderer.isVML&&(c+=1);g=Math.round(a+g)+l;a=Math.round(a)+l;m=Math.round(d+m)+c;l=.5>=Math.abs(d)&&.5<m;d=Math.round(d)+c;m-=d;l&&m&&(--d,m+=1);return{x:a,y:d,width:g-a,height:m}},translate:function(){var a=this,g=a.chart,n=a.options,p=a.dense=2>a.closestPointRange*a.xAxis.transA,p=a.borderWidth=d(n.borderWidth,p?0:1),e=a.yAxis,c=a.translatedThreshold=e.getThreshold(n.threshold),l=d(n.minPointLength,5),q=a.getColumnMetrics(),h=q.width,f=a.barW=Math.max(h,1+2*p),u=a.pointXOffset=
q.offset;g.inverted&&(c-=.5);n.pointPadding&&(f=Math.ceil(f));m.prototype.translate.apply(a);E(a.points,function(q){var m=d(q.yBottom,c),n=999+Math.abs(m),n=Math.min(Math.max(-n,q.plotY),e.len+n),p=q.plotX+u,r=f,t=Math.min(n,m),v,B=Math.max(n,m)-t;Math.abs(B)<l&&l&&(B=l,v=!e.reversed&&!q.negative||e.reversed&&q.negative,t=Math.abs(t-c)>l?m-l:c-(v?l:0));q.barX=p;q.pointWidth=h;q.tooltipPos=g.inverted?[e.len+e.pos-g.plotLeft-n,a.xAxis.len-p-r/2,B]:[p+r/2,n+e.pos-g.plotTop,B];q.shapeType="rect";q.shapeArgs=
a.crispCol.apply(a,q.isNull?[q.plotX,e.len/2,0,0]:[p,t,r,B])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,d){var g=this.options,m,e,c=this.pointAttrToOptions||{};e=c.stroke||"borderColor";var l=c["stroke-width"]||"borderWidth",q=a&&a.color||this.color,h=g[e]||this.color||q,c=g.dashStyle,f;a&&this.zones.length&&(q=(m=a.getZone())&&m.color||a.options.color||
this.color);d&&(m=g.states[d],f=m.brightness,q=m.color||void 0!==f&&y(q).brighten(m.brightness).get()||q,h=m[e]||h,c=m.dashStyle||c);e={fill:q,stroke:h,"stroke-width":a[l]||g[l]||this[l]||0};g.borderRadius&&(e.r=g.borderRadius);c&&(e.dashstyle=c);return e},drawPoints:function(){var a=this,d=this.chart,m=a.options,p=d.renderer,e=m.animationLimit||250,c;E(a.points,function(l){var q=l.graphic;t(l.plotY)&&null!==l.y?(c=l.shapeArgs,q?(n(q),q[d.pointCount<e?"animate":"attr"](g(c))):l.graphic=q=p[l.shapeType](c).attr({"class":l.getClassName()}).add(l.group||
a.group),q.attr(a.pointAttribs(l,l.selected&&"select")).shadow(m.shadow,null,m.stacking&&!m.borderRadius)):q&&(l.graphic=q.destroy())})},animate:function(a){var d=this,g=this.yAxis,m=d.options,e=this.chart.inverted,c={};p&&(a?(c.scaleY=.001,a=Math.min(g.pos+g.len,Math.max(g.pos,g.toPixels(m.threshold))),e?c.translateX=a-g.len:c.translateY=a,d.group.attr(c)):(c[e?"translateX":"translateY"]=g.pos,d.group.animate(c,G(A(d.options.animation),{step:function(a,b){d.group.attr({scaleY:Math.max(.001,b.pos)})}})),
d.animate=null))},remove:function(){var a=this,d=a.chart;d.hasRendered&&E(d.series,function(d){d.type===a.type&&(d.isDirty=!0)});m.prototype.remove.apply(a,arguments)}})})(K);(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})})(K);(function(a){var A=a.Series;a=a.seriesType;a("scatter","line",{lineWidth:0,marker:{enabled:!0},tooltip:{headerFormat:'<span style="color:{point.color}">\u25cf</span> <span style="font-size: 0.85em"> {series.name}</span><br/>',pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"}},
{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,kdDimensions:2,drawGraph:function(){this.options.lineWidth&&A.prototype.drawGraph.call(this)}})})(K);(function(a){var A=a.pick,y=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,G=this.chart,t=2*(a.slicedOffset||0),g=G.plotWidth-2*t,G=G.plotHeight-2*t,d=a.center,d=[A(d[0],"50%"),A(d[1],"50%"),a.size||"100%",a.innerSize||0],m=Math.min(g,G),r,
n;for(r=0;4>r;++r)n=d[r],a=2>r||2===r&&/%$/.test(n),d[r]=y(n,[g,G,m,d[2]][r])+(a?t:0);d[3]>d[2]&&(d[3]=d[2]);return d}}})(K);(function(a){var A=a.addEvent,y=a.defined,E=a.each,G=a.extend,t=a.inArray,g=a.noop,d=a.pick,m=a.Point,r=a.Series,n=a.seriesType,p=a.setAnimation;n("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return null===this.y?void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,
slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1,shadow:!1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var d=this,g=d.points,m=d.startAngleRad;a||(E(g,function(a){var b=a.graphic,g=a.shapeArgs;b&&(b.attr({r:a.startR||d.center[3]/2,start:m,end:m}),b.animate({r:g.r,start:g.start,
end:g.end},d.options.animation))}),d.animate=null)},updateTotals:function(){var a,d=0,g=this.points,m=g.length,e,c=this.options.ignoreHiddenPoint;for(a=0;a<m;a++)e=g[a],0>e.y&&(e.y=null),d+=c&&!e.visible?0:e.y;this.total=d;for(a=0;a<m;a++)e=g[a],e.percentage=0<d&&(e.visible||!c)?e.y/d*100:0,e.total=d},generatePoints:function(){r.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();var g=0,m=this.options,n=m.slicedOffset,e=n+(m.borderWidth||0),c,l,q,
h=m.startAngle||0,f=this.startAngleRad=Math.PI/180*(h-90),h=(this.endAngleRad=Math.PI/180*(d(m.endAngle,h+360)-90))-f,u=this.points,p=m.dataLabels.distance,m=m.ignoreHiddenPoint,r,t=u.length,y;a||(this.center=a=this.getCenter());this.getX=function(c,e){q=Math.asin(Math.min((c-a[1])/(a[2]/2+p),1));return a[0]+(e?-1:1)*Math.cos(q)*(a[2]/2+p)};for(r=0;r<t;r++){y=u[r];c=f+g*h;if(!m||y.visible)g+=y.percentage/100;l=f+g*h;y.shapeType="arc";y.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*
c)/1E3,end:Math.round(1E3*l)/1E3};q=(l+c)/2;q>1.5*Math.PI?q-=2*Math.PI:q<-Math.PI/2&&(q+=2*Math.PI);y.slicedTranslation={translateX:Math.round(Math.cos(q)*n),translateY:Math.round(Math.sin(q)*n)};c=Math.cos(q)*a[2]/2;l=Math.sin(q)*a[2]/2;y.tooltipPos=[a[0]+.7*c,a[1]+.7*l];y.half=q<-Math.PI/2||q>Math.PI/2?1:0;y.angle=q;e=Math.min(e,p/5);y.labelPos=[a[0]+c+Math.cos(q)*p,a[1]+l+Math.sin(q)*p,a[0]+c+Math.cos(q)*e,a[1]+l+Math.sin(q)*e,a[0]+c,a[1]+l,0>p?"center":y.half?"right":"left",q]}},drawGraph:null,
drawPoints:function(){var a=this,d=a.chart.renderer,g,m,e,c,l=a.options.shadow;l&&!a.shadowGroup&&(a.shadowGroup=d.g("shadow").add(a.group));E(a.points,function(q){if(null!==q.y){m=q.graphic;c=q.shapeArgs;g=q.sliced?q.slicedTranslation:{};var h=q.shadowGroup;l&&!h&&(h=q.shadowGroup=d.g("shadow").add(a.shadowGroup));h&&h.attr(g);e=a.pointAttribs(q,q.selected&&"select");m?m.setRadialReference(a.center).attr(e).animate(G(c,g)):(q.graphic=m=d[q.shapeType](c).addClass(q.getClassName()).setRadialReference(a.center).attr(g).add(a.group),
q.visible||m.attr({visibility:"hidden"}),m.attr(e).attr({"stroke-linejoin":"round"}).shadow(l,h))}})},searchPoint:g,sortByAngle:function(a,d){a.sort(function(a,b){return void 0!==a.angle&&(b.angle-a.angle)*d})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:a.CenteredSeriesMixin.getCenter,getSymbol:g},{init:function(){m.prototype.init.apply(this,arguments);var a=this,g;a.name=d(a.name,"Slice");g=function(d){a.slice("select"===d.type)};A(a,"select",g);A(a,"unselect",g);return a},setVisible:function(a,
g){var m=this,n=m.series,e=n.chart,c=n.options.ignoreHiddenPoint;g=d(g,c);a!==m.visible&&(m.visible=m.options.visible=a=void 0===a?!m.visible:a,n.options.data[t(m,n.data)]=m.options,E(["graphic","dataLabel","connector","shadowGroup"],function(c){if(m[c])m[c][a?"show":"hide"](!0)}),m.legendItem&&e.legend.colorizeItem(m,a),a||"hover"!==m.state||m.setState(""),c&&(n.isDirty=!0),g&&e.redraw())},slice:function(a,g,m){var n=this.series;p(m,n.chart);d(g,!0);this.sliced=this.options.sliced=a=y(a)?a:!this.sliced;
n.options.data[t(this,n.data)]=this.options;a=a?this.slicedTranslation:{translateX:0,translateY:0};this.graphic.animate(a);this.shadowGroup&&this.shadowGroup.animate(a)},haloPath:function(a){var d=this.shapeArgs,g=this.series.chart;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(g.plotLeft+d.x,g.plotTop+d.y,d.r+a,d.r+a,{innerR:this.shapeArgs.r,start:d.start,end:d.end})}})})(K);(function(a){var A=a.addEvent,y=a.arrayMax,E=a.defined,G=a.each,t=a.extend,g=a.format,d=a.map,
m=a.merge,r=a.noop,n=a.pick,p=a.relativeLength,b=a.Series,k=a.seriesTypes,v=a.stableSort,B=a.stop;a.distribute=function(a,b){function g(a,b){return a.target-b.target}var k,h=!0,f=a,m=[],n;n=0;for(k=a.length;k--;)n+=a[k].size;if(n>b){v(a,function(a,b){return(b.rank||0)-(a.rank||0)});for(n=k=0;n<=b;)n+=a[k].size,k++;m=a.splice(k-1,a.length)}v(a,g);for(a=d(a,function(a){return{size:a.size,targets:[a.target]}});h;){for(k=a.length;k--;)h=a[k],n=(Math.min.apply(0,h.targets)+Math.max.apply(0,h.targets))/
2,h.pos=Math.min(Math.max(0,n-h.size/2),b-h.size);k=a.length;for(h=!1;k--;)0<k&&a[k-1].pos+a[k-1].size>a[k].pos&&(a[k-1].size+=a[k].size,a[k-1].targets=a[k-1].targets.concat(a[k].targets),a[k-1].pos+a[k-1].size>b&&(a[k-1].pos=b-a[k-1].size),a.splice(k,1),h=!0)}k=0;G(a,function(a){var b=0;G(a.targets,function(){f[k].pos=a.pos+b;b+=f[k].size;k++})});f.push.apply(f,m);v(f,g)};b.prototype.drawDataLabels=function(){var a=this,b=a.options,d=b.dataLabels,k=a.points,h,f,u=a.hasRendered||0,p,r,v=n(d.defer,
!0),y=a.chart.renderer;if(d.enabled||a._hasPointLabels)a.dlProcessOptions&&a.dlProcessOptions(d),r=a.plotGroup("dataLabelsGroup","data-labels",v&&!u?"hidden":"visible",d.zIndex||6),v&&(r.attr({opacity:+u}),u||A(a,"afterAnimate",function(){a.visible&&r.show(!0);r[b.animation?"animate":"attr"]({opacity:1},{duration:200})})),f=d,G(k,function(k){var u,q=k.dataLabel,v,x,F=k.connector,B=!0,A,G={};h=k.dlOptions||k.options&&k.options.dataLabels;u=n(h&&h.enabled,f.enabled)&&null!==k.y;if(q&&!u)k.dataLabel=
q.destroy();else if(u){d=m(f,h);A=d.style;u=d.rotation;v=k.getLabelConfig();p=d.format?g(d.format,v):d.formatter.call(v,d);A.color=n(d.color,A.color,a.color,"#000000");if(q)E(p)?(q.attr({text:p}),B=!1):(k.dataLabel=q=q.destroy(),F&&(k.connector=F.destroy()));else if(E(p)){q={fill:d.backgroundColor,stroke:d.borderColor,"stroke-width":d.borderWidth,r:d.borderRadius||0,rotation:u,padding:d.padding,zIndex:1};"contrast"===A.color&&(G.color=d.inside||0>d.distance||b.stacking?y.getContrast(k.color||a.color):
"#000000");b.cursor&&(G.cursor=b.cursor);for(x in q)void 0===q[x]&&delete q[x];q=k.dataLabel=y[u?"text":"label"](p,0,-9999,d.shape,null,null,d.useHTML,null,"data-label").attr(q);q.addClass("highcharts-data-label-color-"+k.colorIndex+" "+(d.className||""));q.css(t(A,G));q.add(r);q.shadow(d.shadow)}q&&a.alignDataLabel(k,q,d,null,B)}})};b.prototype.alignDataLabel=function(a,b,d,g,h){var f=this.chart,k=f.inverted,m=n(a.plotX,-9999),p=n(a.plotY,-9999),r=b.getBBox(),v,y=d.rotation,w=d.align,A=this.visible&&
(a.series.forceDL||f.isInsidePlot(m,Math.round(p),k)||g&&f.isInsidePlot(m,k?g.x+1:g.y+g.height-1,k)),E="justify"===n(d.overflow,"justify");A&&(v=d.style.fontSize,v=f.renderer.fontMetrics(v,b).b,g=t({x:k?f.plotWidth-p:m,y:Math.round(k?f.plotHeight-m:p),width:0,height:0},g),t(d,{width:r.width,height:r.height}),y?(E=!1,k=f.renderer.rotCorr(v,y),k={x:g.x+d.x+g.width/2+k.x,y:g.y+d.y+{top:0,middle:.5,bottom:1}[d.verticalAlign]*g.height},b[h?"attr":"animate"](k).attr({align:w}),m=(y+720)%360,m=180<m&&360>
m,"left"===w?k.y-=m?r.height:0:"center"===w?(k.x-=r.width/2,k.y-=r.height/2):"right"===w&&(k.x-=r.width,k.y-=m?0:r.height)):(b.align(d,null,g),k=b.alignAttr),E?this.justifyDataLabel(b,d,k,r,g,h):n(d.crop,!0)&&(A=f.isInsidePlot(k.x,k.y)&&f.isInsidePlot(k.x+r.width,k.y+r.height)),d.shape&&!y&&b.attr({anchorX:a.plotX,anchorY:a.plotY}));A||(B(b),b.attr({y:-9999}),b.placed=!1)};b.prototype.justifyDataLabel=function(a,b,d,g,h,f){var k=this.chart,m=b.align,n=b.verticalAlign,p,r,t=a.box?0:a.padding||0;p=
d.x+t;0>p&&("right"===m?b.align="left":b.x=-p,r=!0);p=d.x+g.width-t;p>k.plotWidth&&("left"===m?b.align="right":b.x=k.plotWidth-p,r=!0);p=d.y+t;0>p&&("bottom"===n?b.verticalAlign="top":b.y=-p,r=!0);p=d.y+g.height-t;p>k.plotHeight&&("top"===n?b.verticalAlign="bottom":b.y=k.plotHeight-p,r=!0);r&&(a.placed=!f,a.align(b,null,h))};k.pie&&(k.pie.prototype.drawDataLabels=function(){var e=this,c=e.data,g,k=e.chart,h=e.options.dataLabels,f=n(h.connectorPadding,10),m=n(h.connectorWidth,1),p=k.plotWidth,r=k.plotHeight,
t,v=h.distance,C=e.center,w=C[2]/2,B=C[1],A=0<v,x,z,E,K,S=[[],[]],L,R,T,Q,P=[0,0,0,0];e.visible&&(h.enabled||e._hasPointLabels)&&(b.prototype.drawDataLabels.apply(e),G(c,function(a){a.dataLabel&&a.visible&&(S[a.half].push(a),a.dataLabel._pos=null)}),G(S,function(b,c){var m,n,u=b.length,t,y,F;if(u)for(e.sortByAngle(b,c-.5),0<v&&(m=Math.max(0,B-w-v),n=Math.min(B+w+v,k.plotHeight),t=d(b,function(a){if(a.dataLabel)return F=a.dataLabel.getBBox().height||21,{target:a.labelPos[1]-m+F/2,size:F,rank:a.y}}),
a.distribute(t,n+F-m)),Q=0;Q<u;Q++)g=b[Q],E=g.labelPos,x=g.dataLabel,T=!1===g.visible?"hidden":"inherit",y=E[1],t?void 0===t[Q].pos?T="hidden":(K=t[Q].size,R=m+t[Q].pos):R=y,L=h.justify?C[0]+(c?-1:1)*(w+v):e.getX(R<m+2||R>n-2?y:R,c),x._attr={visibility:T,align:E[6]},x._pos={x:L+h.x+({left:f,right:-f}[E[6]]||0),y:R+h.y-10},E.x=L,E.y=R,null===e.options.size&&(z=x.width,L-z<f?P[3]=Math.max(Math.round(z-L+f),P[3]):L+z>p-f&&(P[1]=Math.max(Math.round(L+z-p+f),P[1])),0>R-K/2?P[0]=Math.max(Math.round(-R+
K/2),P[0]):R+K/2>r&&(P[2]=Math.max(Math.round(R+K/2-r),P[2])))}),0===y(P)||this.verifyDataLabelOverflow(P))&&(this.placeDataLabels(),A&&m&&G(this.points,function(a){var b;t=a.connector;if((x=a.dataLabel)&&x._pos&&a.visible){T=x._attr.visibility;if(b=!t)a.connector=t=k.renderer.path().addClass("highcharts-data-label-connector highcharts-color-"+a.colorIndex).add(e.dataLabelsGroup),t.attr({"stroke-width":m,stroke:h.connectorColor||a.color||"#666666"});t[b?"attr":"animate"]({d:e.connectorPath(a.labelPos)});
t.attr("visibility",T)}else t&&(a.connector=t.destroy())}))},k.pie.prototype.connectorPath=function(a){var b=a.x,d=a.y;return n(this.options.softConnector,!0)?["M",b+("left"===a[6]?5:-5),d,"C",b,d,2*a[2]-a[4],2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",b+("left"===a[6]?5:-5),d,"L",a[2],a[3],"L",a[4],a[5]]},k.pie.prototype.placeDataLabels=function(){G(this.points,function(a){var b=a.dataLabel;b&&a.visible&&((a=b._pos)?(b.attr(b._attr),b[b.moved?"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999}))})},
k.pie.prototype.alignDataLabel=r,k.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,d=this.options,g=d.center,h=d.minSize||80,f,k;null!==g[0]?f=Math.max(b[2]-Math.max(a[1],a[3]),h):(f=Math.max(b[2]-a[1]-a[3],h),b[0]+=(a[3]-a[1])/2);null!==g[1]?f=Math.max(Math.min(f,b[2]-Math.max(a[0],a[2])),h):(f=Math.max(Math.min(f,b[2]-a[0]-a[2]),h),b[1]+=(a[0]-a[2])/2);f<b[2]?(b[2]=f,b[3]=Math.min(p(d.innerSize||0,f),f),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):k=!0;return k});
k.column&&(k.column.prototype.alignDataLabel=function(a,c,d,g,h){var f=this.chart.inverted,k=a.series,p=a.dlBox||a.shapeArgs,r=n(a.below,a.plotY>n(this.translatedThreshold,k.yAxis.len)),t=n(d.inside,!!this.options.stacking);p&&(g=m(p),0>g.y&&(g.height+=g.y,g.y=0),p=g.y+g.height-k.yAxis.len,0<p&&(g.height-=p),f&&(g={x:k.yAxis.len-g.y-g.height,y:k.xAxis.len-g.x-g.width,width:g.height,height:g.width}),t||(f?(g.x+=r?0:g.width,g.width=0):(g.y+=r?g.height:0,g.height=0)));d.align=n(d.align,!f||t?"center":
r?"right":"left");d.verticalAlign=n(d.verticalAlign,f||t?"middle":r?"top":"bottom");b.prototype.alignDataLabel.call(this,a,c,d,g,h)})})(K);(function(a){var A=a.Chart,y=a.each,E=a.pick,G=a.addEvent;A.prototype.callbacks.push(function(a){function g(){var d=[];y(a.series,function(a){var g=a.options.dataLabels,n=a.dataLabelCollections||["dataLabel"];(g.enabled||a._hasPointLabels)&&!g.allowOverlap&&a.visible&&y(n,function(g){y(a.points,function(a){a[g]&&(a[g].labelrank=E(a.labelrank,a.shapeArgs&&a.shapeArgs.height),
d.push(a[g]))})})});a.hideOverlappingLabels(d)}g();G(a,"redraw",g)});A.prototype.hideOverlappingLabels=function(a){var g=a.length,d,m,r,n,p,b,k,v,B,e=function(a,b,d,e,f,g,k,m){return!(f>a+d||f+k<a||g>b+e||g+m<b)};for(m=0;m<g;m++)if(d=a[m])d.oldOpacity=d.opacity,d.newOpacity=1;a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(m=0;m<g;m++)for(r=a[m],d=m+1;d<g;++d)if(n=a[d],r&&n&&r.placed&&n.placed&&0!==r.newOpacity&&0!==n.newOpacity&&(p=r.alignAttr,b=n.alignAttr,k=r.parentGroup,v=n.parentGroup,
B=2*(r.box?0:r.padding),p=e(p.x+k.translateX,p.y+k.translateY,r.width-B,r.height-B,b.x+v.translateX,b.y+v.translateY,n.width-B,n.height-B)))(r.labelrank<n.labelrank?r:n).newOpacity=0;y(a,function(a){var b,d;a&&(d=a.newOpacity,a.oldOpacity!==d&&a.placed&&(d?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=d,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(K);(function(a){var A=a.addEvent,y=a.Chart,E=a.createElement,G=a.css,t=a.defaultOptions,g=a.defaultPlotOptions,d=a.each,m=
a.extend,r=a.fireEvent,n=a.hasTouch,p=a.inArray,b=a.isObject,k=a.Legend,v=a.merge,B=a.pick,e=a.Point,c=a.Series,l=a.seriesTypes,q=a.svg;a=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart,c=b.pointer,e=function(a){for(var c=a.target,d;c&&!d;)d=c.point,c=c.parentNode;if(void 0!==d&&d!==b.hoverPoint)d.onMouseOver(a)};d(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.element.point=a)});a._hasTracking||(d(a.trackerGroups,function(b){if(a[b]){a[b].addClass("highcharts-tracker").on("mouseover",
e).on("mouseout",function(a){c.onTrackerMouseOut(a)});if(n)a[b].on("touchstart",e);a.options.cursor&&a[b].css(G).css({cursor:a.options.cursor})}}),a._hasTracking=!0)},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,e=[].concat(c?a.areaPath:a.graphPath),g=e.length,k=a.chart,m=k.pointer,l=k.renderer,p=k.options.tooltip.snap,r=a.tracker,t,v=function(){if(k.hoverSeries!==a)a.onMouseOver()},y="rgba(192,192,192,"+(q?1E-4:.002)+")";if(g&&!c)for(t=g+1;t--;)"M"===e[t]&&e.splice(t+1,0,e[t+
1]-p,e[t+2],"L"),(t&&"M"===e[t]||t===g)&&e.splice(t,0,"L",e[t-2]+p,e[t-1]);r?r.attr({d:e}):a.graph&&(a.tracker=l.path(e).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:y,fill:c?y:"none","stroke-width":a.graph.strokeWidth()+(c?0:2*p),zIndex:2}).add(a.group),d([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",v).on("mouseout",function(a){m.onTrackerMouseOut(a)});b.cursor&&a.css({cursor:b.cursor});if(n)a.on("touchstart",v)}))}};l.column&&
(l.column.prototype.drawTracker=a.drawTrackerPoint);l.pie&&(l.pie.prototype.drawTracker=a.drawTrackerPoint);l.scatter&&(l.scatter.prototype.drawTracker=a.drawTrackerPoint);m(k.prototype,{setItemEvents:function(a,b,c){var d=this,e=d.chart,g="highcharts-legend-"+(a.series?"point":"series")+"-active";(c?b:a.legendGroup).on("mouseover",function(){a.setState("hover");e.seriesGroup.addClass(g);b.css(d.options.itemHoverStyle)}).on("mouseout",function(){b.css(a.visible?d.itemStyle:d.itemHiddenStyle);e.seriesGroup.removeClass(g);
a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()};b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):r(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=E("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);A(a.checkbox,"click",function(b){r(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});t.legend.itemStyle.cursor=
"pointer";m(y.prototype,{showResetZoom:function(){var a=this,b=t.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,g="chart"===c.relativeTo?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:c.position.align,title:b.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(c.position,!1,g)},zoomOut:function(){var a=this;r(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var c,e=this.pointer,
g=!1,k;!a||a.resetSelection?d(this.axes,function(a){c=a.zoom()}):d(a.xAxis.concat(a.yAxis),function(a){var b=a.axis,d=b.isXAxis;if(e[d?"zoomX":"zoomY"]||e[d?"pinchX":"pinchY"])c=b.zoom(a.min,a.max),b.displayBtn&&(g=!0)});k=this.resetZoomButton;g&&!k?this.showResetZoom():!g&&b(k)&&(this.resetZoomButton=k.destroy());c&&this.redraw(B(this.options.chart.animation,a&&a.animation,100>this.pointCount))},pan:function(a,b){var c=this,e=c.hoverPoints,g;e&&d(e,function(a){a.setState()});d("xy"===b?[1,0]:[1],
function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,e=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",f=c[d],k=(b.pointRange||0)/2,m=b.getExtremes(),l=b.toValue(f-e,!0)+k,k=b.toValue(f+b.len-e,!0)-k,f=f>e;b.series.length&&(f||l>Math.min(m.dataMin,m.min))&&(!f||k<Math.max(m.dataMax,m.max))&&(b.setExtremes(l,k,!1,!1,{trigger:"pan"}),g=!0);c[d]=e});g&&c.redraw(!1);G(c.container,{cursor:"move"})}});m(e.prototype,{select:function(a,b){var c=this,e=c.series,g=e.chart;a=B(a,!c.selected);c.firePointEvent(a?
"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;e.options.data[p(c,e.data)]=c.options;c.setState(a&&"select");b||d(g.getSelectedPoints(),function(a){a.selected&&a!==c&&(a.selected=a.options.selected=!1,e.options.data[p(a,e.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a,b){var c=this.series,d=c.chart,e=d.tooltip,g=d.hoverPoint;if(d.hoverSeries!==c)c.onMouseOver();if(g&&g!==this)g.onMouseOut();this.series&&(this.firePointEvent("mouseOver"),
!e||e.shared&&!c.noSharedTooltip||e.refresh(this,a),this.setState("hover"),b||(d.hoverPoint=this))},onMouseOut:function(){var a=this.series.chart,b=a.hoverPoints;this.firePointEvent("mouseOut");b&&-1!==p(this,b)||(this.setState(),a.hoverPoint=null)},importEvents:function(){if(!this.hasImportedEvents){var a=v(this.series.options.point,this.options).events,b;this.events=a;for(b in a)A(this,b,a[b]);this.hasImportedEvents=!0}},setState:function(a,b){var c=Math.floor(this.plotX),d=this.plotY,e=this.series,
k=e.options.states[a]||{},l=g[e.type].marker&&e.options.marker||{},n=!1===l.enabled,p=l.states&&l.states[a]||{},q=!1===p.enabled,r=e.stateMarkerGraphic,t=this.marker||{},y=e.chart,A=e.halo;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===k.enabled||a&&(q||n&&!1===p.enabled)||a&&t.states&&t.states[a]&&!1===t.states[a].enabled)){l=p.radius||l.radius+(p.radiusPlus||0);if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+
a),c=l?{x:c-l,y:d-l,width:2*l,height:2*l}:{},c=v(e.pointAttribs(this,a),c),this.graphic.attr(c),r&&r.hide();else{if(a&&p){p=t.symbol||e.symbol;r&&r.currentSymbol!==p&&(r=r.destroy());if(r)r[b?"animate":"attr"]({x:c-l,y:d-l});else p&&(e.stateMarkerGraphic=r=y.renderer.symbol(p,c-l,d-l,2*l,2*l).add(e.markerGroup),r.currentSymbol=p);r&&r.attr(e.pointAttribs(this,a))}r&&(r[a&&y.isInsidePlot(c,d,y.inverted)?"show":"hide"](),r.element.point=this)}(k=k.halo)&&k.size?(A||(e.halo=A=y.renderer.path().add(y.seriesGroup)),
A[b?"animate":"attr"]({d:this.haloPath(k.size)}),A.attr({"class":"highcharts-halo highcharts-color-"+B(this.colorIndex,e.colorIndex)}),A.attr(m({fill:this.color||e.color,"fill-opacity":k.opacity,zIndex:-1},k.attributes))[b?"animate":"attr"]({d:this.haloPath(k.size)})):A&&A.attr({d:[]});this.state=a}},haloPath:function(a){var b=this.series,c=b.chart,d=b.getPlotBox(),e=c.inverted,g=Math.floor(this.plotX);return c.renderer.symbols.circle(d.translateX+(e?b.yAxis.len-this.plotY:g)-a,d.translateY+(e?b.xAxis.len-
g:this.plotY)-a,2*a,2*a)}});m(c.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&r(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&r(this,"mouseOut");!c||a.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();this.setState()},setState:function(a){var b=this,c=
b.options,e=b.graph,g=c.states,k=c.lineWidth,c=0;a=a||"";if(b.state!==a&&(d([b.group,b.markerGroup],function(c){c&&(b.state&&c.removeClass("highcharts-series-"+b.state),a&&c.addClass("highcharts-series-"+a))}),b.state=a,!g[a]||!1!==g[a].enabled)&&(a&&(k=g[a].lineWidth||k+(g[a].lineWidthPlus||0)),e&&!e.dashstyle))for(g={"stroke-width":k},e.attr(g);b["zone-graph-"+c];)b["zone-graph-"+c].attr(g),c+=1},setVisible:function(a,b){var c=this,e=c.chart,g=c.legendItem,k,l=e.options.chart.ignoreHiddenSeries,
m=c.visible;k=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!m:a)?"show":"hide";d(["group","dataLabelsGroup","markerGroup","tracker"],function(a){if(c[a])c[a][k]()});if(e.hoverSeries===c||(e.hoverPoint&&e.hoverPoint.series)===c)c.onMouseOut();g&&e.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&d(e.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});d(c.linkedSeries,function(b){b.setVisible(a,!1)});l&&(e.isDirtyBox=!0);!1!==b&&e.redraw();r(c,k)},show:function(){this.setVisible(!0)},
hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);r(this,a?"select":"unselect")},drawTracker:a.drawTrackerGraph})})(K);(function(a){var A=a.Chart,y=a.each,E=a.inArray,G=a.isObject,t=a.pick,g=a.splat;A.prototype.setResponsive=function(a){var g=this.options.responsive;g&&g.rules&&y(g.rules,function(g){this.matchResponsiveRule(g,a)},this)};A.prototype.matchResponsiveRule=function(d,g){var r=this.respRules,n=d.condition,
p;p=d.callback||function(){return this.chartWidth<=t(n.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=t(n.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=t(n.minWidth,0)&&this.chartHeight>=t(n.minHeight,0)};void 0===d._id&&(d._id=a.idCounter++);p=p.call(this);!r[d._id]&&p?d.chartOptions&&(r[d._id]=this.currentOptions(d.chartOptions),this.update(d.chartOptions,g)):r[d._id]&&!p&&(this.update(r[d._id],g),delete r[d._id])};A.prototype.currentOptions=function(a){function m(a,d,b){var k,r;for(k in a)if(-1<
E(k,["series","xAxis","yAxis"]))for(a[k]=g(a[k]),b[k]=[],r=0;r<a[k].length;r++)b[k][r]={},m(a[k][r],d[k][r],b[k][r]);else G(a[k])?(b[k]={},m(a[k],d[k]||{},b[k])):b[k]=d[k]||null}var r={};m(a,this.options,r);return r}})(K);return K});
/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);












// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//





//= jquery/dist/jquery

;
