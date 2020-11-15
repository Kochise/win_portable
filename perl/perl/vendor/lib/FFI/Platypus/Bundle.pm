package FFI::Platypus::Bundle;

use strict;
use warnings;
use Carp ();

# ABSTRACT: Bundle foreign code with your Perl module
our $VERSION = '1.31'; # VERSION


package FFI::Platypus;

sub _bundle
{
  my @arg_ptrs;

  if(defined $_[-1] && ref($_[-1]) eq 'ARRAY')
  {
    @arg_ptrs = @{ pop @_ };
  }

  push @arg_ptrs, undef;

  my($self, $package) = @_;
  $package = caller unless defined $package;

  require List::Util;

  my($pm) = do {
    my $pm = "$package.pm";
    $pm =~ s{::}{/}g;
    # if the module is already loaded, we can use %INC
    # otherwise we can go through @INC and find the first .pm
    # this doesn't handle all edge cases, but probably enough
    List::Util::first(sub { (defined $_) && (-f $_) }, ($INC{$pm}, map { "$_/$pm" } @INC));
  };

  Carp::croak "unable to find module $package" unless $pm;

  my @parts = split /::/, $package;
  my $incroot = $pm;
  {
    my $c = @parts;
    $incroot =~ s![\\/][^\\/]+$!! while $c--;
  }

  my $txtfn = List::Util::first(sub { -f $_ }, do {
    my $dir  = join '/', @parts;
    my $file = $parts[-1] . ".txt";
    (
      "$incroot/auto/$dir/$file",
      "$incroot/../arch/auto/$dir/$file",
    );
  });

  my $lib;

  if($txtfn)
  {
    $lib = do {
      my $fh;
      open($fh, '<', $txtfn) or die "unable to read $txtfn $!";
      my $line = <$fh>;
      close $fh;
      $line =~ /^FFI::Build\@(.*)$/
        ? "$incroot/$1"
        : Carp::croak "bad format $txtfn";
    };
    Carp::croak "bundle code is missing: $lib" unless -f $lib;
  }
  elsif(-d "$incroot/../ffi")
  {
    require FFI::Build::MM;
    require Capture::Tiny;
    require Cwd;
    require File::Spec;
    my $save = Cwd::getcwd();
    chdir "$incroot/..";
    my($output, $error) = Capture::Tiny::capture_merged(sub {
      $lib = eval {
        my $dist_name = $package;
        $dist_name =~ s/::/-/;
        my $fbmm = FFI::Build::MM->new( save => 0 );
        $fbmm->mm_args( DISTNAME => $dist_name );
        my $build = $fbmm->load_build('ffi', undef, 'ffi/_build');
        $build->build;
      };
      $@;
    });
    if($error)
    {
      chdir $save;
      print STDERR $output;
      die $error;
    }
    else
    {
      $lib = File::Spec->rel2abs($lib);
      chdir $save;
    }
  }
  else
  {
    Carp::croak "unable to find bundle code for $package";
  }

  my $handle = FFI::Platypus::DL::dlopen($lib, FFI::Platypus::DL::RTLD_PLATYPUS_DEFAULT())
    or Carp::croak "error loading bundle code: $lib @{[ FFI::Platypus::DL::dlerror() ]}";

  $self->{handles}->{$lib} =  $handle;

  $self->lib($lib);

  if(my $init = eval { $self->function( 'ffi_pl_bundle_init' => [ 'string', 'sint32', 'opaque[]' ] => 'void' ) })
  {
     $init->call($package, scalar(@arg_ptrs)-1, \@arg_ptrs);
  }

  if(my $init = eval { $self->function( 'ffi_pl_bundle_constant' => [ 'string', 'opaque' ] => 'void' ) })
  {
    require FFI::Platypus::Constant;
    my $api = FFI::Platypus::Constant->new($package);
    $init->call($package, $api->ptr);
  }

  if(my $address = $self->find_symbol( 'ffi_pl_bundle_fini' ))
  {
    push @{ $self->{fini} }, sub {
      my $self = shift;
      $self->function( $address => [ 'string' ] => 'void' )
           ->call( $package );
    };
  }

  $self;
}

1;

__END__

=pod

=encoding UTF-8

=head1 NAME

FFI::Platypus::Bundle - Bundle foreign code with your Perl module

=head1 VERSION

version 1.31

=head1 SYNOPSIS

