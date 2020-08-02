let data = {
    "name":"register",
    "fields":[
    {
        "input":{
            "type":"text",
            "required":true,
            "placeholder":"Enter full name"
        }
    },
    {
        "input":{
            "type":"email",
            "required":true,
            "placeholder":"Enter email"
        }
    },
    {
        "input":{
            "type":"password",
            "required":true,
            "placeholder":"password"
        }
    },
    {
        "input":{
            "type":"password",
            "required":true,
            "placeholder":"Confirm password"
        }
    }
    ],
    "references":[
        {
            "text without ref":"Already have account?",
            "text":"Login",
            "ref":"signin"
        }
    ],
    "buttons":[
    {
        "text":"Sign Up"
    }
]
};





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
 
 
           elem += `<input type="${data.fields[i].input.type}"  
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

            elem += ` <span>${data.references[i]['text without ref']}</span><a href="${data.references[i].ref}">${data.references[i].text}</a>`;
  
        } 
        
        return elem;
        
    }
  
}



// function doSomething() {
//     let file = document.getElementById('file'),
//         reader = new FileReader(),
//         app = document.getElementById('app');


//     if(file.files.length){
//         reader.onload = function(){
//             let data = JSON.parse(reader.result);

            
//             console.log(data); // Delete 

//             parseSignup(data,app);

//         };
//         reader.readAsBinaryString(file.files[0]);

//         // file.parentNode.remove(); 
//     }
// }