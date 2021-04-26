function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    console.log("query", query)
    var vars = query.split("&");

    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}
export default getQueryVariable;