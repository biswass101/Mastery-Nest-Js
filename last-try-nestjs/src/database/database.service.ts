import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
    private isConnected = false;

    onModuleInit() {
        this.isConnected = true;
        console.log("Database is Connected!");
    }

    onApplicationShutdown(signal: string) {
        this.isConnected = false;
        console.log("Database is disconnected due to shutdown. ", "Signal: ", signal);
    }

    getStatus() {
        return this.isConnected ? 'Connected' : 'Disconnected';
    }
}
