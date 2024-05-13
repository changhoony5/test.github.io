// httpManager.js
function performHttpGet(unityInstance){
    var address = document.getElementById('addressInput').value;
    setTimeout(function () {
        unityInstance.SendMessage('JSCommunicationManager', 'ReceiveMessage', 'Hello World');
        fetch(address)
            .then(response => response.text())
            .then(data => {
                updateUI(data);
                unityInstance.SendMessage('JSCommunicationManager', 'ReceiveDataFromHttpGet', data);
            })
            .catch(error => {
                unityInstance.SendMessage('JSCommunicationManager', 'ErrorFetchingData', error.toString());
            });
    }, 1000);
}
// 외부에서 HttpManager.PerformHttpGet() 메서드를 호출하여 사용할 수 있습니다.
