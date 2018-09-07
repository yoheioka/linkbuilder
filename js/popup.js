import {getUrls, setUrls} from './storage.js';
import {addContextMenu, refreshContextMenu} from './contextmenu.js';

const OPEN_NEW_TAB = 'Open new tab';
const URL_LIST_ELEMENT_TEMPLATE = (url, urlId) => `
    <li id="url_${urlId}">
        <span>${url}</span>
        <button id="delete_${urlId}" class="deleteButton">X</button>
    </li>
`;
const loadUrls = () => {
    getUrls((urlList) => {
        for (let i in urlList) {
            addUrlDom(urlList[i]);
        }
    });
}

const addUrlDom = (url) => {
    let urlId = $.now();
    $('#urlList').append(
        URL_LIST_ELEMENT_TEMPLATE(url.length ? url : OPEN_NEW_TAB, urlId)
    );

    let deleteButton = $('#delete_' + urlId);
    deleteButton.click({urlId: urlId}, deleteUrl);
}

const addUrl = () => {
    let url = $('#newUrl').val().trim();
    getUrls((urlList) => {
        if (urlList.includes(url)) {
            return;
        }
        urlList.push(url);
        addUrlDom(url);
        addContextMenu(url);
        setUrls(urlList)
        $('#newUrl').val('');
    });
}

const deleteUrl = (args) => {
    let elementId = '#url_' + args.data.urlId;
    let url = $(elementId).find('span').html();
    if (url === OPEN_NEW_TAB) {
        url = '';
    }
    $('#url_' + args.data.urlId).remove();
    getUrls((urlList) => {
        urlList.splice($.inArray(url, urlList), 1);
        setUrls(urlList)
        refreshContextMenu(urlList);
    });
}

$(document).ready(() => {
    let addUrlButton = $('#addUrlButton');
    addUrlButton.click(addUrl);
    loadUrls();
});
