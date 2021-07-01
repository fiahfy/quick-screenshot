import { browser } from 'webextension-polyfill-ts'

browser.browserAction.onClicked.addListener(async () => {
  const url = await browser.tabs.captureVisibleTab(undefined, { format: 'png' })
  await browser.downloads.download({ url: url, filename: 'capture.png' })
})
