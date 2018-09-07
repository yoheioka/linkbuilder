export const refreshContextMenu = (urlList) => {
    chrome.contextMenus.removeAll(() => {
        for (let i in urlList) {
            addContextMenu(urlList[i]);
        }
    });
}

export const addContextMenu = (prefix) => {
    let title = prefix.length ? prefix : 'Open new tab';
    let id = prefix.length ? prefix : 'blank_tab';
    let context = "selection";
    chrome.contextMenus.create({
        "title": title,
        "contexts": [context],
        "id": id
    }); 
}
