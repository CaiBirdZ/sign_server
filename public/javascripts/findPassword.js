
'use strict';
function submit(){
    //var err
    var userNum=$('#userNum').val();
    var cpKey=$('#cpKey').val();
    if(userNum===''){
        alert('请输入用户名！');
        return false;
    }
    if(cpKey===''){
        alert('请输入公司密钥！');
        return false;
    }
    $.post('http://localhost:8080/register/userRepeat',{userNum:userNum},function(data){
        if(data.code==='0'){
            alert('用户名不存在！');
            //err = true;
            return false;
        }
    });
    $.post('http://localhost:8080/changePassword/cpKeyExit',{userNum:userNum,cpKey:cpKey}).then(function(data){
        if(data.code!='1'){
            alert('用户密钥错误');
            return false;
        }
    });
    $.post('http://localhost:8080/forgotPassword/sure',{userNum:userNum},function(data){
        if(data.code=='1'){
            alert('找回成功');
            location.href = "http://localhost:8080/optionIndex";
            return true;
        }else{
            alert('失败请重试');
            return false;
        }
    });

}