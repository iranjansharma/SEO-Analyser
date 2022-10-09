let extensionCreator = 'Ranjan Sharma';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ extensionCreator });
});
