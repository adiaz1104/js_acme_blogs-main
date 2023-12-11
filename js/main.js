//1 is correct
function createElemWithText(HTMLelement = "p", textContent = "", className = "") {
	const elem = document.createElement(HTMLelement);
	elem.innerText = textContent;
	elem.className = className;
	return elem;
}

//2 is correct
function createSelectOptions(users) {
  if (!users) {
    return undefined;
  }   
  const options = [];
  users.forEach(user => {
    const option = document.createElement('option');
    option.value = user.id;
    option.textContent = user.name;
    options.push(option);
  });
  return options;
}

//3 is correcgt
function toggleCommentSection(postId) {
  if (!postId) {return undefined };
  const section = document.querySelector(`section[data-post-id="${postId}"]`);
  if (section) {
    section.classList.toggle('hide');
  }
  return section;
}

//4 is correct
function toggleCommentButton (postId) {
  if (!postId) {return undefined;}
  const buttonElem = document.querySelector(`button[data-post-id = "${postId}"]`);
  if (buttonElem != null) {
    buttonElem.textContent === "Show Comments" ? (buttonElem.textContent = "Hide Comments") : (buttonElem.textContent = "Show Comments");
  }
  return buttonElem;
}
  
//5 is correct
function deleteChildElements(parentElement) {
  if(!parentElement || !(parentElement instanceof HTMLElement)) {return undefined;}
  let child = parentElement.lastElementChild;
  while (child) {
  parentElement.removeChild(child);
  child = parentElement.lastElementChild;
  }
  return parentElement;
}

//6 is correct
function addButtonListeners () {
  let mainElem = document.querySelector('main')
  let nodeList = mainElem.querySelectorAll('button')
  if(nodeList){
    for(let i = 0; i < nodeList.length; i++){
      let button = nodeList[i]
      let postId = button.dataset.postId
      if(postId) {
        button.addEventListener('click', function(event){
        toggleComments(event, postId), false})}
    }
  }
  return nodeList;
}

//7 is correct
function removeButtonListeners () {
  let mainElem = document.querySelector('main')
  let nodeList = mainElem.querySelectorAll('button')
  console.log(nodeList)
  if(nodeList){
    for(let i = 0; i < nodeList.length; i++){
      let button = nodeList[i]
      postId = button.dataset.postId
      if(postId) {
        button.removeEventListener('click', function(event){ 
        toggleComments(event, postId), false})
    }}
  }
  return nodeList;
}

//8 is correct
  function createComments(comments) {
    if (!comments) {return undefined;}
    let fragment = document.createDocumentFragment();
    comments.forEach(comment => {
      let article = document.createElement('article');
      //const h3Elem = createElemWithText('h3',comment.name);   //This line does not work
      let nameElem = document.createElement('h3');
      nameElem.textContent = comment.name;
      article.appendChild(nameElem);
      //let bodyElem = document.createElemWithText('p',comment.body); //This line does not work
      let bodyElem = document.createElement('p');
      bodyElem.textContent = comment.body;
      article.appendChild(bodyElem);
      //let emailElem = document.createElemWithText('p', `From: ${comment.email}`); //This line does not work
      let emailElem = document.createElement('p');
      emailElem.textContent = `From: ${comment.email}`;
      article.appendChild(emailElem);
      fragment.appendChild(article);
    });
    return fragment;
}

//9 is correct
  function populateSelectMenu(users) {
    if (!users) {return undefined};
      let menuElem = document.querySelector("#selectMenu");
      let options = createSelectOptions(users);
    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      menuElem.append(option);
    }
  return menuElem;
}

//10 is correct
async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const userData = await response.json();
    return userData;
  } catch (err) {
    console.error(err);
  }
}

//11 is correct
async function getUserPosts(id) {
  if(!id) {return undefined};
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    const idData = await response.json();
    return idData;
  } catch (err) {
    console.error(err);
  }
}

//12 is correct
async function getUser(userId) {
  if(!userId) {return undefined};
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

//13 is correct
async function getPostComments(postId) {
  if(!postId) {return undefined};
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post comments');
    }
    const commentsData = await response.json();
    return commentsData;
  } catch (error) {
    console.error('Error fetching post comments:', error);
    throw error;
  }
}

//14 is correct
async function displayComments(postId) {
  if(!postId) {return undefined};
  let section = document.createElement("section");
  section.dataset.postId = postId;
  section.classList.add("comments", "hide");
  const comments = await getPostComments(postId);
  const fragment = createComments(comments);
  section.append(fragment);
  console.log(section);
  return section;
}

//15 is correct
async function createPosts(posts) {
  if(!posts) {return undefined};
  let fragment = document.createDocumentFragment();  
  for (const post of posts) {                        
    const article = document.createElement('article');  
    const h2 = createElemWithText('h2', post.title);  
    const p1 = createElemWithText('p', post.body);  
    const p2 = createElemWithText('p', `Post ID: ${post.id}`);  
    const author = await getUser(post.userId);   
    const p3 = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`); 
    const p4 = createElemWithText('p', `${author.company.catchphrase}`);  
    const button = createElemWithText('button', 'Show Comments');  
    button.dataset.postId = post.id;     
    article.append(h2, p1, p2, p3, p4, button);
    const section = await displayComments(post.id); 
    article.append(section); 
    fragment.append(article); 
  }
  return fragment;
} 

//16 is correct
async function displayPosts (posts) {
  let main = document.querySelector("main");
  let element = (posts) ? await createPosts(posts) : document.querySelector("p"); //tried "main p", "p", etc
  main.append(element);
  return element;
}


//17 is correct
function toggleComments(event, postId){
  if (!event || !postId){
      return undefined;
  }
  event.target.listener = true;
  let section  = toggleCommentSection(postId);
  let button = toggleCommentButton(postId);
  return [section, button];
}

//18 is correct
async function refreshPosts (posts) {
  if (!posts){return undefined};
  let removeButtons = removeButtonListeners();
  let main = deleteChildElements(document.querySelector("main"));
  let fragment = await displayPosts(posts);
  let addButtons = addButtonListeners();
  return [removeButtons, main, fragment, addButtons];
}



//19 is correct
async function selectMenuChangeEventHandler(e) {
  if(!e) {return undefined};
  document.getElementById("selectMenu").disabled = true;
  let userId = e?.target?.value || 1;
  let posts = await getUserPosts(userId);
  let refreshPostsArray = await refreshPosts(posts);
  document.getElementById("selectMenu").disabled = false;
  return [userId, posts, refreshPostsArray];
}


//20 is correct
async function initPage() {
  let users = await getUsers();
  let select = populateSelectMenu(users);
  return [users, select];
}

//21 is correct
function initApp(){
  initPage();
  let select = document.getElementById("selectMenu");
  select.addEventListener("change", selectMenuChangeEventHandler, false);
}


document.addEventListener("DOMContentLoaded", initApp, false);




