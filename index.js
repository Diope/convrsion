const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const _ = require('lodash');

const {app, BrowserWindow, ipcMain} = electron;

let mainWindow; // For garbage collection purposes

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {backgroundThrottling: false}
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
});

ipcMain.on('videos:added', (event, videos) => {
  const promises = _.map(videos, video => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(video.path, (err, metadata) => {
        if (err) {
          return Promise.reject(err)
        }
        resolve(metadata)
      })
    })
  })
  Promise.all(promises).then((metadata) => {console.log(metadata.format.duration);})
});