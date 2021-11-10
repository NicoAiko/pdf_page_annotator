import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { URL } from 'url';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  if (process.env.NODE_ENV === 'development') {
    const url = new URL('http://localhost:3000');
    url.pathname = 'index.html';
    win.loadURL(url.href);
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
