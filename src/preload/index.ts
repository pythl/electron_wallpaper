import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  //设置壁纸
  setWallpaper: (url: string) => {
    ipcRenderer.send('setWallpaper', url)
  },
  //下载壁纸
  downloadImage: (url: string) => {
    ipcRenderer.send('downloadImage', url)
  },
  setImageSaveDirectory: (dir: string) => {
    alert('adb')
    // ipcRenderer.send('setImageSaveDirectory', dir)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}