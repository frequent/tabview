tabview
=======

tabs for Jquery Mobile 

version based on JQM 1.3.1 latest

1. How to use - Tabs  
Add `data-type="horizontal"` to a collapsible set. Currently a maximum of 5 tabs are possible (based on JQM grid).

2. How to use - Events Only   
Add `data-create="false"` to a collapsible set or collapsible. This will only add events and methods, but NO markup. Use this if you build enhanced widget (a) on the server,  (b) yourself on the client from cacheable HTML templates.
  
2. Options
Tabview supports most of the regular collapsible set options:

- `data-inset="false"` = remove corners, stretch tabs full screen
- `data-collapsedIcon/data-expandedIcon="___"` = by default tabs are without icons. To add icons, specifiy collapsed/expanded icons on the collapsible
- `data-content-theme="_"` = add borders and background to the collapsible content section

3. Demo
Can be found here:  [JQM tabview plugin](http://www.franckreich.de/jqm/tabview/demo.html)
