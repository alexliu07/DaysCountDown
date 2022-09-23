import os,sys,datetime,platform,base64,tkinter
from tkinter import filedialog,messagebox
#检测win7
def checkwin7():
    final = []
    version = platform.version().split('.')
    final.append(version[0])
    final.append(version[1])
    final = float('.'.join(final))
    if final == 6.1:
        return 0
    else:
        return 1
#获取状态
def getStatus():
    if os.path.exists('target.ini'):
        return 1
    else:
        return 0
#获取两个日期的时间差
def calDates(d1,d2):
    date1 = datetime.datetime.strptime(d1, "%Y-%m-%d").date()
    date2 = datetime.datetime.strptime(d2, "%Y-%m-%d").date()
    Days = (date2 - date1).days
    return Days
tkinter.Tk().withdraw()
#检测更新
if sys.argv[1] == 'update':
    #检测更新
    os.system('start updater\\updater.exe')
#获取信息
if sys.argv[1] == 'info':
    #info[状态(countdown/undefined),[名称,目标日,剩余（过去）天,模式(future/past)],[2],[3],[4]]
    info = []
    if getStatus():
        info.append('countdown')
        #获取目标名称及日期
        file = open('target.ini','r',encoding='utf-8')
        infos = eval(file.read())
        file.close()
        info.append(infos[0])
        info.append(infos[1])
        #获取当前日期
        curdate = datetime.date.today()
        #计算到目标日（起始日）的天数
        days = calDates(str(curdate),infos[1])
        #如果在指定日期运行，则弹出提示
        #如果在windows7环境下运行则不运行本脚本
        if checkwin7():
            specials = [365,100,50,20,10,5,3,2,1,0]
            for i in specials:
                if abs(days) == i:
                    #如果是0则单独提示
                    if days == 0:
                        os.system('start resources\\app\\utils\\snoretoast\\bin\\snoretoast.exe -t '+infos[0]+'就是今天！ -m 今日：'+infos[1]+' -p icon.ico')
                    #弹出提示
                    if days < 0:
                        os.system('start resources\\app\\utils\\snoretoast\\bin\\snoretoast.exe -t 距'+infos[0]+'已经过去'+str(i)+'天！ -m 起始日：'+infos[1]+' -p icon.ico')
                    else:
                        os.system('start resources\\app\\utils\\snoretoast\\bin\\snoretoast.exe -t 距'+infos[0]+'还有'+str(i)+'天！ -m 目标日：'+infos[1]+' -p icon.ico')
        #如果大于等于0则设为倒数，如果小于0则设为倒数
        info.append(str(abs(days)))
        if days >= 0:
            info.append('future')
        elif days < 0:
            info.append('past')
    else:
        #未设置
        info.append('undefined')
        info.append('0')
        info.append('0')
        info.append('0')
        info.append('0')
    textx = '/../'.join(info)
    print(textx,end='')
#保存信息
elif sys.argv[1] == 'save':
    tosave = eval(str(sys.argv[2]))
    del tosave[0]
    #保存文件
    file = open('target.ini','w+',encoding='utf-8')
    file.write(str(tosave))
    file.close()
    #获取当前日期
    curdate = datetime.date.today()
    #计算到目标日（起始日）的天数
    days = calDates(str(curdate),tosave[1])
    print(str(days),end='')
#删除信息
elif sys.argv[1] == 'delete':
    os.remove('target.ini')
#获取窗体信息
elif sys.argv[1] == 'getwindow':
    if not os.path.exists('window.ini'):
        file = open('window.ini','w+',encoding='utf-8')
        file.write('["undefined","undefined","unlocked","normal"]')
        file.close()
        print('undefined,undefined,unlocked',end='')
    else:
        file = open('window.ini','r',encoding='utf-8')
        posi = eval(file.read())
        file.close()
        try:
            if posi[3]:
                pass
        except IndexError:
            posi.append('normal')
        tmp = ','.join(posi)
        print(tmp,end='')
#保存窗体位置
elif sys.argv[1] == 'savepos':
    posi = eval(sys.argv[2])
    file = open('window.ini','r',encoding='utf-8')
    oldlist = eval(file.read())
    file.close()
    oldlist[0] = str(posi[0])
    oldlist[1] = str(posi[1])
    filen = open('window.ini','w+',encoding='utf-8')
    filen.write(str(oldlist))
    filen.close()
    print(0,end='')
#保存锁定状态
elif sys.argv[1] == 'lock':
    file = open('window.ini','r',encoding='utf-8')
    oldlist = eval(file.read())
    file.close()
    oldlist[2] = 'locked'
    filen = open('window.ini','w+',encoding='utf-8')
    filen.write(str(oldlist))
    filen.close()
#保存解锁状态
elif sys.argv[1] == 'unlock':
    file = open('window.ini','r',encoding='utf-8')
    oldlist = eval(file.read())
    file.close()
    oldlist[2] = 'unlocked'
    filen = open('window.ini','w+',encoding='utf-8')
    filen.write(str(oldlist))
    filen.close()
#保存小窗模式
elif sys.argv[1] == 'mini':
    file = open('window.ini','r',encoding='utf-8')
    oldlist = eval(file.read())
    file.close()
    try:
        oldlist[3] = 'mini'
    except IndexError:
        oldlist.append('mini')
    filen = open('window.ini','w+',encoding='utf-8')
    filen.write(str(oldlist))
    filen.close()
#保存大窗模式
elif sys.argv[1] == 'rev':
    file = open('window.ini','r',encoding='utf-8')
    oldlist = eval(file.read())
    file.close()
    try:
        oldlist[3] = 'normal'
    except IndexError:
        oldlist.append('normal')
    filen = open('window.ini','w+',encoding='utf-8')
    filen.write(str(oldlist))
    filen.close()
#导入文件
elif sys.argv[1] == 'importd':
    filew = filedialog.askopenfilename(title='请选择要导入的文件',filetype=[('Backup File', '.dcd')])
    if filew != '':
        file = open(filew,'r',encoding='utf-8')
        wr = file.read()
        file.close()
        content = base64.b64decode(wr.encode()).decode()
        file = open('target.ini','w+',encoding='utf-8')
        file.write(content)
        file.close()
        print(0,end='')
    else:
        print(1,end='')
#导出文件
elif sys.argv[1] == 'exportd':
    filed = filedialog.askdirectory(title="请选择要导出到的目录")
    if filed != '':
        file = open('target.ini','r',encoding='utf-8')
        infos = eval(file.read())
        file.close()
        infos_tow = base64.b64encode(str(infos).encode()).decode()
        curdate = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        file = open(filed+'/backup-'+curdate+'.dcd','w+',encoding='utf-8')
        file.write(infos_tow)
        file.close()
        messagebox.showinfo('导出成功','文件已保存至：\n'+filed+'/backup-'+curdate+'.dcd')
    print(0,end='')