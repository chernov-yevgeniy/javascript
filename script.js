var xhr = new XMLHttpRequest();

var url = 'https://api.github.com';

function getUserInfo() {
    var method = 'GET';
    var uri = '/users';
    var username = document.getElementById("username").value;

    xhr.open(method, url+uri+'/'+username, true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            var res = JSON.parse(xhr.response);
            document.getElementById("user-login").innerHTML = res.login;
            document.getElementById("user-name").innerHTML = res.name;
            document.getElementById("user-image").src = res.avatar_url;
            getUserRepos(username);
        }
    };

    xhr.send();
}

function getUserRepos(user) {
    var method = 'GET';
    var uri = '/users/'+user+'/repos';

    xhr.open(method, url+uri, true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            var res = JSON.parse(xhr.response);
            var list = document.createElement('ul');
            repos.appendChild(list);
            Object.values(res).forEach(element => {
                var link = document.createElement('a');
                var li = document.createElement('li');
                li.appendChild(link);
                link.innerHTML = element.name;
                link.href = element.html_url;
                list.appendChild(li);
            });
        }
    };

    xhr.send();
}