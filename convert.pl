#!/usr/bin/env perl
# Convert songs from a text file into JSON. Input file is in the following format:
#     Title
#     Lyrics go here
#     one line per line
#     end song with a blank line
#
#     Next Title
#     More lyrics
#     ...
#
#
use Data::Dumper;
use JSON::PP;

my $songs = [];
my $song = {};
my $newsong = 1;

while (<>) {
    chomp;
    if (!$_) {
        push @$songs => $song if (%$song);
        $newsong = 1;
        $song = {};
        next;
    }
    if ($newsong) {
        $song->{title} = $_;
        $song->{artist} = "";
        $song->{playlist} = "lullabies";
        $newsong = 0;
        next;
    }
    push @{$song->{lyrics}} => $_;
}

push @$songs => $song if (%$song);

print encode_json($songs);
print "\n";
