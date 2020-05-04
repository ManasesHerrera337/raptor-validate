

/*
* ***DOCUMENTACION***	
* ATRIBUTOS HTML
*	raptor-type=""	//tipo de datos permitido
*			-> text
*			-> number
*			-> email
*
*	raptor-minlength=""  // Minimo numero de carateres permitos
*	raptor-maxlength=""  // Máximo numero de carateres permitos
*	raptor-min=""	     // Número mínimo permitido. 
*	raptor-maxn="" 		 // Establece el número máximo permitido
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*/
//	***message***
var m_required = "Este campo es requerido";
var m_type_text = "Solo se admite texto"; 
var m_type_number = "Solo se admite número"; 
var m_type_email = "Solo se admite Email"; 



jQuery.fn.rtype = function() {
	return $(this[0]).attr('raptor-type');
}


	
jQuery.m_errors = function(element, message){  
	//'box-shadow': '1px 2px 5px #dc3545'	

	var element_class =  $(element).attr('name'); 
	var span_id = 'span_' + $(element).attr('name');
	var seletor_span = "#" + span_id;
    if($(seletor_span).length > 0){
  		//Si entra en el if significa que el elemento no está vacío
  		$(seletor_span).text(message);
	}else{

    	$(element).css('border', '1px solid #dc3545')
		.after('<span id="'+span_id+'" class="'+element_class+'" style="color:#dc3545; margin-top:7px;"><i>'+message+'</i></span>')
		.attr('onkeypress', 'deletError(this, ".'+element_class+'" )'); 
	}
}


jQuery.fn.raptor = function() { 
  

	var cont_error = 0;
	var element_error = "";
  	$.each(this[0], function(key, element ){
		
		/// VALIDATE ATTR REQUIRED
		if ($(element).prop('required')) {
			var value = $(element).val();
			if ( $.trim( value ) == "" || value.length == 0) {
				cont_error++;
				$.m_errors(element, m_required);
			}
		}
				
				

		// VALIDATE ATTR EMAIL
		if ($(element).attr('name') == 'email' || $(element).rtype() == 'email') {
			var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
		    if (!regex.test($(element).val().trim())) {
		        cont_error++;
		        $.m_errors(element, m_type_email);

		     }  
		}



				
	});

  	if (cont_error > 0) {
		return false;
  	}else{
  		return true;
  	}

};


function deletError(e, span_class){
	$(e).removeAttr('style').removeAttr('onkeyup');
	$(span_class).remove();
}

	