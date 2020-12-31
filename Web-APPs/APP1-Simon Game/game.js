var levelIndex = 0;
var btnColor = ["red","blue","yellow","green"];
var randomColor = [];
var gamerClickedColor = [];
var started = false;

// ボタンが押される場合、ゲームが始まる：
$(document).keypress(function() {
    if (!started) {
        newSequence();
        started = true;
    }
  });

// ①任意の数字を作らせる仕組み
function newSequence(){ 
    gamerClickedColor = [];　　//【要注意】！ここは必ずクリアします。しないと前回の記録はそのままに配列に残る！
    var randomNum = Math.floor(Math.random() * 4); 
        levelIndex ++;
        $("h1").text("レベル:　" + levelIndex);
        $("p").text("");
    //②　①で任意表示された数字を配列に保存する機能
        randomColor.push(btnColor[randomNum]);
        $("#"+btnColor[randomNum]).fadeOut(150).fadeIn(100);
        pressedSound(btnColor[randomNum]);
};

$(".btn").click(function(){
    var color = $(this).attr("id");
    gamerClickedColor.push(color);
    pressedSound(color);
    pressedAnimation(color);
    comparison(gamerClickedColor.length-1);
});


// ③入力で得た数字をもって①と比べ、入力順番は一致しているかを判断する機能
function comparison(index){
    if(gamerClickedColor[index]=== randomColor[index]){
        if(gamerClickedColor.length===randomColor.length){
            setTimeout(function(){
                newSequence();
            },1000)
        }
    }else{
        wrongSound();
        wrongResult();
    }
}

function pressedSound(name){
    var btnClicked = new Audio("sounds/"+name+".mp3");
    btnClicked.play();
}

function pressedAnimation(colorName){
    $("#"+colorName).addClass("pressed")
    setTimeout(function(){
        $("#"+colorName).removeClass("pressed");
    },100);
}

function wrongSound(){
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
}

function wrongResult(){
    $("#title").html("Game Over😭");
    $("p").text("任意ボタンを押して最初画面に戻る");
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");}, 250)
    randomColor = [];
    levelIndex = null;
    started = false;
}



