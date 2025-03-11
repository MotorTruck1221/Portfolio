import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGithub, faTwitter, faDiscord, faBluesky, faReddit, faSignalMessenger } from '@fortawesome/free-brands-svg-icons';
import { faRightLong, faRss, faEnvelope } from "@fortawesome/free-solid-svg-icons";

//@ts-expect-error This *is* correct upstream type issue ;D
library.add(faGithub, faTwitter, faDiscord, faRightLong, faRss, faBluesky, faReddit, faEnvelope, faSignalMessenger);
config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
});
