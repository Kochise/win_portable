/*
 * Authors:
 *   Thomas Holder
 *   Sergei Izmailov
 *
 * Copyright 2020 Authors
 *
 * SPDX-License-Identifier: LGPL-2.1 or MPL-1.1
 */

#ifndef LIB2GEOM_SEEN_PARALLELOGRAM_H
#define LIB2GEOM_SEEN_PARALLELOGRAM_H

#include <2geom/affine.h>
#include <2geom/rect.h>

namespace Geom {

/**
 * Paralellogram, representing a linear transformation of a rectangle.
 *
 * Implements efficient "contains" and "intersects" operations.
 */
class Parallelogram {
    Affine m_affine;

    /// Transformed unit rectangle
    Parallelogram(Affine const &affine)
        : m_affine(affine)
    {
    }

  public:
    explicit Parallelogram(Rect const &rect)
        : m_affine(rect.width(), 0, 0, rect.height(), rect.left(), rect.top())
    {
    }

    Point corner(unsigned i) const;

    Point midpoint() const { return Point(0.5, 0.5) * m_affine; }

    /// Area (non-negative)
    Coord area() const { return m_affine.descrim2(); }

    /// Axis-aligned bounding box
    Rect bounds() const;

    bool intersects(Parallelogram const &) const;
    bool intersects(Rect const &rect) const { return intersects(Parallelogram(rect)); }

    bool contains(Point const &) const;
    bool contains(Parallelogram const &) const;
    bool contains(Rect const &rect) const { return contains(Parallelogram(rect)); }

    /// Returns shorter side length
    Coord minExtent() const;

    /// Returns longer side length
    Coord maxExtent() const;

    /// Return a new transformed parallelogram
    Parallelogram operator*(Affine const &affine) const { return m_affine * affine; }
    Parallelogram &operator*=(Affine const &affine) { m_affine *= affine; return *this; }

    /// True if this parallelogram does not have right angles
    bool isSheared(Coord eps = EPSILON) const;
};

} // namespace Geom

#endif

/*
  Local Variables:
  mode:c++
  c-file-style:"stroustrup"
  c-file-offsets:((innamespace . 0)(inline-open . 0)(case-label . +))
  indent-tabs-mode:nil
  fill-column:99
  End:
*/
// vim: filetype=cpp:expandtab:shiftwidth=4:tabstop=8:softtabstop=4:fileencoding=utf-8:textwidth=99 :
