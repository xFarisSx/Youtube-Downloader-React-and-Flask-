from pytube import YouTube, Playlist
import time
from flask import Flask, render_template, url_for, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/youtube')
def youtube():
    url = request.args.get('url')

    if url:
        yt = YouTube(url)
        video = {
            "info": {
                "title": yt.title,
                "author": yt.author,
                "thumbnail": yt.thumbnail_url,
                "description": yt.description,
                "length": time.strftime("%H:%M:%S", time.gmtime(yt.length)),
                "views": yt.views,
                "publish_date": yt.publish_date
            },
            "sources": []
        }
        videos = yt.streams.filter(progressive=True)
        for v in videos:
            video['sources'].append({
                "url": v.url,
                "size": f"{v.filesize//1048576} MB",
                "quality": v.resolution
            })
        return video

# Learn

# url = input("Youtube url: ")
# yt = YouTube('https://www.youtube.com/watch?v=jiCSs0Weiqk')
#
# # print(yt.title)
# # print(yt.author)
# # print(yt.thumbnail_url)
# # print(yt.description)
# # print(time.strftime("%H:%M:%S", time.gmtime(yt.length)))
# # print(yt.views)
# # print(yt.publish_date)
#
# videos = yt.streams.filter(progressive=True)
# for video in videos:
#     print(video.resolution, 'indiriliyor...')
#     video.download(filename=f'{"".join(yt.title.strip().split("/"))}' + '_' + video.resolution)

# list = Playlist('https://www.youtube.com/watch?v=jiCSs0Weiqk&list=PLfAfrKyDRWrG7tK01yW92A2j7Ou0qpOFm')
#
# for video in list.videos:
#     print(f'indiriliyor {video.title}')
#     video.streams.get_by_resolution('720p').download("html-dersleri")

