function getIframeUrls() {
  const iframes = document.getElementsByTagName('iframe');
  const urls = [];
  
  for (const iframe of iframes) {
    const src = iframe.src;
    if (src && !urls.includes(src)) {
      urls.push(src);
    }
  }
  
  return urls;
}

getIframeUrls(); 