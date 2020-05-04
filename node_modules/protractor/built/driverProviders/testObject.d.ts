import { Config } from '../config';
import { DriverProvider } from './driverProvider';
export declare class TestObject extends DriverProvider {
    constructor(config: Config);
    /**
     * Configure and launch (if applicable) the object's environment.
     * @return {Promise} A promise which will resolve when the environment is
     *      ready to test.
     */
    protected setupDriverEnv(): Promise<any>;
}
