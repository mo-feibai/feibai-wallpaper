import {request} from "@utils/request";

// 获取每日一图
export const reqTodayPic = () =>
    request.get('/api/api.php', {fl:'suiji', gs: 'json'});

// 获取360壁纸所有类型
export const reqAllCategories = () => {
    return  request.get('/pic/index.php', {c:"WallPaperAndroid",a:"getAllCategories"});
}

// 获取360壁纸某种类型指定数量的壁纸
export const reqWallpapersByCategory = (cid,start,count) => {
    return  request.get('/pic/index.php', {c:"WallPaperAndroid",a:"getAppsByCategory",cid,start,count});
}

// 获取一言
export const reqOneWord = () => {
    return  request.get('/word');
}