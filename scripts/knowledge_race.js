/**
 * Created by Administrator on 2017/1/18.
 */

/*首页答问卷单击事件*/
var degreeNum, // 难度级
    i= 0, // 记录题号
    child=$('#question').children(); // $('#next').addClass('block');

$('#daWenJuan').click(function () {
    $('#index').addClass('hidden');
    $('#degree').removeClass('hidden');
    $('#background').removeClass('background-image1');
    $('#background').addClass('background-image2');
});

/*分享页*/
$('#share1').click(function () {
    $('#index').addClass('hidden');
    $('#share').removeClass('hidden');
});
$('#contact1').click(function () {
    $('#index').addClass('hidden');
    $('#contact').removeClass('hidden');
});
$('#degree1').click(function () {
    degreeNum=4;
    $('#background').addClass('background-image3');
    $('#degree').addClass('hidden');
    $('#information').removeClass('hidden');
    $('#background').removeClass('background-image2');
});
$('#degree2').click(function () {
    degreeNum=8;
    $('#background').addClass('background-image3');
    $('#degree').addClass('hidden');
    $('#information').removeClass('hidden');
    $('#background').removeClass('background-image2');
});$('#degree10').click(function () {
    degreeNum=10;
    $('#background').addClass('background-image3');
    $('#degree').addClass('hidden');
    $('#information').removeClass('hidden');
    $('#background').removeClass('background-image2');
});

/*马上答题单击事件*/
$('#dati').click(function () {
    $('#background').addClass('background-image2');
    $('#information').addClass('hidden');
    $('#question-list').removeClass('hidden');
    $('#background').removeClass('background-image3');
    $('#next').addClass('block');
});



/*按钮“下一个”单击事件*/
setInterval(function () {
    if(i==0){
        $('#next').addClass('block');
        $('#next').removeClass('right');
        $('#prev').addClass('hidden');
        $('#submit').addClass('hidden');
        $('#submit').removeClass('block');
    }
    else if(i==3){
        $('#next').addClass('hidden');
        $('#prev').addClass('hidden');
        $('#submit').removeClass('hidden');
        $('#submit').addClass('block');
    }
    else{
        $('#next').removeClass('block');
        $('#next').removeClass('hidden');
        $('#next').addClass('right');
        $('#prev').removeClass('hidden');
        $('#submit').addClass('hidden');
    }
},200);
$('#next').click(nextClick);
function nextClick (j) {
    if((typeof (j))=='number'){
        i=j;
    }
    child.eq(i).addClass('hidden');
    child.eq(i+1).removeClass('hidden');
    i++;
}

/*按钮“上一个”单击事件*/
$('#prev').click(prevClick);
function prevClick() {
    child.eq(i).addClass('hidden');
    child.eq(i-1).removeClass('hidden');
    i--;
}

/*按钮“提交”单击事件*/
$('#submit').click(submitClick);
function submitClick(){

    /*判断是否完成所有问题*/
    var userAnswer,
        correctNum= 0,
        userQuestionAnswer=[],
        selectedQuestionNum=[], // 所完成的题号
        selectedNum, // 获得所完成题目题号
        m,
        n,
        u;

    $('.test input').each(function () {
        if($(this).prop('checked')){
            selectedNum=parseInt($(this).parent('label').siblings('p').text().substring(0,1))-1;
            userAnswer=$(this).parent('label').text().substring(0,1);
            selectedQuestionNum.push(selectedNum);
            userQuestionAnswer.push(userAnswer);
        }
    });

    /*跳到未完成页*/
    for(m= 0,n=child.length;m<n;m++){
        if(selectedQuestionNum.indexOf(m)==-1){
            alert('还没有做完哟!');
            child.eq(i).addClass('hidden');
            i=m;
            if(i==0){
                child.eq(i).removeClass('hidden');
            }
            else if(i==3){
                nextClick(2);
            }
            else{
                nextClick(--i);
            }
            return false;
        }
    }

    /*计算正确答案数量,错误答题详解页*/
    for(m= 0,n=child.length;m<n;m++){
        if(child.eq(m).attr('answer')==userQuestionAnswer[m]){
            correctNum++;
            $('#selectedAnswer').html($('#selectedAnswer').html()+(m+1)+ ':' + userQuestionAnswer[m]+'、');
        }
        else{
            $('#selectedAnswer').html($('#selectedAnswer').html()+'<span style="color:red;">'+(m+1)+ ':' + userQuestionAnswer[m]+'、'+'</span>');
            for(u= 0,v=child.children().length;u<v;u++) {
                if (child.eq(m).children().eq(u).text().substring(0, 1) ==child.eq(m).attr('answer') ) {
                    $('#detailAnswer').html($('#detailAnswer').html() + '</br>' + child.eq(m).children('p').text() + '</br>' + child.eq(m).children().eq(u).text()) + '</br>';
                }
            }
        }
    }

    /*正确答题获得红包页*/
    $('#result').removeClass('hidden');
    if(correctNum==degreeNum){
        $('#correct').removeClass('hidden');
    }
    else{
        $('#error').removeClass('hidden');
    }
}

/*拆红包页*/
$('#zhongJiang').click(function () {
    $('#question').addClass('hidden');
    $('#btn').addClass('hidden');
    $('#chai').removeClass('hidden');
    $('#result').removeClass('rgba');
    $('#congratulation').addClass('hidden');
    $('#background').removeClass('background-image2');
    $('#background').addClass('background-image4');
});

/*再接再厉*/
$('#again').click(function () {
    $('#result').addClass('hidden');
    $('#error').addClass('hidden');
    child.eq(i).addClass('hidden');
    i=0;
    child.eq(i).removeClass('hidden');
    $('#selectedAnswer').html('');
    $('#detailAnswer').html('');
    correctNum=0;
});
