function doSomething() {

    let file = document.getElementById('file');
    let reader = new FileReader();

    if(file.files.length){
        
        reader.onload = function(e){

            let data = JSON.parse(reader.result);
            console.log(data);

                // Signin
            let form = document.getElementById('form');
            let name = data.name;
            let fieldsAll = data.fields;
            // let required;
            // data.fields[0].input.required == true ? required = "required" : " ";

            form.innerHTML+= '<p> ' + name + '<input type="text" size="40"> </p>';
            form.innerHTML+=   '<label for="email">' + fieldsAll[0].label +'</label>';
            form.innerHTML+= `<input placeholder=${data.fields[0].input.placeholder} type=${data.fields[0].input.type} />`;
            form.innerHTML+=   '<label for="email">' + fieldsAll[1].label +'</label>';
            form.innerHTML+= `<input  placeholder=${data.fields[1].input.placeholder} type=${data.fields[1].input.type} />`;

            
        

        };
        reader.readAsBinaryString(file.files[0]);
        
    }
}







