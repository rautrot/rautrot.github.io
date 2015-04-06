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

  xhr.open("GET", fileName, true);
  xhr.send(null);

  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
      serch(xhr.responseText, files);
    }
  }
}


//配列を一列増やす関数
/*
function addLine(arr){
  for(var i = 0;i < arr.length; i++){
    arr[i].push(0);
  }
  console.log(arr);
}*/


//リストと比較して頻度を求め，他の関数に渡す
function serch(list, files){
  var tmp = list.split('\n');

  //２次元配列の用意
  var arr = [];
  for(var i = 0;i < tmp.length; i++){
    arr[i] = new Array(tmp[i]);
  }
  for(var i = 0;i < arr.length; i++){
    arr[i].push(0);
  }
  console.log(arr);

  //ファイル名などを記述する行を追加
  arr.unshift(['','Sumation']);

  var chr = ''; //データ格納用
  var jud = true; //比較判定用
  var reader = new FileReader();
  reader.onload = function(){
    chr = reader.result;
  }
  // 検索処理
  console.log(files[0].name);

  /*
  検索の仕方
  「""('')内外す」，「コメント内外す」，「関数名+(」，「ステートメント名+(」，
  「（クラス名）.メソッド名」，「プリプロセッサ」，
  「var変数(空白or=で判定)の中にある項などを見つけ次第デクリメント」
  */
  //選択された全ファイルを処理する

  
  for(var i = 0;files[i] !== null;i++){
  //列を一列増やす
  for(var n = 0;n < arr.length; n++){
    arr[n].push(0);
  }
    //ファイル名の追加
    arr[0].push(files[i].name);

    //ファイルの中身を引き出し，chrに格納
    reader.readAsText(files[i],'UTF-8');

    console.log(chr.charAt(0));
    for (var j = 0;arr[j] !== null;j++){
        //tjsファイルに一文字ずつアクセス
        for(var k = 0;chr.charAt(k) !== null;k++){

          //tjsファイル内に同じ文字列があったらインクリメント
          if(arr[j][0].charAt(0) === chr.charAt(lk)){
            jud = true;
            for(var m=0;arr[j][0].charAt(m) !== '\n';m++){
              if(arr[j][0].charAt(m) !== chr.charAt(k+m)){
                jud = false;
              }
            }
            if(jud === true){
              arr[j][i+2]++;
            }
          }
        }
      }
    }
createCSV(arr); //arrは最終的な二次元配列
}




//csvファイルを作成する関数
function createCSV(arr) {
  var i = 0;
  var tmp ='';
  // 指定されたデータを保持するBlobを作成する。
  for(var i = 0;i < arr.length;i++){
    tmp += (arr[i].toString() + '\n');
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
