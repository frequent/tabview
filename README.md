tabview
=======

tabs for Jquery Mobile 

version based on JQM 1.4.0a2 (August 2013)
=======

Changelog:
=========
**0.3.0**
- updated to JQM 1.4.0a2
- changed `data-type="horizontal"` to `data-type="tabs"`
- switched to fully CSS generated tabs
- added fallback to regular collapsible-set below 40em screen width (using media queries)

Notes:  
Tabs are now easier to manage using pure CSS. Just add the number of tabs you need
using `data-tabs="1-10"` to the collapsible set. Also, by default tabs fallback
to a regular collapsible-sets on small screens (see example). If you don't want
this, just remove the media query and tabs will be tabs at any screen size.

Todos:
- Fix bottom left corner of first tab
- Support data-icon="false" for text-only tabs
- Try two rows of tabs on small screens


1. How to use
Add `data-type="tabs"` to a collapsible set as well as `data-tabs="1-10"` to denote the number of tabs you need.
  
2. Options
Tabview supports the same options as regular collapsible sets.

2. Demo
Can be found here:  [JQM tabview plugin](http://www.franckreich.de/jqm/tabview/demo.html)
