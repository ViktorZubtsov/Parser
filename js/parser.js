// let data = {
//     "name":"login",
//     "fields":[
//         {
//             "label":"Enter your login or email",
//             "input":{
//                 "type":"text",
//                 "required":true,
//                 "placeholder": "login or email"
//             }
//         },
//         {
//             "label":"Enter your password",
//             "input":{
//                 "type":"password",
//                 "required":true,
//                 "placeholder": "password"
//             }
//         }
//     ],
//     "references":[
//         {
//             "text":"Forgot password?",
//             "ref":"rememberpassword"
//         },
//         {
//             "text":"Create new account",
//             "ref":"signup"
//         }
//     ],
//     "buttons":[
//         {
//             "text":"Login"
//         }
//     ]
// };


let app = document.getElementById('app');
let i = '';
let elem = '';
// parseSignup(data,app);


function parseSignup(data,app) {


    
    app.innerHTML = `
        <form action="" method="post" >
            <legend>${data.name}</legend>
            <fieldset class="fields">
                ${renderInput(data)}
            </fieldset>
            <fieldset  class="send">
                ${renderButtons(data)}
                ${renderReferences(data)}
            </fieldset>

        </form> 
    `;
   

    function renderInput(data) {
        let elem = '';
    
        for (i in data.fields) {
 
 
           elem += `<label>${data.fields[i].label}</label><input type="${data.fields[i].input.type}"  
                        placeholder="${data.fields[i].input.placeholder}" 
                        ${data.fields[i].input.required == true ? 'required': ''}>`;


        } 

        return elem;
    }

    function renderButtons(data) {

        
        for (i in data.buttons) {
     

            elem += ` <button>${data.buttons[i].text}</button>`;
  
        } 
        
        return elem;
        
    }

    function renderReferences(data) {
        elem = '';
        for (i in data.references) {

            elem += `<span>${data.references[i]['text without ref']}</span>
                    <a href="${data.references[i].ref}">${data.references[i].text}</a>`;
  
        } 
        
        return elem;
        
    }
 

   
}



function doSomething() {
    let file = document.getElementById('file'),
        reader = new FileReader(),
        app = document.getElementById('app');


    if(file.files.length){
        reader.onload = function(){
            let data = JSON.parse(reader.result);

            
            console.log(data); // Delete 

            parseSignup(data,app);

        };
        reader.readAsBinaryString(file.files[0]);

        // file.parentNode.remove(); 
    }
}


console.log(data);

// function find() {
//     if (document.body.innerHTML.match("undefined") != null)
//       console.log('ee')
//     else
//     console.log()
// }
// find()
