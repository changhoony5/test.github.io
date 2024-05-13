// sendMessageToUnity.js
function sendMessageToUnity(unityInstance, message) {
    unityInstance.SendMessage('GameObjectName', 'MethodName', message);
}
