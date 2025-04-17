

const generateId = () => {
    return '' + new Date().getTime() +
        Math.random().toString(36).substring(2, 9);
};

class Client {
    constructor(clientId) {
        this.clientId = clientId;
        this.positionDecisecond = 0;
    }
}

class ClientManager {
    constructor() {
        this.clients = {};
    }

    registerClient() {
        const newId = generateId();
        this.clients[newId] = new Client(newId);
        return newId;
    }

    hasClient(clientId) {
        return (clientId in this.clients);
    }

    getClient(clientId) {
        if (this.hasClient(clientId)) {
            return this.clients[clientId];
        }
        return null;
    }

    setClientPosition(clientId, positionDecisecond) {
        this.clients[clientId].positionDecisecond = positionDecisecond;
        console.log('Setting position for ' + clientId + ' to ' + positionDecisecond);
    }
}

export default ClientManager;