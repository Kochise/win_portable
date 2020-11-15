package Alien::Build::Plugin::Build::Copy;

use strict;
use warnings;
use Alien::Build::Plugin;
use Path::Tiny ();

# ABSTRACT: Copy plugin for Alien::Build
our $VERSION = '2.26'; # VERSION


sub init
{
  my($self, $meta) = @_;

  $meta->add_requires( 'configure', __PACKAGE__, 0);

  if($^O eq 'MSWin32')
  {
    $meta->register_hook(build => sub {
      my($build) = @_;
      my $stage = Path::Tiny->new($build->install_prop->{stage})->canonpath;
      $build->system("xcopy . $stage /E");
    });
  }
  else
  {
    $meta->register_hook(build => [
      'cp -aR * %{.install.stage}',  # TODO: some platforms might not support -a
                                     # I think most platforms will support -r
    ]);
  }
}

1;

__END__

=pod

=encoding UTF-8

=head1 NAME

Alien::Build::Plugin::Build::Copy - Copy plugin for Alien::Build

=head1 VERSION

version 2.26

=head1 SYNOPSIS

 use alienfile;
 plugin 'Build::Copy';

=head1 DESCRIPTION

This plugin copies all of the files from the source to the staging prefix.
This is mainly useful for software packages that are provided as binary
blobs.  It works on both Unix and Windows using the appropriate commands
for those platforms without having worry about the platform details in your
L<alienfile>.

If you want to filter add or remove files from what gets installed you can
use a C<before> hook.

 build {
   ...
   before 'build' => sub {
     # remove or modify files
   };
   plugin 'Build::Copy';
   ...
 };

Some packages might have binary blobs on some platforms and require build
from source on others.  In that situation you can use C<if> statements
with the appropriate logic in your L<alienfile>.

 configure {
   # normally the Build::Copy plugin will insert itself
   # as a config requires, but since it is only used
   # on some platforms, you will want to explicitly
   # require it in your alienfile in case you build your
   # alien dist on a platform that doesn't use it.
   requires 'Alien::Build::Plugin::Build::Copy';
 };

 build {
   ...
   if($^O eq 'linux')
   {
     start_url 'http://example.com/binary-blob-linux.tar.gz';
     plugin 'Download';
     plugin 'Extract' => 'tar.gz';
     plugin 'Build::Copy';
   }
   else
   {
     start_url 'http://example.com/source.tar.gz';
     plugin 'Download';
     plugin 'Extract' => 'tar.gz';
     plugin 'Build::Autoconf';
   }
 };

=head1 AUTHOR

Author: Graham Ollis E<lt>plicease@cpan.orgE<gt>

Contributors:

Diab Jerius (DJERIUS)

Roy Storey (KIWIROY)

Ilya Pavlov

David Mertens (run4flat)

Mark Nunberg (mordy, mnunberg)

Christian Walde (Mithaldu)

Brian Wightman (MidLifeXis)

Zaki Mughal (zmughal)

mohawk (mohawk2, ETJ)

Vikas N Kumar (vikasnkumar)

Flavio Poletti (polettix)

Salvador Fandiño (salva)

Gianni Ceccarelli (dakkar)

Pavel Shaydo (zwon, trinitum)

Kang-min Liu (劉康民, gugod)

Nicholas Shipp (nshp)

Juan Julián Merelo Guervós (JJ)

Joel Berger (JBERGER)

Petr Pisar (ppisar)

Lance Wicks (LANCEW)

Ahmad Fatoum (a3f, ATHREEF)

José Joaquín Atria (JJATRIA)

Duke Leto (LETO)

Shoichi Kaji (SKAJI)

Shawn Laffan (SLAFFAN)

Paul Evans (leonerd, PEVANS)

=head1 COPYRIGHT AND LICENSE

This software is copyright (c) 2011-2020 by Graham Ollis.

This is free software; you can redistribute it and/or modify it under
the same terms as the Perl 5 programming language system itself.

=cut
