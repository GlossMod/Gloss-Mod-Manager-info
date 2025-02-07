import { ElMessage } from "element-plus";

export class ParsingGmm {
    public static parsing(code: string) {
        const download = useDownload()
        const manager = useManager()

        console.log(code);


        // 判断是否是 gmm://installmod 开头
        if (code.startsWith("gmm://installmod")) {
            download.addDownloadByWeb(code)
        } else if (code.startsWith("gmm://customize")) {
            let { url, name } = ParsingGmm.parseUrlParams(code)
            download.addDownloadByCustomize(url, name)
        } else if (code.startsWith("gmm://package")) {
            // gmm://package/xxxxxxxxxxx
            // 将 code 开头的 gmm://package/ 移除
            code = code.replace("gmm://package/", "")

            let packages = Package.parsePackageCode(code)
            console.log(packages);
            packages.forEach((mod) => {
                // 判断是否已经在 manager.managerModList 中
                let installMod = manager.managerModList.find((item) => item.webId === mod.webId)
                if (installMod && installMod.modVersion === mod.modVersion) {
                    ElMessage.warning(`『 ${mod.modName} 』已安装`)
                    return
                }
                if (installMod && installMod.modVersion !== mod.modVersion) {
                    ElMessage.success(`『 ${mod.modName} 』开始更新`)
                    installMod.isInstalled = false

                    manager.deleteMod(installMod)
                    manager.updateMod(mod)

                } else {
                    manager.updateMod(mod)
                }


            })

        } else if (FileHandler.fileExists(code)) {
            manager.addModByGmm(code)
        }
    }

    // 解析 url 参数
    private static parseUrlParams(url: string) {
        let params: any = {};
        let parser = new URL(url);
        let queryString = parser.search.slice(1);
        let queries = queryString.split("&");

        queries.forEach(query => {
            let [key, value] = query.split("=");
            params[key] = decodeURIComponent(value || "");
        });

        return params;
    }
}