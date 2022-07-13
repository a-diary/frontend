import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import { router } from "./router";
import { store } from "./store";
import Moment from "@/plugins/moment";
import "ant-design-vue/dist/antd.css";
import "./assets/scss/style.scss";

const app = createApp(App);

app.use(Antd).use(router).use(store).use(Moment).mount("#app");
