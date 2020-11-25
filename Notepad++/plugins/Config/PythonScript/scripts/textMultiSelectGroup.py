# -*- coding: utf-8 -*-

from Npp import editor, notepad

sel_start = editor.getSelectionStart()
sel_end = editor.getSelectionEnd()
sel_start = editor.wordStartPosition(sel_start, True)
single_group0_match_list = []
editor.research(r'\w+', lambda m: single_group0_match_list.append(m.group(0)), 0, sel_start, sel_end, 1)
if len(single_group0_match_list) == 1:
    word = single_group0_match_list[0]
    span_match_list = []
    editor.search(word, lambda m: span_match_list.append(m.span(0)), 0, sel_start, sel_end)
    if len(span_match_list) >= 2:
        if not editor.getMultipleSelection(): editor.setMultipleSelection(True)  # in case not enabled in the Preferences
        first = True
        for m in span_match_list:
            if first:
                editor.setSelection(m[1], m[0])
                first = False
            else:
                editor.addSelection(m[1], m[0])
