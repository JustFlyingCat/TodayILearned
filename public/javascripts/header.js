onload = function() {

    const home = document.getElementById("Home");
    const allUsers = document.getElementById("AllUsers");
    const allPosts = document.getElementById("AllPosts");
    const createPost = document.getElementById("CreatePost");
    const login = document.getElementById("login");
    const title = document.title;

    if (title == 'Today i learned') {
        home.classList.add('active');
    } else if(home.classList.contains('active')) {
        home.classList.remove('active');
    }

    if (title == 'All Users') {
        allUsers.classList.add('active');
    } else if(allUsers.classList.contains('active')){
        allUsers.classList.remove('active');
    }

    if (title == 'All Posts') {
        allPosts.classList.add('active');
    } else if(allPosts.classList.contains('active')){
        allPosts.classList.remove('active');
    }

    if (title == 'Create a Post') {
        createPost.classList.add('active');
    } else if(createPost.classList.contains('active')){
        createPost.classList.remove('active');
    }

    if (title == 'login') {
        login.classList.add('active');
    } else if(login.classList.contains('active')){
        login.classList.remove('active');
    }
}