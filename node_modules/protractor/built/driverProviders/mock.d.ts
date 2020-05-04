import { WebDriver } from 'selenium-webdriver';
import { Config } from '../config';
import { DriverProvider } from './driverProvider';
export declare class MockExecutor {
    execute(_: any): any;
}
export declare class Mock extends DriverProvider {
    constructor(config?: Config);
    /**
     * An execute function that returns a promise with a test value.
     */
    execute(): Promise<any>;
    /**
     * Configure and launch (if applicable) the object's environment.
     * @public
     * @return {Promise} A promise which will resolve immediately.
     */
    protected setupDriverEnv(): Promise<any>;
    /**
     * Create a new driver.
     *
     * @public
     * @override
     * @return webdriver instance
     */
    getNewDriver(): Promise<WebDriver>;
}
