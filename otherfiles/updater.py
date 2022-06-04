import requests,os,tkinter,datetime,sys
from tkinter import messagebox
#错误时的处理
def error(e):
    messagebox.showerror('更新错误','错误信息已保存至errorlog.log')
    errfile = open('errorlog.log','a',encoding='utf-8')
    content = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") + '\n' + str(e) + '\n\n'
    errfile.write(content)
    errfile.close()
    sys.exit()
#隐藏窗口
win = tkinter.Tk()
win.withdraw()
#获取最新版本信息
try:
    info = requests.get('https://api.github.com/repos/alexliu07/dayscountdown/releases').text
    info = info.replace('false','False').replace('true','True').replace('null','None')
    info = eval(info)
    latest_version_detail = info[0]
except Exception as e:
    error(e)
#获取最新版本号
latest_version = float(latest_version_detail['tag_name'])
#获取当前版本号
file = open('version.ini','r',encoding='utf-8')
current_version = float(file.read())
file.close()
#检测更新
if current_version < latest_version:
    try:
        #获取当前IP地理位置
        curip = requests.get('http://ifconfig.me/ip', timeout=1).text.strip()
        ipconfig = requests.get('http://ip-api.com/json/'+curip).json()
    except Exception as e:
        error(e)
    if ipconfig['countryCode'] == 'CN':
        github = 'hub.xn--gzu630h.xn--kpry57d'
    else:
        github = 'github.com'
    #询问是否更新
    asks = messagebox.askokcancel('Days Count Down更新','检测到倒数日电脑版有更新，是否进行更新？')
    if asks:
        #检测文件夹是否存在
        if not os.path.exists('updater/tmp'):
            os.mkdir('updater/tmp')
        #下载更新
        if not os.path.exists('updater/tmp/tmp.zip'):
            print('正在下载更新...')
            try:
                filed = requests.get('https://'+github+'/alexliu07/dayscountdown/releases/download/'+str(latest_version)+'/app-update.zip')
                filetmp = open('updater/tmp/tmp.zip','wb')
                filetmp.write(filed.content)
                filetmp.close()
            except Exception as e:
                error(e)
        print('更新下载完毕')
        os.system('taskkill /t /f /im dayscountdown.exe')
        #删除源文件
        os.system('rmdir /s /q resources\\app')
        #解压更新文件
        os.system('updater\\7zip\\7za.exe x -o"resources" updater/tmp/tmp.zip')
        #记录最新版本
        filen = open('version.ini','w+',encoding='utf-8')
        filen.write(str(latest_version))
        filen.close()
        #删除临时下载文件
        os.remove('updater/tmp/tmp.zip')
        #启动程序
        os.system('start dayscountdown.exe')