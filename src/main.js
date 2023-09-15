import { web } from './application/web.js';
import { logger } from './application/logging.js';

web.listen(3000, () => {
  logger.info('Server is listening on port http://localhost:3000');
});
