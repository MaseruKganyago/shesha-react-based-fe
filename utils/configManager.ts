import getGlobalConfig from 'next/config';
import { addPropValidation, camelCase } from './string';
const { publicRuntimeConfig } = getGlobalConfig();

const { shaEnv }: IShaEnvAppConfig = publicRuntimeConfig;

type IShaEnvAppConfig = { shaEnv: IAppConfigManager };

const CONFIG_KEY = '__APP_CONFIG__';

const KEYS: Array<keyof IAppConfigManager> = ['baseUrl', 'googleMapsApiKey', 'appInsightsInstrumentationKey'];

export interface IAppConfigManager {
  readonly baseUrl?: string;
  readonly googleMapsApiKey?: string;
  readonly appInsightsInstrumentationKey?: string;
}
//nextCOnfig
const defaultConfig: IAppConfigManager = {
  baseUrl: '',
  googleMapsApiKey: 'AIzaSyAQv3UvXzYNUlwB-0LCuS7toLdl_z1j2l8',
  appInsightsInstrumentationKey: null,
};

export default class ConfigManager {
  private devConfig: IAppConfigManager = { ...addPropValidation(camelCase(shaEnv), KEYS) };

  getConfig(): IAppConfigManager {
    try {
      if (process.env.NODE_ENV !== 'production' && !this.devConfig?.baseUrl) {
        if (window) {
          this.devConfig = window[CONFIG_KEY];
        } else {
          this.devConfig = defaultConfig;
        }
      }

      return process.env.NODE_ENV === 'production' ? window[CONFIG_KEY] : this.devConfig;
    } catch (error) {
      return defaultConfig;
    }
  }
}
