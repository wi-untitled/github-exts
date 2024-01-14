console.log("Я просто лог не удаляй меня плиз");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    console.log({request})  
    

 });
 chrome.runtime.onConnect.addListener(port => {
    port.onDisconnect.addListener(()=>{
      //Your event will be fired in here
      console.log('disconnect')
    })
  })

//  