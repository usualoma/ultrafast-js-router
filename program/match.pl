my $url = '/users/123/posts';
my ($a, $b, $c) = (0, 1, 2);

use re 'eval';

my @routes = ($a, $b, $c);

my @c = ();
my $m = undef;

$url =~ m{
  \A/(?:\z(?{$m=0})
  |users/([^/]+)(?:\z(?{$m=1;@c=($1)})
  |/posts\z(?{$m=2;@c=($1)})))
}x;

use Data::Dumper; use Carp; warn Dumper($m, \@c);
