//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: For creating grouped collapsible content areas.
//>>label: Collapsible Sets (Accordions)
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.collapsible.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "./collapsible" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.collapsibleset", $.mobile.widget, {
	options: {
		initSelector: ":jqmData(role='collapsible-set')"
		// xxx frequent - 1. add jqm grid
		// xxx frequent - 2. add inset, because otherwise it is not inherited as an option
		// I think this is a bug in JQM, because without declaring here, 
		// o.inset will be "undefined" when using data-inset="false", 
		// when it should turn out to "false"
		grid: null,
		inset: true
	},
	_create: function() {
		var $el = this.element.addClass( "ui-collapsible-set" ),
			// xxx frequent - 3. add direction as additional option
			// [removed] o = this.options;
			o = $.extend({  direction: $el.jqmData("type") || "" }, this.options ),
			// xxx frequent - 4. add toggleCorners so regular and horizontal collapsibles can be handled with a single array
			toggleCorners = o.direction == "horizontal" ? [ "ui-corner-tl ui-corner-bl","ui-corner-tr ui-corner-br" ] : ["ui-corner-top ", "ui-corner-bottom" ];

		// xxx frequent - 5. add horizontal class
		if ( o.direction == "horizontal" ) {
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
		if ( $el.jqmData( "inset" ) !== undefined ) {
			o.inset = $el.jqmData( "inset" );
		}
		// xxx frequent - 6. removed, because o.inset will not be in options, so it
		// it also is "undefined" if data-inset="false" is specified 
		// on the set.
		// [Removed] o.inset = o.inset !== undefined ? o.inset : true;
		
		// xxx frequent - 7. not happy with this. I need a class to set negative 
		// margin on the collapsibe, when data-inset="false"
		// regular collapsibleSets set this on the h2 tag, 
		// which I can't because the h2 tags will be floated
		// along with the collapsibles. This is only used to
		// switch between negative/no margin depending on inset
		if ( !!o.inset && o.direction == "horizontal" ){
			$el.addClass( "ui-collapsible-no-inset" );
		}
		// Initialize the collapsible set if it's not already initialized
		if ( !$el.jqmData( "collapsiblebound" ) ) {
			$el
				.jqmData( "collapsiblebound", true )
				.bind( "expand collapse", function( event ) {
					var isCollapse = ( event.type === "collapse" ),
						collapsible = $( event.target ).closest( ".ui-collapsible" ),
						widget = collapsible.data( "collapsible" ),
						// xxx - frequent - 8. Because we need to toggle first and last collapsible
						// we need some kind of index, so these can be indentified 
						// on expand/collapse
						index = $el.find('.ui-collapsible').index( collapsible ),
						// xxx -frequent - 9. Default class to toggle (will be overwritten for horizontal tabs )
						togClass = "ui-corner-bottom",

						// xxx frequent - 10. Since two collapsibles have to be toggled, I have put the
						// "toggle routine" inside a function, which on regular collapsibles
						// toggles corners on ONE collaspible, while on horiztonal
						// collapsibles, FIRST and LAST collapsible will get their
						// corners toggled
						tog = function() {	
							// xxx frequent - 10b. only touch corners if inset="true"
							if ( !!o.inset ){
								// xxx frequent - 10c. On horizontal collapsibles I'm resetting collapsible to include 
								// TWO collapsibles (first and last). The for-loop therefore runs either
								// once or twice
								for ( var i = 0; i < collapsible.length; i++ ){
									index = i;
									// xxx frequent - 10d. override bottom-corner toggle class on horizontal collapsibles
									//  				   toggle corner-bl on FIRST, corner-br on LAST collapsible
									togClass = o.direction == "horizontal" ? ( index == 0 ? "ui-corner-bl" : "ui-corner-br") : "ui-corner-bottom";
									collapsible.eq(i).find( widget.options.heading ).first()
										.find( "a" ).first()
										.toggleClass( togClass, isCollapse )
										.find( ".ui-btn-inner" )
										.toggleClass( togClass, isCollapse );
								}
							}
						};
					// xxx frequent - 11. toggle collapsible-content bottom corners on content. This needs to be outside
					// of the tog() function, otherwise only first and last collapsible
					// get their corners toggled
					if ( !!o.inset ){
						collapsible.find( ".ui-collapsible-content" ).toggleClass( "ui-corner-bottom", !isCollapse );
						}

					// xxx frequent - 12. horizontal handler = this calls the tog() function
					// for both regular and horizontal collapsibles						
					if ( o.direction == "horizontal" ){
						// xxx frequent - 12b. Overwrite collapsible to include FIRST and LAST collapsible
						// = No matter which collapsible is clicked, 
						// in a horizontal collapsible, first and last always get
						// their corners toggled
						collapsible = $el.find('.ui-collapsible').first().add( $el.find('.ui-collapsible').eq( $el.find('.ui-collapsible').length-1)  );

						// xxx frequent - 12c. set isCollapse and call tog()
						if ( event.type == "expand" ){
							isCollapse = false;
							tog();
						// xxx frequent - 12d. now why did I do this check here...
						// probably to detect when all collapsibles are collapsed
						} else if ( $el.find('.ui-collapsible').length == $el.find('.ui-collapsible-collapsed').length ) {
							isCollapse = true;
							tog();
						}
					// xxx frequent - 12e. regular collaspibles
					} else if (collapsible.jqmData( "collapsible-last" ) && !!o.inset ) {
						tog();
					}

					// xxx frequent - 12f removed old corner handle (now in tog() )
					// if ( collapsible.jqmData( "collapsible-last" ) && !!o.inset ) {
					//	collapsible.find( ".ui-collapsible-heading" ).first()
					//		.find( "a" ).first()
					//		.toggleClass( "ui-corner-bottom", isCollapse )
					//		.find( ".ui-btn-inner" )
					//		.toggleClass( "ui-corner-bottom", isCollapse );
					//	collapsible.find( ".ui-collapsible-content" ).toggleClass( "ui-corner-bottom", !isCollapse );
					//}
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
	},

	_init: function() {
		var $el = this.element,
			collapsiblesInSet = $el.children( ":jqmData(role='collapsible')" ),
			expanded = collapsiblesInSet.filter( ":jqmData(collapsed='false')" );
		this.refresh();

		// Because the corners are handled by the collapsible itself and the default state is collapsed
		// That was causing https://github.com/jquery/jquery-mobile/issues/4116
		expanded.trigger( "expand" );
	},

	refresh: function() {
		var $el = this.element,
			o = this.options,
			collapsiblesInSet = $el.children( ":jqmData(role='collapsible')" );

		$.mobile.collapsible.prototype.enhance( collapsiblesInSet.not( ".ui-collapsible" ) );
		
		// clean up borders
		if ( !!o.inset ) {
			collapsiblesInSet.each(function() {
				$( this ).jqmRemoveData( "collapsible-last" )
					.find( ".ui-collapsible-heading" )
					.find( "a" ).first()
					.removeClass( "ui-corner-top ui-corner-bottom" )
					.find( ".ui-btn-inner" )
					.removeClass( "ui-corner-top ui-corner-bottom" );
			});

			// xxx frequent - 13. toggling corners using the toggleCorners array
			collapsiblesInSet.first()
				.find( "a" )
					.first()
					.addClass( toggleCorners[0] )
					.find( ".ui-btn-inner" )
						.addClass(  toggleCorners[0] );

			collapsiblesInSet.last()
				.jqmData( "collapsible-last", true )
				.find( "a" )
					.first()
					.addClass( toggleCorners[1] )
					.find( ".ui-btn-inner" )
						.addClass( toggleCorners[1] );
		} 
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ) {
	$.mobile.collapsibleset.prototype.enhanceWithin( e.target );
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");