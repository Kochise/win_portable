#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Copyright 2020 Martin Owens <doctormo@gmail.com>
#
# This program is free software: you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation, either version 3 of the License, or
#  (at your option) any later version.
#
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#
#  You should have received a copy of the GNU General Public License
#  along with this program.  If not, see <http://www.gnu.org/licenses/>
#
"""
Bootstrap the inkscape extensions manager setting up the virtualenv
and adding the extensions package.
"""

import os
import io
import sys

import inkex
from inkex.utils import get_user_directory
from inkex.base import InkscapeExtension
from inkex.command import CommandNotFound, ProgramRunError, call

TARGET_DIR = get_user_directory()
FALLBACK_DIR = os.path.join(TARGET_DIR or './', 'org.inkscape.inkman')
if os.path.isdir(FALLBACK_DIR):
    sys.path.insert(0, FALLBACK_DIR)

try:
    from manage_extensions import run as run_existing
except ImportError:
    run_existing = None

FALLBACK_URL = "https://media.inkscape.org/static/extensions-manager-fallback.zip"

class Bootstrap(InkscapeExtension):
    multi_inx = True

    def add_arguments(self, pars):
        pars.add_argument('--tab')
        pars.add_argument('--version', default='inkscape-extensions-manager')

    def load_raw(self):
        pass

    def save_raw(self, ret):
        if os.path.isdir(FALLBACK_DIR):
            sys.path.insert(0, FALLBACK_DIR)
        elif TARGET_DIR:
            sys.path.insert(0, TARGET_DIR)
        try:
            from manage_extensions import run as run_existing
        except (ImportError, ModuleNotFoundError):
            return self.msg("Extension manager installed, please re-run.")
        run_existing(sys.argv)

    def effect(self):
        fallback = False
        try:
            call('virtualenv', TARGET_DIR, p='python3')
        except CommandNotFound:
            fallback = True
        except ProgramRunError as err:
            raise inkex.AbortExtension(
                "There has been a problem creating the python environment:\n" + str(err))

        if fallback:
            # Add a fallback for places like windows where python isn't available.
            if self.install_fallback():
                return
            raise inkex.AbortExtension(
                "You must have the python-virtualenv package installed. This should have"
                " been included with Inkscape, but in some special cases it might not"
                " be. Please install this software externally and try again.")

        try:
            call(os.path.join(TARGET_DIR, 'bin', 'pip'), 'install', self.options.version)
        except CommandNotFound:
            raise inkex.AbortExtension("Can't find pip program after environment initialisation!")
        except ProgramRunError as err:
            raise inkex.AbortExtension("Error installing extension manager package:\n" + str(err))

    def install_fallback(self):
        """
        A pre-set zip installer which has been prepared for installation.
        """
        from urllib3.exceptions import NewConnectionError
        import requests
        import zipfile

        # Get remove content
        done = False
        session = requests.session()
        try:
            remote = session.get(FALLBACK_URL)
            if remote and remote.status_code == 200:
                with zipfile.ZipFile(io.BytesIO(remote.content)) as archive:
                    for filename in archive.namelist():
                        if '.inx' in filename:
                            done = True
                        self._install_file(archive.read(filename),
                            os.path.join(FALLBACK_DIR, filename))
        except NewConnectionError:
            self.msg("Could not connect to the internet, please check connection and try again!")
        finally:
            session.close()
        return done

    def _install_file(self, content, filename):
        """Install the content into the given location"""
        filedir = os.path.dirname(filename)
        if not os.path.isdir(filedir):
            os.makedirs(filedir)
        if not os.path.isdir(filename):
            with open(filename, 'wb') as fhl:
                fhl.write(content)

if __name__ == '__main__':
    if run_existing is not None:
        # If the extension manager is already installed
        # Run it instead of the bootstrap process.
        run_existing(sys.argv)
    else:
        Bootstrap().run()
