import { BrowserWindow, Menu, Tray } from 'electron'
import path from 'path'
const createTray = (createWindow: () => void) => {
  const tray = new Tray(
    path.resolve(
      __dirname,
      process.platform == 'darwin'
        ? '../../resources/macTray@2x.png' //32x32 像素的图片
        : '../../resources/windowTray.png' //可以使用彩色图片，图标的最大大小为 256x256 像素，设置为32x32像素即可
    )
  )
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '设置壁纸',
      click: () => {
        // if (BrowserWindow.getAllWindows().length == 0) createWindow()
        // 在点击 "设置壁纸" 时创建窗口
        createWindow()
      }
    },
    { label: '退出', role: 'quit' }
  ])
  tray.setToolTip('荣喜桌面壁纸')
  tray.setContextMenu(contextMenu)

  tray.on('click', () => {
    // 兼容 Mac，在点击托盘图标时创建窗口
    if (!BrowserWindow.getAllWindows().length) {
      createWindow()
    }
  })
}

export { createTray }
