

const generateId = () => {
    return '' + new Date().getTime() +
        Math.random().toString(36).substring(2, 9);
};

class Client {
    constructor(clientId) {
        this.clientId = clientId;
        this.positionDecisecond = 0;
        this.isPlaying = false;
    }
}

class ClientManager {
    constructor() {
        this.clients = {};
        this.masterId = undefined;
    }

    registerClient() {
        const newId = generateId();
        this.clients[newId] = new Client(newId);

        // The first client is the master
        if (Object.keys(this.clients).length === 1) {
            this.clients[newId].master = true;
            this.masterId = newId;
        }

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

    setClientIsPlaying(clientId, isPlaying) {
        this.clients[clientId].isPlaying = isPlaying;
    }

    getPositionFromMaster() {
        return this.clients[this.masterId].positionDecisecond;
    }

    getIsMasterPlaying() {
        return this.clients[this.masterId].isPlaying;
    }
}

export default ClientManager;