import {
  Button,
  Carousel,
  Card,
  List,
  Spin,
  Message,
  Alert,
  Select
} from "ant-design-vue";

const antComponentsArr = [
  Button,
  Carousel,
  Card,
  List,
  Spin,
  Message,
  Alert,
  Select
];

export default {
  install(Vue) {
    antComponentsArr.forEach(Component => Vue.use(Component));
  }
};
