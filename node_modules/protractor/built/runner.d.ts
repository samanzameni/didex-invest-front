/// <reference types="node" />
import { EventEmitter } from 'events';
import { ProtractorBrowser } from './browser';
import { Config } from './config';
import { DriverProvider } from './driverProviders';
import { Plugins } from './plugins';
export declare class Runner extends EventEmitter {
    config_: Config;
    preparer_: any;
    driverprovider_: DriverProvider;
    o: any;
    plugins_: Plugins;
    restartPromise: Promise<any>;
    frameworkUsesAfterEach: boolean;
    ready_?: Promise<void>;
    constructor(config: Config);
    /**
     * Registrar for testPreparers - executed right before tests run.
     * @public
     * @param {string/Fn} filenameOrFn
     */
    setTestPreparer(filenameOrFn: string | Function): void;
    /**
     * Executor of testPreparer
     * @public
     * @param {string[]=} An optional list of command line arguments the framework will accept.
     * @return {Promise} A promise that will resolve when the test preparers
     *     are finished.
     */
    runTestPreparer(extraFlags?: string[]): Promise<any>;
    /**
     * Called after each test finishes.
     *
     * Responsible for `restartBrowserBetweenTests`
     *
     * @public
     * @return {Promise} A promise that will resolve when the work here is done
     */
    afterEach(): Promise<void>;
    /**
     * Grab driver provider based on type
     * @private
     *
     * Priority
     * 1) if directConnect is true, use that
     * 2) if seleniumAddress is given, use that
     * 3) if a Sauce Labs account is given, use that
     * 4) if a seleniumServerJar is specified, use that
     * 5) try to find the seleniumServerJar in protractor/selenium
     */
    loadDriverProvider_(config: Config): void;
    /**
     * Responsible for cleaning up test run and exiting the process.
     * @private
     * @param {int} Standard unix exit code
     */
    exit_(exitCode: number): Promise<number>;
    /**
     * Getter for the Runner config object
     * @public
     * @return {Object} config
     */
    getConfig(): Config;
    /**
     * Sets up convenience globals for test specs
     * @private
     */
    setupGlobals_(browser_: ProtractorBrowser): void;
    /**
     * Create a new driver from a driverProvider. Then set up a
     * new protractor instance using this driver.
     * This is used to set up the initial protractor instances and any
     * future ones.
     *
     * @param {Plugin} plugins The plugin functions
     * @param {ProtractorBrowser=} parentBrowser The browser which spawned this one
     *
     * @return {Protractor} a protractor instance.
     * @public
     */
    createBrowser(plugins: any, parentBrowser?: ProtractorBrowser): Promise<any>;
    /**
     * Final cleanup on exiting the runner.
     *
     * @return {Promise} A promise which resolves on finish.
     * @private
     */
    shutdown_(): Promise<void>;
    /**
     * The primary workhorse interface. Kicks off the test running process.
     *
     * @return {Promise} A promise which resolves to the exit code of the tests.
     * @public
     */
    run(): Promise<number>;
}
