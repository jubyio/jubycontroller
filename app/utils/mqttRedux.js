import * as mqtt from './browserMqtt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/bindCallback';
import 'rxjs/add/observable/fromPromise';
import { publish } from 'rxjs/operators/publish';


var mqttClient

export const init = () => {
    mqttClient = mqtt.connect('ws://192.168.0.1:1883');
    mqttClient.on('connect', () => {
        mqttClient.subscribe('DIGI/PING');
        mqttClient.publish('DIGI/INIT', 'c');
        console.log('connect');
    });

    mqttClient.on('message', (topic, payload) => {
        if (topic === 'DIGI/PING') {
            debugger;
            setTimeout(() => {
                mqttClient.publish('DIGI/PONG', 'c')
            }, 5000)

        }
    });

    mqttClient.on('error', (err) => {
        debugger;
        console.error(err);
    })

    mqttClient.on('close', () => {
        console.log('close');
    })

    return Observable.of(true);
}

export const close = () => {
    let publishObs = Observable.bindCallback(mqttClient.publish);
    mqttClient.end(true)
    return publishObs('DIGI/STOP', '')
}

export const sendCommand = (topic, value) => {
    return Observable.fromPromise(new Promise((resolve, reject) => {
        mqttClient.publish(`DIGI/${topic}`, value, { qos: 0 }, (err) => {
            if (err == null) {
                resolve(true);
            }
            else {
                console.error(err);
                reject(false);
            }
        })
    }))
    //mqttClient.publish(`DIGI/${topic}`, value, null, null);
    // let publishObs = Observable.bindCallback(mqttClient.publish);
    // return publishObs(`DIGI/${topic}`, value, null)
}


