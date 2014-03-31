function email(name, domain,tld, link){if(link.length == 0){link = name + '@' + domain + '.' + tld;}var display_this = '<a href="mailto:' + name + '@' + domain + '.' + tld + '">' + link + '</a>';document.write(display_this);}

$(document).ready(function(){
    var s = skrollr.init();
});