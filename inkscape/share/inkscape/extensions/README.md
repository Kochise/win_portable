# Inkscape Extensions

This folder contains the stock Inkscape extensions, i.e. the scripts that
implement some commands that you can use from within Inkscape. Most of
these commands are in the Extensions menu.

## Installation

These scripts should be installed with an Inkscape package already (if you have 
installed Inkscape). For packagers or people testing newer releases, you can 
install the files into /usr/share/inkscape/extensions or 
~/.config/inkscape/extensions .

## Testing

These extensions are designed to have good test coverage for python 3.6 and above.

You must install the program `pytest` in order to run these tests. You may run all tests by omitting any other parameters or select tests by adding the test filename that you want to run.

    pytest
    pytest tests/test_my_extension.py

See TESTING.md for further details.

## Extension description

Each *.inx file describes an extension, listing its name, purpose,
prerequisites, location within the menu, etc. These files are read by
Inkscape on launch. Other files are the scripts themselves (Perl,
Python, and Ruby are supported, as well as shell scripts).

## Development

Development of both the core inkex modules, tests and each of the extensions
contained within the core inkscape extensions repository should follow these
basic rules of quality assurance:

 * Use pylint to ensure code is written consistantly
 * Have tests so that each line of an extension is covered in the coverage report
 * Not cross streams between extensions, so your extension should import from
   a module and not from another extension.
 * Use translations on text for display to users using get text.
 * Should not require external programs to work (with some exceptions)

Also join the community on chat.inkscape.org channel #inkscape_extensions with any
doubts or problems.

## Building Docs

You may wish to compile to docs for use outside of the Inkscape docs, this can 
be done with these commands:

    sphinx-apidoc -F -o source inkex
    ./setup.py build_sphinx -s source
    firefox ./build/sphinx/html/inkex.html

All documentation should be included INSIDE of each python module.

The latest documentation for master branch can be found at
https://inkscape.gitlab.io/extensions/documentation/.

## License Requirements

Only include extensions here which are GPL-compatible.  This includes
Apache-2, MPL 1.1, certain Creative Commons licenses, and more.  See
https://www.gnu.org/licenses/license-list.html for guidance.
