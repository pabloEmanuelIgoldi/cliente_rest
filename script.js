$(document).ready(function() {
    

    // Realizar la llamada a la API
    $('#callServices').click(function() {
        $('#json-container').empty();
        //url: 'https://jsonplaceholder.typicode.com/users',
        //url: 'http://localhost:8080/personas',

        var dataParam;
        var hayParametro =$('input[name="hayParametro"]:checked').val();
        if(hayParametro=='true'){
            dataParam = JSON.stringify($('#params').val()).replace(/"/g, '').replace(/'/g, '"');
        }       

        $.ajax({
            url: $('#url').val(),
            method: $('input[name="metodoHttp"]:checked').val(),
            data: dataParam,
            //data: JSON.stringify({nombre: 'pab', pass: '1124'}),
            contentType: 'application/json',
            success: function(data) {
                const jsonString = JSON.stringify(data, null, 2);
                $('#json-container').html(syntaxHighlight(jsonString));
            },
            error: function(error) {
                msjError = "<span class='msjError'>"
                            +"ERROR EN LA LLAMADA AL SERVICIO: " 
                            +"<br>-URL:"+$('#url').val()
                            +"<br>-METODO: "+ $('input[name="metodoHttp"]:checked').val() 
                            if($('input[name="hayParametro"]:checked').val()==true){
                                +"<br>-PARAMETROS: "+$('#params').val()
                            }else{
                                +"<br>-SIN PARAMETROS"
                            }                                
                            +". </span>";
                $('#json-container').html(msjError);
                console.error('Error en el servicio:', JSON.stringify(error.responseJSON));
            }
        });
    });


    // Función para resaltar la sintaxis del JSON
    function syntaxHighlight(json) {
        //console.log(json);
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            let cls = 'json-number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'json-key';
                } else {
                    cls = 'json-string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'json-boolean';
            } else if (/null/.test(match)) {
                cls = 'json-null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }
});