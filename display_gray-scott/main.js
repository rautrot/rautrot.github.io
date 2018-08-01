// TODO
// データ数に応じた描画処理
//    一列にn個->一マス1000/nの大きさ
// ファイル入力処理
//    先頭においちゃう？

document.forms.id_form1.id_textBox1.value = "1,0,0,2,0,1\n0,1,3,0,1,0\n1,0,1,0,2,0";

var WIDTH = 1500; // キャンバスの横幅
var HEIGHT = 1500; // キャンバスの高さ
var L = 0; //数値の最大値を格納

// ファイル入力フォーム
var form = document.forms.f_input;

// Webページ読み込み時
onload = function() {

  // カラーサンプル
  var ctx1 = document.getElementById('colorsample').getContext('2d');
  //黒から緑まで
  var i;
  for(i=0;i<400;i++){
    ctx1.fillStyle='rgb(' + Math.ceil(i/4) + ',' + Math.ceil(2*i/4) + ',' + Math.ceil(i/4) + ')';
    ctx1.fillRect(i+25,0,4,30);
  }
  //文字の表示
  ctx1.fillStyle=('rgb(0,0,0)');
  ctx1.font = "20px 'ＭＳ　ゴシック'";
  ctx1.fillText('0',0,20,50);
  ctx1.fillText('L',435,20,50);

  // キャンバスの初期化
  var ctx = document.getElementById('canvassample').getContext('2d');
  ctx.fillStyle='rgb(100,100,100)';
  ctx.fillRect(0,0,WIDTH,HEIGHT);


};

// ファイルが入力されたときの処理
form.input_file.addEventListener('change', function(e){
  var file = e.target.files[0];

  var reader = new FileReader();

  //読み込んだファイルの中身を取得する
  reader.readAsText(file);

  //ファイルの中身を取得後に処理を行う
  reader.addEventListener( 'load', function() {

    // 要素数の変数の宣言
    var X_num, Y_num;

    // 要素数の確認
    var data;
    data = reader.result.split("\n");
    if(data[0][data.length-1] == ","){ // 最後の文字がカンマになってるときは最後のカンマを消す
      data[0] = data[0].slice(0,data.length-1);
    }
    X_num = data[0].split(",").length;

    if(data.indexOf("") != -1){
      data.pop;
    }
    Y_num = data.length;

    document.forms.id_form1.id_textBox1.value = reader.result;

    // バイナリデータの配列へ入力と最大値の取得
    var binary_data = new Array();
    for(i=0;i<Y_num;i++){
        binary_data[i] = new Array();
        tmp_data_array = data[i].split(",");
        for(j=0;j<X_num;j++){
            binary_data[i][j] = tmp_data_array[j];
            if(L < Number(tmp_data_array[j]))L = Number(tmp_data_array[j]);
        }
    }

    // 描画
    draw(binary_data, X_num, Y_num);
    lineDraw(X_num, Y_num);
  })
})

// テキストボックスへの入力からボタンが押されたとき
function onButtonClick(){
  L = 0;
  var text_data = document.forms.id_form1.id_textBox1.value;
  var X_num, Y_num, data;

  data = text_data.slice(0,text_data.length-1).split("\n");
  if(data[0][data.length-1] == ","){ // 最後の文字がカンマになってるときは最後のカンマを消す
    data[0] = data[0].slice(0,data[0].length-1);
  }
  X_num = data[0].split(",").length;

  if(data.indexOf("") != -1){
    data.pop;
  }
  Y_num = data.length;


  // バイナリデータの配列へ入力
  var binary_data = new Array();
  for(i=0;i<Y_num;i++){
      binary_data[i] = new Array();
      tmp_data_array = data[i].split(",");
      for(j=0;j<X_num;j++){
          binary_data[i][j] = Number(tmp_data_array[j]);
          if(L < Number(tmp_data_array[j]))L = Number(tmp_data_array[j]);
      }
  }

  // 描画
  draw(binary_data, X_num, Y_num);
  lineDraw(X_num, Y_num);
}

// データの描画
function draw(binary_data, X_num, Y_num) {
  /* canvas要素の存在チェックとCanvas未対応ブラウザの対処 */
  var canvas = document.getElementById('canvassample');
  if ( ! canvas || ! canvas.getContext ) {
    return false;
  }

  var delta_x = WIDTH / X_num;
  var delta_y = HEIGHT / Y_num;

  var i,j;
  var ctx = document.getElementById('canvassample').getContext('2d');
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  ctx.fillStyle='rgb(100,100,100)';
  ctx.fillRect(0,0,WIDTH,HEIGHT);
  for(i=0;i<Y_num;i++){
      for(j=0;j<X_num;j++){
          var val = binary_data[i][j];
          val = val / L * 122.5;
          ctx.fillStyle='rgb(' + Math.ceil(val) + ',' + Math.ceil(2*val) + ',' + Math.ceil(val) + ')';
          ctx.fillRect(j*delta_x,i*delta_y,Math.ceil(delta_x),Math.ceil(delta_y));
      }
  }
};

//マス目作成
function lineDraw(X_num, Y_num){
    var ctx = document.getElementById('canvassample').getContext('2d');
    var x,y;
    var delta_x, delta_y;

    delta_x = WIDTH / X_num;
    delta_y = HEIGHT / Y_num;

    ctx.strokeStyle='rgb(255,100,100)';
    ctx.strokeRect=(0,0,WIDTH,HEIGHT);
    ctx.beginPath();
    for(x=delta_x;x<=WIDTH;x+=delta_x){
        ctx.moveTo(Math.ceil(x),0);
        ctx.lineTo(Math.ceil(x),HEIGHT);
    }
    for(y=delta_y;y<=HEIGHT;y+=delta_y){
        ctx.moveTo(0,Math.ceil(y));
        ctx.lineTo(WIDTH,Math.ceil(y));
    }
    ctx.stroke();
}
