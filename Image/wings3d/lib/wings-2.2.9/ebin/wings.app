%%  wings.app --
%%
%%     Application file
%%
%%  Copyright (c) 2017 Dan Gudmundsson
%%
%%  See the file "license.terms" for information on usage and redistribution
%%  of this file, and for a DISCLAIMER OF ALL WARRANTIES.
%%


{application, wings,
 [{description, "Wings 3D application"},
  {vsn, "2.2.9"},
  {modules, [libigl, user_default, wings, wings_align, wings_body, wings_bool, wings_camera, wings_cl, wings_cc, wings_collapse, wings_color, wings_console, wings_deform, wings_develop, wings_dialog, wings_dissolve, wings_dl, wings_drag, wings_draw, wings_draw_setup, wings_edge, wings_edge_cmd, wings_edge_loop, wings_export, wings_extrude_edge, wings_extrude_face, wings_face, wings_face_cmd, wings_facemat, wings_file, wings_ff_ndo, wings_ff_wings, wings_frame, wings_geom_win, wings_gl, wings_glfont, wings_glu_tess, wings_help, wings_hotkey, wings_info, wings_image, wings_image_viewer, wings_import, wings_io, wings_io_wx, wings_job, wings_light, wings_magnet, wings_material, wings_menu, wings_menu_util, wings_move, wings_msg, wings_obj, wings_outliner, wings_palette, wings_pb, wings_pick, wings_pick_nif, wings_plugin, wings_pref, wings_pref_dlg, wings_proxy, wings_render, wings_rotate, wings_s, wings_sel, wings_sel_conv, wings_sel_cmd, wings_scale, wings_shaders, wings_shapes, wings_start, wings_status, wings_subdiv, wings_sup, wings_theme, wings_toolbar, wings_tesselation, wings_text, wings_tweak, wings_tweak_win, wings_u, wings_undo, wings_util, wings_va, wings_vbo, wings_vec, wings_vertex, wings_vertex_cmd, wings_view, wings_view_win, wings_we, wings_we_build, wings_we_util, wings_wm, wpa, ww_color_ctrl, ww_color_slider, jsone, jsone_decode, jsone_encode,wings_lang]},
  {registered, [wings_sup, wings]},
  {applications, [kernel, stdlib]},
  {env, []},
  {mod, {wings_sup, []}},
  {runtime_dependencies, ["erts-7.0","stdlib-3.1", "kernel-3.0"]}]}. %% cl e3d ...xmerl


