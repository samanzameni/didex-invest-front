import { SeleniumServer } from 'selenium-webdriver/remote';
import { Config } from '../config';
import { DriverProvider } from './driverProvider';
export declare class Local extends DriverProvider {
    server_: SeleniumServer;
    constructor(config: Config);
    /**
     * Helper to locate the default jar path if none is provided by the user.
     * @private
     */
    addDefaultBinaryLocs_(): void;
    /**
     * Configure and launch (if applicable) the object's environment.
     * @public
     * @return {Promise} A promise which will resolve when the environment is
     *     ready to test.
     */
    setupDriverEnv(): Promise<any>;
}
