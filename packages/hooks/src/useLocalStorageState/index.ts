import createUseLocalStorageState from './createUseLocalStorageState';

export default createUseLocalStorageState(() => window.localStorage);
