/*mapear formulario e botao submit */

class Validator {
    constructor(){   /* 2 - CONSTRUTOR COM ARRAY DE VALIDAÇÕES */
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
            'data-password-validate',
        ]
    }

    /*MÉTODO VALIDATE - inicia a validação de todos os campos do form */
    validate(form) {  

        // resgata todas as validações para limpar
        let currentValidations = document.querySelectorAll('form .error-validation');
        if(currentValidations.length > 0){
            this.cleanValidations(currentValidations);
        }

        //pegar os inputs 
        let  inputs = form.getElementsByTagName('input');

       /* console.log(inputs); - mostra HTMLColections */

        //Transforma HTMLColections para Array
        let inputsArray = [...inputs];

       /* console.log(inputsArray); - mostra Array */

       //loop nos inputs e validação mediante ao que for encontrado

       inputsArray.forEach(function(input){
            /* console.log(input); mostrar os inputs */

            //loop em todas as validações existentes no array
            for(let i = 0; this.validations.length > i; i++){
                //verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null){ //pega os atributos do input

                       /* mostrar a validação 
                    console.log(input.getAttribute(this.validations[i]));
                    console.log('achou validacao');*/

                    /* limpando a string para virar um metodo - exemplo : data-min-length => dataminlength */
                    let method = this.validations[i].replace('data-', '').replace('-','');

                    //valor do input
                    let value = input.getAttribute(this.validations[i]);
                    // invocar o método

                    //console.log(method);
                    this[method](input, value);
                }
            }

       }, this); /* THIS - guardar o objeto. quanto acessar o this está se tratando do validator*/
    }

    //verifica se o input tem a quantidade minima de caracteres*/
    minlength(input, minValue){

        /*mostra o input o valor minimo exigido 
        console.log(input);
        console.log(minValue);*/
        let inputLength = input.value.length;
        if(inputLength < minValue){
            /*console.log(errorMessage);*/
            let errorMessage = 'O Campo precisa ter pelo menos ' + minValue + ' caracteres!';
            this.printMessage(input, errorMessage);
        }
    }

    //verifica se o input tem a quantidade máximo de caracteres
    maxlength(input, maxValue){

        /*mostra o input o valor minimo exigido 
        console.log(input);
        console.log(minValue);*/
        let inputLength = input.value.length;
        if(inputLength > maxValue){
            let errorMessage = 'O Campo precisa ter menos que ' + maxValue + ' caracteres!';
            this.printMessage(input, errorMessage);
        }
    }

    //validacao de email
    emailvalidate(input)
    {   // email@email.com -> email@email.com.br
        let re = /\S+@\S+\.\S+/;  //reject -  //
        let email = input.value;  
        if(!re.test(email)){
            let errorMessage = 'O e-mail precisa estar no formato exemplo@exemplo.com';
            this.printMessage(input, errorMessage);
        }
    }

    //validacao se o campo tem apenas letras

    onlyletters(input){
       
        let re = /^[A-Za-z]+$/;
        let inputValue = input.value;
        if(!re.test(inputValue)){
            let errorMessage = 'Este campo não aceita números ou caracteres especiais';
            this.printMessage(input, errorMessage);
        }
    }

   
    //verifica se o input é requerido

    required(input){
        let inputValue = input.value;
        if(inputValue === ''){
            let errorMessage = "Este campo é obrigatório";
           this.printMessage(input, errorMessage);
        }
    }

    //valida senhas iguais
    equal(input, inputName){
        let inputToCompare = document.getElementsByName(inputName)[0];
        if(input.value != inputToCompare.value){
            let errorMessage = 'Este precisa ser igual ao ' + inputName;
            this.printMessage(input, errorMessage);
         }
    }

    //valida campo senha
    passwordvalidate(input){

        console.log("aaaa");
        // explodir string em um array
        let charArr = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for(let i = 0; charArr.length > i; i++){
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))){
                uppercases++;
            }
            else if(!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }

        if(uppercases === 0 || numbers ===0){
            let errorMessage = "A senha precisa de um caractere maíusculo e um número";
             this.printMessage(input, errorMessage);
        }
    }

     //método para imprimir mensagem de erro na tela
     printMessage(input, msg){

        // quantidade de erros
        let errorsQty = input.parentNode.querySelector('.error-validation')

        if(errorsQty === null){
            
            let template = document.querySelector('.error-validation').cloneNode(true);
                
            template.textContent = msg;

                    
            /*Achar local para colocar a mensagem de error*/
            let inputParent = input.parentNode; /* Encontro o pai do input(full-box/half-box)*/
        
            template.classList.remove('template'); /* remove a classe template*/

            inputParent.appendChild(template);  /*filho do pai do input -haf ou full-box*/
        }
    }

    //metodo para limpar as validações da tela
    cleanValidations(validations){
        validations.forEach(el => el.remove());
    }

}


/* 1º  pegar os elementos formulario e o botao de submit   */

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator(); /*  2.1 */

// 1.1 evento que dispara as validações
submit.addEventListener('click', function(e) { //pega o botao e cria funçao básica 
    e.preventDefault(); // impedir o form fazer a função básica (enviar dados para o servidor)
    //console.log("FUNCIONOU!") ;
    validator.validate(form);   /*metodo validate mapeia todos inputs do formulario */
});