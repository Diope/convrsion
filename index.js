const electron = require('electron');
const {app, Browser} = electron;

app.on('ready', () => {
  new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {backgroundThrottling: false}
  })
})