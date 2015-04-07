/**
    WEBADV-19
    https://webadv.backlog.jp/view/WEBADV-19
    ｔｊｓのスクリプト等のリストを作成する

    作成者 : rautrot
    作成日 : 2015/04/07 

    最終更新者 : rautrot
    最終更新日 : 2015/04/07
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
function loadList(_fileName, _files) {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", _fileName, true);
  xhr.send(null);

  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
      serch(xhr.responseText, _files);
    }
  }
}

//リストと比較して頻度を求め，他の関数に渡す
function serch(_list, _files){
  var tmp = _list.split('\n');

  //２次元配列の用意
  var arr = [];
  for(var i = 0;i < tmp.length; i++){
    arr[i] = new Array(tmp[i]);
  }
  for(var i = 1;i < arr.length; i++){
    if(arr[i][0] === "" || arr[i-1][0] === ""){
      continue;
    }
    arr[i].push(parseInt("0"));
  }
  //ファイル名などを記述する行を追加
  arr.unshift(["","Sumation"]);

  var chr = ''; //データ格納用
  var jud = true; //比較判定用


  for(var i = 0,f;f = _files[i];i++){

    var reader = new FileReader();

    reader.readAsText(_files[i],"UTF-8");

    //ファイル読み込みが完了するまで待機
    while(reader.readyState !== 2){}
    chr = reader.result;
    console.log(chr);
    
      /*
    reader.addEventListener("onload", function (e) {

      //列を一列増やす
      for(var n = 2;n < arr.length; n++){
        if(arr[n][0] === "" || arr[n-1][0] === ""){
          continue;
       }
        arr[n].push(parseInt("0"));
      }

      //ファイル名の追加
      arr[0].push(_files[i].name);
      chr = reader.result;

      for (var j = 1;j < arr.length;j++){
        
        //属性と空白行は飛ばす
        if(arr[j][0] === "" || arr[j-1][0] === ""){
          continue;
        }

        //tjsファイルに一文字ずつアクセス
        for(var k = 1;k < chr.length;k++){
          
          //クォーテーション内をスキップする処理
          if(chr.charAt(k) === "\"" && chr.charAt(k-1) !== "\\"){
            k++;
            while(1){
              if(chr.charAt(k) === "\""){
                if(chr.charAt(k-1) !== "\\"){
                  break;
                }
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
              arr[j][i+2]++;
            }
          }
        }
      }
      createCSV(arr);
    });*/
    }
}

//csvファイルを作成する関数
function createCSV(_arr) {
  var i = 0;
  var tmp ='';

  //sumationを計算
  for(var n = 1;n < _arr.length;n++){
    if(_arr[n][0] == "" || _arr[n-1][0] == ""){
      continue;
    }
    for(var m = 2;m < _arr[n].length;m++){
     _arr[n][1] += _arr[n][m];
    }
  }      

  // ,(カンマ)はcsv形式で扱うため文字に変更
  _arr[20][0] = "カンマ";

  //arrを空白行で分けてsortする(バブルソート)
  var num = 2;
  for(var l = 2;l < _arr.length;l++){
    if(_arr[l][0] === ""){
      for(var j = num;j < l;j++){
        for(var k = num;k < l-(j-num)-1;k++){
          if(_arr[k][1] < _arr[k+1][1]){
            var tmpArray;
            tmpArray = _arr[k];
            _arr[k] = _arr[k+1];
            _arr[k+1] = tmpArray;
          }

        }
      }
      l += 2;
      num = i;
    }
  }

  //指定されたデータを保持するBlobを作成する
  for(var i = 0;i < _arr.length;i++){
    tmp += (_arr[i].toString() + '\n');
  }
  console.log(tmp);

  var blob = new Blob([ tmp ], { "type" : "application/x-msdownload" });


  //Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
  window.URL = window.URL || window.webkitURL;
  $("#download").attr("href", window.URL.createObjectURL(blob));
  $("#download").attr("download", "tjslist.txt"); //ファイル名の指定
}



