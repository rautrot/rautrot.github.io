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
  for(var i = 1;i < arr.length; i++){
    if(arr[i][0] === "" || arr[i-1][0] === "")continue;
    arr[i].push(parseInt("0"));
  }
  //ファイル名などを記述する行を追加
  arr.unshift(["","Sumation"]);

  var chr = ''; //データ格納用
  var jud = true; //比較判定用
  var reader = new FileReader();
  // 検索処理

  /*
  検索の仕方
  「""('')内外す」，「コメント内外す」
  */
  //選択された全ファイルを処理する
  
  for(var i = 0;i < files.length;i++){
  //列を一列増やす
  for(var n = 2;n < arr.length; n++){
    if(arr[n][0] === "" || arr[n-1][0] === "")continue;
    arr[n].push(parseInt("0"));
  }
    //ファイル名の追加

    arr[0].push(files[i].name);
    //ファイルの中身を引き出し，chrに格納
    reader.readAsText(files[i],'UTF-8');

    //この関数が動作する前に一度ループが終わっているのでiが1になる
    reader.addEventListener("load", function (e) {
      chr = reader.result;

      for (var j = 1;j < arr.length;j++){
        //属性と空白行は飛ばす
        if(arr[j][0] === "" || arr[j-1][0] === "")continue;

        //tjsファイルに一文字ずつアクセス
        for(var k = 1;k < chr.length;k++){

          //クォーテーション内をスキップする処理
          if(chr.charAt(k) === "\"" && chr.charAt(k-1) !== "\\"){
            k++;
            while(1){
              if(chr.charAt(k) === "\""){
                if(chr.charAt(k-1) !== "\\")break;
              }
              k++;
            }
          }

          //コメント内をスキップする処理
          if(chr.charAt(k) === "/"){
            if(chr.charAt(k+1) === "/"){
              for(k;chr.charAt(k) !== "\n";k++);
            }else if(chr.charAt(k+1) === "*"){
              //ネストの数を確認する
              k++;
              var cnt = 1;
              for(k;cnt !== 0;k++){
                if(chr.charAt(k) === "/" && chr.charAt(k+1) === "*"){
                  cnt++;
                }
                if(chr.charAt(k-1) === "*" && chr.charAt(k) === "/"){
                  cnt--;
                }
              }
            }
          }

          //tjsファイル内に同じ文字列があったらインクリメント
          if(arr[j][0].charAt(0) === chr.charAt(k)){
            jud = true;
            for(var m=0;m < arr[j][0].length;m++){
              if(arr[j][0].charAt(m) !== chr.charAt(k+m)){
                jud = false;
              }
            }
            if(jud === true){
              arr[j][i+1]++;
            }
          }
        }
      }

      //sumationを計算
      for(var n = 1;n < arr.length;n++){
        if(arr[n][0] == "" || arr[n-1][0] == "")continue;
        for(var m = 2;m < arr[n].length;m++){
          arr[n][1] += arr[n][m];
        }
      }
      
  // ,(カンマ)はcsv形式で扱うため全角に変更
  arr[20][0] = "，";
      //arrを空白行で分けてsortする(バブルソート)
      var num = 2;
      for(var l = 2;l < arr.length;l++){
        if(arr[l][0] === ""){
          for(var j = num;j < l;j++){
            for(var k = num;k < l-(j-num)-1;k++){
              if(arr[k][1] < arr[k+1][1]){
                var tmpArray;
                tmpArray = arr[k];
                arr[k] = arr[k+1];
                arr[k+1] = tmpArray;
              }

            }
          }

          l += 2;
          num = i;
        }
      }
      

createCSV(arr); //arrは最終的な二次元配列
});
}
}




//csvファイルを作成する関数
function createCSV(arr) {
  var i = 0;
  var tmp ='';

  // 指定されたデータを保持するBlobを作成する。
  for(var i = 0;i < arr.length;i++){
    tmp += (arr[i].toString() + '\n');
  }
  console.log(tmp);

  var blob = new Blob([ tmp ], { "type" : "application/x-msdownload" });


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
