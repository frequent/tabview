(function( $, undefined ) {

$.widget( "mobile.collapsible", $.mobile.widget, {
	options: {
		expandCueText: " click to expand contents",
		collapseCueText: " click to collapse contents",
		collapsed: true,
		heading: "h1,h2,h3,h4,h5,h6,legend",
		collapsedIcon: "plus",
		expandedIcon: "minus",
    iconpos: "left",
    theme: null,
		contentTheme: null,
		inset: true,
    corners: true,
		mini: false,
		initSelector: ":jqmData(role='collapsible')",
		// xxx tabs - add direction
		direction: "",
    // xxx eventsonly
		eventsOnly: null
	},
	_create: function() {

		var $el = this.element,
			o = this.options,
			collapsible = $el.addClass( "ui-collapsible" ),
			collapsibleHeading = $el.children( o.heading ).first(),
      // xxx frequent - don't wrap here
			collapsibleContent = collapsible.children( ".ui-collapsible-content" ),
			collapsibleSet = $el.closest( ":jqmData(role='collapsible-set')" ).addClass( "ui-collapsible-set" );
      collapsibleClasses = "";

    // xxx frequent - prevent enhancement
    if ( collapsibleSet.jqmData('create') === false ){
      o.eventsOnly = false;
    }
      
		// xxx eventsonly
		if ( o.eventsOnly != false ){

			// If we are in a collapsible set
			if ( collapsibleSet.length ) {
        // xxx tabs
				if ( collapsibleSet.jqmData("type") == "horizontal" ){
					o.direction = "horizontal";
				}
				// Inherit the theme from collapsible-set
				if ( !o.theme ) {
					o.theme = collapsibleSet.jqmData( "theme" ) || $.mobile.getInheritedTheme( collapsibleSet, "c" );
				}
				// Inherit the content-theme from collapsible-set
				if ( !o.contentTheme ) {
					o.contentTheme = collapsibleSet.jqmData( "content-theme" );
				}
        // xxx tabs - set default to "no icon" in horizontal collapsbles
        // Get the preference for collapsed icon in the set, but override with data- attribute on the individual collapsible
        o.collapsedIcon = $el.jqmData( "collapsed-icon" ) || collapsibleSet.jqmData( "collapsed-icon" ) || ( o.direction == "horizontal" ? undefined : o.collapsedIcon );
        // Get the preference for expanded icon in the set, but override with data- attribute on the individual collapsible
        o.expandedIcon = $el.jqmData( "expanded-icon" ) || collapsibleSet.jqmData( "expanded-icon" ) || ( o.direction == "horizontal" ? undefined : o.expandedIcon );
        // Gets the preference icon position in the set, but override with data- attribute on the individual collapsible
        o.iconpos = $el.jqmData( "iconpos" ) || collapsibleSet.jqmData( "iconpos" ) || o.iconpos;
 
        // Inherit the preference for inset from collapsible-set or set the default value to ensure equalty within a set
        if ( collapsibleSet.jqmData( "inset" ) !== undefined ) {
          o.inset = collapsibleSet.jqmData( "inset" );
        } else {
          o.inset = true;
        }
        // Gets the preference for mini in the set
        if ( !o.mini ) {
          o.mini = collapsibleSet.jqmData( "mini" );
        }
        // Set corners for individual collapsibles to false when in a collapsible-set
        o.corners = false;
        // Replace collapsibleHeading if it's a legend
        if ( collapsibleHeading.is( "legend" ) ) {
          collapsibleHeading = $( "<div role='heading'>"+ collapsibleHeading.html() +"</div>" ).insertBefore( collapsibleHeading );
          collapsibleHeading.next().remove();
        }
			} else {
        // get inherited theme if not a set and no theme has been set
        if ( !o.theme ) {
          o.theme = $.mobile.getInheritedTheme( $el, "c" );
        }
      }

      if ( !!o.inset ) {
        collapsibleClasses += " ui-collapsible-inset";
        if ( !!o.corners ) {
          collapsibleClasses += " ui-corner-all" ;
        }
      }
      // xxx tabs - wrap collapsible content here
      collapsibleContent = collapsible.wrapInner( "<div class='ui-collapsible-content'></div>" ).children( ".ui-collapsible-content" );
      if ( o.contentTheme ) {
        collapsibleClasses += " ui-collapsible-themed-content";
        collapsibleContent.addClass( "ui-body-" + o.contentTheme );
      }
      if ( collapsibleClasses !== "" ) {
        collapsible.addClass( collapsibleClasses );
      }

			collapsibleHeading
				//drop heading in before content
				.insertBefore( collapsibleContent )
				//modify markup & attributes
				.addClass( "ui-collapsible-heading" )
				.append( "<span class='ui-collapsible-heading-status'></span>" )
				.wrapInner( "<a href='#' class='ui-collapsible-heading-toggle'></a>" )
				.find( "a" )
					.first()
					.buttonMarkup({
						shadow: false,
						corners: false,
						// xxx tabs - remove iconpos in horizontal sets, if no collapsed-icon is set
						iconpos: $el.jqmData( "iconpos" ) || o.iconPos || ( o.collapsedIcon == undefined ? null : o.iconpos ),
						icon: o.collapsedIcon,
						mini: o.mini,
						theme: o.theme
					});
    }
		//events
		collapsible
			.bind( "expand collapse", function( event ) {
				if ( !event.isDefaultPrevented() ) {
					var $this = $( this ),
						isCollapse = ( event.type === "collapse" );
            event.preventDefault();

					collapsibleHeading
						.toggleClass( "ui-collapsible-heading-collapsed", isCollapse )
						.find( ".ui-collapsible-heading-status" )
							.text( isCollapse ? o.expandCueText : o.collapseCueText )
						.end()
						.find( ".ui-icon" )
							.toggleClass( "ui-icon-" + o.expandedIcon, !isCollapse )
							// logic or cause same icon for expanded/collapsed state would remove the ui-icon-class
							.toggleClass( "ui-icon-" + o.collapsedIcon, ( isCollapse || o.expandedIcon === o.collapsedIcon ) )
            .end()
						// xxx tabs - maintain active class on active tabs in horizontal collapsibles
						.find( "a" ).first()[o.direction == 'horizontal' ? 'toggleClass':'removeClass']( $.mobile.activeBtnClass , ( o.direction == "horizontal" ? !isCollapse : false ) );
					$this.toggleClass( "ui-collapsible-collapsed", isCollapse );
					collapsibleContent.toggleClass( "ui-collapsible-content-collapsed", isCollapse ).attr( "aria-hidden", isCollapse );
					if ( o.eventsOnly != false ){
						collapsibleContent.trigger( "updatelayout" );
					}
				}
			})
			// xxx tabs - seems to trigger a 2nd run of collapse/expand
			.trigger( o.eventsOnly != false ? (o.collapsed ? "collapse" : "expand") : "" );
      
		collapsibleHeading
			.bind( "tap", function( event ) {
				collapsibleHeading.find( "a" ).first().addClass( $.mobile.activeBtnClass );
			})
			.bind( "click", function( event ) {

				var type = collapsibleHeading.is( ".ui-collapsible-heading-collapsed" ) ? "expand" : "collapse";

				collapsible.trigger( type );

				event.preventDefault();
				event.stopPropagation();
			});
	}
});

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.collapsible.prototype.enhanceWithin( e.target );
});

})( jQuery );