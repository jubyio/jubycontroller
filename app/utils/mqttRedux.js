import * as mqtt from './browserMqtt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { publish } from 'rxjs/operators/publish';


var mqttClient

export const init = () => {
    debugger;
    mqttClient = mqtt.connect({ hostname: '192.168.0.1', keepalive: 60 })
    mqttClient.on('connect', () => {
        debugger;
        mqttClient.subscribe('DIGI/PING');
        mqttClient.publish('DIGI/INIT', 'c');
        console.log('connect');
    });

    mqttClient.on('message', (topic, payload) => {
        if (topic === 'DIGI/PING') {
            setTimeout(() => {
                mqttClient.publish('DIGI/PONG', 'c')
            }, 5000)

        }
    });

    return Observable.of(true);
}

export const close = () => {
    let publishObs = Observable.bindCallback(mqttClient.publish);
    return publishObs('DIGI/STOP', '')
}

export const sendCommand = (command) => {

    let publishObs = Observable.bindCallback(mqttClient.publish);
    return publishObs(`DIGI/${command.name}`, command.value);

}


