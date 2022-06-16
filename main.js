const createPost = function(btn) {
   let post = btn.parentElement;
   let content = post.querySelector(`textarea`).value;
   console.log(content);

   if (content === `` || typeof content === `undefined` || content === null) {
      return;
   }
   let key;
   if (post.classList.contains(`reply`)) {
      key = `replies`;
   }
   else if (post.classList.contains(`cmmnt`)) {
      key = `comments`;
   }

   let form = post.parentElement;
   let postBox = form.parentElement;
   let postSection = postBox.querySelector(`div.${key}`);




   posts   

   // let postBox = document.createElement(`div.post-box`);
   postBox.innerHTML =
      `<div class="post cmmnt">
         <a href="#" class="avtr"></a>
         <span class="usrnme-box">
            <a href="#" class="usrnme">admin</a>
            <a class="user-role">you</a>
         </span>
         <a class="post-date">2 weeks ago</a>

         <p class="post-main">${content}</p>

         <span class="votes">
            <button class="vote-btn" type="button">+</button>
            <span class="score">100</span>
            <button class="vote-btn" type="button">&minus;</button>
         </span>

         <button class="small-btn del" type="button"><i class="fa-solid fa-trash"></i>Delete</button>

         <button class="small-btn edit" type="button"><i class="fa-solid fa-pen"></i>Edit</button>
      </div>`;

   // console.log(posts);
   posts.insertBefore(postBox, form);

}



let data = JSON.parse(localStorage.getItem(`data-intrctv-cmmnts-by-mico-irvin`));

const readPost = function(dataSet, key, i) {
   let post = dataSet[key][i];
   let parentId = `p${dataSet["id"]}`;
   let postId = `p${post["id"]}`;
   let parentPost = document.querySelector(`#${parentId}`);
   let postSection = parentPost.querySelector(`div.${key}`);

   if (typeof postSection === `undefined` || postSection === null) {
      // If comments section or replies section does not exist yet.
      postSection = document.createElement(`div`);
      postSection.classList.add(`${key}`);
      parentPost.appendChild(postSection);
   }
   
   console.log(
      `parentId = ${parentId}
      postId = ${postId}
      post = ${post["content"]}`
   );

   let cssClass;
   if (key === `comments`) cssClass = `cmmnt`;
   else if (key === `replies`) cssClass = `cmmnt reply`;

   let postBox = document.createElement(`div`);
   postBox.classList.add(`post-box`);
   postBox.setAttribute(`id`, postId);
   postSection.appendChild(postBox);
   postBox.innerHTML =
      `<div class="post ${cssClass}">
         <a href="#" class="avtr"></a>
         <span class="usrnme-box">
            <a href="#" class="usrnme">${post["user"]["username"]}</a>
            <a class="user-role">?</a>
         </span>
         <a class="post-date">${post["createdAt"]}</a>

         <p class="post-main">${post["content"]}</p>

         <span class="votes">
            <button class="vote-btn" type="button">+</button>
            <span class="score">${post["score"]}</span>
            <button class="vote-btn" type="button">&minus;</button>
         </span>

         <button class="small-btn del" type="button"><i class="fa-solid fa-trash"></i>Delete</button>

         <button class="small-btn edit" type="button"><i class="fa-solid fa-pen"></i>Edit</button>
      </div>
      `;
}

const loopPosts = function(dataSet, key) {
   for(let i in dataSet[key]) {
      readPost(dataSet, key, i);
      let replies = dataSet[key][i][`replies`];
      if (typeof replies !== `undefined` && replies !== null && replies.length > 0) {
         // Loop through replies if there are replies.
         loopPosts(dataSet[key][i], `replies`);
      }
   }
}

const programFlow = function() {
   console.log(`Nice flow.`);
   loopPosts(data, `comments`);
   let createBtns = document.querySelectorAll(`.big-btn.create`);
   // const test = document.getElementById(`test`);
   createBtns.forEach(function(btn) {
      btn.addEventListener(`click`, function() {
         createPost(btn);
      });
   });
}

const fetchData = function() {
   const initialize = function(fetchedData) {
      console.log(fetchedData);
      localStorage.setItem(`data-intrctv-cmmnts-by-mico-irvin`, JSON.stringify(fetchedData));
      data = JSON.parse(localStorage.getItem(`data-intrctv-cmmnts-by-mico-irvin`));
      programFlow();
   }

   fetch(`./data.json`)
   .then(response => {
      return response.json();
   })
   .then(fetchedData => {
      // For web-based access.
      console.log(`JSON file was fetched!`);
      initialize(fetchedData);

   })
   .catch(error => {
      // For local file-based access.
      console.log(`Data object was accessed locally.`)
      initialize(initData);
   });
}


if (typeof data !== `undefined` && data !== null) {
   // Let's go!
   programFlow();
}
else {
   // Data does not exist in the localStorage.
   fetchData();
}















// try {
//    data = JSON.parse(localStorage.getItem("data-intrctv-cmmnts-by-mico-irvin"));
//    console.log(data);
// }
// catch {
//    alert(`hello`)
// }


// localStorage.setItem("data-intrctv-cmmnts-by-mico-irvin", JSON.stringify(data));


// let data = JSON.parse(localStorage.getItem("data-intrctv-cmmnts-by-mico-irvin"));
// console.log(data);














// const cmmntSection = document.querySelector(`section.comments`);
// cmmntSection.innerHTML += `
// <div class="post-box">
//   <div class="post form create cmmnt">
//     <a href="#" class="avtr"></a>
//     <textarea name="" id="" placeholder="Add a comment..." ></textarea>
//     <button type="submit" name="send-cmmnt" class="big-btn">SEND</button>
//   </div>
// </div>`;


// let b = document.querySelectorAll(`button[name="send-cmmnt"]`);
// console.log(b);

// let jsondata;

// const getjsondata = function(x) {
//    return x;
// }

// const myfunc = function() {
//    let a = 0;
//    fetch("./data.json")
//    .then(response => {
//       return response.json();
//    })
//    .then(x => {
//       console.log(x);
//       a = getjsondata(x);
//    });
//    return a;
// }

// let mico = myfunc();

// console.log(mico);

// let data = JSON.parse(localStorage.getItem("data")) || [];
// console.log(data);

// let data1 = [];

// data1.push({number: 3.14159});
// console.log(data1);

// localStorage.setItem("data1", JSON.stringify(data1));


