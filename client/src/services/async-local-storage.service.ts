export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    saveToStorage,
    loadFromStorage,
};

interface Entity { 
    _id : string
    username? :string
}

function query(entityType, delay = 1) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || [];
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(entities);
        }, delay);
    });
}

function get(entityType , entityId) {
    return query(entityType).then((entities : Entity[]) => entities.find((entity) => entity._id === entityId));
    // return query(entityType).then((entities : Array<Entity>) => entities.find((entity) => entity._id === entityId));
}

function post(entityType : string, newEntity) {
    newEntity._id = _makeId();
    return query(entityType).then((entities : Entity[]) => {
        const isExists = (entities).find(entity => {
            return entity.username === newEntity.username
        })
        if (isExists) {
            console.log('Already excits, probably trying to sign up guest again')
            throw new Error
        }
        entities.push(newEntity);
        _save(entityType, entities);
        return newEntity;
    });
}

function put(entityType, updatedEntity) {
    return query(entityType).then((entities : Entity[]) => {
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id);
        entities.splice(idx, 1, updatedEntity);
        _save(entityType, entities);
        return updatedEntity;
    });
}

function remove(entityType, entityId) {
    return query(entityType).then((entities : Entity[]) => {
        const idx = entities.findIndex(entity => entity._id === entityId);
        entities.splice(idx, 1);
        _save(entityType, entities);
    });
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities));
}

function _makeId(length = 5) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val);
}