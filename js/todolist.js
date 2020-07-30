var add_task_id = "todo-item-top";
var list_add_count = document.getElementsByClassName('todo-list drag-sort-enable')[0].getElementsByClassName('todo-item').length;
//clone todolist/add task template and remove it
var detail = document.getElementById('detail');
var btns = document.getElementById('btns'); 
var todo_list = document.getElementById('list0');
var edit_list = detail.cloneNode(true);
var edit_btns = btns.cloneNode(true);
var todo_list_template = todo_list.cloneNode(true);
detail.remove();
btns.remove();
todo_list.remove();
//imshow add task windows 
function imshowList(list_id){
    console.log("imshow List:" + list_id)
    console.log("input file length:" + document.getElementsByClassName("input-file").length)

    var edit_list_element = document.getElementById(list_id);
    var add_task_btn = document.getElementsByClassName('todo-btn todo-btn-add')[0];
    if(add_task_btn.style.display=="none"){
        add_task_btn.style.display ="block";
    }
    if(list_id == add_task_id){
        add_task_btn.style.display = "none";
    }else{
        var list_todo_div = edit_list_element.getElementsByClassName('todo-item-main')[0];
        list_todo_div.style.display="none";

        
    }
    var clone_edit_list = edit_list;
    var clone_edit_btns = edit_btns;

    edit_list_element.append(clone_edit_list);
    edit_list_element.append(clone_edit_btns);

    var star_icon = edit_list_element.getElementsByClassName('fa fa-star-o')[0];
    if(star_icon == undefined){
        star_icon = edit_list_element.getElementsByClassName('fa fa-star')[0];
        star_icon.className = 'fa fa-star-o';
    }
    star_icon.setAttribute("onclick","toggle_star('" + list_id + "')");

    var clone_detail = edit_list_element.getElementsByClassName("todo-item-detail")[0];
    var clone_btns = edit_list_element.getElementsByClassName("todo-item-btns")[0];
    clone_detail.style.display = "flex";
    clone_btns.style.display = "flex";
    var clone_btns_ok = clone_btns.getElementsByClassName("todo-btn todo-btn--add")[0];
    var clone_btns_cancel = clone_btns.getElementsByClassName("todo-btn todo-btn--secondary")[0];
    clone_btns_ok.setAttribute("onclick","newAddList('"+ list_id +"');");
    clone_btns_cancel.setAttribute("onclick","removeAddList('"+ list_id +"');");
    
    if(list_id != add_task_id){
        // modify mode 
        // get all list value and load in table 
        // load list element
        var title   = edit_list_element.getElementsByClassName('todo-title-modify')[0];
        var date    = edit_list_element.getElementsByClassName('input-date')[0];
        var file    = edit_list_element.getElementsByClassName('input-file')[0];
        var comment = edit_list_element.getElementsByClassName('todo-textarea')[0];
        var star_icon_edit_list =  edit_list_element.getElementsByClassName('fa fa-star-o')[0];
        // modify mode 
        // get all list value and load in table 
        // load exist todolist element value
        var todo_main_div   = edit_list_element.getElementsByClassName('todo-item-main')[0];
        var todo_title_value        = todo_main_div.getElementsByClassName('todo-main-title')[0];
        var todo_date_value         = todo_main_div.getElementsByClassName('todo-date-title')[0];
        var todo_file_name_value    = todo_main_div.getElementsByClassName('todo-item-file-name')[0];
        var todo_comment_value      = todo_main_div.getElementsByClassName('todo-item-comment-detail')[0];
        var todo_star_icon          = todo_main_div.getElementsByClassName('fa fa-star-o')[0]; 
        title.innerHTML = todo_title_value.innerHTML;
        date.value = todo_date_value.innerHTML;
        if (todo_file_name_value!=undefined){
            file = todo_file_name_value.innerHTML;
        }
        if (todo_comment_value!=undefined){
            comment.value = todo_comment_value.innerHTML;
        }
        if(todo_star_icon==undefined){
            todo_star_icon = todo_main_div.getElementsByClassName('fa fa-star')[0]; 
        }
        star_icon_edit_list.className = todo_star_icon.className ;
    }else{
        var todo_list_div = document.getElementsByClassName("todo-list drag-sort-enable")[0].getElementsByClassName("todo-item-main");
        for(var list_idx=0;list_idx<todo_list_div.length;list_idx++){
            todo_list_div[list_idx].style.display = "block";
        }
        var title   = edit_list_element.getElementsByClassName('todo-title-modify')[0];
        var date    = edit_list_element.getElementsByClassName('input-date')[0];
        var file    = edit_list_element.getElementsByClassName('input-file')[0];
        var comment = edit_list_element.getElementsByClassName('todo-textarea')[0];
        var star_icon_edit_list =  edit_list_element.getElementsByClassName('fa fa-star-o')[0];
        title.innerHTML = "Type something here";
        date.value = "";
        file = "";
        comment.value = "";
    }
}
function change_text_decoration(list_id,is_line_through){
    var list_div = document.getElementById(list_id);
    var title_div = list_div.getElementsByClassName("todo-main-title")[0];
    if(is_line_through==true){
        title_div.style.textDecoration = "line-through";
    }else{
        title_div.style.textDecoration = "";
    }
    
}
function change_div_type_as_ok(list_id,isOK){
    var list_div = document.getElementById(list_id).getElementsByClassName("todo-item-main")[0];
    var down_list_li = list_div.getElementsByClassName("todo-list-add")[1];
    if(isOK){
        list_div.style.height =  list_div.clientHeight / 2 + "px";
        down_list_li.style.display="none";
    }else{
        down_list_li.style.display="flex";
        list_div.style.height =  list_div.clientHeight * 2 + "px";
    }
}
function oncheck_change(list_id){
    var list_div = document.getElementById(list_id);
    var list_input = list_div.getElementsByTagName('input');
    var check_box;
    for (var j = 0; j < list_input.length; j++) {
        if (list_input[j].type == 'checkbox') {
            check_box = list_input[j];
        }
    }
    change_text_decoration(list_id, check_box.checked);
    change_div_type_as_ok(list_id, check_box.checked);
    count_list_num();
}
function change_bgcolor_by_star(list_div,star_str){
    if(star_str=="fa fa-star"){
        list_div.style.backgroundColor = "#FFF2DC";
    }else{
        list_div.style.backgroundColor = "#F2F2F2";
    }
}
function toggle_star(list_id){
    var list_div = document.getElementById(list_id);
    var list_todo_main_div = list_div.getElementsByClassName("todo-item-main")[0];
    var list_star = list_div.getElementsByClassName("fa fa-star")[0];
    if(list_id!=add_task_id){
        if(list_star==undefined){
            var list_star = list_div.getElementsByClassName("fa fa-star-o")[0];
            list_star.className ="fa fa-star";            
            change_bgcolor_by_star(list_todo_main_div,"fa fa-star");
        }else{
            list_star.className ="fa fa-star-o";
            change_bgcolor_by_star(list_todo_main_div,"fa fa-star-o");
        }
    }
    
}

