# Cloak
Encodes(Cloaks) your binary files into base64 text files and then can decode
them back to their binary versions.

## Website
You can use https://base64-file-encode-decode.minhajuddin.com/ to encode/decode your data.

## Motivation
Many enterprise email setups don't allow sending of binary files. You can now
encode it to a base64 file send it via email and then decode it back on the
destination.

## FAQ
 1. Does my file get uploaded to a server?
  No, all of the encoding/decoding happens on your computer. The javascript
  itself is pretty straightforward, you can dig into it and see what is going on.
  If you still don't trust me, unplug your network cable while encoding/decoding :)

## TODO
 
 - [x] Core functionality.
 - [ ] Ability to copy the base64 string from a textarea if it is small.
 - [ ] Ability to paste a base64 string into a textarea and download a binary.
 - [ ] Embed the original filename and md5sum while encoding and verify it while decoding.

## Development
After adding your features, please encode a big file (>10MB) and decode it and
then make sure that their md5sum's are the same for a sanity check.

## Contributing

1. Fork it ( https://github.com/minhajuddin/cloak/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## LICENSE
Check the LICENSE file in this repository
