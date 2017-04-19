/**
 * Created by 11952 on 2017/4/8.
 */
function byJobNo(){
    var jobNo = $('#jobNo').val();
    if(jobNo===''){
        alert('请输入员工号');
        return false;
    }
    $.post('http://118.89.233.175:80/queryRecord/byJobNo',{jobNo:jobNo},function(data){
        if(data.code=='1'){
            var array=data.result;
            for(var i in array){
                $('#exportToExel').append("<tr><td>"+array[i].jobNo+"</td><td>"+array[i].emName+"</td><td>"+array[i].department+"</td><td>"+ array[i].signDate+"</td><td>"+ array[i].signTime+"</td><td>"+ array[i].signOut+"</td></tr>");
            }
        }else{
            alert('查询失败，请重试');
        }
    });
}

function byDepartment(){
    var department = $('#department').val();
    if(department===''){
        alert('请输入部门');
        return false;
    }
    $.post('http://118.89.233.175:80/queryRecord/byDepartment',{department:department},function(data){
        if(data.code=='1'){
            var array=data.result;
            for(var i in array){
                $('#exportToExel').append("<tr><td>"+array[i].jobNo+"</td><td>"+array[i].emName+"</td><td>"+array[i].department+"</td><td>"+ array[i].signDate+"</td><td>"+ array[i].signTime+"</td><td>"+ array[i].signOut+"</td></tr>");
            }
        }else{
            alert('查询失败，请重试');
        }
    });
}
function bySignDate(){
    var signDate = $('#signDate').val();
    if(signDate===''){
        alert('请输入日期');
        return false;
    }
    $.post('http://118.89.233.175:80/queryRecord/bySignDate',{signDate:signDate},function(data){
        if(data.code=='1'){
            var array=data.result;
            for(var i in array){
                $('#exportToExel').append("<tr><td>"+array[i].jobNo+"</td><td>"+array[i].emName+"</td><td>"+array[i].department+"</td><td>"+ array[i].signDate+"</td><td>"+ array[i].signTime+"</td><td>"+ array[i].signOut+"</td></tr>");
            }
        }else{
            alert('查询失败，请重试');
        }
    });
}

function byJobNoAndSignDate(){
    var signDate = $('#signDate').val();
    var jobNo = $('#jobNo').val();
    if(jobNo===''){
        alert('请输入员工号');
        return false;
    }
    if(signDate===''){
        alert('请输入日期');
        return false;
    }
    $.post('http://118.89.233.175:80/queryRecord/byJobNoAndSignDate',{jobNo:jobNo,signDate:signDate},function(data){
        if(data.code=='1'){
            var array=data.result;
            for(var i in array){
                $('#exportToExel').append("<tr><td>"+array[i].jobNo+"</td><td>"+array[i].emName+"</td><td>"+array[i].department+"</td><td>"+ array[i].signDate+"</td><td>"+ array[i].signTime+"</td><td>"+ array[i].signOut+"</td></tr>");
            }
        }else{
            alert('查询失败，请重试');
        }
    });
}

function byDepartmentAndSignDate(){
    var signDate = $('#signDate').val();
    var department = $('#department').val();
    if(department===''){
        alert('请输入员工号');
        return false;
    }
    if(signDate===''){
        alert('请输入日期');
        return false;
    }
    $.post('http://118.89.233.175:80/queryRecord/byDepartmentAndSignDate',{department:department,signDate:signDate},function(data){
        if(data.code=='1'){
            var array=data.result;
            for(var i in array){
                $('#exportToExel').append("<tr><td>"+array[i].jobNo+"</td><td>"+array[i].emName+"</td><td>"+array[i].department+"</td><td>"+ array[i].signDate+"</td><td>"+ array[i].signTime+"</td><td>"+ array[i].signOut+"</td></tr>");
            }
        }else{
            alert('查询失败，请重试');
        }
    });
}


function ExportToExcel(inTblId, inWindow) {
    try {
        var allStr = "";
        var curStr = "";
        //alert("getXlsFromTbl");   
        if (inTblId != null && inTblId != "" && inTblId != "null") {
            curStr = getTblData(inTblId, inWindow);
        }
        if (curStr != null) {
            allStr += curStr;
        }
        else {
            alert("你要导出的表不存在！");
            return;
        }
        var fileName = getExcelFileName();
        doFileExport(fileName, allStr);
    }
    catch(e) {
        alert("导出发生异常:" + e.name + "->" + e.description + "!");
    }
}
function getTblData(inTbl, inWindow) {
    var rows = 0;
    //alert("getTblData is " + inWindow);   
    var tblDocument = document;
    if (!!inWindow && inWindow != "") {
        if (!document.all(inWindow)) {
            return null;
        }
        else {
            tblDocument = eval(inWindow).document;
        }
    }
    var curTbl = tblDocument.getElementById(inTbl);
    var outStr = "";
    if (curTbl != null) {
        for (var j = 0; j < curTbl.rows.length; j++) {
            //alert("j is " + j);   
            for (var i = 0; i < curTbl.rows[j].cells.length; i++) {
                //alert("i is " + i);   
                if (i == 0 && rows > 0) {
                    outStr += " \t";
                    rows -= 1;
                }
                outStr += curTbl.rows[j].cells[i].innerText + "\t";
                if (curTbl.rows[j].cells[i].colSpan > 1) {
                    for (var k = 0; k < curTbl.rows[j].cells[i].colSpan - 1; k++) {
                        outStr += " \t";
                    }
                }
                if (i == 0) {
                    if (rows == 0 && curTbl.rows[j].cells[i].rowSpan > 1) {
                        rows = curTbl.rows[j].cells[i].rowSpan - 1;
                    }
                }
            }
            outStr += "\r\n";
        }
    }
    else {
        outStr = null;
        alert(inTbl + "不存在!");
    }
    return outStr;
}
function getExcelFileName() {
    var d = new Date();
    var curYear = d.getYear();
    var curMonth = "" + (d.getMonth() + 1);
    var curDate = "" + d.getDate();
    var curHour = "" + d.getHours();
    var curMinute = "" + d.getMinutes();
    var curSecond = "" + d.getSeconds();
    if (curMonth.length == 1) {
        curMonth = "0" + curMonth;
    }
    if (curDate.length == 1) {
        curDate = "0" + curDate;
    }
    if (curHour.length == 1) {
        curHour = "0" + curHour;
    }
    if (curMinute.length == 1) {
        curMinute = "0" + curMinute;
    }
    if (curSecond.length == 1) {
        curSecond = "0" + curSecond;
    }
    var fileName = "leo_zhang" + "_" + curYear + curMonth + curDate + "_"
        + curHour + curMinute + curSecond + ".csv";
    //alert(fileName);   
    return fileName;
}
function doFileExport(inName, inStr) {
    var xlsWin = null;
    if (!!document.all("glbHideFrm")) {
        xlsWin = glbHideFrm;
    }
    else {
        var width = 6;
        var height = 4;
        var openPara = "left=" + (window.screen.width / 2 - width / 2)
            + ",top=" + (window.screen.height / 2 - height / 2)
            + ",scrollbars=no,width=" + width + ",height=" + height;
        xlsWin = window.open("", "_blank", openPara);
    }
    xlsWin.document.write(inStr);
    xlsWin.document.close();
    xlsWin.document.execCommand('Saveas', true, inName);
    xlsWin.close();
}   