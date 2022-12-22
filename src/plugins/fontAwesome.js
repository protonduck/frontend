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
  faDownload,
  faPlus,
  faClose,
  faTrash,
  faPen,
  faSpinner,
  faBook,
  faChartPie,
  faBuildingColumns,
  faGamepad,
  faMusic,
  faPercent,
  faVideo,
  faWallet,
  faShareNodes,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';

export default {
  install: (app) => {
    library.add(
      faHeart,
      faEnvelope,
      faKey,
      faRightToBracket,
      faHome,
      faUserPlus,
      faUser,
      faDownload,
      faPlus,
      faClose,
      faTrash,
      faPen,
      faSpinner,
      faBook,
      faChartPie,
      faBuildingColumns,
      faGamepad,
      faMusic,
      faPercent,
      faVideo,
      faWallet,
      faShareNodes,
      faPenToSquare
    );
    app.component('font-awesome-icon', FontAwesomeIcon);
  },
};
