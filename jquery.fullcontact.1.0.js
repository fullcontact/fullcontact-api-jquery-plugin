//jQuery FullContact Plugin - VERSION 1.0

(function($) {
	$.fullcontact = {
		baseURL: 'https://api.fullcontact.com/',
		vcardEndpoint: 'v2/person.vcf',
		personLookupEndpoint: 'v1/person.json',
		buildURL: function(endpoint, apiKey, options) {
			var optionsString = ""
			for(var opt in options) optionsString += "&"+escape(opt)+"="+escape(options[opt]);
			optionsString = "?apiKey="+apiKey+optionsString;
			return this.baseURL+endpoint+optionsString;
		},
		executeRequest: function(url, method, dataType, oncomplete, data) {
			$.ajax(url,{
                                async:true,
				type: method,
                                success: function(response){
                                        if(oncomplete) oncomplete(response);
                                },
                                error: function(obj,status,error){
                                        if(oncomplete) oncomplete({status: obj.status, message: error});
                                },
				data: data,
                                dataType: dataType 
                        });
		},
		emailLookup: function(apiKey,emailAddress,oncomplete,options) {
			options = options || {};
			options.email = emailAddress;
			var url = this.buildURL(this.personLookupEndpoint,apiKey,options);
			this.executeRequest(url,'GET','jsonp',oncomplete);
		},
		enrichVCard: function(apiKey,vcard,oncomplete,options) {
			var url = this.buildURL(this.vcardEndpoint,apiKey,options);
			this.executeRequest(url,'POST','text',oncomplete,{vcard:vcard});
		} 
  	};
	$.fn.fullcontact = $.fullcontact;
})(jQuery);
