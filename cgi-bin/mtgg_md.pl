#!/usr/bin/perl
use strict;
use warnings;

use CGI::Carp 'fatalsToBrowser';
use CGI ':standard';
use Text::Markdown 'markdown';

# allow cli use without printing headers
my $cli = param('cli') ? 1 : 0;

# default to the home page
my $dirname = 'content';
my $filename = 'home';

# the page to generate
$dirname = param 'key' if param('key');
$filename = param 'value' if param('value');
open my $fh, '<',  "../$dirname/$filename.md" or die;

print header('text/html; charset=UTF-8') unless $cli;
print markdown join "\n", <$fh>;
