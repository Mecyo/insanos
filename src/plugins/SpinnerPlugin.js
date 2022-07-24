/* eslint-disable no-param-reassign */

/**
 * Plugin responsável por controlar a exibição do component PrLoader
 */
export default {
  install(Vue) {
    const plugin = new Vue({
      data() {
        return {
          visible: false,
        };
      },
      methods: {
        show() {
          this.visible = true;
        },
        hide() {
          this.visible = false;
        },
      },
    });

    Vue.$spinner = plugin;
    Vue.prototype.$spinner = plugin;
  },
};
