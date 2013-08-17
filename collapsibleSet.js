//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: For creating grouped collapsible content areas.
//>>label: Collapsible Sets (Accordions)
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.collapsible.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

<<<<<<< HEAD
define( [
	"jquery",

	// Deprecated as of 1.4.0 and will be removed in 1.5.0
	// We only need this dependency so we get the $.widget shim from page, so we
	// can use $.mobile.collapsible.initSelector, which is added by the shim.
	// As of 1.5.0 we will assume that all children of the collapsibleset are to
	// be turned into collapsibles.
	"./page",
	"../jquery.mobile.widget",
	"./collapsible",
	"./addFirstLastClasses" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

var childCollapsiblesSelector = ":mobile-collapsible, " + $.mobile.collapsible.initSelector;

$.widget( "mobile.collapsibleset", $.extend( {

	// The initSelector is deprecated as of 1.4.0. In 1.5.0 we will use
	// :jqmData(role='collapsibleset') which will allow us to get rid of the line
	// below altogether, because the autoinit will generate such an initSelector
	initSelector: ":jqmData(role='collapsible-set'),:jqmData(role='collapsibleset')",

	options: $.extend( {
		enhanced: false,
		type: null
	}, $.mobile.collapsible.defaults ),

	_handleCollapsibleExpand: function( event ) {
		var closestCollapsible = $( event.target ).closest( ".ui-collapsible" );

		if ( closestCollapsible.parent().is( ":mobile-collapsibleset, :jqmData(role='collapsible-set')" ) ) {
			closestCollapsible
				.siblings( ".ui-collapsible:not(.ui-collapsible-collapsed)" )
				.collapsible( "collapse" );
		}
	},

	_create: function() {
		var elem = this.element,
			opts = this.options;

		$.extend( this, {
			_classes: ""
		});

		if ( !opts.enhanced ) {
			elem.addClass( "ui-collapsible-set " +
				this._themeClassFromOption( "ui-group-theme-", opts.theme ) + " " +
				( opts.corners && opts.inset ? "ui-corner-all " : "" ) );
			if (opts.type) {
				elem.addClass( "ui-collapsible-tabs" );
			}
			this.element.find( $.mobile.collapsible.initSelector ).collapsible();
		}

		this._on( elem, { collapsibleexpand: "_handleCollapsibleExpand" } );
	},

	_themeClassFromOption: function( prefix, value ) {
		return ( value ? ( value === "none" ? "" : prefix + value ) : "" );
	},

	_init: function() {
		this._refresh( true );

		// Because the corners are handled by the collapsible itself and the default state is collapsed
		// That was causing https://github.com/jquery/jquery-mobile/issues/4116
		this.element
			.children( childCollapsiblesSelector )
			.filter( ":jqmData(collapsed='false')" )
			.collapsible( "expand" );
	},

	_setOptions: function( options ) {
		var ret,
			elem = this.element,
			themeClass = this._themeClassFromOption( "ui-group-theme-", options.theme );

		if ( themeClass ) {
			elem
				.removeClass( this._themeClassFromOption( "ui-group-theme-", this.options.theme ) )
				.addClass( themeClass );
		}

		if ( options.corners !== undefined ) {
			elem.toggleClass( "ui-corner-all", options.corners );
		}

		ret = this._super( options );
		this.element.children( ":mobile-collapsible" ).collapsible( "refresh" );
		return ret;
	},

	_destroy: function() {
		var el = this.element;

		this._removeFirstLastClasses( el.children( childCollapsiblesSelector ) );
		el
			.removeClass( "ui-collapsible-set ui-corner-all " +
				this._themeClassFromOption( "ui-group-theme", this.options.theme ) )
			.children( ":mobile-collapsible" )
			.collapsible( "destroy" );
	},

	_refresh: function( create ) {
		var collapsiblesInSet = this.element.children( childCollapsiblesSelector );

		$.mobile.collapsible.prototype.enhance( collapsiblesInSet.not( ".ui-collapsible" ) );

		this._addFirstLastClasses( collapsiblesInSet, this._getVisibles( collapsiblesInSet, create ), create );
	},

	refresh: function() {
		this._refresh( false );
	}
=======
define( [ "jquery", "../jquery.mobile.widget", "./collapsible", "./addFirstLastClasses" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.collapsibleset", $.mobile.widget, $.extend( {
	options: {
		markup: true,
		grid: null,
		initSelector: ":jqmData(role='collapsible-set')"
	},

	_create: function () {
		var $el = this.element,
			collapsiblesInSet = $el.children( ":jqmData(role='collapsible')" ),
			expanded = collapsiblesInSet.filter( ":jqmData(collapsed='false')" );

		// Because the corners are handled by the collapsible itself and the default state is collapsed
		// That was causing https://github.com/jquery/jquery-mobile/issues/4116
		expanded.trigger( "expand" );
		
		this.refresh( true );
	},

	refresh: function ( create ) {
		var $el = this.element.addClass( "ui-collapsible-set" ),
			collapsiblesInSet = $el.children( ":jqmData(role='collapsible')" ),
			o = $.extend({  direction: $el.jqmData("type") || "" }, this.options );

		if ( create ) {
			if ( $el.jqmData("markup") === false ){
				o.markup = false;	
			}

			if ( o.markup !== false ){ 
				// xxx tabs - add horizontal class and grid
				if ( o.direction === "horizontal" ) {
					$el.addClass("ui-collapsible-set-horizontal").grid({ grid: this.options.grid });
				}

				// Inherit the theme from collapsible-set
				if ( !o.theme ) {
					o.theme = $.mobile.getInheritedTheme( $el, "c" );
				}
				// Inherit the content-theme from collapsible-set
				if ( !o.contentTheme ) {
					o.contentTheme = $el.jqmData( "content-theme" );
				}
				// Inherit the corner styling from collapsible-set
				if ( !o.corners ) {
					o.corners = $el.jqmData( "corners" );
				}
				
				if ( $el.jqmData( "inset" ) !== undefined ) {
					o.inset = $el.jqmData( "inset" );
					// need to add inset class here, too
					$el.addClass("ui-collapsible-set-inset");
				}
				o.inset = o.inset !== undefined ? o.inset : true;
				o.corners = o.corners !== undefined ? o.corners : true;
				
				if ( !!o.corners && !!o.inset ) {
					$el.addClass( "ui-corner-all" );
				}
			}

			// Initialize the collapsible set if it's not already initialized
			if ( !$el.jqmData( "collapsiblebound" ) ) {
				$el
					.jqmData( "collapsiblebound", true )
					// no fan... only needed for bottom corner classes. Do this with CSS
					.bind( "expand collapse", function( event ) {
						 if ( o.direction == "horizontal" && !!o.inset ){
								if ( event.type == "expand" ){
									$el.removeClass('ui-all-collapsed');
								// catch single collapse (not the collapse events firing together with expand!
								} else if ( $el.find('.ui-collapsible').length == $el.find('.ui-collapsible-collapsed').length ) {
									$el.addClass('ui-all-collapsed');
								}
						 }
					})
					.bind( "expand", function( event ) {
						var closestCollapsible = $( event.target )
							.closest( ".ui-collapsible" );
						if ( closestCollapsible.parent().is( ":jqmData(role='collapsible-set')" ) ) {
							closestCollapsible
								.siblings( ".ui-collapsible" )
								.trigger( "collapse" );
						}
					});
			}
		}
		this._addFirstLastClasses( collapsiblesInSet, this._getVisibles( collapsiblesInSet, create ), create );
	}

>>>>>>> c7743c4a6afb32c708100a0e6345b93d0bad3cb3
}, $.mobile.behaviors.addFirstLastClasses ) );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
<<<<<<< HEAD
=======

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
>>>>>>> c7743c4a6afb32c708100a0e6345b93d0bad3cb3
//>>excludeEnd("jqmBuildExclude");
