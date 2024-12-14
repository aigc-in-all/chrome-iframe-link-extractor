document.addEventListener('DOMContentLoaded', async () => {
  const urlList = document.getElementById('url-list');
  
  // 获取当前标签页
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // 注入并执行content script
  const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content-script.js']
  });
  
  const iframeUrls = results[0].result;
  
  if (iframeUrls.length === 0) {
    urlList.innerHTML = '<p class="no-frames">No iframes found on this page.</p>';
    return;
  }
  
  // 显示URL列表
  iframeUrls.forEach(url => {
    const div = document.createElement('div');
    div.className = 'url-item';
    
    const link = document.createElement('span');
    link.className = 'url-link';
    link.textContent = url;
    link.onclick = () => chrome.tabs.create({ url });
    
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copy';
    copyBtn.onclick = async () => {
      await navigator.clipboard.writeText(url);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
      }, 1000);
    };
    
    div.appendChild(link);
    div.appendChild(copyBtn);
    urlList.appendChild(div);
  });
}); 