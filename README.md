## OBS-web-playout

This is a client-side web app using the obs-websocket-js to provide a simple playout functionality on OBS.

### Demo
https://obs-web-playout.pages.dev/


### Features

- React based; therefore, it can be used on any modern browser
- works best if used locally

### Instructions

​	Make sure you have the following:

- OBS
- OBS-websocket plugin

1. Create a scene called "Playout"
2. add 2 *ffmpeg_source*/Media sources with distinct names
3. Launch OBS and use open the web app. The settings dialogue should come up
4. Add the necessary names to the web app (Playout scene name, media 1 source name, media 2 source name, *default media file)
5. Hit connect and you should be ready to go.


\* *Since browsers do not support giving the full path of the files to web pages, the folder path containing the media must be manually put in.*
