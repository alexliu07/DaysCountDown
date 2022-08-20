#----------------------------------------------------------------
# Generated CMake target import file for configuration "RelWithDebInfo".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "SnoreToast::snoretoast" for configuration "RelWithDebInfo"
set_property(TARGET SnoreToast::snoretoast APPEND PROPERTY IMPORTED_CONFIGURATIONS RELWITHDEBINFO)
set_target_properties(SnoreToast::snoretoast PROPERTIES
  IMPORTED_LOCATION_RELWITHDEBINFO "${_IMPORT_PREFIX}/bin/snoretoast.exe"
  )

list(APPEND _IMPORT_CHECK_TARGETS SnoreToast::snoretoast )
list(APPEND _IMPORT_CHECK_FILES_FOR_SnoreToast::snoretoast "${_IMPORT_PREFIX}/bin/snoretoast.exe" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
