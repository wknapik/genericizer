__ABANDONED__

# What is genericizer ?

`genericizer` is a Chromium/Chrome extension meant to reduce the browser's
fingerprintability.

The initial idea was to cycle through common profiles (changing things that can
be probed), to avoid tracking. Unfortunately, with some research, it turned
out to be a pretty hopeless undertaking. The fingerprinting surface is
enormous, the amount of effort needed to deal with even the most obvious
vectors large and the extension APIs too limited to suffice in the long run.
Additionally, for any mitigation implemented, the risk of it actually
increasing fingerprintability is considerable.

**For now, `genericizer` is most useful as a template to start working on an
extension** that uses background scripts, content scripts and chrome.storage.

# What does it do ?

At the moment, very little. I will have to consider what functionality can be
added/removed/modified to avoid the risk of doing more harm, than good. There's
some low hanging fruit to grab, but my time is limited.

For now, `genericizer`:
* Sets the user-agent request header and navigator.userAgent to whatever the
  user configures (a default is currently hardcoded to a common Linux version
  of Chromium). Some user agent switchers only change the header.
* Sets navigator.appVersion, which otherwise contains the entire original
  navigator.userAgent (except the "Mozilla/" prefix). Something the most common
  user agent switchers fail to do.
* Clears navigator.plugins and navigator.mimeTypes (which leak quite a bit of
  information), while retaining their type to avoid being obvious.
* Sets navigator.language and navigator.languages to 'en-US' only, which seems
  to be the most common.

# So how do I improve my browsing privacy ?

The best option is to use [Tor
Browser](https://www.torproject.org/projects/torbrowser.html.en). Nothing else
comes even close. No combination of plugins with any browser gives the sort of
protection, that the [Tor Browser
will](https://www.torproject.org/projects/torbrowser/design/).

The more paranoid can combine its use with a [Tails](https://tails.boum.org/)
livecd and/or a [VPN](https://torrentfreak.com/vpn-anonymous-review-160220/),
with some [IP leak mitigation](https://github.com/wknapik/vpnfailsafe) in
place.

Those who don't want to use Tor Browser for daily browsing, can improve their
security and privacy through a combination of configuration and plugins.  Using
these has a mixed effect. On one hand, any customizations/extensions, anything
that deviates from the common average, exposes uniquely identifying information
about the browser, but on the other hand, the active blocking of tracking
attempts will yield results of its own.

For Chromium/Chrome users, I'd suggest:
* Configuration (not comprehensive):
  * Set plugins to click-to-run.
  * Block third party cookies and delete all cookies on exit.
  * Don't log in anywhere (including the browser itself).
  * Switch from Google Search to [Disconnect
    Search](https://search.disconnect.me/).
  * Don't change "web content" defaults.
  * Disable protocol handling by sites, pop-ups, location tracking, access to
    microphone/camera/midi devices, unsandboxed plugins, automatic downloads,
    autofill and everything in the Privacy section except protection from
    "dangerous sites" and "do not track".
* Install and configure:
  * [HTTPS Everywhere](https://chrome.google.com/webstore/detail/https-everywhere/gcbommkclmclpchllfjekcdonpmejbdp)
  * [Privacy Badger](https://chrome.google.com/webstore/detail/privacy-badger/pkehgijcmpdhfbdbbnkijodmdjhbjlgp)
  * [uBlock Origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm)
  * [ScriptSafe](https://chrome.google.com/webstore/detail/scriptsafe/oiigbmnaadbkfbmpbfijlflahbdbdgdf)
  * [Disconnect](https://chrome.google.com/webstore/detail/disconnect/jeoacafpbcihiomhlakheieifhpjdfeo)
* Use a [hosts file](http://someonewhocares.org/hosts/hosts) that blocks
  connections to tracking/advertising services.

Maybe one day, `genericizer` will deserve to be included in the above list, but
for now it remains a stub.

