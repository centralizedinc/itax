export default {

    install(Vue) {
        Vue.mixin({
            methods: {
                deepCopy(obj) {
                    return JSON.parse(JSON.stringify(obj));
                },
                formatDate(date, type) {
                    if (!date) {
                        return "";
                    }
                    var dt = new Date(date).toLocaleString("en-US", type ? type : {
                        hour12: true,
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                    });
                    return dt;
                },
                formatDtYear(dt) {
                    var date = new Date(dt);
                    var month = date.getMonth() + 1;
                    var newDT = date.getFullYear();
                    return newDT;
                  },
                  formatDtMonth(dt) {
                    var date = new Date(dt);
                    var month = date.getMonth() + 1;
                    return month;
                  },
            },
        })
    }
}