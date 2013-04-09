//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: For creating grouped collapsible content areas.
//>>label: Collapsible Sets (Accordions)
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.collapsible.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

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

}, $.mobile.behaviors.addFirstLastClasses ) );

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.collapsibleset.prototype.enhanceWithin( e.target );
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