function add_check_event(){
    var list_div = document.getElementsByClassName("todo-item");
    var div_len = list_div.length;
    var i;
    for(i=0;i<div_len;i++){
        var c = list_div[i].getElementsByTagName('input');
        for (var j = 0; j < c.length; j++) {
            if (c[j].type == 'checkbox') {
                c[j].setAttribute("onclick","oncheck_change('"+list_div[i].id +"')");
            }
        }
    }
}
function star_icon_add_toggle(){
    var todo_li = document.getElementsByClassName('todo-list drag-sort-enable')[0].getElementsByClassName('todo-item');
    var list_num = todo_li.length;
    console.log(list_num)
    var list_idx;
    for(list_idx=0;list_idx<list_num;list_idx++){
        var list_star_icon = todo_li[list_idx].getElementsByClassName("fa fa-star")[0];
        var list_star_icon_o = todo_li[list_idx].getElementsByClassName("fa fa-star-o")[0];
        if(list_star_icon!=undefined){
            list_star_icon.setAttribute("onclick","toggle_star('"+ todo_li[list_idx].id +"');");
        }
        if(list_star_icon_o){
            list_star_icon_o.setAttribute("onclick","toggle_star('"+ todo_li[list_idx].id +"');");

        }
    }
}

function pencil_icon_add_toggle(){
    var todo_li = document.getElementsByClassName('todo-list drag-sort-enable')[0].getElementsByClassName('todo-item');
    var list_num = todo_li.length;
    console.log(list_num)
    var list_idx;
    for(list_idx=0;list_idx<list_num;list_idx++){
        var list_pencil_icon = todo_li[list_idx].getElementsByClassName("fa fa-pencil")[0];
        list_pencil_icon.setAttribute("onclick","imshowList('"+ todo_li[list_idx].id +"');");
    }
}

