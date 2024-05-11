---
titleTemplate: Gloss Mod Manager
---

# GTA5 Mod 安装教程

## 前置工作

1. 下载并安装 [Gloss Mod Manager](https://mod.3dmgame.com/mod/197445)
2. 下载 前置包 [GTA5 Mod前置包](https://cloud.aoe.top/s/KrRfO)
3. (可选) 下载内置修改器: [Menyoo](https://github.com/MAFINS/MenyooSP/releases) | [汉化补丁](https://mod.3dmgame.com/mod/205488)

## 选择游戏

在安装完 Gloss Mod Manager 后, 启动程序, 然后找到 GTA , 选择游戏运行程序:
![](https://mod.3dmgame.com/static/upload/mod/202401/MOD659f911cf0842.png@webp)
![](https://mod.3dmgame.com/static/upload/mod/202401/MOD659f911cd5b92.png@webp)

## 安装前置

双击运行 下载的 GTA5 Mod前置包, 然后全选, 导入, 接着在管理器里面 安装
![](https://mod.3dmgame.com/static/upload/mod/202401/MOD659f918b83e3f.png@webp)


## 安装Mod

你可以去任意地方下载你想要的Mod, 下面给出几个下载GTA Mod的网站:
- 3DM Mod站: https://mod.3dmgame.com/GTA
- GTA5 Mods: https://zh.gta5-mods.com

然后将下载的压缩包 添加到 管理器中, 即可进行自动安装和卸载. 

## 如何在游戏中找到我的Mod？

首先，安装 Menyoo (拖入GMM 然后直接安装即可)
> 可以根据自己的需求, 去安装汉化补丁

然后进入游戏, 按2下 F8,  打开 Menyoo 修改器.

### 获取载具

定位到 "Vehicle Option (载具选项)" -> "Vehicel Spawner(生成载具)" -> "Input Model (输入模型) (在最下面)"

在输入框中输入 载具代码，然后回车即可获刷出载具.
> 载具代码是什么？  
> 正常情况下, 一般作者会告诉你代码是什么，但也有部分转载的人， 以为那串代码是乱码，从而没有 转载过来， 如果作者并没有告诉你代码，那么你可以在 [这篇文章](https://mod.3dmgame.com/wiki/GTA5Mod_Tutorial/s3o4wvaky8#:~:text=%E5%88%B7%E8%BD%A6%E4%BB%A3%E7%A0%81-,%E5%A6%82%E4%BD%95%E6%9F%A5%E7%9C%8B%E5%88%B7%E8%BD%A6%E4%BB%A3%E7%A0%81,-%E4%B8%80%E8%88%AC%EF%BC%8CMod%E4%BD%9C%E8%80%85) 中查看如何获取 刷车代码

### 获取角色

定位到 "Player Options (玩家选项)" -> "Model Changer (修改模型)" -> "Input Model (输入模型) (在最下面)"

在输入框中输入 角色代码, 然后回车 即可发现你的主角已经变成你 安装的角色了.
> 角色代码 是什么？  
> 你可以使用OpenIV, 定位到 `mods\update\x64\dlcpacks\gmm\dlc.rpf\x64\peds.rpf`, 然后这些文件的名称就是角色代码:
> ![](https://mod.3dmgame.com/static/upload/mod/202401/MOD659fa01b5b779.png@webp)

 
## 关于组合式人物

如果你安装的人物没有效果，那么可能是因为它是组合式的人物, 你可能需要手动修改一下高级配置.

先将Mod卸载, 然后 选择 "操作"-> "配置", 然后开启 高级配置, 在这里面启用"组合"选项, 模型名称 填 你的模型名称, 其他的根据你的喜好进行选择.

> - 关于模型名称， 你可以通过 "操作" ->"打开" 查看Mod所在目录, 看里面的 "XXX.ydd" 文件, 其中 XXX 就是模型名称

![](https://mod.3dmgame.com/static/upload/mod/202401/MOD659fa1fa873e8.png@webp)
![](https://mod.3dmgame.com/static/upload/mod/202401/MOD659fa1ca22e91.png@webp)


## 一些报错处理  

- Script Hook V Critical Error
    > 这个报错大概长这个样子:
    ![](https://mod.3dmgame.com/static/upload/mod/202401/MOD65a0a5d8ab169.jpg@webp)

    > 原因是有麻瓜把过期的 Script Hook V 打包到Mod里面去了，辨别方法是 名称不是 “Script Hook V ” 但类型 却被GMM识别为了 “ScriptHookV” .

    > 解决方法为 将前置里面的 "Script Hook V" 重新安装(即 将状态改为"未安装", 然后再重新改为"已安装") 即可解决此问题

- 游戏内存不足, 请重启电脑并重启游戏
    > 原因是因为你Mod装的太多了，到达了游戏可容纳的上限，这和你电脑内存的关系并不大， 

    > 解决方法为 安装 上限补丁: [HeapAdjuster](https://www.gta5-mods.com/tools/heapadjuster) | [Packfile Limit Adjuster](https://www.gta5-mods.com/tools/packfile-limit-adjuster) 


- ERR_FIL_PACK_1 游戏错误, 请重启电脑并重启游戏
  - 这个问题可能出现在 `RPF 文件编辑工具` 上，点击 "操作"->"更新", 然后将所有 "添加式"、"替换式"、"人物" 类型的Mod全部重新安装一遍
    ![](https://mod.3dmgame.com/static/upload/mod/202403/MOD65e979a07ac8f.png@webp)
  - 也有可能是 "dlclist.xml" 文件在安装Mod的时候出现了损坏, 那么这种情况你可以需要用到 [OpenIV](https://mod.3dmgame.com/mod/31262) 来进行修复， 打开 `mods/update/update.rpf/common/data/dlclist.xml`,  然后看这个文件是否有出现 损坏，翻到最底下,可能能看到缺少 `</Item>` `</Paths>` `</SMandatoryPacksData>` 这种结尾符,  正常的应该长这个样子
    ![](https://mod.3dmgame.com/static/upload/mod/202212/MOD6392b1a226e40.jpg@webp)
