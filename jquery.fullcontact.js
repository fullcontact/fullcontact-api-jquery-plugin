/*
 Copyright 2011 FullContact, Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
//jQuery FullContact Plugin - VERSION 2.1

(function ($) {
    $.fullcontact = {
        baseURL: 'https://api.fullcontact.com/',
        vcardEndpoint: 'v2/person.vcf',
        personLookupEndpoint: 'v2/person.json',
        buildURL: function (endpoint, apiKey, options) {
            var optionsString = "";
            for (var opt in options)
                optionsString += "&" + encodeURI(opt) + "=" + encodeURI(options[opt]);
            optionsString = "?apiKey=" + apiKey + optionsString;
            return this.baseURL + endpoint + optionsString;
        },
        executeRequest: function (url, method, dataType, onComplete, data) {
            $.ajax(url, {
                async: true,
                type: method,
                data: data,
                dataType: dataType
            })
                .done(function (response) {
                    if (onComplete instanceof Function)
                        onComplete.apply(this, [response]);
                })
                .fail(function (obj, status, error) {
                    if (onComplete instanceof Function)
                        onComplete.apply(this, [{status: obj.status, message: error}]);
                })
            ;
        },
        emailLookup: function (apiKey, emailAddress, onComplete, options) {
            options = options || {};
            options.email = emailAddress;
            var url = this.buildURL(this.personLookupEndpoint, apiKey, options);
            this.executeRequest(url, 'GET', null, onComplete);
        },
        twitterLookup: function (apiKey, twitterHandle, onComplete, options) {
            options = options || {};
            options.twitter = twitterHandle;
            var url = this.buildURL(this.personLookupEndpoint, apiKey, options);
            this.executeRequest(url, 'GET', null, onComplete);
        },
        phoneLookup: function (apiKey, phone, onComplete, options) {
            options = options || {};
            options.phone = phone;
            var url = this.buildURL(this.personLookupEndpoint, apiKey, options);
            this.executeRequest(url, 'GET', null, onComplete);
        }
    };
    $.fn.fullcontact = $.fullcontact;
})(jQuery);