C<ffi/foo.c>:

 #include <ffi_platypus_bundle.h>
 #include <string.h>
 
 typedef struct {
   char *name;
   int value;
 } foo_t;
 
 foo_t*
 foo__new(const char *class_name, const char *name, int value)
 {
   (void)class_name;
   foo_t *self = malloc( sizeof( foo_t ) );
   self->name = strdup(name);
   self->value = value;
   return self;
 }
 
 const char *
 foo__name(foo_t *self)
 {
   return self->name;
 }
 
 int
 foo__value(foo_t *self)
 {
   return self->value;
 }
 
 void
 foo__DESTROY(foo_t *self)
 {
   free(self->name);
   free(self);
 }

C<lib/Foo.pm>:

 package Foo;
 
 use strict;
 use warnings;
 use FFI::Platypus;
 
 {
   my $ffi = FFI::Platypus->new( api => 1 );
 
   $ffi->type('object(Foo)' => 'foo_t');
   $ffi->mangler(sub {
     my $name = shift;
     $name =~ s/^/foo__/;
     $name;
   });
 
   $ffi->bundle;
 
   $ffi->attach( new =>     [ 'string', 'string', 'int' ] => 'foo_t'  );
   $ffi->attach( name =>    [ 'foo_t' ]                   => 'string' );
   $ffi->attach( value =>   [ 'foo_t' ]                   => 'int'    );
   $ffi->attach( DESTROY => [ 'foo_t' ]                   => 'void'   );
 }
 
 1;

C<t/foo.t>

 use Test::More;
 use Foo;
 
 my $foo = Foo->new("platypus", 10);
 isa_ok $foo, 'Foo';
 is $foo->name, "platypus";
 is $foo->value, 10;
 
 done_testing;

C<Makefile.PL>:

 use ExtUtils::MakeMaker;
 use FFI::Build::MM;
 my $fbmm = FFI::Build::MM->new;
 WriteMakefile(
   $fbmm->mm_args(
     NAME     => 'Foo',
     DISTNAME => 'Foo',
     VERSION  => '1.00',
     # ...
   )
 );
 
 sub MY::postamble
 {
   $fbmm->mm_postamble;
 }

or C<dist.ini>:

 name    = Foo
 version = 0.01
 ...
 
 [FFI::Build]
 version = 1.04

=head1 DESCRIPTION

This document serves as a tutorial for using the new bundling interface provided
by L<FFI::Platypus> as of api version 1.  It requires L<FFI::Platypus> of at least
1.00.

Sometimes when writing FFI bindings you need to include a little C code (or your
favorite compiled language) to finish things off.  Alternatively, you might just
want to write some C code (or your favorite compiled language) to include with your
Perl module to make a tight loop faster.  The bundling interface has you covered.

=head2 Basic example

To illustrate we will go through the files in the synopsis and explain
how and why they work.  To start with we have some C code which emulates object
oriented code using C<foo__> as a prefix.  We use a C struct that we call
C<foo_t> to store our object data.  On the C level the struct acts as a class,
when combined with its functions that act as methods.  The constructor just
allocates the memory it needs for the C<foo_t> instance, fills in the
appropriate fields and returns the pointer:

 foo_t*
 foo__new(const char *class_name, const char *name, int value)
 {
   (void) class_name;
   foo_t *self = malloc( sizeof( foo_t ) );
   self->name = strdup(name);
   self->value = value;
   return self;
 }

We include a class name as the first argument, because Perl will include that
when calling the constructor, but we do not use it here.  An exercise for the
reader would be to add hierarchical inheritance.

There are also some methods which return member values.  This class has only
read only members, but you could have read/write or other methods depending
on your needs.

 const char *
 foo__name(foo_t *self)
 {
   return self->name;
 }

We also include a destructor so that the memory owned by the object can be
freed when it is no longer needed.

 void
 foo__DESTROY(foo_t *self)
 {
   free(self->name);
   free(self);
 }

This might start to look a little like a Perl module, and when we look at the Perl
code that binds to this code, you will see why.  First lets prepare the
L<FFI::Platypus> instance and specify the correct api version:

 my $ffi = FFI::Platypus->new( api => 1 );

The bundle interface is only supported with api version 1, so if you try to use
version 0 it will not work.  Next we define an object type for C<foo_t> which will
associate it with the Perl class C<Foo>.

 $ffi->type('object(Foo)' => 'foo_t');

As object type is a blessed reference to an opaque (default) or integer type which
can be used as a Perl object.  Platypus does the translating of Perl object to and
from the foo_t pointers that the C code understands.  For more details on Platypus
types see L<FFI::Platypus::Type>.

Next we set the mangler on the Platypus instance so that we can refer to function
names without the C<foo__> prefix.  You could just not use the prefix in your C
code and skip this step, or you could refer to the function names in their full
in your Perl code, however, this saves extra typing and allows you to bundle more
than one class with your Perl code without having to worry about name conflicts.

 $ffi->mangler(sub {
   my $name = shift;
   $name =~ s/^/foo__/;
   $name;
 });

