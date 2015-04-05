/*
loadList()は実装済み
createCSV()は実装済み（細かい変更必須）

serch()は未実装





undefined === null
*/

//htmlの読み込みの終了時に動作する関数
$(function() {

  if (typeof Blob !== "undefined") {
    // alert('このブラウザに対応しています');
  } else {
    alert('このブラウザには対応していません');
  }


});

//csvを読み込み他の関数に渡す
function loadList(fileName, files) {
  var xhr = new XMLHttpRequest();


  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
      serch(xhr.responseText, files);
    }
  }
  xhr.open("GET", fileName, true);
  xhr.send(null);
}



//リストと比較して頻度を求め，他の関数に渡す
function serch(list, files){
  var arr = list.split("\n");

  // 検索処理
  console.log(files[0].name);










  arr = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15]]; //動作確認用
  createCSV(arr); //arrは最終的な二次元配列
}

//配列を一列増やす関数
function addLine(array){
  var i = 0;
  while(array[i] != null){
    array[i].push(0);
    i++;
  }
}


//csvファイルを作成する関数
function createCSV(arr) {
  var i = 0;
  var tmp ='';
  // 指定されたデータを保持するBlobを作成する。
  while(arr[i] != null){
    tmp += arr[i].toString() + '\n';
    i++;
  }
  var blob = new Blob([ tmp ], { "type" : "application/x-msdownload" });

  console.log(tmp);


  // Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
  window.URL = window.URL || window.webkitURL;
  $("#download").attr("href", window.URL.createObjectURL(blob));
  $("#download").attr("download", "tjslist.txt"); //ファイル名の指定
}

/*
var obj1 = document.getElementById("files");

document.getElementById("files").addEventListener('change',function(evt){
var file = evt.target.files;
var num = file.length;

for (var i = 0; i < num ; i++ )
{
console.log(file[i].name);
}
var reader = new FileReader();
reader.readAsText(file[0],'UTF-8');
if(file[1] != null){  //file[i]ではi番のファイルの有無をnullかどうかで確認できる
reader.onload = function(){
console.log(file[0]);
console.log(file[1]);
}
}
else{
console.log('Second file is not selected!');
}

},false);
*/
