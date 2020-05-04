/// <reference types="node" />
import { ChildProcess } from 'child_process';
import { Config } from './config';
export declare class BlockingProxyRunner {
    private config;
    bpProcess: ChildProcess;
    port: number;
    constructor(config: Config);
    start(): Promise<{}>;
    checkSupportedConfig(): void;
}