Finally we let Platypus know that we will be bundling code.

 $ffi->bundle;

By default, this searches for the appropriate place for your dynamic libraries using
the current package.  In some cases you may need to override this, for example if your
dist is named C<Foo-Bar> but your specific class is named C<Foo::Bar::Baz>, you'd
want something like this:

 package Foo::Bar::Baz;
 use FFI::Platypus;
 my $ffi = FFI::Platypus->new( api => 1 );
 $ffi->bundle('Foo::Bar');
 ...

Now, finally we can attach the methods for our class:

 $ffi->attach( new =>     [ 'string', 'int' ] => 'foo_t'  );
 $ffi->attach( name =>    [ 'foo_t' ]         => 'string' );
 $ffi->attach( value =>   [ 'foo_t' ]         => 'int'    );
 $ffi->attach( DESTROY => [ 'foo_t' ]         => 'void'   );

Note that we do not have to include the C<foo__> prefix because of the way we set up
the mangler.  If we hadn't done that then we could instead attach with the full names:

 $ffi->attach( [ 'foo__new'  => 'new' ]  => [ 'string', 'int' ] => 'foo_t'  );
 $ffi->attach( [ 'foo__name' => 'name' ] => [ 'foo_t' ]         => 'string' );
 ...

You're done!  You can now use this class.  Lets write a test to make sure it works,

 use strict;
 use warnings;
 use Test::More;
 use Foo;
 
 my $foo = Foo->new("platypus", 10);
 isa_ok $foo, 'Foo';
 is $foo->name, "platypus";
 is $foo->value, 10;
 
 done_testing;

and use C<prove> to check that it works:

 % prove -lvm
 t/foo.t ..
 ok 1 - An object of class 'Foo' isa 'Foo'
 ok 2
 ok 3
 1..3
 ok
 All tests successful.
 Files=1, Tests=3,  0 wallclock secs ( 0.02 usr  0.00 sys +  0.14 cusr  0.03 csys =  0.19 CPU)
 Result: PASS

Platypus automatically compiles and links the dynamic library for you:

 % ls ffi/_build
 foo.c.o  libFoo.so

The C code will be rebuilt next time if the source code is newer than the object or dynamic libraries
files.  If the source files are not changed, then it won't be rebuilt to save time.  If you are using
the code without MakeMaker, or another build system you are responsible for cleaning up these files.
This is intended as a convenience to allow you to test your code without having to invoke MakeMaker,
or C<dzil> or whatever build system you are using.

When you distribute your module though, you will want the dynamic library built just once
at build-time and installed correctly so that it can be found at run-time.  You don't need
to make any changes to your C or Perl code, but you do need to tell MakeMaker to build and
install the appropriate files using L<FFI::Build::MM>:

 use ExtUtils::MakeMaker;
 use FFI::Build::MM;
 my $fbmm = FFI::Build::MM->new;
 WriteMakefile(
   $fbmm->mm_args(
     NAME     => 'Foo',
     DISTNAME => 'Foo',
     VERSION  => '1.00',
     # ...
   )
 );
 
 sub MY::postamble
 {
   $fbmm->mm_postamble;
 }

