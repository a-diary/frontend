import moment from "moment";
import "moment/dist/locale/zh-cn";
moment.locale("zh-cn");

export default {
    install(app) {
        app.config.globalProperties.$moment = moment;
    },
};
