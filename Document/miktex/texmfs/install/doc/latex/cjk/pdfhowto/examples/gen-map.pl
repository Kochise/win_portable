#!/usr/bin/perl -w 

@font_list =
(
 "cwtb", "bbttf.ttf",  55,
 "cwtf", "fttf.ttf",   55,
 "cwtk", "kttf.ttf",   55,
 "cwtm", "mttf.ttf",   55,
 "cwtr", "rttf.ttf",   55,
#
 "mekl", "kai-linux.ttf", 58,
 "mest", "edustd-15.ttf", 55,
 "mesx", "edustds1.ttf",  55,
 "mesy", "edustds2.ttf",  55,
 "meko", "moe_kai.ttf",   58, 
 "meso", "moe_sung.ttf",  58,
#
 "bkai", "bkai00mp.ttf", 55,
 "bsmi", "bsmi00lp.ttf", 55,
# 
 "gbsn", "gbsn00lp.ttf", 32,
 "gkai", "gkai00mp.ttf", 32,
#
 "ntbr", "ntu_br.ttf",   58,
 "ntfs", "ntu_fs_m.ttf", 58,
 "ntka", "ntu_kai.ttf",  58,
 "ntli", "ntu_li_m.ttf", 58,
 "ntmb", "ntu_mb.ttf",   58,
 "ntmm", "ntu_mm.ttf",   58,
 "ntmr", "ntu_mr.ttf",   58,
 "nttw", "ntu_tw.ttf",   58,
#
 "wclj", "wcl-01.ttf",   55,
 "wclk", "wcl-02.ttf",   55,
 "wcll", "wcl-03.ttf",   55,
 "wclm", "wcl-04.ttf",   55,
 "wcln", "wcl-05.ttf",   55,
 "wclp", "wcl-06.ttf",   55,
 "wclq", "wcl-07.ttf",   55,
 "wclr", "wcl-08.ttf",   55,
 "wcls", "wcl-09.ttf",   55,
 "wclt", "wcl-10.ttf",   55,
#
 "zysg", "zysong.ttf", 32,
#
 "wnmc", "watanabe-mincho.ttf", 35,
 "wdgt", "wadalab-gothic.ttf", 35,
#
 "kcgt", "kochi-gothic.ttf", 31,
 "kcmc", "kochi-mincho.ttf", 31,
#
 "acrj", "kochi-mincho.ttf", 31,
 "acrg", "gbsn00lp.ttf", 32,
 "acrb",  "bsmi00lp.ttf", 55,
#
"ykah", "yka00hp.ttf", 57,
"gtrl", "gtr00lp.ttf", 57,
"gtrm", "gtr00mp.ttf", 57,
"leim", "lei00mp.ttf", 57,
"heim", "hei01mp.ttf", 57,
"sunm", "sun00mp.ttf", 57,
#
"gbsnl", "gbsn00l.ttf",32,
"ggtrl", "ggtr00l.ttf",32,
"gkaim", "gkai00m.ttf",32,
"gleim", "glei00m.ttf",32,
"gsinm", "gsin00m.ttf",32,
"tgtrl", "tgtr00l.ttf",32,
"tkaim", "tkai00m.ttf",32,
"tleim", "tlei00m,ttf",32,
"tooru", "toor00u.ttf",32,
"tovru", "tovr00u.ttf",32,
"tsinm", "tsin00m.ttf",32,
#
"dcaiq", "dcai5.ttc", 31,
"dcailq", "dcail5.ttc", 31,
"dcaisq", "dcais5.ttc", 31,
"dccryq", "dccry5.ttc", 31,
"dchgmq", "dchgm5.ttc", 31,
"dchleiq", "dchlei5.ttc", 31,
"dcinlq", "dcinl5.ttc", 31,
"dckgmc", "dckgmc.ttc", 31,
"dclkaiq", "dclkai5.ttc", 31,
"dcysmr", "dcysm7.ttc", 31,
"dfcrdp", "dfcrd3.ttc", 31,
"dffrsp", "dffrs3.ttc", 31,
"dfgskr", "dfgsk7.ttc", 31,
"dfkaie", "dfkaie.ttc", 31,
"dfkbtp", "dfkbt3.ttc", 31,
"dfoyjq", "dfoyj5.ttc", 31,
"dfryss", "dfrys9.ttc", 31,
"dfshtq", "dfsht5.ttc", 31,
"dfshtr", "dfsht7.ttc", 31,
"dfskair", "dfskai7.ttc", 31,
#
);

open(LISTFILE, "> map.list");

$list_length = (scalar @font_list ) /3 ;
for ($i = 0; $i < $list_length ; $i++)
{
    $stem    = shift @font_list;
    $font    = shift @font_list;
    $entries = shift @font_list;
    print LISTFILE "f ", $stem, ".map\n";
    open(MAPFILE, "> ${stem}.map");
    
    for ($j=1; $j<= $entries ; $j++)
    {
        $j_pad = sprintf "%2.2d", $j;
        print MAPFILE  
            $stem, $j_pad, " ", $stem, $j_pad, " <",
            $stem, $j_pad, ".enc <",
            $font, "\n";
    }
    close(MAPFILE);
}
close(LISTFILE);

