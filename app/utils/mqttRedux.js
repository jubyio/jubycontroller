import { connect } from 'mqtt';
import { Observable } from 'rxjs/Observable';
import { publish } from 'rxjs/operators/publish';

export default class MqttRedux {

    constructor(config) {
        this.serverUri = config.serverUri || 'ws://192.168.0.1';
        this.client = null;
    }

    init() {
        this.client = connect([{ host: '192.168.0.1', keepalive: 60, protocolId: 'WS' }])
        this.client.on('connect', () => {
            this.client.subscribe('DIGI/PING');
            this.client.publish('DIGI/START', 'c')
        });

        this.client.on('message', (topic, payload)=>{

        });
    }

    close() {
        this.client.publish('DIGI/STOP')
    }

    sendCommand(command) {
        
        let publishObs = Observable.bindCallback(this.client.publish);
        return publishObs(`DIGI/${command.name}`, command.value);
        
    }


}