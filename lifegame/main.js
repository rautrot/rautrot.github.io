onload = function() {
  lineDraw();
  draw();
};

function draw() {
  /* canvas要素の存在チェックとCanvas未対応ブラウザの対処 */
    var canvas = document.getElementById('canvassample');
  if ( ! canvas || ! canvas.getContext ) {
    return false;
  }
    var i,j;
    var n = new Array();
    for(i=0;i<100;i++){
        n[i]= new Array();
        for(j=0;j<100;j++){
            n[i][j]=0;
        }
    }
    n = seed(n);    

  /* 描く */
  lineDraw();
  setTimeout(dr,3000,n);
};

function dr(n){
    var ctx = document.getElementById('canvassample').getContext('2d');
    ctx.clearRect(0,0,1000,1000);
    for(i=1;i<100;i++){
        for(j=1;j<100;j++){
            if(n[i][j]==1){  
                /* 2Dコンテキスト */
                ctx.fillStyle='rgb(105,189,131)';
                ctx.fillRect(j*20,i*20,20,20);
            }
        }
    } 
    n = nextLife(n);
    
    //ここで速さを調節する
    setTimeout(dr,300,n);
}

//次のセル情報
function nextLife(dat){
    var i,j,cnt;
    //dat は２次元配列
    //配列の初期化
    var n = new Array();
    for(i=0;i<100;i++){
        n[i] = new Array();
        for(j=0;j<100;j++){
            n[i].push(0);
        }
    }
    
    //ライフゲームのルールに沿って配列を生成
    for(i=1;i<99;i++){
        for(j=1;j<99;j++){
            cnt = 0;
            //周りのセルの生存数
            if(dat[i-1][j-1]==1)cnt++;
            if(dat[i][j-1]==1)cnt++;
            if(dat[i+1][j-1]==1)cnt++;
            if(dat[i-1][j]==1)cnt++;
            if(dat[i+1][j]==1)cnt++;
            if(dat[i-1][j+1]==1)cnt++;
            if(dat[i][j+1]==1)cnt++;
            if(dat[i+1][j+1]==1)cnt++;
            
            //死んでいるセルの場合
            if(dat[i][j]==0){
                if(cnt == 3)n[i][j]=1;
            }
            //生きているセルの場合
            else{
                if(cnt == 2 || cnt == 3)n[i][j]=1;
            }
        }
    }
    delete dat;
    return n;
};

//マス目作成
function lineDraw(){
    var ctx = document.getElementById('canvasback').getContext('2d');
    var x,y;
    ctx.strokeStyle='rgb(0,90,160)'; //紫
    ctx.beginPath();
    for(x=20;x<=1000;x+=20){
        ctx.moveTo(x,0);
        ctx.lineTo(x,1000);
    }
    for(y=20;y<=1000;y+=20){
        ctx.moveTo(0,y);
        ctx.lineTo(1000,y);
    }
    ctx.stroke();
}

function seed(n){
        //シードの指定(グライダー)
    n[1][2]=1;
    n[2][3]=1;
    n[3][1]=1;
    n[3][2]=1;
    n[3][3]=1;
    
    //シードの指定(ビーコン)
    n[5][20]=1;
    n[5][21]=1;
    n[6][20]=1;
    n[6][21]=1;
    n[7][22]=1;
    n[7][23]=1;
    n[8][22]=1;
    n[8][23]=1;
    
    //シードの指定(ペンタデカスロン)
    n[5][32]=1;
    n[5][35]=1;
    n[5][40]=1;
    n[5][43]=1;
    n[6][30]=1;
    n[6][31]=1;
    n[6][32]=1;
    n[6][35]=1;
    n[6][36]=1;
    n[6][37]=1;
    n[6][38]=1;
    n[6][39]=1;
    n[6][40]=1;
    n[6][43]=1;
    n[6][44]=1;
    n[6][45]=1;
    n[7][32]=1;
    n[7][35]=1;
    n[7][40]=1;
    n[7][43]=1;
    
    //シードの指定(時計)
    n[20][5]=1;
    n[21][6]=1;
    n[21][7]=1;
    n[22][4]=1;
    n[22][5]=1;
    n[23][6]=1;
    
    //シードの指定(大きい時計)
    n[28][9]=1;
    n[28][10]=1;
    n[29][9]=1;
    n[29][10]=1;
    n[32][3]=1;
    n[32][4]=1;
    n[33][3]=1;
    n[33][4]=1;
    n[34][13]=1;
    n[34][14]=1;
    n[35][13]=1;
    n[35][14]=1;
    n[38][7]=1;
    n[38][8]=1;
    n[39][7]=1;
    n[39][8]=1;
    n[31][7]=1;
    n[31][8]=1;
    n[31][9]=1;
    n[31][10]=1;
    n[32][6]=1;
    n[32][11]=1;
    n[33][6]=1;
    n[33][11]=1;
    n[33][8]=1;
    n[33][9]=1;
    n[34][6]=1;
    n[34][11]=1;
    n[34][10]=1;
    n[35][6]=1;
    n[35][11]=1;
    n[36][7]=1;
    n[36][8]=1;
    n[36][9]=1;
    n[36][10]=1;
    
    //シードの指定(重量級宇宙船)
    n[11][3]=1;
    n[11][4]=1;
    n[12][1]=1;
    n[12][6]=1;
    n[13][7]=1;
    n[14][1]=1;
    n[14][7]=1;
    n[15][2]=1;
    n[15][3]=1;
    n[15][4]=1;
    n[15][5]=1;
    n[15][6]=1;
    n[15][7]=1;

    return n;
}