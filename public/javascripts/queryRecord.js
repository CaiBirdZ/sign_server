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

function gethtml()
{
    var fTableElement,strcell,rows,cols,style,excelstr;
    fTableElement = document.getElementById("exportToExel");
    excelstr = "<html><head><!--<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>工作表标题</x:Name><x:WorksheetOptions><x:print><x:ValidPrinterInfo /></x:print></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>";
    excelstr += "<table border='1'>";
    for (var i = 0; i < fTableElement.rows.length; i++)
    {
        excelstr += "<tr>";
        for (var  j = 0; j < fTableElement.rows[i].cells.length; j++)
        {
            rows = fTableElement.rows[i].cells[j].rowSpan;
            cols = fTableElement.rows[i].cells[j].colSpan;
            style = fTableElement.rows[i].cells[j].align;
            excelstr += "<td colspan=" + cols + " rowspan=" + rows + " align=" + style + ">";
            for(var k = 0; k < fTableElement.rows(i).cells(j).children.length;k++){
                if(fTableElement.rows(i).cells(j).children[k].type == undefined){
                    excelstr += fTableElement.rows(i).cells(j).children[k].innerText;
                }else{
                    excelstr += fTableElement.rows(i).cells(j).children[k].value;
                }
            }
            excelstr += "</td>";
        }
        excelstr += "</tr>";
    }
    excelstr += "</table></html>";

    return excelstr;
}
function ExportToExcel()
{
    var fHtml = gethtml();
    var fSaveWindow = window.open();
    fSaveWindow.document.open("text/html", "UTF-8");
    fSaveWindow.document.write(fHtml);
    fSaveWindow.document.execCommand("SaveAs", true, "table.xls");
    fSaveWindow.close();
}