import { boot } from 'quasar/wrappers';
import Tres, { templateCompilerOptions } from '@tresjs/core';

export default boot(async ({ app }) => {
  console.log('Initializing Tres');
  app.use(Tres);
});