function removeAddList(list_id){
    var edit_list_element = document.getElementById(list_id);
    if(list_id == add_task_id){
        var add_task_btn = document.getElementsByClassName('todo-btn todo-btn-add')[0];
        add_task_btn.style.display = "block";
    }else{
        var list_todo_div = edit_list_element.getElementsByClassName('todo-item-main')[0];
        list_todo_div.style.display="block";
    }
    var detail_clone    = edit_list_element.getElementsByClassName('todo-item-detail')[0];
    var btns_clone      = edit_list_element.getElementsByClassName('todo-item-btns')[0];
    detail_clone.remove();
    btns_clone.remove();
}
function newAddList(list_id){
    var edit_list_element = document.getElementById(list_id);
    var title   = edit_list_element.getElementsByClassName('todo-title-modify')[0];
    var date    = edit_list_element.getElementsByClassName('input-date')[0];
    var file    = edit_list_element.getElementsByClassName('input-file')[0];
    var comment = edit_list_element.getElementsByClassName('todo-textarea')[0];
    console.log('title:' +　title.innerHTML);
    console.log('date:' + date.value);
    console.log('file_name:' + file.value);
    console.log('comment:' + comment.value);
    var new_modify_li;
    if(list_id == add_task_id){
        var ul_todolist = document.getElementsByClassName("todo-list drag-sort-enable")[0];
        new_modify_li  = todo_list_template;
        new_modify_li.style.display = ' list-item';
        new_modify_li.id = 'list' + (++list_add_count);

        
    }else{
        console.log("modify list");
        new_modify_li = document.getElementById(list_id);
        if(comment.value!=""){
            var comment_icon = new_modify_li.getElementsByClassName("todo-item-comment")[0];
            comment_icon.style.display = "block";
        }
        if(file.value!=""){
            var file_icon = new_modify_li.getElementsByClassName("todo-item-file")[0];
            file_icon.style.display = "block";
        }
        
    }
    var new_modify_li_title        = new_modify_li.getElementsByClassName('todo-main-title')[0];
    var new_modify_li_date         = new_modify_li.getElementsByClassName('todo-date-title')[0];
    var new_modify_li_file_name    = new_modify_li.getElementsByClassName('todo-item-file-name')[0];
    var new_modify_li_comment      = new_modify_li.getElementsByClassName('todo-item-comment-detail')[0];
    new_modify_li_title.innerHTML      = title.innerHTML;
    new_modify_li_date.innerHTML       = date.value;
    if(new_modify_li_file_name!=undefined){
        new_modify_li_file_name.innerHTML  = file.value;
    }
    
    new_modify_li_comment.innerHTML    = comment.value;
    if(file.value==""){
        var new_modify_li_file_icon = new_modify_li.getElementsByClassName('todo-item-file')[0];
        if(new_modify_li_file_icon!=undefined){
            new_modify_li_file_icon.style.display="none";
        }
        
    }
    if(comment.value==""){
        var new_modify_li_comment_icon = new_modify_li.getElementsByClassName('todo-item-comment')[0];
        if(new_modify_li_comment_icon!=undefined){
            new_modify_li_comment_icon.style.display="none";
        }
    }
    if(list_id == add_task_id){
        ul_todolist.appendChild(new_modify_li);
    }
    star_icon_add_toggle();
    pencil_icon_add_toggle();
    add_check_event();

    removeAddList(list_id);
}
function onclick_navbar_li(navbar_element){
    console.log(navbar_element.id)
    var navbar_li = document.getElementById("navbar").getElementsByClassName("navbar-item");
    var navbar_num = navbar_li.length;
    var navbar_idx;
    for(navbar_idx=0;navbar_idx<navbar_num;navbar_idx++){
        if( navbar_li[navbar_idx]==navbar_element){
            navbar_li[navbar_idx].className="navbar-item active";
        }else{
            navbar_li[navbar_idx].className="navbar-item";
        }
    }
    var all_todo_list = document.getElementsByClassName("todo-list drag-sort-enable")[0].getElementsByClassName("todo-item");
    for(var i=0;i<all_todo_list.length;i++){
        var list_div = all_todo_list[i].getElementsByClassName("todo-item-main")[0];
        var checkbox;
        var c = list_div.getElementsByTagName('input');
        for (var j = 0; j < c.length; j++) {
            if (c[j].type == 'checkbox') {
                checkbox = c[j];
            }
        }
        
        if(navbar_element.id=="Tasks"){
            list_div.style.display = "block";
        }else if(navbar_element.id=="Progress"){
            if(checkbox.checked){
                list_div.style.display = "none";
            }else{
                list_div.style.display = "block";
            }
        }else if(navbar_element.id=="Completed"){
            if(checkbox.checked){
                list_div.style.display = "block";
            }else{
                list_div.style.display = "none";
            }
        }
    }
}
function upfile(){
    console.log("upfile click")
}
function add_onclick_navbar_li(){
    var navbar_li = document.getElementById("navbar").getElementsByClassName("navbar-item");
    var navbar_num = navbar_li.length;
    var navbar_idx ;
    for(navbar_idx=0;navbar_idx<navbar_num;navbar_idx++){
        navbar_li[navbar_idx].setAttribute("onclick","onclick_navbar_li("+navbar_li[navbar_idx].id+")");
    }
}
function count_list_num(){
    var num_div = document.getElementsByClassName("todo_num")[0];
    var all_list = document.getElementsByClassName("todo-list drag-sort-enable")[0].getElementsByClassName("todo-item");
    var num  = all_list.length;
    for(var i=0;i<all_list.length;i++){
        var list_div = all_list[i].getElementsByClassName("todo-item-main")[0];
        //check if it is done or not
        var list_input = list_div.getElementsByTagName('input');
        var check_box;
        for (var j = 0; j < list_input.length; j++) {
            if (list_input[j].type == 'checkbox') {
                check_box = list_input[j];
            }
        }
        if(check_box.checked){
            num--;
        }
    }
    num_div.innerHTML = num + "task left";
}
// ---drag and sort---
// this drag and sort function is reference by https://codepen.io/fitri/pen/VbrZQm
function enableDragSort(listClass) {
    const sortableLists = document.getElementsByClassName(listClass);
    var li_list = sortableLists[0].getElementsByClassName("todo-item");
    var i;
    var str="";
    for (i = 0; i < li_list.length; i++) {
        str +=li_list[i].id +",";
    }
    console.log("list sort:" + str)
    Array.prototype.map.call(sortableLists, (list) => {enableDragList(list)});
}

