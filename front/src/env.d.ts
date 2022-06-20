/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    // VUE_APP_VERSION_API: '1.0.1';
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}
