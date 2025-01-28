import { runSeeders } from 'typeorm-extension';
import { appDataSource } from './data-source';

appDataSource.initialize().then(async () => {
  await runSeeders(appDataSource);
  process.exit();
});
