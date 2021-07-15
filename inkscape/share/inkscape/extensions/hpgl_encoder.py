# coding=utf-8
#
# Copyright (C) 2008 Aaron Spike, aaron@ekips.org
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
#
"""
Base class for HGPL Encoding
"""

import re
import math

import inkex
from inkex.transforms import Transform, DirectedLineSegment, Vector2d
from inkex.bezier import cspsubdiv

class NoPathError(ValueError):
    """Raise that paths not selected"""

# Find the pen number in the layer number
FIND_PEN = re.compile(r'\s*pen\s*(\d+)\s*', re.IGNORECASE)
# Find the pen speed in the layer number
FIND_SPEED = re.compile(r'\s*speed\s*(\d+)\s*', re.IGNORECASE)
# Find pen force in the layer name
FIND_FORCE = re.compile(r'\s*force\s*(\d+)\s*', re.IGNORECASE)



class hpglEncoder(object):
    """HPGL Encoder, used by others"""
    def __init__(self, effect):
        """ options:
                "resolutionX":float
                "resolutionY":float
                "pen":int
                "force:int
                "speed:int
                "orientation":string // "0", "90", "-90", "180"
                "mirrorX":bool
                "mirrorY":bool
                "center":bool
                "flat":float
                "overcut":float
                "toolOffset":float
                "precut":bool
                "autoAlign":bool
        """
        self.options = effect.options
        self.doc = effect.svg
        self.docWidth = effect.svg.unittouu(effect.svg.get('width'))
        self.docHeight = effect.svg.unittouu(effect.svg.get('height'))
        self.hpgl = ''
        self.divergenceX = 'False'
        self.divergenceY = 'False'
        self.sizeX = 'False'
        self.sizeY = 'False'
        self.dryRun = True
        self.lastPoint = [0, 0, 0]
        self.lastPen = -1
        self.lastSpeed = -1
        self.lastForce = -1
        self.offsetX = 0
        self.offsetY = 0
        # dots per inch to dots per user unit:

        self.scaleX = self.options.resolutionX / effect.svg.unittouu("1.0in")
        self.scaleY = self.options.resolutionY / effect.svg.unittouu("1.0in")
        scaleXY = (self.scaleX + self.scaleY) / 2

        # mm to dots (plotter coordinate system):
        self.overcut = effect.svg.unittouu(str(self.options.overcut) + "mm") * scaleXY
        self.toolOffset = effect.svg.unittouu(str(self.options.toolOffset) + "mm") * scaleXY

        # scale flatness to resolution:
        self.flat = self.options.flat / (1016 / ((self.options.resolutionX + \
                                                self.options.resolutionY) / 2))
        if self.toolOffset > 0.0:
            self.toolOffsetFlat = self.flat / self.toolOffset * 4.5 # scale flatness to offset
        else:
            self.toolOffsetFlat = 0.0
        self.mirrorX = -1.0 if self.options.mirrorX else 1.0
        self.mirrorY = 1.0 if self.options.mirrorY else -1.0
        # process viewBox attribute to correct page scaling
        self.viewBoxTransformX = 1
        self.viewBoxTransformY = 1
        viewBox = effect.svg.get_viewbox()
        if viewBox and viewBox[2] and viewBox[3]:
            self.viewBoxTransformX = self.docWidth / effect.svg.unittouu(effect.svg.add_unit(viewBox[2]))
            self.viewBoxTransformY = self.docHeight / effect.svg.unittouu(effect.svg.add_unit(viewBox[3]))

    def getHpgl(self):
        """Return the HPGL instructions"""
        # dryRun to find edges
        transform = Transform([
            [self.mirrorX * self.scaleX * self.viewBoxTransformX, 0.0, 0.0],
            [0.0, self.mirrorY * self.scaleY * self.viewBoxTransformY, 0.0]]
        )
        transform.add_rotate(int(self.options.orientation))

        self.vData = [['', 'False', 0], ['', 'False', 0], ['', 'False', 0], ['', 'False', 0]]
        self.process_group(self.doc, transform)
        if self.divergenceX == 'False' or self.divergenceY == 'False' or self.sizeX == 'False' or self.sizeY == 'False':
            raise NoPathError("No paths found")
        # live run
        self.dryRun = False
        # move drawing according to various modifiers
        if self.options.autoAlign:
            if self.options.center:
                self.offsetX -= (self.sizeX - self.divergenceX) / 2
                self.offsetY -= (self.sizeY - self.divergenceY) / 2
        else:
            self.divergenceX = 0.0
            self.divergenceY = 0.0
            if self.options.center:
                if self.options.orientation == '0':
                    self.offsetX -= (self.docWidth * self.scaleX) / 2
                    self.offsetY += (self.docHeight * self.scaleY) / 2
                if self.options.orientation == '90':
                    self.offsetY += (self.docWidth * self.scaleX) / 2
                    self.offsetX += (self.docHeight * self.scaleY) / 2
                if self.options.orientation == '180':
                    self.offsetX += (self.docWidth * self.scaleX) / 2
                    self.offsetY -= (self.docHeight * self.scaleY) / 2
                if self.options.orientation == '270':
                    self.offsetY -= (self.docWidth * self.scaleX) / 2
                    self.offsetX -= (self.docHeight * self.scaleY) / 2
            else:
                if self.options.orientation == '0':
                    self.offsetY += self.docHeight * self.scaleY
                if self.options.orientation == '90':
                    self.offsetY += self.docWidth * self.scaleX
                    self.offsetX += self.docHeight * self.scaleY
                if self.options.orientation == '180':
                    self.offsetX += self.docWidth * self.scaleX
        if not self.options.center and self.toolOffset > 0.0:
            self.offsetX += self.toolOffset
            self.offsetY += self.toolOffset

        # initialize transformation matrix and cache
        transform = Transform([
            [self.mirrorX * self.scaleX * self.viewBoxTransformX,
             0.0,
             -float(self.divergenceX) + self.offsetX],
            [0.0,
             self.mirrorY * self.scaleY * self.viewBoxTransformY,
             -float(self.divergenceY) + self.offsetY]
        ])
        transform.add_rotate(int(self.options.orientation))
        self.vData = [['', 'False', 0], ['', 'False', 0], ['', 'False', 0], ['', 'False', 0]]
        # add move to zero point and precut
        if self.toolOffset > 0.0 and self.options.precut:
            if self.options.center:
                # position precut outside of drawing plus one time the tooloffset
                if self.offsetX >= 0.0:
                    precutX = self.offsetX + self.toolOffset
                else:
                    precutX = self.offsetX - self.toolOffset
                if self.offsetY >= 0.0:
                    precutY = self.offsetY + self.toolOffset
                else:
                    precutY = self.offsetY - self.toolOffset
                self.processOffset('PU', Vector2d(precutX, precutY), self.options.pen, self.options.speed, self.options.force)
                self.processOffset('PD', Vector2d(precutX, precutY + self.toolOffset * 8), self.options.pen, self.options.speed, self.options.force)
            else:
                self.processOffset('PU', Vector2d(0, 0), self.options.pen, self.options.speed, self.options.force)
                self.processOffset('PD', Vector2d(0, self.toolOffset * 8), self.options.pen, self.options.speed, self.options.force)
        # start conversion
        self.process_group(self.doc, transform)
        # shift an empty node in in order to process last node in cache
        if self.toolOffset > 0.0 and not self.dryRun:
            self.processOffset('PU', Vector2d(0, 0), 0, 0, 0)
        return self.hpgl

    def process_group(self, group, transform):
        """flatten layers and groups to avoid recursion"""
        for child in group:
            if not isinstance(child, inkex.ShapeElement):
                continue
            if child.is_visible():
                if isinstance(child, inkex.Group):
                    self.process_group(child, transform)
                elif isinstance(child, inkex.PathElement):
                    self.process_path(child, transform)
                else:
                    # This only works for shape elements (not text yet!)
                    new_elem = child.replace_with(child.to_path_element())
                    # Element is given composed transform b/c it's not added back to doc
                    new_elem.transform = child.composed_transform()
                    self.process_path(new_elem, transform)

    def get_pen_number(self, node):
        """Get pen number for node label (usually group)"""
        for parent in [node] + list(node.ancestors()):
            match = FIND_PEN.search(parent.label or '')
            if match:
                return int(match.group(1))
        return int(self.options.pen)

    def get_pen_speed(self, node):
        """Get pen speed for node label (usually group)"""
        for parent in [node] + list(node.ancestors()):
            match = FIND_SPEED.search(parent.label or '')
            if match:
                return int(match.group(1))
        return int(self.options.speed)
    
    def get_pen_force(self, node):
        """Get pen force for node label (usually group)"""
        for parent in [node] + list(node.ancestors()):
            match = FIND_FORCE.search(parent.label or '')
            if match:
                return int(match.group(1))
        return int(self.options.force)

    def process_path(self, node, transform):
        """Process the given element into a plotter path"""
        pen = self.get_pen_number(node)
        speed = self.get_pen_speed(node)
        force = self.get_pen_force(node)

        path = node.path.to_absolute()\
                   .transform(node.composed_transform())\
                   .transform(transform)\
                   .to_superpath()
        if path:
            cspsubdiv(path, self.flat)
            # path to HPGL commands
            oldPosX = 0.0
            oldPosY = 0.0
            for singlePath in path:
                cmd = 'PU'
                for singlePathPoint in singlePath:
                    posX, posY = singlePathPoint[1]
                    # check if point is repeating, if so, ignore
                    if int(round(posX)) != int(round(oldPosX)) \
                            or int(round(posY)) != int(round(oldPosY)):
                        self.processOffset(cmd, Vector2d(posX, posY), pen, speed, force)
                        cmd = 'PD'
                        oldPosX = posX
                        oldPosY = posY
                # perform overcut
                if self.overcut > 0.0 and not self.dryRun:
                    # check if last and first points are the same, otherwise the path
                    # is not closed and no overcut can be performed
                    if int(round(oldPosX)) == int(round(singlePath[0][1][0])) and\
                                        int(round(oldPosY)) == int(round(singlePath[0][1][1])):
                        overcutLength = 0
                        for singlePathPoint in singlePath:
                            posX, posY = singlePathPoint[1]
                            # check if point is repeating, if so, ignore
                            if int(round(posX)) != int(round(oldPosX)) or int(round(posY))\
                                                                            != int(round(oldPosY)):
                                overcutLength += (Vector2d(posX, posY) - (oldPosX, oldPosY)).length
                                if overcutLength >= self.overcut:
                                    newEndPoint = self.changeLength(Vector2d(oldPosX, oldPosY),\
                                            Vector2d(posX, posY), - (overcutLength - self.overcut))
                                    self.processOffset(cmd, newEndPoint, pen, speed, force)
                                    break
                                self.processOffset(cmd, Vector2d(posX, posY), pen, speed, force)
                                oldPosX = posX
                                oldPosY = posY

    def changeLength(self, p1, p2, offset):
        """change length of line"""
        if p1.x == p2.x and p1.y == p2.y:  # abort if points are the same
            return p1
        return Vector2d(DirectedLineSegment(p2, p1).point_at_length(- offset))

    def processOffset(self, cmd, point, pen, speed, force):
        """ Calculate offset correction """
        if self.toolOffset == 0.0 or self.dryRun:
            self.storePoint(cmd, point, pen, speed, force)
        else:
            # insert data into cache
            self.vData.pop(0)
            self.vData.insert(3, [cmd, point, pen, speed, force])
            # decide if enough data is available
            if self.vData[2][1] != 'False':
                if self.vData[1][1] == 'False':
                    self.storePoint(self.vData[2][0], self.vData[2][1], self.vData[2][2], self.vData[2][3], self.vData[2][4])
                else:
                    # perform tool offset correction (It's a *tad* complicated, if you want
                    #                     to understand it draw the data as lines on paper)
                    if self.vData[2][0] == 'PD':
                        # If the 3rd entry in the cache is a pen down command,
                        #             make the line longer by the tool offset
                        pointThree = self.changeLength(self.vData[1][1], self.vData[2][1], self.toolOffset)
                        self.storePoint('PD', pointThree, self.vData[2][2], self.vData[2][3], self.vData[2][4])
                    elif self.vData[0][1] != 'False':
                        # Elif the 1st entry in the cache is filled with data and the 3rd entry
                        #   is a pen up command shift the 3rd entry by the current tool offset
                        #   position according to the 2nd command
                        pointThree = self.changeLength(self.vData[0][1], self.vData[1][1], self.toolOffset)
                        pointThree = self.vData[2][1] - (self.vData[1][1] - pointThree)
                        self.storePoint('PU', pointThree, self.vData[2][2], self.vData[2][3], self.vData[2][4])
                    else:
                        # Else just write the 3rd entry
                        pointThree = self.vData[2][1]
                        self.storePoint('PU', pointThree, self.vData[2][2], self.vData[2][3], self.vData[2][4])
                    if self.vData[3][0] == 'PD':
                        # If the 4th entry in the cache is a pen down command guide tool to next
                        #           line with a circle between the prolonged 3rd and 4th entry
                        originalSegment = DirectedLineSegment(self.vData[2][1], self.vData[3][1])
                        if originalSegment.length >= self.toolOffset:
                            pointFour = self.changeLength(originalSegment.end,\
                                                        originalSegment.start, - self.toolOffset)
                        else:
                            pointFour = self.changeLength(originalSegment.start,\
                                    originalSegment.end, self.toolOffset - originalSegment.length)
                        # get angle start and angle vector
                        angleStart = DirectedLineSegment(self.vData[2][1], pointThree).angle
                        angleVector = DirectedLineSegment(self.vData[2][1], pointFour).angle\
                                                                                    - angleStart
                        # switch direction when arc is bigger than 180°
                        if angleVector > math.pi:
                            angleVector -= math.pi * 2
                        elif angleVector < - math.pi:
                            angleVector += math.pi * 2
                        # draw arc
                        if angleVector >= 0:
                            angle = angleStart + self.toolOffsetFlat
                            while angle < angleStart + angleVector:
                                self.storePoint('PD', self.vData[2][1] + self.toolOffset *\
                                    Vector2d(math.cos(angle), math.sin(angle)), self.vData[2][2], self.vData[2][3], self.vData[2][4])
                                angle += self.toolOffsetFlat
                        else:
                            angle = angleStart - self.toolOffsetFlat
                            while angle > angleStart + angleVector:
                                self.storePoint('PD', self.vData[2][1] + self.toolOffset *\
                                    Vector2d(math.cos(angle), math.sin(angle)), self.vData[2][2], self.vData[2][3], self.vData[2][4])
                                angle -= self.toolOffsetFlat
                        self.storePoint('PD', pointFour, self.vData[3][2], self.vData[2][3], self.vData[2][4])

    def storePoint(self, command, point, pen, speed, force):
        x = int(round(point.x))
        y = int(round(point.y))
        # skip when no change in movement
        if self.lastPoint[0] == command and self.lastPoint[1] == x and self.lastPoint[2] == y:
            return
        if self.dryRun:
            # find edges
            if self.divergenceX == 'False' or x < self.divergenceX:
                self.divergenceX = x
            if self.divergenceY == 'False' or y < self.divergenceY:
                self.divergenceY = y
            if self.sizeX == 'False' or x > self.sizeX:
                self.sizeX = x
            if self.sizeY == 'False' or y > self.sizeY:
                self.sizeY = y
        else:
            # store point
            if not self.options.center:
                # only positive values are allowed (usually)
                if x < 0:
                    x = 0
                if y < 0:
                    y = 0
            # select correct pen
            if self.lastPen != pen:
                self.hpgl += ';PU;SP%d' % pen
            if self.lastSpeed != speed: 
                if speed > 0:
                   self.hpgl += ';VS%d' % speed
            if self.lastForce != force: 
                if force > 0:
                   self.hpgl += ';FS%d' % force   
               # do not repeat command
            if command == 'PD' and self.lastPoint[0] == 'PD' and self.lastPen == pen: 
                self.hpgl += ',%d,%d' % (x, y)
            else:
                self.hpgl += ';%s%d,%d' % (command, x, y)
            self.lastPen = pen
            self.lastSpeed = speed
            self.lastForce = force
        self.lastPoint = [command, x, y]
        
