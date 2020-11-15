package Alien::Build::Interpolate;

use strict;
use warnings;

# ABSTRACT: Advanced interpolation engine for Alien builds
our $VERSION = '2.26'; # VERSION


sub new
{
  my($class) = @_;
  my $self = bless {
    helper  => {},
    classes => {},
  }, $class;
  $self;
}


sub add_helper
{
  my $self = shift;
  my $name = shift;
  my $code = shift;

  if(defined $self->{helper}->{$name})
  {
    require Carp;
    Carp::croak("duplicate implementation for interpolated key $name");
  }

  my $require;

  if(ref $_[0] eq 'CODE')
  {
    $require = shift;
  }
  else
  {
    $require = [];
    while(@_)
    {
      my $module = shift;
      my $version = shift;
      $version ||= 0;
      push @$require, $module => $version;
    }
  }

  $self->{helper}->{$name} = Alien::Build::Helper->new(
    $name,
    $code,
    $require,
  );
}


sub replace_helper
{
  my $self = shift;
  my($name) = @_;
  delete $self->{helper}->{$name};
  $self->add_helper(@_);
}


sub has_helper
{
  my($self, $name) = @_;

  return unless defined $self->{helper}->{$name};

  my @require = $self->{helper}->{$name}->require;

  while(@require)
  {
    my $module  = shift @require;
    my $version = shift @require;

    {
      my $pm = "$module.pm";
      $pm =~ s/::/\//g;
      require $pm;
      $module->VERSION($version) if $version;
    }

    unless($self->{classes}->{$module})
    {
      if($module->can('alien_helper'))
      {
        my $helpers = $module->alien_helper;
        foreach my $k (keys %$helpers)
        {
          $self->{helper}->{$k}->code($helpers->{$k});
        }
      }
      $self->{classes}->{$module} = 1;
    }
  }

  my $code = $self->{helper}->{$name}->code;

  return unless defined $code;

  if(ref($code) ne 'CODE')
  {
    my $perl = $code;
    package Alien::Build::Interpolate::Helper;
    $code = sub {
      ##  no critic
      my $value = eval $perl;
      ## use critic
      die $@ if $@;
      $value;
    };
  }

  $code;
}


sub execute_helper
{
  my($self, $name) = @_;

  my $code = $self->has_helper($name);
  die "no helper defined for $name" unless defined $code;

  $code->();
}


sub _get_prop
{
  my($name, $prop, $orig) = @_;

  $name =~ s/^\./alien./;

  if($name =~ /^(.*?)\.(.*)$/)
  {
    my($key,$rest) = ($1,$2);
    return _get_prop($rest, $prop->{$key}, $orig);
  }
  elsif(exists $prop->{$name})
  {
    return $prop->{$name};
  }
  else
  {
    require Carp;
    Carp::croak("No property $orig is defined");
  }
}

sub interpolate
{
  my($self, $string, $prop) = @_;
  $prop ||= {};

  $string =~ s{(?<!\%)\%\{([a-zA-Z_][a-zA-Z_0-9]+)\}}{$self->execute_helper($1)}eg;
  $string =~ s{(?<!\%)\%\{([a-zA-Z_\.][a-zA-Z_0-9\.]+)\}}{_get_prop($1,$prop,$1)}eg;
  $string =~ s/\%(?=\%)//g;
  $string;
}


sub requires
{
  my($self, $string) = @_;
  map {
    my $helper = $self->{helper}->{$_};
    $helper ? $helper->require : ();
  } $string =~ m{(?<!\%)\%\{([a-zA-Z_][a-zA-Z_0-9]+)\}}g;
}


sub clone
{
  my($self) = @_;

  require Storable;

  my %helper;
  foreach my $name (keys %{ $self->{helper} })
  {
    $helper{$name} = $self->{helper}->{$name}->clone;
  }

  my $new = bless {
    helper => \%helper,
    classes => Storable::dclone($self->{classes}),
  }, ref $self;
}

package Alien::Build::Helper;

sub new
{
  my($class, $name, $code, $require) = @_;
  bless {
    name    => $name,
    code    => $code,
    require => $require,
  }, $class;
}

sub name { shift->{name} }

sub code
{
  my($self, $code) = @_;
  $self->{code} = $code if $code;
  $self->{code};
}

sub require
{
  my($self) = @_;
  if(ref $self->{require} eq 'CODE')
  {
    $self->{require} = [ $self->{require}->($self) ];
  }
  @{ $self->{require} };
}

sub clone
{
  my($self) = @_;
  my $class = ref $self;
  $class->new(
    $self->name,
    $self->code,
    [ $self->require ],
  );
}

1;

__END__

=pod

=encoding UTF-8

=head1 NAME

Alien::Build::Interpolate - Advanced interpolation engine for Alien builds

=head1 VERSION

version 2.26

=head1 CONSTRUCTOR

=head2 new

 my $intr = Alien::Build::Interpolate->new;

=head2 add_helper

 $intr->add_helper($name => $code);
 $intr->add_helper($name => $code, %requirements);

=head2 replace_helper

 $intr->replace_helper($name => $code);
 $intr->replace_helper($name => $code, %requirements);

=head2 has_helper

 my $coderef = $intr->has_helper($name);

Used to discover if a helper exists with the given name.
Returns the code reference.

=head2 execute_helper

 my $value = $intr->execute_helper($name);

=head2 interpolate

 my $string = $intr->interpolate($template);

=head2 requires

 my %requires = $intr->requires($template);

=head2 clone

 my $intr2 = $intr->clone;

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
