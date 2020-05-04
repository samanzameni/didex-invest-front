import { WebDriver } from 'selenium-webdriver';
import { Config } from '../config';
import { DriverProvider } from './driverProvider';
export declare class AttachSession extends DriverProvider {
    constructor(config: Config);
    /**
     * Configure and launch (if applicable) the object's environment.
     * @return {Promise} A promise which will resolve when the environment is
     *     ready to test.
     */
    protected setupDriverEnv(): Promise<any>;
    /**
     * Getting a new driver by attaching an existing session.
     *
     * @public
     * @return {WebDriver} webdriver instance
     */
    getNewDriver(): Promise<WebDriver>;
    /**
     * Maintains the existing session and does not quit the driver.
     *
     * @public
     */
    quitDriver(): Promise<void>;
}
