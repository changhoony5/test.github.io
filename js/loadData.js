
// httpManager.js
function loadData(unityInstance) {
    var request = indexedDB.open("UnityDB", 1);
    request.onsuccess = function(event) {
        var db = event.target.result;
        var transaction = db.transaction(["dates"], "readonly");
        var objectStore = transaction.objectStore("dates");
        var allRecords = objectStore.getAll();
        allRecords.onsuccess = function() {
            var allData = JSON.stringify(allRecords.result);
            unityInstance.SendMessage('JSCommunicationManager', 'ReceiveDataFromJS', allData);
        };
    };
}
// 외부에서 HttpManager.PerformHttpGet() 메서드를 호출하여 사용할 수 있습니다.
