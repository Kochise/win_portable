@rem = '--*-Perl-*--
@set "ErrorLevel="
@if "%OS%" == "Windows_NT" @goto WinNT
@perl -x -S "%0" %1 %2 %3 %4 %5 %6 %7 %8 %9
@set ErrorLevel=%ErrorLevel%
@goto endofperl
:WinNT
@perl -x -S %0 %*
@set ErrorLevel=%ErrorLevel%
@if NOT "%COMSPEC%" == "%SystemRoot%\system32\cmd.exe" @goto endofperl
@if %ErrorLevel% == 9009 @echo You do not have Perl in your PATH.
@goto endofperl
@rem ';
#!perl
#line 30

BEGIN { pop @INC if $INC[-1] eq '.' }

use strict;
use warnings;
use lib ();
use Perl::PrereqScanner::NotQuiteLite::App;
use Getopt::Long;
use Pod::Usage;

GetOptions(\my %opts, qw/
  inc|lib|I=s@
  libs|scan_also|scan-also|also=s@
  parsers|parser=s@
  version
  help
  json
  cpanfile
  save_cpanfile|save-cpanfile
  exclude_core|exclude-core
  perl_version|perl-version=s
  allow_test_pms|allow-test-pms
  features|feature=s@
  base_dir|base-dir=s
  ignore_re|ignore-re=s
  ignore=s@
  private_re|private-re=s
  private=s@
  recommends
  suggests
  develop
  blib
  use_index|use-index=s
  perl_minimum_version
  verbose
/);

if ($opts{version}) {
  print "scan-perl-prereqs-nqlite v" . (Perl::PrereqScanner::NotQuiteLite->VERSION || 'DEV') . "\n";
  exit;
}

if ($opts{help}) {
  pod2usage(-verbose => 1);
  exit;
}

lib->import(@{$opts{inc}}) if $opts{inc};

for my $key (keys %opts) {
  next unless $key =~ /\-/;
  (my $replaced_key = $key) =~ s/\-/_/g;
  $opts{$replaced_key} = $opts{$key};
}

$opts{print} = 1;

Perl::PrereqScanner::NotQuiteLite::App->new(%opts)->run(@ARGV);

__END__

=encoding utf-8

=head1 NAME

scan-perl-prereqs-nqlite

=head1 SYNOPSIS

  scan-perl-prereqs-nqlite [DIRS|FILES]

=head1 DESCRIPTION

C<scan-perl-prereqs-nqlite> traverses several files and
subdirectories in the current directory with L<File::Find> to
collect all C<.pl>, C<.PL>, C<.pm>, C<.t>, C<.psgi> files (as well
as all the files in C<scripts?> and C<bin> directories), and prints
a single combined list of prerequisites, which should be suitable
for piping to C<cpanm> or similar tools.

You can also pass files and/or directories to limit files to scan.
In this case, however, C<scan-perl-prereqs-nqlite> may fail to
exclude modules that should belong to the same distribution.

=head1 OPTIONS

=over 4

=item version

Show the version.

=item help

Show this help.

=item json

Print prerequisites as a JSON if L<JSON::PP> is installed.

=item cpanfile, save_cpanfile

Print prerequisites as C<cpanfile> if L<Module::CPANfile> is installed. If C<safe-cpanfile> is set, create or update C<cpanfile>.

=item suggests

Print suggestions (C<use>d modules in C<eval>) as well.

=item develop

Print requirements/suggestions for developers (C<use>d modules
in C<xt> and C<author> directories) as well.

=item perl_minimum_version

May modify required perl version if new language features are
used without declaring the required perl version explicitly.

=item exclude_core

Ignore prerequisites that are bundled with Perl (of 5.008001
by default). This requires L<Module::CoreList> version 2.99 or
above.

=item perl_version

Ignore prerequisites that are bundled with Perl of a specific
version. This implies C<exclude-core> as well.

=item allow_test_pms

Print requirements/suggestions in .pm files that are placed under
t/ directory but are not directly used from .t files, too.
If Test::Class family is used under t/, this option is implicitly set.

=item base_dir

Set the base directory from where C<scan-perl-prereqs-nqlite>
starts traversing files and directories.

=item ignore

Set a list of paths C<scan-perl-prereqs-nqlite> should ignore. This is
useful when your distribution has a set of OS-specific modules, for example.

=item ignore_re

You can also specify a regexp instead of a list of paths. If this is
set, C<ignore> options are ignored.

=item private

Set a list of modules C<scan-perl-prereqs-nqlite> should consider
private, that is, that are not uploaded to the CPAN. Contrary to
the C<ignore> option, which makes the scanner skip scanning the
file, this option lets the scanner scan files, and excludes matched
prerequisites afterwards.

=item private_re

You can also specify a regexp instead of a list of modules. If this
is set, C<private> options are ignored.

=item scan_also

Set a list of extra paths C<scan-perl-prereqs-nqlite> should also
scan. This is useful when your application/distribution uses an
untraditional file layout.

=item feature

  scan-perl-prereqs-nqlite \
    --feature name:description:lib/My/Plugin/For/SpecificOS \
    --feature name:description:web/lib,web/bin

Specify a feature name, a description, and matching paths.

=item use_index

You can specify an index name of CPAN::Common::Index module (such as "Mirror" or "MetaDB") not to list all the modules of a required distribution.

=item blib

If this is set, C<scan-perl-prereqs-nqlite> will traverse
subdirectories under C<blib> to collect runtime requirements.
It may return better results if some of the files are located in
some uncommon places and/or some of them are listed in C<no_index>.
However, files in C<blib> may be older than the ones under C<lib>
etc, and you need to update them by running a make or a C<Build>
script before you run C<scan-perl-prereqs-nqlite>.

=item parser

Set a list of parsers (or parser tags) C<scan-perl-prereqs-nqlite>
uses. If this option is not set, the scanner uses C<:installed>
parsers by default.

=item inc

Add a list of additional @INC path C<scan-perl-prereqs-nqlite>
looks for private parsers.

=item verbose

Print verbose messages.

=back

=head1 AUTHOR

Kenichi Ishigaki, E<lt>ishigaki@cpan.orgE<gt>

=head1 COPYRIGHT AND LICENSE

This software is copyright (c) 2015 by Kenichi Ishigaki.

This is free software; you can redistribute it and/or modify it under
the same terms as the Perl 5 programming language system itself.

=cut
__END__
:endofperl
@set "ErrorLevel=" & @goto _undefined_label_ 2>NUL || @"%COMSPEC%" /d/c @exit %ErrorLevel%
