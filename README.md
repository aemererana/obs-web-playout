## OBS-web-playout

This is a client-side web app using the obs-websocket-js to provide a simple playout functionality on OBS.

### Demo
https://obs-web-playout.pages.dev/


### Features

- React based; therefore, it can be used on any modern browser
- Works best if used locally
- Uses localStorage to save media playlist and settings


### Instructions

​	Make sure you have the following:

- OBS
- OBS-websocket plugin

1. Create a scene called "Playout"
2. Create 2 *ffmpeg_source*/Media sources with distinct names (i.e. play1, play2)
3. Launch OBS and open the web app. The settings dialogue should pop up
4. Add the necessary names to the web app (Playout scene name, media 1 source name, media 2 source name, *default media path)
5. Hit connect and you should be ready to go.


\* *Since browsers do not support giving the full path of the files to web pages, the folder path containing the media must be manually put in.*

### TODO
- Add working Pause functionality
- Add set playback time functionality before playing the listed media 
- Add loop function
- Add "Are you sure?" confirm before leaving/refreshing page
- Add a "put the entire playlist to listed state" function on refresh/or oppen to prevent stuck media
- Add delete media from the playlist
- Media scenes are transitioned with current the set transition on OBS; add a setting with transition override