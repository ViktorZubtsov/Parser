let data ={
    "name":"addpost",
    "fields":[
    {
        "label":"Title",
        "input": {
            "type":"text",
            "required": true
        }
    },
    {
        "label":"Description",
        "input": {
            "type":"textarea",
            "required":true
        }
    },
    {
        "label":"Image",
        "input": {
            "type":"file",
            "required": true
        }
    },
    {
        "label":"Publish Date",
        "input": {
            "type": "date",
            "required": true
        }
    },
    {
        "label": "Author",
        "input": {
            "type": "text"
        }
    }
],
"references":[
    {
      "input":{
        "type":"checkbox",
        "required":true,
        "checked":"false"
      }
    },
    {
        "text without ref":"View Author Post",
        "text":"View Author Post",
        "ref":"viewauthor"
    }
  ],
    "buttons":[
    {
        "text":"Create Post"
    }
]
}

;


let app = document.getElementById('app');
let i = '';
let elem = '';


parseSignup(data,app);


function parseSignup(data,app) {
    app.innerHTML = `
        <form class="r" action="" method="post" >
            <legend  class="r">${data.name}</legend>
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
            let required = data.fields[i].input.required == true ? 'required': '';
            switch (data.name) {
                case 'addpost':
                    elem += `<label>${data.fields[i].label}</label><input type="${data.fields[i].input.type}"  
                                    ${required}>`;
    
                    break;     
                case 'singup':
                    
                    elem += `<label>${data.fields[i].label}</label><input type="${data.fields[i].input.type}"  
                    placeholder="${data.fields[i].input.placeholder}"
                    ${data.fields[i].input.required == true ? 'required': ''}>`;
    
                    break;

                default:
                    break;
            }
        } 
        return elem;
    }


    function renderReferences(data) {
        elem = '';
        let required = data.references[i].input.required == true ? 'required': '';
        let checked = data.references[0].input.checked == true ? 'checked': '';
        
            switch (data.name) {
                case 'addpost':
        
                        elem += ` <input ${required} type="${data.references[0].input.type}"
                                    checked="${checked}"><a>${data.references[1]['text without ref']}</a>
                                    <a href="${data.references[1].ref}">${data.references[1].text}</a>`;

                    break;     

                default:
                    break;

                
            } 
        
        return elem; 

    }

    function renderButtons(data) {      
        for (i in data.buttons) {
            elem += ` <button>${data.buttons[i].text}</button>`;            
        } 
        return elem;
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




// function find() {
//     if (document.body.innerHTML.match("undefined") != null)
//       console.log('ee')
//     else
//     console.log()
// }
// find()
}