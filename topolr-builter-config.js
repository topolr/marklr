/*
 * topolr-builter version 0.4.0
 * built product developed by topolr web framework
 * topolr-builter-config:
 *   basePath      - app base path
 *   bootPacket    - app boot packet
 *   bootFolder    - app top packet folder
 *   maker         - maker mapping
 *   develop       - develop mapping,when trigger develop
 *   publish       - develop mapping,when trigger publish
 *   output        - output folder,relative basePath
 *   pageTemp      - boot index page,relative basePath
 *   outMap        - out map file is or not make
 *   sequnce       - make sequnce
 *   outmapSequnce - out map file make sequnce
 */
require("topolr").copyMiniTo(__dirname + "/app/topolr.js");
module.exports={
    basePath:"./app/src/",
    bootPacket:"option.root",
    bootFolder:"option/",
    maker:{},
    develop:{
        output:"../dist/",
        pageTemp:"./../../index.html",
        outMap:false,
        sequnce:{},
        outmapSequnce:{},
    },
    publish:{
        output:"../pub/",
        pageTemp:"./../../app.html",
        outMap:false,
        sequnce:{},
        outmapSequnce:{}
    }
};
