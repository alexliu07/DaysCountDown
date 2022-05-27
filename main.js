{
    const {app, BrowserWindow,ipcMain,Menu} = require('electron');
    const path = require("path");
    const child_process = require("child_process");
    const iconv = require('iconv-lite');
    let win;
    //创建窗口
    function createWindow () {
        win = new BrowserWindow({
            width: 500, 
            height: 500,
            frame: false,
            transparent:true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
            },
            maximizable: false,
            resizable: false,
        });
        Menu.setApplicationMenu(null);
        win.loadFile('index.html');
        win.setSkipTaskbar(true);
        win.on('closed', () => {
            win = null
        });
    }
    app.on('ready', createWindow )
    app.on('window-all-closed', () => {
        app.quit()
    })
    app.on('activate', () => {
      if (win === null) {
        createWindow()
      }
    })
    const url = path.resolve(__dirname, 'utils/util.exe');
    //监听请求
    ipcMain.on("sync-message", (event, arg) => {
        //保存坐标
        if(arg == 'savepos'){
            var pos = win.getPosition();
            var tmp = "['"+pos.join("','")+"']";
            child_process.spawn(url, ['savepos',tmp], {encoding: 'utf-8'});
            event.returnValue = 0;
        }
        //记录锁定状态
        if(arg == 'lock'){
            child_process.spawn(url, ['lock'], {encoding: 'utf-8'});
            event.returnValue = 0;
        }
        //记录解锁状态
        if(arg == 'unlock'){
            child_process.spawn(url, ['unlock'], {encoding: 'utf-8'});
            event.returnValue = 0;
        }
        //获取锁定
        if(arg == 'getlock'){
            var spawnOb = child_process.spawn(url, ['getpos'], {encoding: 'utf-8'});
            spawnOb.stdout.on('data', function(chunk) {
                stdss = chunk.toString();
                posi = stdss.split(',');
                event.returnValue = posi[2];
            });
        }
        //设置窗口坐标
        if(arg == 'setpos'){
            var spawnOb = child_process.spawn(url, ['getpos'], {encoding: 'utf-8'});
            spawnOb.stdout.on('data', function(chunk) {
                stdss = chunk.toString();
                posi = stdss.split(',');
                if(posi[0] != 'undefined' && posi[1] != 'undefined'){
                    win.setPosition(Number(posi[0]), Number(posi[1]));
                }
            });
            event.returnValue = 0;
        }
        //退出程序
        if(arg == 'exit'){
            var pos = win.getPosition();
            var tmp = "['"+pos.join("','")+"']";
            var spawnObt = child_process.spawn(url, ['savepos',tmp], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                win.close();
                event.returnValue = 0;
            });
        }
        //获取信息
        if(arg == 'getinfo'){
            var spawnObj = child_process.spawn(url, ['info'], {encoding: 'utf-8'});
            spawnObj.stdout.on('data', function(chunk) {
                stdss = iconv.decode(chunk, 'gbk');
                info = stdss.split('/../');
                event.returnValue = info;
            });
        }
        //保存信息
        if(arg.search("save") != -1){
            var saveList = arg.split('/../');
            var tmp = "['"+saveList.join("','")+"']";
            var chdobj = child_process.spawn(url, ['save',tmp], {encoding: 'utf-8'});
            chdobj.stdout.on('data', function(chunk) {
                event.returnValue = chunk.toString();
            });
        }
        //删除信息
        if(arg == 'delete'){
            child_process.spawn(url, ['delete'], {encoding: 'utf-8'});
            event.returnValue = 0;
        }
    });
}