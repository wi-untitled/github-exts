
console.log("Я просто лог не удаляй меня плиз");

const CLIENT_ID = "Iv1.1247dc257ee98cdd";
const REDIRECT_URL = "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request && request.action === 'redirect') {
        // This is a waty how to make redirect from github page and open a new tab
        // because oauth need to be auth-ed via a new tabbing aproach
        chrome.tabs.create({ url: REDIRECT_URL });
    }

    if (request && request.action === 'logout') {
      // This is a waty how to make redirect from github page and open a new tab
      // because oauth need to be auth-ed via a new tabbing aproach
      chrome.tabs.create({ url: 'https://github.com/logout' });
  }
});

chrome.webNavigation.onCompleted.addListener(function(details) {
    // This is a way how to check whether redirection cames from needed host
    console.log(details)
    if (details.url && details.url.startsWith('http://localhost:3000/')) {
      const urlParams = new URLSearchParams(new URL(details.url).search);
      const code = urlParams.get('code');
      
      if (code) {
        // Proccess actions when redirect is successfully
        console.log('Received code:', code);
        chrome.storage.local.set({ 'github-exts/CODE': code }, function() {
            console.log('Code has been saved to Chrome Storage:', code);
        });
      }
    }
  });
  

  //  "https://github.com/logout" start flow logouting
  //  "https://github.com/" end flow log outing 