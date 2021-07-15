include(CMakeFindDependencyMacro)
find_dependency(Boost 1.40 REQUIRED)
include("${CMAKE_CURRENT_LIST_DIR}/2GeomTargets.cmake")