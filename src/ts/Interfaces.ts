declare global {
    type sourceType = "GlossMod" | "NexusMods" | "Thunderstore" | "ModIo" | "SteamWorkshop" | "CurseForge" | "GitHub" | "Customize" | "GameBanana"
    type InstallUseFunction = "generalInstall" | "generalUninstall" | "installByFolder" | "installByFile" | "installByFileSibling" | "installByFolderParent" | "Unknown"
    type TaskStatus = "active" | "waiting" | "paused" | "error" | "complete" | "removed"

    type install = ((mod: IModInfo) => Promise<IState[] | boolean>) | ITypeInstall

    //#region 基础Mod

    interface IMod {
        id: number
        nexus_id?: string
        mods_author: string
        mods_content: string
        mods_createTime: string
        mods_desc?: string
        mods_image_url?: string
        mods_images_url?: string
        mods_isRecommend: number
        mods_original: number
        mods_title: string
        mods_updateTime: string
        mods_version?: string
        user_nickName: string
        mods_credits?: number
        mods_directions?: string
        mods_key?: string
        mods_original_url?: string
        mods_publish: number
        mods_state: number
        mods_type_id?: number
        mods_type_name?: string
        mods_showAD: number
        mods_license?: string

        mods_SilverSnakeCoin_cnt: number
        mods_click_cnt: number
        mods_collection_cnt: number
        mods_download_cnt: number
        mods_mark_cnt: number

        user_Intr?: string
        user_avatar?: string
        user_tag?: string
        user_tag_colour?: string
        user_fan: number

        game_cover_imgUrl?: string
        game_name?: string
        game_id?: number
        game_imgUrl?: string
        game_path?: string

        mods_resource_name: string
        mods_resource_desc?: string
        mods_resource_url: string
        mods_resource_createTime: string
        mods_resource_size: string

        mods_charge_content?: number
        mods_adult_content?: number
        mods_API?: number
    }

    interface IModData {
        webId?: number | string
        from?: sourceType
        modAuthor?: string
        modWebsite?: string
        tags?: ITag[]
        modType?: number
        other?: {
            [key: string]: any
        }
    }

    interface IModInfo extends IModData {
        id: number
        modName: string
        fileName: string
        gameID?: number
        md5: string
        modVersion: string
        isUpdate?: boolean
        isInstalled: boolean
        weight: number
        modFiles: string[]
        modDesc?: string
        advanced?: {
            enabled: boolean
            data: any
        }
        key?: string

    }

    interface IDownloadTask extends IModData {
        id: number
        gid?: string
        key?: string
        name: string
        fileName: string
        version: string
        status: TaskStatus
        speed: number
        totalSize: number
        downloadedSize: number
        link: string
    }

    //#endregion

    //#endregion

    interface IUser {
        id: number
        user_Intr?: string
        user_avatar?: string
        user_fan?: number
        user_gender?: number
        user_nickName?: string
        user_tag?: string
        user_tag_colour?: string
        user_silverSnakeCoin?: number
        user_state?: number
        user_p_show_adult?: -1 | 1
        user_p_show_charge?: -1 | 1
        user_tag_p?: -1 | 1
        user_p_favor?: -1 | 1
        user_p_tobbs?: -1 | 1
        user_p_ckmsg?: -1 | 1
        user_p_ctmsg?: -1 | 1
        mod_count?: number
        mod_original_conut?: number
        mod_translate_conut?: number
        user_protocol_time?: string
        timeout?: number
    }

    //#region 游戏

    interface IGameExe {
        name: string
        rootPath: string
    }
    interface IStartExe {
        name: string
        exePath?: string
        options?: string
        cmd?: string
    }

    interface IGameInfo {
        GlossGameId: number
        steamAppID: number
        SteamWorkshop?: boolean
        installdir?: string
        gameName: string
        gameExe: string | IGameExe[]
        startExe?: string | IStartExe[]
        gamePath?: string
        gameVersion?: string
        gameCoverImg?: string
        NexusMods?: {
            game_id: number
            game_domain_name: string
        },
        Thunderstore?: {
            community_identifier: string
        },
        mod_io?: number
        gamebanana?: number
        curseforge?: number
        archivePath?: string
    }

    interface IState {
        file: string,
        state: boolean
    }

    interface IAdvancedItem {
        type: "input" | "selects" | "switch"
        label: string
        key: string
        selectItem?: { name: string, value: string }[]
        defaultValue?: string | boolean
    }

    interface ITypeInstall {
        UseFunction: InstallUseFunction
        folderName?: string
        isInstall?: boolean
        fileName?: string
        include?: boolean
        spare?: boolean
        keepPath?: boolean
        isExtname?: boolean
        inGameStorage: boolean
        pass?: string[]
    }

    interface ICheckModType {
        UseFunction: "extname" | "basename" | "inPath"
        Keyword: string[]
        TypeId: number
    }

    interface IType {
        id: number
        name: string
        installPath?: string
        advanced?: {
            name: string
            icon: string
            item: IAdvancedItem[]
        }
        install: install
        uninstall: install
        checkPlugin?: (plugin: IModInfo) => boolean
    }

    interface ISupportedGames extends IGameInfo {
        modType: IType[]
        from?: 'Local' | 'Internal'
        checkModType: (((mod: IModInfo) => number) | ICheckModType[])
        sortMod?: (list: IModInfo[]) => boolean
    }

    interface IExpandsSupportedGames extends IGameInfo {
        modType: IType[] | 'UnityGame.modType' | 'UnityGameILCPP2.modType' | 'UnrealEngine.modType' | 'Custom'
        unrealEngineData: { bassPath: string, useUE4SS: boolean }
        checkModType: (((mod: IModInfo) => number) | ICheckModType[]) | 'UnrealEngine.checkModType' | 'UnityGame.checkModType' | 'UnityGameILCPP2.checkModType' | 'Custom'
        sortMod?: (list: IModInfo[]) => boolean
    }

    interface IGamePlugins {
        id: number
        plugins_gameId: number
        plugins_name: string
        plugins_desc: string
        plugins_version: string
        plugins_website: string
        plugins_from: string
        plugins_author: string
        plugins_creation_time: string
        plugins_update_time: string
        plugins_state: number
        plugins_webId?: number
        plugins_modIo_id?: number
        plugins_Thunderstore_name?: string
        plugins_Thunderstore_namespace?: string
    }

    //#endregion

    interface ISettings {
        managerGame?: ISupportedGames
        managerGameList: ISupportedGames[]
        modStorageLocation: string
        tourGameList: number[]
        proxy: string
        // UnzipPath: string
        autoInstall: boolean
        leftMenuRail: boolean
        autoLaunch: boolean
        language: string
        theme: 'light' | 'dark' | 'system'
        fold: boolean,
        exploreType: sourceType
        selectGameByFolder: boolean
        showPakeMessage: boolean
        changeInRun: boolean
        defaultPage: string
    }

    interface IFileTreeNode {
        label: string;
        path: string;
        checked?: boolean;
        children?: IFileTreeNode[];
    }

    interface IInfo {
        name?: string
        version: string
        description?: string
        gameID?: number
        author?: string
    }

    interface IAria2Request {
        jsonrpc: string;
        id?: string;
        method: string;
        params: any[];
    }

    interface ITag {
        name: string
        color: string
    }

    //#region Thunderstore

    interface IThunderstoreModVersions {
        name: string
        full_name: string
        description: string
        icon: string
        version_number: string
        dependencies: string[]
        download_url: string
        downloads: number
        date_created: string
        website_url: string
        is_active: boolean
        uuid4: string
        file_size: number
    }

    interface IThunderstoreMod {
        name: string
        full_name: string
        owner: string
        package_url: string
        date_created: string
        date_updated: string
        uuid4: string
        rating_score: number
        is_pinned: boolean
        is_deprecated: boolean
        has_nsfw_content: boolean
        categories: string[]
        versions: IThunderstoreModVersions[]
        latest: IThunderstoreModVersions
    }

    //#endregion

    //#region ModIo

    interface IModIo {
        id: number;
        game_id: number;
        status: number;
        visible: number;
        submitted_by: IModIoSubmittedBy;
        date_added: number;
        date_updated: number;
        date_live: number;
        maturity_option: number;
        community_options: number;
        monetization_options: number;
        price: number;
        tax: number;
        logo: IModIoLogo;
        homepage_url: string;
        name: string;
        name_id: string;
        summary: string;
        description: string;
        description_plaintext: string;
        metadata_blob: null;
        profile_url: string;
        media: IModIoMedia;
        modfile: IModIoModfile;
        dependencies: boolean;
        platforms: any[];
        metadata_kvp: any[];
        tags: IModIoTag[];
        stats: IModIoStats;
    }

    interface IModIoStats {
        mod_id: number;
        popularity_rank_position: number;
        popularity_rank_total_mods: number;
        downloads_today: number;
        downloads_total: number;
        subscribers_total: number;
        ratings_total: number;
        ratings_positive: number;
        ratings_negative: number;
        ratings_percentage_positive: number;
        ratings_weighted_aggregate: number;
        ratings_display_text: string;
        date_expires: number;
    }

    interface IModIoTag {
        name: string;
        date_added: number;
    }

    interface IModIoModfile {
        id: number;
        mod_id: number;
        date_added: number;
        date_updated: number;
        date_scanned: number;
        virus_status: number;
        virus_positive: number;
        virustotal_hash: null;
        filesize: number;
        filesize_uncompressed: number;
        filehash: IModIoFilehash;
        filename: string;
        version: string;
        changelog: null;
        metadata_blob: null;
        download: IModIoDownload;
        platforms: any[];
    }

    interface IModIoDownload {
        binary_url: string;
        date_expires: number;
    }

    interface IModIoFilehash {
        md5: string;
    }

    interface IModIoMedia {
        youtube: any[];
        sketchfab: any[];
        images: IModIoImage[];
    }

    interface IModIoImage {
        filename: string;
        original: string;
        thumb_320x180: string;
        thumb_1280x720: string;
    }

    interface IModIoLogo {
        filename: string;
        original: string;
        thumb_320x180: string;
        thumb_640x360: string;
        thumb_1280x720: string;
    }

    interface IModIoSubmittedBy {
        id: number;
        name_id: string;
        username: string;
        display_name_portal: null;
        date_online: number;
        date_joined: number;
        avatar: IModIoAvatar;
        timezone: string;
        language: string;
        profile_url: string;
    }

    interface IModIoAvatar {
        filename: string;
        original: string;
        thumb_50x50: string;
        thumb_100x100: string;
    }

    //#endregion

    //#region SteamWorkshop

    interface ISteamWorkshopTag {
        tag: string;
        display_name: string;
        adminonly?: boolean;
    }

    interface ISteamWorkshopItem {
        result: number;
        publishedfileid: string;
        creator: string;
        creator_appid: number;
        consumer_appid: number;
        consumer_shortcutid: number;
        filename: string;
        file_size: string;
        preview_file_size: string;
        preview_url: string;
        url: string;
        hcontent_file: string;
        hcontent_preview: string;
        title: string;
        file_description: string;
        time_created: number;
        time_updated: number;
        visibility: number;
        flags: number;
        workshop_file: boolean;
        workshop_accepted: boolean;
        show_subscribe_all: boolean;
        num_comments_public: number;
        banned: boolean;
        ban_reason: string;
        banner: string;
        can_be_deleted: boolean;
        app_name: string;
        file_type: number;
        can_subscribe: boolean;
        subscriptions: number;
        favorited: number;
        followers: number;
        lifetime_subscriptions: number;
        lifetime_favorited: number;
        lifetime_followers: number;
        lifetime_playtime: string;
        lifetime_playtime_sessions: string;
        views: number;
        num_children: number;
        num_reports: number;
        tags: ISteamWorkshopTag[];
        language: number;
        maybe_inappropriate_sex: boolean;
        maybe_inappropriate_violence: boolean;
        revision_change_number: string;
        revision: number;
        ban_text_check_result: number;
    }

    //#endregion

    //#region CurseForge

    interface ICurseForgeLink {
        websiteUrl: string;
        wikiUrl: string | null;
        issuesUrl: string | null;
        sourceUrl: string | null;
    }

    interface ICurseForgeCategory {
        id: number;
        gameId: number;
        name: string;
        slug: string;
        url: string;
        iconUrl: string;
        dateModified: string;
        isClass: boolean;
        classId: number;
        parentCategoryId: number;
    }

    interface ICurseForgeAuthor {
        id: number;
        name: string;
        url: string;
    }

    interface ICurseForgeLogo {
        id: number;
        modId: number;
        title: string;
        description: string;
        thumbnailUrl: string;
        url: string;
    }

    interface ICurseForgeHash {
        value: string;
        algo: number;
    }

    interface ICurseForgeSortableGameVersion {
        gameVersionName: string;
        gameVersionPadded: string;
        gameVersion: string;
        gameVersionReleaseDate: string;
        gameVersionTypeId: number;
    }

    interface ICurseForgeModule {
        name: string;
        fingerprint: number;
    }

    interface ICurseForgeLatestFile {
        id: number;
        gameId: number;
        modId: number;
        isAvailable: boolean;
        displayName: string;
        fileName: string;
        releaseType: number;
        fileStatus: number;
        hashes: ICurseForgeHash[];
        fileDate: string;
        fileLength: number;
        downloadCount: number;
        downloadUrl: string;
        gameVersions: string[];
        sortableGameVersions: ICurseForgeSortableGameVersion[];
        dependencies: any[];
        alternateFileId: number;
        isServerPack: boolean;
        fileFingerprint: number;
        modules: ICurseForgeModule[];
    }

    interface ICurseForgeLatestFilesIndex {
        gameVersion: string;
        fileId: number;
        filename: string;
        releaseType: number;
        gameVersionTypeId: number;
    }

    interface ICurseForgeMod {
        id: number;
        gameId: number;
        name: string;
        slug: string;
        links: ICurseForgeLink;
        summary: string;
        status: number;
        downloadCount: number;
        isFeatured: boolean;
        primaryCategoryId: number;
        categories: ICurseForgeCategory[];
        classId: number;
        authors: ICurseForgeAuthor[];
        logo: ICurseForgeLogo;
        screenshots: ICurseForgeLogo[];
        mainFileId: number;
        latestFiles: ICurseForgeLatestFile[];
        latestFilesIndexes: ICurseForgeLatestFilesIndex[];
        latestEarlyAccessFilesIndexes: any[];
        dateCreated: string;
        dateModified: string;
        dateReleased: string;
        allowModDistribution: boolean;
        gamePopularityRank: number;
        isAvailable: boolean;
        thumbsUpCount: number;
    }

    //#endregion

    //#region GitHub

    interface IGitHubRelease {
        url: string;
        assets_url: string;
        upload_url: string;
        html_url: string;
        id: number;
        author: IGitHubAuthor;
        node_id: string;
        tag_name: string;
        target_commitish: string;
        name: string;
        draft: boolean;
        prerelease: boolean;
        created_at: string;
        published_at: string;
        assets: IGitHubAsset[];
        tarball_url: string;
        zipball_url: string;
        body: string;
        reactions: IGitHubReactions;
    }

    interface IGitHubAuthor {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
    }

    interface IGitHubAsset {
        url: string;
        id: number;
        node_id: string;
        name: string;
        label: string;
        uploader: IGitHubAuthor;
        content_type: string;
        state: string;
        size: number;
        download_count: number;
        created_at: string;
        updated_at: string;
        browser_download_url: string;
    }

    interface IGitHubReactions {
        url: string;
        total_count: number;
        "+1": number;
        "-1": number;
        "laugh": number;
        "hooray": number;
        "confused": number;
        "heart": number;
        "rocket": number;
        "eyes": number;
    }

    //#endregion

    //#region GameBanana

    interface IGameBananaMod {
        _idRow: number;
        _nStatus?: string;
        _bIsPrivate?: boolean;
        _tsDateModified?: number;
        _tsDateAdded?: number;
        _sProfileUrl: string;
        _aPreviewMedia: {
            _aImages: IGameBananaMedia[];
        };
        _sCommentsMode?: string;
        _bAccessorIsSubmitter?: boolean;
        _bIsTrashed?: boolean;
        _bIsWithheld?: boolean;
        _sName: string;
        _nUpdatesCount?: number;
        _bHasUpdates?: boolean;
        _nAllTodosCount?: number;
        _bHasTodos?: boolean;
        _nPostCount: number;
        _aTags: Array<{ _sTitle: string; _sValue: string; }>;
        _bCreatedBySubmitter?: boolean;
        _bIsPorted?: boolean;
        _nThanksCount?: number;
        _sInitialVisibility: string;
        _sDownloadUrl?: string;
        _nDownloadCount?: number;
        _aFiles: IGameBananaFile[];
        _nSubscriberCount?: number;
        _aContributingStudios?: any[];
        _sLicense?: string;
        _aLicenseChecklist?: IGameBananaLicenseChecklist;
        _bGenerateTableOfContents?: boolean;
        _sText?: string;
        _bIsObsolete: boolean;
        _nLikeCount: number;
        _nViewCount: number;
        _sVersion?: string;
        _bAcceptsDonations?: boolean;
        _bShowRipePromo?: boolean;
        _aEmbeddables?: {
            _sEmbeddableImageBaseUrl: string;
            _aVariants: string[];
        };
        _aSubmitter: IGameBananaSubmitter;
        _aGame: IGameBananaGame;
        _aCategory: {
            _idRow: number;
            _sName: string;
            _sModelName: string;
            _sProfileUrl: string;
            _sIconUrl: string;
        };
        _aSuperCategory: {
            _idRow: number;
            _sName: string;
            _sModelName: string;
            _sProfileUrl: string;
            _sIconUrl: string;
        };
        _aRootCategory: IGameBananaRootCategory;
        _aCredits?: {
            _sGroupName: string;
            _aAuthors: { _sRole: string; _idRow: number; _sName: string; _sProfileUrl: string; _bIsOnline: boolean; }[];
        }[];
        _idAccessorSubscriptionRow?: number;
        _bAccessorIsSubscribed?: boolean;
        _bAccessorHasThanked?: boolean;
        _bAccessorHasUnliked?: boolean;
        _bAccessorHasLiked?: boolean;
    }

    interface IGameBananaMedia {
        _sType: string;
        _sBaseUrl: string;
        _sFile: string;
        _sFile100: string;
        _hFile100: number;
        _wFile100: number;
        _sFile220?: string;
        _hFile220?: number;
        _wFile220?: number;
        _sFile530?: string;
        _hFile530?: number;
        _wFile530?: number;
        _sCaption?: string;
    }

    interface IGameBananaSubmitter {
        _idRow: number;
        _sName: string;
        _bIsOnline: boolean;
        _bHasRipe: boolean;
        _sProfileUrl: string;
        _sAvatarUrl: string;
    }

    interface IGameBananaRootCategory {
        _sName: string;
        _sProfileUrl: string;
        _sIconUrl: string;
    }

    interface IGameBananaLicenseChecklist {
        yes: string[];
        ask: string[];
        no: string[];
    }

    interface IGameBananaFile {
        _idRow: number;
        _sFile: string;
        _nFilesize: number;
        _sDescription: string;
        _tsDateAdded: number;
        _nDownloadCount: number;
        _sAnalysisState: string;
        _sAnalysisResultCode: string;
        _sAnalysisResult: string;
        _bContainsExe: boolean;
        _sDownloadUrl: string;
        _sMd5Checksum: string;
        _sClamAvResult: string;
        _sAvastAvResult: string;
    }

    interface IGameBananaGame {
        _idRow: number;
        _sName: string;
        _sAbbreviation: string;
        _sProfileUrl: string;
        _sIconUrl: string;
        _sBannerUrl: string;
        _nSubscriberCount: number;
        _bHasSubmissionQueue: boolean;
    }


    //#endregion


    //#region 备份

    interface IArchive {
        name: string
        zipFile: string
        files: string[]
        size: number
        time: number
    }

    interface ITree {
        label: string
        filePath: string
        children?: ITree[]
    }

}

//#endregion