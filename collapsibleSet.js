(function( $, undefined ) {

$.widget( "mobile.collapsibleset", $.mobile.widget, {
	options: {
		initSelector: ":jqmData(role='collapsible-set')",
		// xxx tabs add grid & inset
		grid: null,
		inset: true
	},
	_create: function() {
		var $el = this.element.addClass( "ui-collapsible-set" ),
        // xxx tabs - add direction as additional option
        o = $.extend({  direction: $el.jqmData("type") || "" }, this.options );
		// xxx tabs - add horizontal class and grid
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
		// Inherit the corner styling from collapsible-set
		if ( !o.corners ) {
			o.corners = $el.jqmData( "corners" );
		}
		if ( $el.jqmData( "inset" ) !== undefined ) {
			o.inset = $el.jqmData( "inset" );
		}
		o.inset = o.inset !== undefined ? o.inset : true;
		o.corners = o.corners !== undefined ? o.corners : true;
		if ( !!o.corners && !!o.inset ) {
			$el.addClass( "ui-corner-all" );
		}
    // xxx tabs - need an extra class
    if ( !!o.inset && o.direction == "horizontal" ){
			$el.addClass( "ui-collapsible-no-inset" );
      // and inherit corners
      if ($el.find('.ui-collapsible').length === $el.find('.ui-collapsible-collapsed').length) {
        $el.addClass('ui-all-collapsed'); 
      }
		}
		// Initialize the collapsible set if it's not already initialized
		if ( !$el.jqmData( "collapsiblebound" ) ) {
			$el
				.jqmData( "collapsiblebound", true )
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
	},
	_init: function() {
		var $el = this.element,
			collapsiblesInSet = $el.children( ":jqmData(role='collapsible')" ),
			expanded = collapsiblesInSet.filter( ":jqmData(collapsed='false')" );
		this._refresh( "true" );

		// Because the corners are handled by the collapsible itself and the default state is collapsed
		// That was causing https://github.com/jquery/jquery-mobile/issues/4116
		expanded.trigger( "expand" );
	},
	_refresh: function( create ) {
		var collapsiblesInSet = this.element.children( ":jqmData(role='collapsible')" );
		$.mobile.collapsible.prototype.enhance( collapsiblesInSet.not( ".ui-collapsible" ) );
		this._addFirstLastClasses( collapsiblesInSet, this._getVisibles( collapsiblesInSet, create ), create );
	},
	refresh: function() {
		this._refresh( false );
	}
});
$.widget( "mobile.collapsibleset", $.mobile.collapsibleset, $.mobile.behaviors.addFirstLastClasses );

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.collapsibleset.prototype.enhanceWithin( e.target );
});

})( jQuery );