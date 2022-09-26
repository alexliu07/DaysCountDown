import requests,os,tkinter,sys
from tkinter import messagebox
#错误时的处理
def error(e):
    messagebox.showerror('更新错误','错误信息：\n'+e)
    sys.exit()
#隐藏窗口
win = tkinter.Tk()
win.withdraw()
#寻找是否有本地更新包
if os.path.exists('updater/offline/app-update.zip'):
    asks = messagebox.askyesnocancel('Days Count Down离线更新','检测到Days Count Down的离线更新包，是否进行更新\n建议从官方Github下载更新包，对第三方更新包引起的程序出错概不负责\n单击“是”以进行更新，单击“否”以在线搜索更新，单击“取消”以取消更新')
    if asks == True:
        os.system('taskkill /t /f /im dayscountdown.exe')
        #删除源文件
        os.system('rmdir /s /q resources\\app')
        #解压更新文件
        os.system('updater\\7zip\\7za.exe x -o"resources" updater/offline/app-update.zip')
        #记录最新版本
        filej = open('resources/app/package.json','r',encoding='utf-8')
        latest_detail = eval(filej.read())
        latest_version = float(latest_detail['version'][:3])
        filen = open('version.ini','w+',encoding='utf-8')
        filen.write(str(latest_version))
        filen.close()
        #启动程序
        os.system('start dayscountdown.exe')
        sys.exit()
    elif asks == None:
        sys.exit()
#获取github ip
try:
    ips = eval(requests.get('https://raw.hellogithub.com/hosts.json').text)
except Exception as e:
    error(e)
for i in ips:
    if i[1] == 'github.com':
        githuburl = i[0]
#获取最新版本信息
try:
    info = requests.get('https://api.github.com/repos/alexliu07/DaysCountDown/releases').text
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
    #查找更新包大小
    for i in latest_version_detail['assets']:
        if i['name'] == 'app-update.zip':
            update_size = i['size']
    #询问是否更新
    asks = messagebox.askokcancel('Days Count Down更新','检测到Days Count Down有更新，是否进行更新？\n新版本：{}    当前版本：{}\n更新内容：\n{}'.format(latest_version,current_version,latest_version_detail['body']))
    if asks:
        #检测文件夹是否存在
        if not os.path.exists('updater/tmp'):
            os.mkdir('updater/tmp')
        #下载更新
        if not os.path.exists('updater/tmp/tmp.zip'):
            print('正在下载更新...')
            try:
                filed = requests.get('https://'+githuburl+'/alexliu07/DaysCountDown/releases/download/'+str(latest_version)+'/app-update.zip',verify=False)
                filetmp = open('updater/tmp/tmp.zip','wb')
                filetmp.write(filed.content)
                filetmp.close()
            except Exception as e:
                error(e)
        print('更新下载完毕')
        #检测文件是否匹配
        file_size = os.path.getsize('updater/tmp/tmp.zip')
        if file_size == update_size:
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
        else:
            error('File size not match. Maybe download error.')
else:
    messagebox.showinfo('未检测到更新','Days Count Down为最新版本！')