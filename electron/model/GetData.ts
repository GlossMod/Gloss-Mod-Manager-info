import callApi from "./CallApi";
import { Config } from './Config'


// =========== 从Mod站获取相关数据 ===========
export class GetData {
    // =========== 获取Mod列表数据 ===========
    public static async getModList(data: any) {
        return callApi("/render/GetModList", data);
    }

    // =========== 获取Mod数据 ===========
    public static async getMod(id: number) {
        return callApi("/render/GetModDataForID", { id });
    }
    // =========== 获取版本 ===========
    public static async getWebVersion() {
        let data = await callApi("/mod/API/197445");
        return data.mods_version
    }

    public static async getTypes(gameId: number) {
        return callApi("/mod/PublishModGetModTypeList", { gameId });
    }

    public static async login(username: string, passwd: string) {
        return callApi("/user/ToolLogin", {
            username,
            passwd,
            appKey: Config.Api._3dm.api_key,
        });
    }

    public static async checkAllModUpdate(modId: number[]) {
        return callApi("/gmm/checkAllModUpdate", { modId });
    }

    public static async getFavoriteList(data: any) {
        return callApi("/render/GetUserCollectModList", data);
    }
}