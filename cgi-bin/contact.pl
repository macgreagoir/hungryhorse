#!/usr/bin/perl
use strict;
use warnings;

use CGI::Carp 'fatalsToBrowser';
use CGI ':standard';

# this is intended to fill a div in response to an ajax request
print header('text/html; charset=UTF-8');

sub print_form {
    print start_form('POST'),
        p({-class => "form_element"}, "Email address:"),
        textfield(
            -name => 'from',
            -size => 30,
            -maxlength => 50,
            -class => 'form_element',
        ),
        p({-class => "form_element"}, "Subject:"),
        textfield(
            -name => 'subject',
            -size => 30,
            -maxlength => 50,
            -class => 'form_element',
        ),
        p({-class => "form_element"}, "Message:"),
        textarea(
            -name => 'message',
            -rows => 10,
            -columns => 50,
            -class => 'form_element',
        ),
        submit(
            -name => 'send_mail',
            -value => 'Send',
            -class => 'form_element',
        ),
        end_form;
}

sub send_mail {
    my $from = param('from') || '';
    my $subject = param('subject') || 'From contact form';
    my $message = param('message') || '';
    unless (
        $from =~ /^[a-z0-9%-_+.]+@[a-z0-9.-]+\.[a-z]{2,3}$/i &&
        $message
    ) {
        print p('You got something wrong, sorry. Please try again.');
        print_form;
        return;
    }

    my $sendmail = '/usr/sbin/sendmail -t';
    open(SENDMAIL, "|$sendmail") or die "Cannot open $sendmail: $!";
    print SENDMAIL 'To: info@' . virtual_host . "\n";
    print SENDMAIL "Subject: $subject\n";
    print SENDMAIL "From: $from\n";
    print SENDMAIL "Content-type: text/plain\n\n";
    print SENDMAIL $message;
    close(SENDMAIL);

    print p('Thank you for your message.');
}

# we either send mail from the POST or print the form
if (param) {
    &send_mail;
} else {
    &print_form;
}

