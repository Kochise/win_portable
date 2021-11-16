audioconverter 0.99a

1) Fixed some bugs
2) Improved translation support. Included Russian (by Evig) and German (by TychoBarfy) files.
3) AIFF input file format; ASF output file format


audioconverter 0.98a

1) fixes and additions
Bug fixed: fractional quality values in OGG, quality begins from -2 now (in ogg too).
Coding APE - OGG, MP3 and oth was fixed.
Note: Only (guaranteed) wav files supported are MS PCM wavs!
Faac does not writes non-english tags correctly - see workaround via nero.
Ability to disable any of used coder (derbruzzler - check your problem please)
New ver of ssrc.exe included. Thanks to Ivan Briano.
midi - some additional settings (resampling).
2) Additional options for console coders.
3) Localization. If you want to do localization - write me (to e-mail).

audioconverter 0.97a

1) output formats: amr, midi, nero aac
2) 2 engines for cdrip: basscd, wnaspi
3) Resampling of wav files (ssrc.exe)

audioconverter 0.96a

1) Output formats: lame.exe, MusePack (mppenc), WavPack lossy
2) Setting of process priority (exe) and window state.
3) Log of all exe launched. (see file exelogs.log in plugin directory)
4) non-english WMA tags fixed

audioconverter 0.95a

1) Input formats: WavPack
2) Output formats: WavPack, APE
3) DeGlitch, settings
4) Bugs. (See OGG quality bag when frac numbers are used) 

audioconverter 0.94a

AAC/MP4 output format

audioconverter 0.93a

1) Bug fixes
2) Ability to select path for dll/exe
3) WMA output format support

audioconverter 0.92

whats new in 0.92
1) Bug fixes
2) AC3 input format support

audioconverter 0.91

Note: Because of several output formats (since 0.91) we made a desicion to change the plugin title.

whats new in 0.91

1) Dynamic loading of all dll's that are used by the plugin. Since 0.91 you should place all the dlls
in the plugin folder. This package also comes with fresh version of lame_enc.dll.

2) Auto installation (inf file). There are 2 plugins in the package - wcx and wfx. Autoinstall works only with wcx,
when wcx installed it automatically copies wfx (cdtracks.wfx) into its folder. 
Then you will need to manually install wfx plugin.

3) ogg and flac output formats.

4) More settings - allows to convert file "into himself", in the selected location, delete source, skip m3u

5) support of ACD (Amazon Cover Downloader) program when converting audio tracks.
ACD should be installed - see http://www.maresweb.de/projects/acd/download.php

6) MPC (MusePack) input format.

7) Convert audio tracks via wfx plugin. Simply select "files" in the wfx plugin (cdtracks) and choose pack.

8) Ability to normalize temp wav file

-------------------------- previous versions comments --------------------

Bitrate converter 0.9alpha

Features: 

1. Support freedb when converting from CD discs, ability to set filenames, tags for CD tracks
2. More accurate work with WinCE Device.

Bitrate converter 0.8

New in 0.8: Bug fixing, WinCE Device support

New in 0.7: AAC support. Dont forget to supply bass_aac.dll same way like other dlls
Output formats: mp3 and wav.
sample rate of result mp3 - it now will be set the same as in input file.

0. Bitrate converter is an archive plugin (wcx) for total commander.

1. usage

AC allows convert files from several music formats (wav, mp3, ogg, m3u, wma, cda, flac, ape) to mp3. 
Just select files in TC, then press
"pack" and, instead of archive you will get same files converted to mp3.
When you convert m3u BC takes filenames listed in m3u. 

2. Installation.

Installation are to be done in common way - just register plugin in TC - when asked to type extension select some combination, 
what you will never meet - extension will be ignored by plugin, it will take only destination path.
Files bass.dll, basswma.dll, basscd.dll, bass_ape.dll, bassflac.dll and lame_enc.dll 
should be placed on the system path (%WINDOWS%\system32 is recommended)

3. Settings. 

Almost every setting is taken from lame coder - read it's documentation. 
Additional - "dont increase bitrate" (only when mp3 -> mp3): 
example if you have mp3 of 128bps, and you selected 160, this file will not be converted - just copied.
NB: it doesnt work on VBR. 

mailto:

plotn@newmail.ru