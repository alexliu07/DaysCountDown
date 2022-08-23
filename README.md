# 倒数日电脑版
### 在电脑上放置一个倒数日历，可用于考试、生日、纪念日等
***注意：旧版Updater已无法使用，请手动下载最新版更新***
***
## 使用方法
***
***提示：本软件只能运行在64位的Windows 7/8/8.1/10/11系统上<br>且一定要将文件夹放在有权限访问的目录下，否则程序将无法读取配置文件***
***
将文件下载下来后解压，然后运行内部的dayscountdown.exe运行<br>
然后根据指导添加倒数日<br>
本程序支持自动识别，若目标日未到，则使用倒数日，若目标日已经过去，将使用正数日
***
## 窗口拖动说明（需解锁拖动）
***
在倒数日界面，拖动 **倒数日标题** 以拖动界面<br>
在设置界面，拖动 **窗口标题** 以拖动界面<br>
在无倒数日界面，拖动 **窗口顶部** 以拖动界面
***
## 源码使用说明
***由于源码使用比较麻烦，建议直接下载release使用，里面也有源码***
***
本程序采用Electron + Python的实现方式，需要先进行编译Python文件才可使用源码运行<br>
***
util.py为程序使用所需的系统交互代码，必须编译才可使用源码运行程序
1. 安装Python
2. 安装Pyinstaller<br>`pip install pyinstaller`
3. 将otherfiles下的util.py使用pyinstaller编译
4. 将编译后的文件放入源码路径下utils文件夹
***
### updater.py使用
***
本程序为更新程序，需在打包好的程序中运行，放在这里仅作为源码查看
***
## 使用到的程序
主程序使用<a href="https://nodejs.org/">Nodejs</a>+<a href="https://www.electronjs.org/">Electron</a>构建<br>
辅助程序使用<a href="https://www.python.org/">Python</a>构建<br>
解压更新包程序：<a href="https://www.7-zip.org/">7-Zip</a><br>
吐司通知程序：<a href="https://github.com/KDE/snoretoast">Snoretoast</a><br>
Github加速IP：<a href="https://github.com/521xueweihan/GitHub520">Github520</a>