And we can invoke all the normal MakeMaker style stuff and our C code will be compiled, linked
and installed at the appropriate steps.

 % perl Makefile.PL
 Generating a Unix-style Makefile
 Writing Makefile for Foo
 Writing MYMETA.yml and MYMETA.json
 % make
 cp lib/Foo.pm blib/lib/Foo.pm
 "/Users/ollisg/perl5/perlbrew/perls/perl-5.30.0/bin/perl" -MFFI::Build::MM=cmd -e fbx_build
 CC ffi/foo.c
 LD blib/lib/auto/share/dist/Foo/lib/libFoo.dylib
 % make test
 "/Users/ollisg/perl5/perlbrew/perls/perl-5.30.0/bin/perl" -MFFI::Build::MM=cmd -e fbx_build
 "/Users/ollisg/perl5/perlbrew/perls/perl-5.30.0/bin/perl" -MFFI::Build::MM=cmd -e fbx_test
 PERL_DL_NONLAZY=1 "/Users/ollisg/perl5/perlbrew/perls/perl-5.30.0/bin/perl" "-MExtUtils::Command::MM" "-MTest::Harness" "-e" "undef *Test::Harness::Switches; test_harness(0, 'blib/lib', 'blib/arch')" t/*.t
 t/foo.t .. ok
 All tests successful.
 Files=1, Tests=3,  0 wallclock secs ( 0.01 usr  0.00 sys +  0.06 cusr  0.01 csys =  0.08 CPU)
 Result: PASS

If the C<Makefile.PL> file above looks overly complicated, you can use the
L<Dist::Zilla::Plugin::FFI::Build> plugin to simplify your life if you are
using L<Dist::Zilla>:

 [FFI::Build]
 version = 1.04

Specifying version 1.04 will ensure that any C<.o> or C<.so> files are pruned
from your build tree and not distributed by mistake.

=head2 Initialization example

The bundle interface also gives you entry points which will be called automatically
when your code is loaded and unloaded if they are found.

=over 4

=item C<ffi_pl_bundle_init>

 void ffi_pl_bundle_init(const char *package, int argc, void *argv[]);

Called when the dynamic library is loaded.  C<package> is the Perl package
that called C<bundle> from Perl space.  C<argc> and C<argv> represents an
array of opaque pointers that can be passed as an array to bundle as the
last argument.  (the count C<argc> is a little redundant because C<argv>
is also NULL terminated).

=item C<ffi_pl_bundle_constant>

 void ffi_pl_bundle_constant(const char *package, ffi_platypus_constant_t *c);

Called immediately after C<ffi_pl_bundle_init>, and is intended to allow
you to set Perl constants from C space.  For details on how this works
and what methods you can call on the C<ffi_platypus_constant_t> instance,
see L<FFI::Platypus::Constant>.

=item C<ffi_pl_bundle_fini>

 void ffi_pl_bundle_fini(const char *package);

Called when the dynamic library is unloaded.  C<package> is the Perl
package that called C<bundle> from Perl space when the library was
loaded.  B<CAVEAT>: if you attach any functions then this will
never be called, because attaching functions locks the Platypus
instance into memory along with the libraries which it is using.

=back

Here is an example that passes the version and a callback back into Perl
space that emulates the Perl 5.10 C<say> feature.

C<ffi/init.c>:

 #include <ffi_platypus_bundle.h>
 
 char buffer[512];
 const char *version;
 void (*say)(const char *);
 
 void
 ffi_pl_bundle_init(const char *package, int argc, void *argv[])
 {
   version = argv[0];
   say     = argv[1];
 
   say("in init!");
 
   snprintf(buffer, 512, "package = %s, version = %s", package, version);
   say(buffer);
 
   snprintf(buffer, 512, "args = %d", argc);
   say(buffer);
 }
 
 void
 ffi_pl_bundle_fini(const char *package)
 {
   say("in fini!");
 }

C<lib/Init.pm>:

 package Init;
 
 use strict;
 use warnings;
 use FFI::Platypus;
 
 our $VERSION = '1.00';
 
 {
   my $ffi = FFI::Platypus->new( api => 1 );
 
   my $say = $ffi->closure(sub {
     my $string = shift;
     print "$string\n";
   });
 
   $ffi->bundle([
     $ffi->cast( 'string' => 'opaque', $VERSION ),
     $ffi->cast( '(string)->void' => 'opaque', $say ),
   ]);
 
   undef $ffi;
   undef $say;
 }
 
 1;

The deinitialization order for the C<$say> callback and the C<$ffi>
instance is essential here, so we do it manually with C<undef>:

 undef $ffi;
 undef $say;

First we deallocate C<$ffi> which calls C<ffi_pl_bundle_fini>,
which calls C<$say>, so we want to make sure the latter is still
allocated.  Once C<ffi_pl_bundle_fini> is done, we can safely
deallocate C<$say>.

If C<ffi_pl_bundle_fini> didn't call back into Perl space like
this then we don't have to be as careful about deallocating
things in Perl space.

=head1 AUTHOR

Author: Graham Ollis E<lt>plicease@cpan.orgE<gt>

Contributors:

Bakkiaraj Murugesan (bakkiaraj)

Dylan Cali (calid)

pipcet

Zaki Mughal (zmughal)

Fitz Elliott (felliott)

Vickenty Fesunov (vyf)

Gregor Herrmann (gregoa)

Shlomi Fish (shlomif)

Damyan Ivanov

Ilya Pavlov (Ilya33)

Petr Pisar (ppisar)

Mohammad S Anwar (MANWAR)

Håkon Hægland (hakonhagland, HAKONH)

Meredith (merrilymeredith, MHOWARD)

Diab Jerius (DJERIUS)

=head1 COPYRIGHT AND LICENSE

This software is copyright (c) 2015,2016,2017,2018,2019,2020 by Graham Ollis.

This is free software; you can redistribute it and/or modify it under
the same terms as the Perl 5 programming language system itself.

=cut
