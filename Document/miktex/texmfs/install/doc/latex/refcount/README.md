# refcount

refcount package for LaTeX


References are not numbers, however they often store numerical
data such as section or page numbers. \ref or \pageref
cannot be used for counter assignments or calculations because
they are not expandable, generate warnings, or can even be links.
The package provides expandable macros to extract the data
from references. Packages hyperref, nameref,
titleref, and babel are supported.