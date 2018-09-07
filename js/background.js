import {refreshContextMenu} from './contextmenu.js';
import {getUrls} from './storage.js';

chrome.tabs.onUpdated.addListener((tabid, changeinfo, tab) => {
    if (changeinfo.status === "complete") {
        getUrls((urlList) => {
            refreshContextMenu(urlList);
        });
    }
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

function onClickHandler(info, tab) {
    let prefix = info.menuItemId === 'blank_tab' ? '' : info.menuItemId;

    let lines = info.selectionText.split(' ');
    lines = lines.map(x => x.trim());
    lines = lines.filter(x => x.length);

    for (let i in lines) {
        window.open(prefix + lines[i], '_blank');
    }
};
