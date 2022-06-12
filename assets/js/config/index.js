import devConfig from './config.dev';
import testConfig from './config.test';
import prodConfig from './config.prod';

const env = process.env.NODE_ENV;

const config =
    env === 'development'
        ? devConfig
        : env === 'test'
        ? testConfig
        : prodConfig;

export default Object.assign({}, config);
