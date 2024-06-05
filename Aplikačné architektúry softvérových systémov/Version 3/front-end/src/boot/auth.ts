import { boot } from 'quasar/wrappers';

declare module 'vue-router' {}

// this boot file wires together authentication handling with router
export default boot(() => {});
