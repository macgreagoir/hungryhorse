use strict;
use warnings;

use CGI::Carp 'fatalsToBrowser';
use CGI 'param';
use Text::Markdown 'markdown';

my $dirname = 'content';
my $filename = 'home';
$dirname = param 'key' if param('key');
$filename = param 'value' if param('value');
open my $fh, '<',  "../$dirname/$filename.md" or die;
print markdown join "\n", <$fh>;
