export const LB_STORAGE_KEY = 'linkbuilderurls';

export const getUrls = (callback) => {
    return chrome.storage.local.get([LB_STORAGE_KEY], function(result) {
        let urlList = result[LB_STORAGE_KEY];
        urlList = Array.isArray(urlList) && urlList.length ? urlList : [];
        callback(urlList);
    });
}

export const setUrls = (urlList) => {
    chrome.storage.local.set({[LB_STORAGE_KEY]: urlList});
}
