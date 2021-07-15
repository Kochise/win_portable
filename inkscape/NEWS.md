Inkscape 1.1
------------

Released on **2021-05-24**

Release highlights
----------------

 * A Welcome dialog, where the look of Inkscape can be selected, and some choices for the new document's size or file to open are available
 * A Command palette that opens when the ? key is pressed and that allows to search and use many functions without having to use a keyboard shortcut or going through the menus
 * It is now possible to copy, cut and paste parts of paths with the Node tool
 * The dialog docking system has been rewritten, which resolves many issues with Inkscape's docked dialogs and allows you to dock dialogs on either side of the screen
 * New Outline Overlay mode that displays object outlines while also showing their real colors
 * Preferences options are now easier to find by using the new search field
 * It is no longer necessary to remember to click on 'Export' in the PNG Export dialog, as the exporting will already happen after the click on 'Save' in the file selection dialog.
 * Export as JPG, TIFF, optimized PNG and WebP directly from Inkscape
 * When pasting a copied object, Inkscape now pastes it directly on top of the currently selected object by default
 * An extension for updating extensions and installing additional extensions, called the Extension Manager (currently in beta stage)



Full release notes on https://wiki.inkscape.org/wiki/index.php/Release_notes/1.1


Inkscape 1.0.2
------------

Released on **2021-01-17**

Release highlights
------------------

This is a bugfix release:

- More granular controls for canvas zooming and rotation
- Fixes extensions popping up when a clipboard manager was used
- Several crashes fixed


Full release notes on https://wiki.inkscape.org/wiki/index.php/Release_notes/1.0.2



Inkscape 1.0.1
------------

Released on **2020-09-07**.

Release highlights
------------------

- Selectors/CSS dialog is now available
- Experimental color-managed PDF export through Scribus
- Many crash fixes and bugs fixed



### Selectors and CSS dialog

The Selectors and CSS dialog that was hidden and labelled as 'experimental' in
Inkscape 1.0 is now available from the Object menu in 1.0.1. This new dialog
allows users to edit a CSS stylesheet for the document and also to select all
objects with a certain CSS selector, thus providing a replacement for the
Selection Sets dialog, that had to be removed for Inkscape 1.0.

### Scribus PDF export

An experimental PDF export extensions was added that uses Scribus 1.5.5+ if it
can be found in the path. You'll need to use a color profile in the SVG file
and make sure to double-check the exported image, as there are many SVG
features not supported by Scribus.

Full release notes on https://wiki.inkscape.org/wiki/index.php/Release_notes/1.0.1


Inkscape 1.0
------------

Released on **2020-05-01**

Release highlights
----------------


 * Theming support and more new customization options
 * Better HiDPI (high resolution) screen support
 * Native support for macOS with a signed and notarized .dmg file
 * Coordinate origin in top left corner by default
 * Canvas rotation and mirroring
 * On-Canvas alignment of objects
 * Split view and X-Ray modes
 * PowerPencil for drawing editable, variable width strokes with a pressure sensitive graphics tablet
 * New PNG export options
 * Integrated centerline tracing for vectorizing line drawings
 * Searchable Symbols dialog
 * New Live Path Effect (LPE) selection dialog
 * New Corners (Fillet/chamfer) LPE, (lossless) Boolean Operation LPE (experimental), Offset LPE and Measure Segments LPE (and more!)
 * Path operations, deselection of a large number of paths as well as grouping/ungrouping are much faster now
 * Much improved text line-height settings
 * Variable fonts support (only if compiled with pango library version >= 1.41.1)
 * Browser-compatible flowed text
 * Extensions programming interface updated, with many new options - Note: this introduces breaking changes, some third-party extensions will have to be updated to work with Inkscape 1.0
 * Python 3 support for extensions

Full release notes on https://wiki.inkscape.org/wiki/index.php/Release_notes/1.1

Older release notes on https://wiki.inkscape.org/wiki/index.php/Release_notes
