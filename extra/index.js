//声明变量及导入库
const { ipcRenderer } = require("electron");
var status,targetname,targetdate,daysleft,mode,lock,windowstatus;
//设置窗口坐标
ipcRenderer.sendSync("sync-message", 'setpos');
//注册组件
//锁定拖动
var lockBtnm = document.getElementById('lockm');
var lockBtnmm = document.getElementById('lockmm')
var lockBtnu = document.getElementById('locku');
var dgbaru = document.getElementById('dragbar');
var editdgb = document.getElementById('titlew');
//窗口
var container = document.getElementById('container');
var mainwindow = document.getElementById('mainwindow');
var undefinedwindow = document.getElementById('undefinedwindow');
var settingwindow = document.getElementById('settingwindow');
var miniwindow = document.getElementById('miniwindow');
//与模式发生变化
var toptexts = document.getElementById('topbar');
var modetext = document.getElementById('modetext');
var modetarget = document.getElementById('modetarget');
//需跳转到设置页面的按钮
var mainSet = document.getElementById('set');
var undefinedSet = document.getElementById('createctd');
var back = document.getElementById('cancel')
//关闭按钮
var mainExit = document.getElementById('exit');
var undefinedExit = document.getElementById('exitundefined');
var miniExit = document.getElementById('exitm');
//信息显示
var tname = document.getElementById('targetname');
var dleft = document.getElementById('number');
var tdate = document.getElementById('targetdd');
var ddda = document.getElementById('ddda');
//操作指令
var save = document.getElementById('save');
var deletebtn = document.getElementById('delete');
var isnone = document.getElementById('isnone');
var updateb = document.getElementById('updateb');
//填写的信息
var named = document.getElementById('named');
var targetd = document.getElementById('targetd');
//小窗模式
var revert = document.getElementById('rev');
var minim = document.getElementById('mini');
//小窗界面
var titlemin = document.getElementById('titlemin');
var leftmin = document.getElementById('leftmin');
var numberm = document.getElementById('numberm');
var dddam = document.getElementById('dddam');
//导入导出
var importb = document.getElementById('import');
var exportb = document.getElementById('export');
//切换界面
function change(a,b){
    a.style.animation = 'out 0.2s 1';
    a.style.display = 'none';
    b.style.animation = 'in 0.6s 1';
    b.style.display = 'block';
}
//显示模式切换
function switchMode(){
    if(mode == 'past'){
        toptexts.style.backgroundColor = '#e67b2f';
        leftmin.style.backgroundColor = '#e67b2f';
        modetext.innerHTML = '已经过去：';
        modetarget.innerHTML = '起始日：';
    }else{
        toptexts.style.backgroundColor = '#3184d0';
        leftmin.style.backgroundColor = '#3184d0';
        modetext.innerHTML = '还有：'
        modetarget.innerHTML = '目标日：';
    }
    if(mode == 'future' && daysleft <= 10){
        dleft.style.color = 'red';
        ddda.style.color = 'red';
        numberm.style.color = 'red';
        dddam.style.color = 'red';
    }else{
        dleft.style.color = 'black';
        ddda.style.color = 'black';
        numberm.style.color = 'black';
        dddam.style.color = 'black';
    }
}
//获取信息
function getrInfo(){
    //获取信息
    var info = ipcRenderer.sendSync("sync-message", 'getinfo');
    status = info[0];
    targetname = info[1];
    targetdate = info[2];
    daysleft = info[3];
    mode = info[4];
    //显示信息
    updateInfo();
    //显示模式切换
    switchMode();
}
//获取锁定和小窗状态
function getWindow(){
    var wstatus = ipcRenderer.sendSync("sync-message", 'getwindow');
    lock = wstatus[0];
    windowstatus = wstatus[1];
    if(lock == 'unlocked'){
        lockWin('unlock','drag');
    }else{
        lockWin('lock','no-drag');
    }
}
//根据状态显示窗口
function showWindow(){
    if(status == 'undefined'){
        undefinedwindow.style.animation = 'in 0.6s 1';
        undefinedwindow.style.display = 'block';
    }else if(status == 'countdown'){
        if(windowstatus == 'normal'){
            container.style.height = '480px';
            mainwindow.style.animation = 'in 0.6s 1';
            mainwindow.style.display = 'block';
        }else if(windowstatus == 'mini'){
            container.style.height = '100px';
            miniwindow.style.animation = 'in 0.6s 1';
            miniwindow.style.display = 'block';
        }
        
    }
}
//点击锁切换状态，且保存位置
function toggleLock(){
    if(lock == 'unlocked'){
        ipcRenderer.sendSync("sync-message", 'lock');
        lock = 'locked';
        lockWin('lock','no-drag');
    }else{
        ipcRenderer.sendSync("sync-message", 'unlock');
        lock = 'unlocked';
        lockWin('unlock','drag');
    }
}
//锁定窗口
function lockWin(mode,control){
    lockBtnm.src = 'imgs/'+mode+'ed.png';
    lockBtnu.src = 'imgs/'+mode+'ed.png';
    lockBtnmm.src = 'imgs/'+mode+'ed.png';
    tname.style.webkitAppRegion = control;
    dgbaru.style.webkitAppRegion = control;
    titlemin.style.webkitAppRegion = control;
    editdgb.style.webkitAppRegion = control;
}
//更新信息
function updateInfo(){
    tname.innerHTML = targetname;
    titlemin.innerHTML = targetname;
    dleft.innerHTML = daysleft;
    numberm.innerHTML = daysleft;
    tdate.innerHTML = targetdate;
}
getrInfo();
getWindow();
showWindow();
lockBtnm.onclick = toggleLock;
lockBtnu.onclick = toggleLock;
lockBtnmm.onclick = toggleLock;
//检测更新
updateb.onclick = function(){
    ipcRenderer.sendSync("sync-message", 'update');
}
//点击编辑跳转编辑页面
mainSet.onclick = function(){
    named.value = targetname;
    targetd.value = targetdate;
    importb.style.display = 'none';
    exportb.style.display = 'inline-block';
    deletebtn.style.display = 'inline-block';
    change(mainwindow,settingwindow);
}
//点击创建跳转编辑页面
undefinedSet.onclick = function(){
    deletebtn.style.display = 'none';
    importb.style.display = 'inline-block';
    exportb.style.display = 'none';
    change(undefinedwindow,settingwindow);
}
//点击取消关闭编辑页面
back.onclick = function(){
    isnone.style.display = 'none';
    if(status == 'undefined'){
        change(settingwindow,undefinedwindow);
    }else if(status == 'countdown'){
        change(settingwindow,mainwindow);
    }
}
//点击导入按钮进行导入
importb.onclick = function(){
    var isimport = ipcRenderer.sendSync("sync-message", 'importd');
    if(isimport == 0){
        getrInfo();
        change(settingwindow,mainwindow);
    }
}
//点击导出按钮进行导出
exportb.onclick = function(){
    ipcRenderer.sendSync("sync-message", 'exportd');
}
//点击关闭按钮关闭程序
mainExit.onclick = function(){
    ipcRenderer.sendSync("sync-message", 'exit');
}
undefinedExit.onclick = function(){
    ipcRenderer.sendSync("sync-message", 'exit');
}
miniExit.onclick = function(){
    ipcRenderer.sendSync("sync-message", 'exit');
}
//小窗模式
minim.onclick = function(){
    windowstatus = 'mini';
    container.style.height = '100px';
    change(mainwindow,miniwindow);
    ipcRenderer.sendSync("sync-message", 'mini');
}
//还原大窗口
revert.onclick = function(){
    windowstatus = 'normal';
    container.style.height = '480px';
    change(miniwindow,mainwindow);
    ipcRenderer.sendSync("sync-message", 'rev');
}
//保存信息
save.onclick = function(){
    if(named.value == null || named.value == '' || targetd.value == null || targetd.value == ''){
        isnone.style.display = 'block';
    }else{
        //保存配置
        var ddleft = ipcRenderer.sendSync("sync-message", 'save/../'+named.value+'/../'+targetd.value);
        //获取及显示信息
        if(Number(ddleft) <0){
            mode = 'past';
            daysleft = String(-Number(ddleft));
        }else{
            mode = 'future';
            daysleft = ddleft;
        }
        switchMode();
        status = 'countdown';
        targetname = named.value;
        targetdate = targetd.value;
        updateInfo();
        isnone.style.display = 'none';
        change(settingwindow,mainwindow);
    }
}
//删除信息
deletebtn.onclick = function(){
    named.value = '';
    targetd.value = '';
    //删除配置
    ipcRenderer.sendSync("sync-message", 'delete');
    status = 'undefined';
    isnone.style.display = 'none';
    change(settingwindow,undefinedwindow);
}
//每隔600秒刷新一次
var timer = setInterval(function(){
    if(status == 'countdown'){
        getrInfo();
    }
},600000);