# AR World

_Best AR/VR Hack at PennApps XX_

AR World is an Android app that recognizes images seen through the phone's camera and seamlessly replaces images with its corresponding video using AR Core. It also includes a React web app that allows users to upload their own image and video pairs. This allows businesses like publishers, news companies, or museums to create content for its customers. Individual users may also upload their own images and videos to customize their experience with the app.

## Technical Design
We built the mobile app using Android Studio, with Sceneform and AR Core on the backend to recognize images and map them to the corresponding videos. In the first pass, we recognized certain static images and replaced them with the appropriate videos. Then, we built a web page and API to accept more photo-video pairs that can be identified by the cameras of users. Thus, we needed AWS S3 to store these photos and videos, MediaConvert to convert them from MP4 format to a streamable DASH-ISO format, and CloudFront to serve the video streaming requests. Also, MongoDB was required to store a map from the image to the corresponding video link on S3.

See more on [Devpost](https://devpost.com/software/ar-world)
