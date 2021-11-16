#----------------------------------------------------------------
# Generated CMake target import file for configuration "Release".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "2Geom::2geom" for configuration "Release"
set_property(TARGET 2Geom::2geom APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(2Geom::2geom PROPERTIES
  IMPORTED_IMPLIB_RELEASE "${_IMPORT_PREFIX}/lib/lib2geom.dll.a"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/bin/lib2geom.dll"
  )

list(APPEND _IMPORT_CHECK_TARGETS 2Geom::2geom )
list(APPEND _IMPORT_CHECK_FILES_FOR_2Geom::2geom "${_IMPORT_PREFIX}/lib/lib2geom.dll.a" "${_IMPORT_PREFIX}/bin/lib2geom.dll" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