function enableDragList(list) {
    console.log("list childen id:" + list.children[0].id)        
    Array.prototype.map.call(list.children, (item) => {enableDragItem(item)});
}

function enableDragItem(item) {
    console.log(item) 
    item.setAttribute('draggable', true)
    item.ondrag = handleDrag;
    item.ondragend = handleDrop;
}

function handleDrag(item) {
    const selectedItem = item.target,
    list = selectedItem.parentNode,
    x = event.clientX,
    y = event.clientY;
    
    selectedItem.classList.add('drag-sort-active');
    // find element by coordinate
    let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);
    
    /* console.log(swapItem.parentNode.parentNode.parentNode)
    console.log(list === swapItem.parentNode.parentNode) */

    swapItem_Node = swapItem.parentNode.parentNode.parentNode.parentNode
    console.log(swapItem_Node)
    if(list === swapItem_Node.parentNode){
        console.log(swapItem.parentNode.parentNode.parentNode.parentNode)
        swapItem_Node = swapItem_Node !== selectedItem.nextSibling ? swapItem_Node : swapItem_Node.nextSibling;
        list.insertBefore(selectedItem, swapItem_Node);
    }
    if (list === swapItem.parentNode) {
        console.log(swapItem)
        swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
        list.insertBefore(selectedItem, swapItem);
    }
}

function handleDrop(item) {
    item.target.classList.remove('drag-sort-active');
}
(()=> {enableDragSort('drag-sort-enable')})();
//onload event
function onload(){
    star_icon_add_toggle();
    pencil_icon_add_toggle();
    add_onclick_navbar_li();
    add_check_event();
    count_list_num();
    var all_todo_list = document.getElementsByClassName("todo-list drag-sort-enable")[0].getElementsByClassName("todo-item");
    for(var i=0;i<all_todo_list.length;i++){
        var list_div = all_todo_list[i].getElementsByClassName("todo-item-main")[0];
        var star = list_div.getElementsByClassName("fa fa-star")[0];
        if(star!=undefined){
            change_bgcolor_by_star(list_div, "fa fa-star");
        }else{
            change_bgcolor_by_star(list_div, "fa fa-star-o");
        }
    }
    document.getElementsByClassName("icon ion-md-add-circle-outline")[0].setAttribute("onclick","imshowList('todo-item-top')");
}

