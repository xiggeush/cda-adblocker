var logs=[]
var on=true

function callback(details)
{
    logs.push(JSON.stringify(details))
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.greeting=='on')
    {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            disableRulesetIds: [],
            enableRulesetIds: ['cda']
        })
        on=true
    }
    else if(request.greeting=='off')
    {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            disableRulesetIds: ['cda'],
            enableRulesetIds: []
        })
        on=false
    }
    else if(request.greeting=='isOn')
    {
        sendResponse(on)
    }
    else if(request.greeting=='getLogs')
        sendResponse(logs)
})

var filter={urls: ["*://*.cda.pl/*"], types: ['media']}

chrome.webRequest.onBeforeRequest.addListener(callback, filter);