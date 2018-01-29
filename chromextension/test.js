
var togle;

function showSignPage(){
    $("#main_paig").remove();
    var viewData = { name: 'Jonny' };
    $.Mustache.load('./templates/greetings.htm')
        .done(function () {
            console.log("called signin");
            $('body').mustache('simple-hello', viewData);
            var x = document.getElementById("sign-in");
            x.addEventListener("click", showMainpage);
        });
}

function showMainpage(){
    $("#login_page").remove();
    var viewData = { name: 'Jonny' };
    $.Mustache.load('./templates/main.html')
        .done(function () {
            console.log("called main");
            $('body').mustache('simple-main', viewData);
            var x = document.getElementById("submit");
            x.addEventListener("click", showSignPage);
        });
}



function initApp() {
    showSignPage();
}

/* $(function(){
    $('#submit').click(function() {
        console.log("submit");
        showSignPage();
    });

}); */

/* $(function(){
    $('#sign-in').click(function() {
        showMainpage();
        console.log("click");
        console.log(togle);
    });

}); */



function startSignIn(){
    //togle != togle;
    if(!togle){
        togle = true;
    }else{
        togle = false;
    }
}

window.onload = function() {
    initApp();
};
