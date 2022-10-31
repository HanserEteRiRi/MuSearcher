var migu_search = require('./migu_search')
var kuwo_search = require('./kuwo_search')
var kugou_search = require('./kugou_search')
var qq_search = require('./qq_search')

async function search(searchContent) {
    // let songsFromMigu = migu_search(searchContent);
    // let songsFromKuwo = kuwo_search(searchContent);
    // let songsFromKugou = kugou_search(searchContent);
    let songsFromQQ = qq_search(searchContent);

    return songsFromQQ;
}

module.exports = search;