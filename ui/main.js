var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMPHttpRequest.DONE) {
            if (request.status === 200) {
                console.log('user logged in');
                alert('Logged in successfully');
            } else if (request.status ===403) {
                alert('incorrect username/password');
            } else if (request.status ===500) {
               alert('something went wrong');  
            }
        }
    };
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST', 'http://abhayrm01.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Tyoe', "application/json");
    request.send(JSON.stringify({username: username, password: password}));
    
};