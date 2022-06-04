import os,sys,datetime
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
#获取信息
if sys.argv[1] == 'info':
    #检测更新
    os.system('start updater\\updater.exe')
    #info[状态(countdown/undefined),名称,目标日,剩余（过去）天,模式(future/past)]
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
        #如果大于等于0则设为倒数，如果小于0则设为倒数
        if days >= 0:
            info.append(str(days))
            info.append('future')
        elif days < 0:
            info.append(str(abs(days)))
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
#获取窗体位置
elif sys.argv[1] == 'getpos':
    if not os.path.exists('window.ini'):
        file = open('window.ini','w+',encoding='utf-8')
        file.write('["undefined","undefined","unlocked"]')
        file.close()
        print('undefined,undefined,unlocked',end='')
    else:
        file = open('window.ini','r',encoding='utf-8')
        posi = eval(file.read())
        file.close()
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