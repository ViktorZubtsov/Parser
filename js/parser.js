let data ={};


let app = document.getElementById('app');
let i = '';
let elem = '';


// parseSignup(data,app);


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
    `
    
    ;
  

  
    function renderInput(data) {
        let elem = '';
    
      
            
            switch (data.name) {
                case 'addpost':
                    
                    for (i in data.fields) {
                        let required = data.fields[i].input.required == true ? 'required': '';
                        elem += `<label>${data.fields[i].label}</label><input type="${data.fields[i].input.type}"  
                                        ${required}>`;
                        } 
                    break;     
                case 'singup':
                    
                    elem += `<label>${data.fields[i].label}</label><input type="${data.fields[i].input.type}"  
                    placeholder="${data.fields[i].input.placeholder}"
                    ${data.fields[i].input.required == true ? 'required': ''}>`;
    
                    break;
                case 'website_color_scheme':
                    
                    elem += `<label>${data.fields[0].label}</label>
                                <fieldset>
                                    <input type="${data.fields[0].input.type}"
                                        value="${data.fields[0].input.colors[0]}">


                                        <input type="${data.fields[0].input.type}"
                                        value="${data.fields[0].input.colors[1]}">    

            
                                         <input type="${data.fields[0].input.type}"
                                         value="${data.fields[0].input.colors[2]}">    
 
            
                                         <input type="${data.fields[0].input.type}"
                                         value="${data.fields[0].input.colors[3]}">    
 

                                </fieldset>
                                <label>${data.fields[1].label}</label><input type="${data.fields[1].input.type}" 
                                ${data.fields[1].input.checked == true ? 'checked': ''}> 

                            `;
                    break;
                case 'login':

                    for (i in data.fields) {
                        elem += `<label>${data.fields[i].label}</label><input type="${data.fields[i].input.type}"  
                        placeholder="${data.fields[i].input.placeholder}" 
                        ${data.fields[i].input.required == true ? 'required': ''}>`;
                    }
                    break;
                case 'register':
                    for (i in data.fields) {


                        elem += `<input type="${data.fields[i].input.type}"  
                                     placeholder="${data.fields[i].input.placeholder}" 
                                     ${data.fields[i].input.required == true ? 'required': ''}>`;
             
             
                     } 
                        break; 
                case 'interview':
                    for (i in data.fields) {
                        elem += `<label>${data.fields[i].label}</label><input type="${data.fields[i].input.type}" 
                        ${data.fields[i].input.required == true ? 'required': ''}>`;
                    } 
                    
                        break; 
                default:
                    for (i in data.fields) {
                        let required = data.fields[i].input.required == true ? 'required': '';
                     

                        elem += `<label>${data.fields[i].label}</label><input 
                                        class='input' type="${data.fields[i].input.type}" 
                                        placeholder="${data.fields[i].input.placeholder}"  
                                        ${required}>`;
                        } 
                    break;
            }
      
        return elem;
    }


    function renderReferences(data) {
        elem = '';

        
            switch (data.name) {
                case 'addpost':
                    let required = data.references[0].input.required == true ? 'required': '';
                    let checked = data.references[0].input.checked == true ? 'checked': '';

                        elem += ` <input ${required} type="${data.references[0].input.type}"
                        class="check" checked="${checked}"><a>${data.references[1]['text without ref']}</a>
                                    <a href="${data.references[1].ref}">${data.references[1].text}</a>`;

                    break;     
                case 'website_color_scheme':
                        elem +='';
                    break;  
                case 'login':
                    for (i in data.references) {
                    elem += ` <a href="${data.references[i].ref}">${data.references[i].text}</a>`;
                    }
                    break; 
                case 'register':
                    for (i in data.references) {
                        elem += `<span>${data.references[i]['text without ref']}</span><a 
                                                 href="${data.references[i].ref}">${data.references[i].text}</a>`;
            
                    }
                    break; 
                    case 'interview':  
                    let interviewRequired = data.references[0].input.required == true ? 'required': '';
                    let interviewChecked = data.references[0].input.checked == true ? 'checked': '';
                            elem += ` <input ${interviewRequired} type="${data.references[0].input.type}"
                            class="check" checked="${interviewChecked}"><a>${data.references[1]['text without ref']}</a>
                                <a href="${data.references[1].ref}">${data.references[1].text}</a>`;

                        break; 
                default:
                    for (i in data.references) {
                        elem += ` <a href="${data.references[i].ref}">${data.references[i].text}</a>`;
                        }
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

}

function interview(data) {
    let fieldset = document.querySelector(".fields");
    let input =  fieldset.querySelectorAll('input');

    input[0].setAttribute('placeholder', `${data.fields[0].input.placeholder}`);
    input[2].setAttribute('placeholder', `${data.fields[2].input.placeholder}`);
    input[5].setAttribute('multiple', `${data.fields[5].input.multiple}`);
    input[5].setAttribute('technologies', `${data.fields[5].input.technologies}`);
    input[10].setAttribute('multiple', `${data.fields[10].input.multiple}`);
    input[10].setAttribute('filetype', `${data.fields[10].input.filetype}`);
    input[1].classList.add('mask-phone');
    input[8].classList.add('number-series');
    input[9].classList.add('division-code');
    

    
}


function doSomething() {
    let file = document.getElementById('file'),
        reader = new FileReader(),
        app = document.getElementById('app');


    if(file.files.length){
        
        reader.onload = function(){
            let data = JSON.parse(reader.result);
 
            
            console.log(data); // Delete 

            parseSignup(data,app,);
            clear();
            if (data.name == 'interview') {
                interview(data);
                jQuery(function($){
                    $('.mask-phone').mask(`${data.fields[1].input.mask}`);
                    $('.number-series').mask(`${data.fields[8].input.mask}`);
                    $('.division-code').mask(`${data.fields[9].input.mask}`);
                });
                
            }
        };
       
   
    
        reader.readAsBinaryString(file.files[0]);

        file.parentNode.remove(); 
    }
    function clear() {
        let e = app.querySelectorAll('*[placeholder="undefined"]');
       
        for (var i = 0; i < e.length; i++) {
          console.log(e[i].removeAttribute('placeholder'));
        }
  
        

    }

}



