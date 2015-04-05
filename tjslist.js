/*
	createCSVは実装済み（細かい変更必須）

	serch() loadList()は未実装





	undefined === null
*/

//htmlの読み込みの終了時に動作する関数
$(function() {

    if (typeof Blob !== "undefined") {
        // alert('このブラウザに対応しています');
    } else {
        alert('このブラウザには対応していません');
    }

    $("#export").click(function(){ // function()じゃないとclickイベントが自動で起こる
 			serch();
 		}
    );
});

//リストと比較して頻度を求める関数
function serch(){
	var data = [ [] ];
	console.log(data);


	createCSV("download",data); // dataは頻度のリストを格納した二次元配列
}

//tjslist.csvを読み込み，配列として返す関数
function loadList(){
	var xhr = new XMLHttpRequest();
	fileName = 'tjslist.csv';
	xhr.open("GET",fileName,true);
	xhr.send(null);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			var text = xhr.responseText; //textにtjslistが入っている
			console.log(text);
		}
	}

	return arr;
}



function createCSV(id, content) {

 // 指定されたデータを保持するBlobを作成する。
 	var arr = [['abc',2,3],[4,5,6],[7,8,9]];
 	var tmp = '';
 	var i = 0;
 	arr[0][1]++;
 	while(arr[i] != null){
 		tmp += arr[i].toString() + '\n';
 		i++;
 	}
    var blob = new Blob([ tmp ], { "type" : "application/x-msdownload" });
 



    var data = loadCSV("tjslist.csv");
    console.log(data);




 // Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
    window.URL = window.URL || window.webkitURL;
    $("#" + id).attr("href", window.URL.createObjectURL(blob));
    $("#" + id).attr("download", "tjslist.txt"); //ファイル名の指定
}








function onInitFs(fs){
	fs.root.getFile('tjslist.csv',{},function(fileEntry){
		fileEntry.file(function(file){
			var reader = new FileReader();
			reader.onloadend = function(e){
				var txtArea = document.createElement('textarea');
				textArea.value = this.result;
				document.body.appendChild(txtArea);

			};
			reader.readAsText(file);
		},errorHandler);
	},errorHandler);

	window.requestFileSystem(window.TEMPORARY,1024*1024,onInitFs,errorHandler);
	/*
	var file = evt.target.files;
	var reader = new FileReader();
	reader.readAsText(file[0],'UTF-8');
	if(file[1] != null){  //file[i]ではi番のファイルの有無をnullかどうかで確認できる
		reader.onload = function(ev){
			console.log(file[0]);
			console.log(file[1]);
		}
	}
	else{
		console.log('Second file is not selected!');
	}	
	*/
}


//tjsのリスト
var listData = [
		
]

function loadCSV(fileName, column) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", fileName, true);
    xhr.send(null);
    xhr.onload = function(){
    
    var csv = xhr.responseText;
    /*for (var i = 0; i < csv.length; i++) {
        var split = csv[i].split(",");
        if (column !== undefined) {
            csv[i] = split[column];
        } else {
            csv[i] = split;
        }
    }*/
    return csv;
    }
}