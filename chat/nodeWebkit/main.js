var socket = io.connect('http://192.168.0.100:3000');

$().ready(function(){

    var gui = require('nw.gui');
    var win = gui.Window.get();

    // 상단 메뉴바 관련
    var _main_menu = new gui.Menu({type:'menubar'});
    var _file_menu = new gui.Menu();

    var _file_menu_item = new gui.MenuItem({label:'파일'});
    var _exit = new gui.MenuItem({label:'Exit'});

    _file_menu.append(_exit);
    _file_menu_item.submenu = _file_menu;

    _main_menu.append(_file_menu_item);

    win.menu = _main_menu;

    _exit.click = function(){
        gui.App.quit();
    };
    // 상단 메뉴바 관련

    //트레이 메뉴 관련
    var tray;

    var _tray_menu = new gui.Menu();
    var _tray_exit = new gui.MenuItem({label:'exit'});

    _tray_exit.click = function(){
        gui.App.quit();
    }

    _tray_menu.append(_tray_exit);

    win.on('minimize', function(){
        this.hide();
        if(tray == null){
            tray = new gui.Tray({icon:'ico_tray.png'});
            tray.menu = _tray_menu;
            tray.on('click',function(){
                win.show();
                win.focus();
            });
        }
    });

    win.on('close', function(){
        this.hide();
        if(tray != null){
            tray.remove();
            tray = null;
        }
        win.minimize();
    });

    win.on('closed', function(){
        win.minimize();
    });

    win.minimize();


    /* Window Events

    win.showDevTools();
    console.log( "메뉴 프로그램 시작" );

    win.on('minimize', function() {
        console.log("윈도우가 최소화 되엇습니다.");
    });

    win.on('close', function() {
        console.log("윈도우가 종료 요구 되었습니다.");
        this.hide();
        if (win != null)  win.close(true);
        this.close(true);
    });

    win.on('closed', function() {
        console.log("윈도우가 종료 되었습니다.");
        win = null;
    });

    win.on('loaded', function() {
        console.log("윈도우가 로드 되었습니다.");
    });

    win.on('focus', function() {
        console.log("윈도우가 입력 포커스를 얻었습니다.");
    });

    win.on('blur', function() {
        console.log("윈도우가 입력 포커스를 잃었습니다.");
    });

    win.on('minimize', function() {
        console.log("윈도우가 최소화 되었습니다.");
    });

    win.on('restore', function() {
        console.log("윈도우가 최소화 상태에서 원래 상태로 돌아 왔습니다.");
    });

    win.on('maximize', function() {
        console.log("윈도우가 최대화 되었습니다.");
    });

    win.on('unmaximize', function() {
        console.log("윈도우가 최대화 상태에서 원래 상태로 돌아 왔습니다.");
    });

    win.on('enter-fullscreen', function() {
        console.log("윈도우가 전체 화면 상태가 되었습니다.");
    });

    win.on('leave-fullscreen', function() {
        console.log("윈도우가 전체 화면 상태에서 원래 상태로 돌아 왔습니다.");
    });

    win.on('zoom', function() {
        console.log("윈도우의 ZOOM 상태가 변경되었습니다.");
    });

    win.on('capturepagedone', function() {
        console.log("화면 캡쳐 데이터가 준비되어습니다.");
    });

    win.on('devtools-opened', function() {
        console.log("devtools 윈도우가 열렸습니다.");
    });

    win.on('devtools-closed', function() {
        console.log("devtools 윈도우가 닫혔습니다.");

    });

    win.on('Issues', function() {
        console.log("윈도우의 상태가 변경되었습니다.");
    });

    */



    $('button').on('click',function(){
        var _val = $('input[type=text]').val();
        if(!(_val == "")){
            socket.emit('readFile',_val);
            $('input[type=text]').val('');
        }
    });
    $('input[type=text]').on('keypress',function(e){
        if(e.keyCode == '13'){
            $('button').trigger('click');
        }
    });
});

socket.on('bindHtml',function(data,isMsg){

    $('#viewMsg').html(data);

    if(isMsg != ''){
        var icon = 'desktop-notify.png';
        var title = 'test';
        var content = isMsg;
        window.LOCAL_NW.desktopNotifications.notify(icon, title, content, function(){});
    }

});