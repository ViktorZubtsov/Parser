let   inputFile = document.getElementById("file"),
        form = document.getElementById("form"),
        app = document.getElementById("app"),
        inputType = {file: "multiple",email: "multiple"},
        masks = {};


function parser(File) {
    if (!File) {return;}
    
    let reader = new FileReader(),
        json;

    reader.readAsText(File);
    reader.onload = function() {
        json = reader.result;
        renderForm(JSON.parse(json));
       
    };
    
    app.firstElementChild.remove(); 
}

function renderForm(data) {
    form.innerHTML = "";
    masks = {};

    Object.keys(data).map(a => {
        switch (a) {
            case "name":
                renderlegend(data[a]);
                break;
            case "fields":
                renderFields(data[a]);
                break;
            case "references":
                renderRefs(data[a]);
                break;
            case "buttons": 
                renderButtons(data[a]);
                break;
        }
    });
    console.log(data);

    function renderlegend(name) {
        let legend = document.createElement('legend');

        name = name[0].toUpperCase() + name.slice(1);
        name = name.replace(/_/g, " ");
        
        legend.innerHTML = name;
        form.appendChild(legend);
    }


    function renderFields (fields) {
        let id = 0;

        fields.map(obj => {
            let {label, input} = obj,
                oneField;

            if (label) {
                oneField = document.createElement('label');
                oneField.setAttribute('for', id);
                oneField.innerHTML = label;
                form.appendChild(oneField);
            }

            if (input) {
                oneField = renderInput(input, id);
                form.appendChild(oneField);
            }
            id++;

        });
    if (Object.keys(masks).length) {renderMasks();}
    }





    function renderInput(input, id) {
        if (input.multiple && !(inputType[input.type] === "multiple")) {
            delete input.type;
            return renderSelect(input, id);
        }  
    
        if (input.type === "textarea") {
            delete input.type;
            return renderTextarea(input, id);
    
        } else if (input.type === "file") {
            return renderInputFile(input, id);
        }
    
        let inputField = document.createElement('input');
            inputField.setAttribute('id', id);
    
        for (let attribute in input) {
            
            if (Array.isArray(input[attribute])) {
                inputField.setAttribute('list', attribute);
                renderDataList(attribute, input[attribute]);
    
            } else if (attribute === 'mask') {
                inputField.setAttribute('type', 'text');
                inputField.setAttribute('placeholder', input[attribute]);
                masks[id] = `${input[attribute]}`;
                
            } else if (input[attribute] === true) {inputField.setAttribute(attribute, '');}
            else if (input[attribute] !== 'false') {inputField.setAttribute(`${attribute}`, input[attribute]);}
        }
        return inputField;
    
    }
    
    
    function renderInputFile(input, id) {
        
        let oneField = document.createElement('label');
            oneField.setAttribute('for', id);

        oneField.innerHTML = 'Загрузить файл';
        form.appendChild(oneField);
    
        let inputFileField = document.createElement('input');
            inputFileField.setAttribute('id', id);
    
        for (let attribute in input) {
            
            if (attribute === "filetype") {
                let strAccept = "";
                input[attribute].map(type   => strAccept += "." + type + ", ");
                inputFileField.setAttribute('accept', strAccept.slice(0, -2));
    
            } else if (input[attribute] === true) {inputFileField.setAttribute(attribute, '');}
            else if (input[attribute] !== 'false'){ inputFileField.setAttribute(`${attribute}`, input[attribute]);}
        }
        return inputFileField;
    
    }
    
    function renderSelect(input, id) {
        let selectField = document.createElement('select');
            selectField.setAttribute('id', id);
    
        for (let attribute in input) {
    
            if (Array.isArray(input[attribute])) {
                input[attribute].map(opt => {
                    let option = document.createElement('option');
                    option.setAttribute('value', opt);
                    option.innerHTML = opt;
                    selectField.appendChild(option);
                });
    
            } else if (input[attribute] === true) {selectField.setAttribute(attribute, '');}
            else if (input[attribute] !== 'false') {selectField.setAttribute(`${attribute}`, input[attribute]);}
        }
        return selectField;
    }
    
    function renderTextarea(input, id) {
        let textField = document.createElement('textarea');
            textField.setAttribute('id', id);
        for (let attribute in input) {
            
            if (input[attribute] === true) {textField.setAttribute(attribute, '');}
            else if (input[attribute] !== 'false') {textField.setAttribute(`${attribute}`, input[attribute]);}
        }
        return textField;
    }
    
    function renderDataList(attribute, options) {
        let dataList = document.createElement('datalist');
            dataList.setAttribute('id', attribute);
            form.appendChild(dataList);
    
        options.map (value => {
            let option = document.createElement('option');
            option.setAttribute('value', value);
            dataList.appendChild(option);
        });
    }
    
    function renderMasks() {
        for (let id in masks) {
            $(`#${id}`).mask(`${masks[id]}`);
        }
    }
    
    function renderRefs(refs) {
        let id = 1000;
    
        refs.map(ref => {
            if (refs[0].input) {
                if (ref.input) {
                    let wrap = document.createElement('fieldset');
                        wrap.setAttribute('class', 'check');
                        wrap.setAttribute('id', 'check');
                        form.appendChild(wrap);
    
                    let inputField = renderInput(ref.input, id);
                        wrap.appendChild(inputField);
                } else {
                    renderLink(ref, "check");
                }
            } else {
                renderLink(ref);
            }
        });
    }
    
    function renderLink(ref, wrapID) {
        let {text, ref: link} = ref,
            textWithoutRef = ref['text without ref'],
            wrapRef = document.createElement('fieldset');
            wrapRef.setAttribute('class', 'send');
    
        if (wrapID) {
            const wrap = document.getElementById(wrapID);
            wrap.appendChild(wrapRef);
        } else {
            form.appendChild(wrapRef);
        }
        
        if (textWithoutRef) {
            let textField = document.createElement('span');
                textField.innerHTML = textWithoutRef;
                wrapRef.appendChild(textField);
        }    
    
        let linkField = document.createElement('a');
            linkField.setAttribute('href', link);
            linkField.innerHTML = text;
            wrapRef.appendChild(linkField);
    }
    
    function renderButtons(buttons) {
        let wrap = document.createElement('fieldset');
            form.appendChild(wrap);
    
        buttons.map(but => {
            let buttonTag = document.createElement('button');
                buttonTag.innerHTML = but.text;
                wrap.appendChild(buttonTag);
        });
    }
}
