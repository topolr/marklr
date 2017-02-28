var package=require("./../package");
module.exports={
    'dir': './',
    'arch': 'all',//ia32, x64, armv7l, all
    'app-copyright': 'hou80houzhu',
    'app-version': package.version,
    'asar': false,
    'icon': './icons/logo.icns',
    'name': 'marklr',
    'ignore': [
        './.git',
        "./releases",
        "./builder",
        "./gitignore",
        "./index.html",
        "./main.js",
        "./topolr-builter-config.js",
        "./app/dist",
        "./app/src",
        "./.idea"
    ],
    'out': './releases',
    'overwrite': true,
    'prune': true,
    'version': '1.4.8',
    'version-string':{
      'CompanyName': 'topolr',
      'FileDescription': 'marklr markdown editor', /*This is what display windows on task manager, shortcut and process*/
      'OriginalFilename': 'marklr markdown editor',
      'ProductName': 'marklr markdown editor',
      'InternalName': 'marklr markdown editor'
    }
};