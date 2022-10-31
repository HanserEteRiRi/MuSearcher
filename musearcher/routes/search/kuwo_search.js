// 酷我搜索接口

const axios = require("axios");
var express = require('express');

const song = require("./song");
const interface = require("../../setting");

async function searchmusic(searchContent) { //设为async函数，因为有axios存在等待行为。

    var searchSrc = interface.kuwoSearch + searchContent  + "&limit=100"; //输入搜索地址
    //console.log(searchSrc);

    var songList = [];
    var searchSrcs2 = []; //歌曲rid搜索列表
    var songs = [];

    await axios({ //await等待行为结束才会进行下一步
        method: 'get',
        url: searchSrc,
        responseType: 'json'
    }).then( (response) => {   //response:搜索结果对象
        // console.log(response.data.data.list);

        for(var songid of response.data.data.list) { //页面信息在response.data中
            let searchSrc2 = interface.kuwoRid + songid.rid;
            searchSrcs2.push(searchSrc2);

            let newsong = new song();
            newsong.name = songid.name;
            newsong.pic = songid.pic;
            newsong.artist = songid.artist;
            newsong.songTimeMinutes = songid.songTimeMinutes;

            console.log(newsong);

            songs.push(newsong);
        }
        
    }).catch( (error) => {
        console.log(error);
    });

    
    //第二部同样await
    await axios.all(searchSrcs2.map( (searchSrc2) =>  // axios.all同时执行所有的rid查询请求,并行操作
        axios.get(searchSrc2))
    ).then( (resArr) => {//所有的查询请求执行完后进入then, resArr为所有请求结果的数组
        // console.log(resArr[4].data);
        for(let i in resArr) {
            if(Object.keys(resArr[i].data).length == 8) { //成功获取url的歌曲有8调信息，其他的只有7条
                songs[i].url = resArr[i].data.data.url;
                console.log(songs[i].url);
            }
        }
        //console.log(songs); //最终的结果songs列表
    }).catch((error) => {
        console.log(error);
    });
    

    //console.log(songs);
    return songs;
}

module.exports = searchmusic;