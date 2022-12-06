import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHeart,
  faEnvelope,
  faKey,
  faRightToBracket,
  faHome,
  faUserPlus,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export default {
  install: (app) => {
    library.add(faHeart, faEnvelope, faKey, faRightToBracket, faHome, faUserPlus, faUser);
    app.component('font-awesome-icon', FontAwesomeIcon);
  },
};
