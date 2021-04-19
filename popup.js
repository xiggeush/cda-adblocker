var on=true
chrome.runtime.sendMessage({greeting: 'isOn'}, function(resp) {
    on=resp
    if(!on)
        document.getElementById('toggle').innerHTML='Turn on'
})

toggle=document.getElementById('toggle')
toggle.addEventListener('click', function() {
    if(on)
    {
        chrome.runtime.sendMessage({greeting: 'off'}, function(resp) {
            on=false
            toggle.innerHTML='Turn on'
        })
    }
    else
    {
        chrome.runtime.sendMessage({greeting: 'on'}, function(resp) {
            on=true
            toggle.innerHTML='Turn off'
        })
    }
})

logsButton=document.getElementById('logs')
logsButton.addEventListener('click', function() {
    chrome.runtime.sendMessage({greeting: 'getLogs'}, function(resp) {
        var blob=new Blob(resp, {type: 'text/plain'})
        var url=URL.createObjectURL(blob)

        chrome.downloads.download({
            url: url
        })
    })
})