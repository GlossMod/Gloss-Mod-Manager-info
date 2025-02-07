/**
 * 导出所有扩展
 */


// 批量导入当前目录中的所有组件
const modules = import.meta.glob('./*.ts', { eager: true })
function getLangFiles(mList: any) {
    let msg: ISupportedGames[] = []
    for (let path in mList) {
        // console.log(mList[path]);
        if (mList[path].supportedGames) {
            let item = mList[path].supportedGames
            // console.log(item);
            msg.push(item)
        }
    }
    return msg
}

export function getAllExpands(): any {
    let message = getLangFiles(modules)
    return message
}