// plugins/fontawesome.js
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

export default {
  install: (app) => {
    app.component("FontAwesomeIcon", FontAwesomeIcon);
  },
};
