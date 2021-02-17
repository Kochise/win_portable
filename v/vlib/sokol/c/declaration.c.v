module c

pub const (
  used_import = 1
)

#flag -I @VROOT/thirdparty/sokol
#flag -I @VROOT/thirdparty/sokol/util
#flag freebsd -I /usr/local/include

#flag darwin -fobjc-arc
#flag linux -lX11 -lGL -lXcursor -lXi
#flag freebsd -L/usr/local/lib -lX11 -lGL -lXcursor -lXi

#flag windows -lgdi32

// METAL
#flag darwin -DSOKOL_METAL
#flag darwin -framework Metal -framework Cocoa -framework MetalKit -framework QuartzCore

// OPENGL
#flag linux -DSOKOL_GLCORE33
#flag freebsd -DSOKOL_GLCORE33
//#flag darwin -framework OpenGL -framework Cocoa -framework QuartzCore

// D3D
#flag windows -DSOKOL_GLCORE33
//#flag windows -DSOKOL_D3D11

// for simplicity, all header includes are here because import order matters and we dont have any way
// to ensure import order with V yet
#define SOKOL_IMPL

// TODO should not be defined for android graphic (apk/aab using sokol) builds, but we have no ways to undefine
//#define SOKOL_NO_ENTRY
#flag linux   -DSOKOL_NO_ENTRY
#flag darwin  -DSOKOL_NO_ENTRY
#flag windows -DSOKOL_NO_ENTRY
#flag windows -DSOKOL_WIN32_FORCE_MAIN
#flag freebsd -DSOKOL_NO_ENTRY
#flag solaris -DSOKOL_NO_ENTRY
// TODO end

#include "sokol_v.h"

#include "sokol_app.h"

#define SOKOL_IMPL
#define SOKOL_NO_DEPRECATED
#include "sokol_gfx.h"

#define SOKOL_GL_IMPL
#include "util/sokol_gl.h"
