/*
 * @Author: qinuoyun
 * @Date:   2021-04-17 14:28:55
 * @Last Modified by:   qinuoyun
 * @Last Modified time: 2021-04-21 10:43:38
 */
function resourceUrl(action, siteInfo, type = false) {
    var url = siteInfo.siteroot + '?r=wechat&i=' + siteInfo.uniacid + '&t=' + siteInfo.multiid + '&v=' + siteInfo.version + '&m=lead_shop&';
    if (action) {
        action = action.split('/');
        if (action[0]) {
            url += 'c=' + action[0] + '&';
        }
        if (action[1]) {
            url += 'a=' + action[1] + '&';
        }
        if (action[2]) {
            url += 'do=' + action[2] + '&';
        }
    }
    if (type) {
        return url;
    } else {
        return url + "q=";
    }
}

export default resourceUrl;