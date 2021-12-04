const electron = require('electron');
const { DisableMinimize } = require('electron-disable-minimize');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var screenwidth;
var screenheight;

app.on('window-all-closed', () => {
  app.quit();
});

app.whenReady().then(() => {
  screenwidth = electron.screen.getPrimaryDisplay().size.width;
  screenheight = electron.screen.getPrimaryDisplay().size.height;

  newWidget(-50,  50, 200, 200, 'clock.html');
  newWidget(-50, 300, 200, 200, 'clock10hrs.html');
//  newWidget(-50, -70, 300, 100, 'date.html');
});

function newWidget(x, y, width, height, url) {
  if (x < 0) {
    x = screenwidth - width + x;
  }
  if (y < 0) {
    y = screenheight - height + y;
  }
  var browserWindow = new BrowserWindow({
    'x': x,
    'y': y,
    'width': width,
    'height': height,
    'frame': false,
    'closable': false,
    'focusable': false,
    'fullscreenable': false,
    'maximizable': false,
    'minimizable': false,
    'movable': false,
    'resizable': false,
    'skipTaskbar': true,
    'transparent': true,
  });
  browserWindow.loadFile(url);
  DisableMinimize(browserWindow.getNativeWindowHandle());
}
