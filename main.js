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
            maxheight:500,
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
        //检测更新
        if(arg == 'update'){
            child_process.spawn(url, ['update'], {encoding: 'utf-8'});
            event.returnValue = 0;
        }
        //记录锁定状态
        else if(arg == 'lock'){
            //保存坐标
            var pos = win.getPosition();
            var tmp = "['"+pos.join("','")+"']";
            child_process.spawn(url, ['savepos',tmp], {encoding: 'utf-8'});
            child_process.spawn(url, ['lock'], {encoding: 'utf-8'});
            event.returnValue = 0;
        }
        //记录解锁状态
        else if(arg == 'unlock'){
            child_process.spawn(url, ['unlock'], {encoding: 'utf-8'});
            event.returnValue = 0;
        }
        //获取锁定
        else if(arg == 'getwindow'){
            var spawnOb = child_process.spawn(url, ['getwindow'], {encoding: 'utf-8'});
            spawnOb.stdout.on('data', function(chunk) {
                stdss = chunk.toString();
                var posi = stdss.split(',');
                if(posi[3] == 'mini'){
                    win.resizable = true;
                    win.setSize(500,120);
                    win.resizable = false;
                }
                event.returnValue = [posi[2],posi[3]];
            });
        }
        //设置窗口坐标
        else if(arg == 'setpos'){
            var spawnOb = child_process.spawn(url, ['getwindow'], {encoding: 'utf-8'});
            spawnOb.stdout.on('data', function(chunk) {
                stdss = chunk.toString();
                var posi = stdss.split(',');
                if(posi[0] != 'undefined' && posi[1] != 'undefined'){
                    win.setPosition(Number(posi[0]), Number(posi[1]));
                }
            });
            event.returnValue = 0;
        }
        //退出程序
        else if(arg == 'exit'){
            var pos = win.getPosition();
            var tmp = "['"+pos.join("','")+"']";
            var spawnObt = child_process.spawn(url, ['savepos',tmp], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                win.close();
                event.returnValue = 0;
            });
        }
        //获取信息
        else if(arg == 'getinfo'){
            win.setSkipTaskbar(true);
            var spawnObj = child_process.spawn(url, ['info'], {encoding: 'utf-8'});
            spawnObj.stdout.on('data', function(chunk) {
                stdss = iconv.decode(chunk, 'gbk');
                info = stdss.split('/../');
                event.returnValue = info;
            });
        }
        //保存信息
        else if(arg.search("save") != -1){
            var saveList = arg.split('/../');
            var tmp = "['"+saveList.join("','")+"']";
            var chdobj = child_process.spawn(url, ['save',tmp], {encoding: 'utf-8'});
            chdobj.stdout.on('data', function(chunk) {
                event.returnValue = chunk.toString();
            });
        }
        //小窗模式
        else if(arg == 'mini'){
            win.resizable = true;
            win.setSize(500,120);
            win.resizable = false;
            child_process.spawn(url, ['mini'], {encoding: 'utf-8'});
            event.returnValue = 0;
        }
        //还原大窗
        else if(arg == 'rev'){
            win.resizable = true;
            win.setSize(500,500);
            win.resizable = false;
            child_process.spawn(url, ['rev'], {encoding: 'utf-8'});
            event.returnValue = 0;
        }
        //导入文件
        else if(arg == 'importd'){
            var spawnObt = child_process.spawn(url, ['importd'], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                if(chunk.toString() == '1'){
                    event.returnValue = 1;
                }else{
                    event.returnValue = 0;
                }
            });
        }
        //导出文件
        else if(arg == 'exportd'){
            var spawnObt = child_process.spawn(url, ['exportd'], {encoding: 'utf-8'});
            spawnObt.stdout.on('data', function(chunk) {
                event.returnValue = 0;
            });
        }
        //删除信息
        else if(arg == 'delete'){
            child_process.spawn(url, ['delete'], {encoding: 'utf-8'});
            event.returnValue = 0;
        }
    });
}