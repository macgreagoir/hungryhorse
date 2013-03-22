#!/usr/bin/perl
use strict;
use warnings;

use CGI::Carp 'fatalsToBrowser';
use CGI ':standard';
use Text::Markdown 'markdown';

# allow cli use without printing headers
my $cli = param('cli') ? 1 : 0;

# default to the home page
my $filename = 'home';

# the page in the md dir to generate
$filename = param 'words' if param('words');
open my $fh, '<',  "../md/$filename.md" or die;

print header('text/html; charset=UTF-8') unless $cli;
print markdown join "\n", <$fh>;
