/**
 *  This is a base driver provider class.
 *  It is responsible for setting up the account object, tearing
 *  it down, and setting up the driver correctly.
 */
import { WebDriver } from 'selenium-webdriver';
import { Config } from '../config';
export declare abstract class DriverProvider {
    drivers_: WebDriver[];
    config_: Config;
    private bpRunner;
    constructor(config: Config);
    /**
     * Get all existing drivers.
     *
     * @public
     * @return array of webdriver instances
     */
    getExistingDrivers(): WebDriver[];
    getBPUrl(): string;
    /**
     * Create a new driver.
     *
     * @public
     * @return a promise to a webdriver instance
     */
    getNewDriver(): Promise<WebDriver>;
    /**
     * Quit a driver.
     *
     * @public
     * @param webdriver instance
     */
    quitDriver(driver: WebDriver): Promise<void>;
    /**
     * Quits an array of drivers and returns a q promise instead of a webdriver one
     *
     * @param drivers {webdriver.WebDriver[]} The webdriver instances
     */
    static quitDrivers(provider: DriverProvider, drivers: WebDriver[]): Promise<void>;
    /**
     * Default update job method.
     * @return a promise
     */
    updateJob(update: any): Promise<any>;
    /**
     * Default setup environment method, common to all driver providers.
     */
    setupEnv(): Promise<any>;
    /**
     * Set up environment specific to a particular driver provider. Overridden
     * by each driver provider.
     */
    protected abstract setupDriverEnv(): Promise<any>;
    /**
     * Teardown and destroy the environment and do any associated cleanup.
     * Shuts down the drivers.
     *
     * @public
     * @return {Promise<any>} A promise which will resolve when the environment is down.
     */
    teardownEnv(): Promise<any>;
}
