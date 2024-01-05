// 引入Chart.js库
let script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
document.head.appendChild(script);

// 等待Chart.js加载完成
script.onload = function() {
    // 词库
    let words = [
      "完完全全我", "女王", "这真的是我", "笑死我了", "女王一枚", "本宝", "互关", "啊啊啊啊啊这真的是我", 
      "本宝宝", "我对老公", "我对室友", "态度", "心情", "熏情", "mood", "木的", "好想吃", "我帮他", 
      "我真的会这样", "互关爱吃", "呃呃呃", "他/她怎么了", "就是那个谁", "那个谁真的死了", "我就长这样", 
      "你长得好吗", "你不要这样说好吗", "我老了以后", "互关老了以后", "扣一下", "很好笑", "好那个", "我老公", 
      "吃一下omg", "欧米茄", "天呐", "天哪", "这也太", "妈妈", "尊的是我", "长成这样我不知道我", "那里好痒", 
      "本女子", "我那里有事", "湿了", "是谁", "私我", "谢谢老公", "谢谢宝宝", "嗯嘟", "我们来了", 
      "我们走了", "隐隐约约听说", "我帮你", "还以为是**走了出来", "我跟你们有钱人拼了", "我要卖了", 
      "穷", "焦虑", "受不了了", "fjgjdnvid", "求你们看", "这一次我一定要赢", "slau", "崩溃", "b溃了", "奔溃", 
      "笑得好崩溃", "做不到这样别和我", "我老公必须这样", "我不行了", "好想鼠", "不想", "活了", "wob我不行了", 
      "咋了集美", "秒了", "一秒睡了", "哭了", "喷了", "哭了", "够了", "服了", "我真的在哭", "泪流满面了", 
      "我老公呢", "我的老公在哪里", "我和老公", "笑得我那里疼", "好想尖叫", "尖叫了", "wflbb", "我文化水平", 
      "我做题", "我解决问题", "哎呦喂", "我求你了", "年度视频", "年度", 
      "legend", "iconic", "对不起", "我下跪", "对不已", "寸不己", "已构成一种", "喂", "首页又在", "这是在干什么", 
      "我真的要双了", "我真的要拉", "黑了", "再发一个试试呢", "好嫉妒", "好季度", "好羡慕", "好精彩", "强势围观", 
      "我天呢", "没什么好说的", "封神", "好封神", "好震撼", "好美", "好米", "好难听", "概念感觉", "好丑", 
      "好穷", "有点像那个谁", "把我的**还给我", "这可以是我们", "闺蜜", "诡秘", "好闺蜜", "彪子", "怎么办", 
      "谁能送我", "好想要", "那个了", "怎么火了", "已举办", "谁问了", "没人问", "小姐姐你", "姐妹你", "这是在干什么", 
      "谁来管管", "别逼我", "我不知道这世界到底怎么了", "怎么你了", "什么意思呢", "我请问", "不认识", "nbcs", "我是", 
      "换id了", "前世是", "互关帮我转转", "早就说过"
    ];

    // 从URL获取用户ID
    let uid = null;
    let match = location.href.match(/https:\/\/www\.weibo\.com\/u\/(\d+)/);
    if (match) {
        uid = match[1];
    } else {
        alert('错误：无法从URL获取用户ID');
        throw new Error('无法从URL获取用户ID');
    }

    // 记录每个词的出现次数
    let wordCounts = {};

    let i = 0;

    // 创建对话框和进度条
    let dialog = document.createElement('dialog');
    dialog.style.width = '80%';
    dialog.style.height = '80%';
    dialog.style.maxWidth = '1280px';
    document.body.appendChild(dialog);

    let title = document.createElement('div');
    title.textContent = '微博廁度檢測機';
    title.style.fontSize = '48px';
    title.style.fontWeight = 'bold';
    title.style.textAlign = 'center';
    title.style.width = '100%'
    dialog.appendChild(title);

    let progressContainer = document.createElement('div');
    progressContainer.style.display = 'flex';
    progressContainer.style.justifyContent = 'center';
    progressContainer.style.alignItems = 'center';
    progressContainer.style.height = 'calc(100% - 80px)'
    dialog.appendChild(progressContainer);

    let progress = document.createElement('progress');
    progress.max = words.length;
    progressContainer.appendChild(progress);

    let progressText = document.createElement('p');
    progressContainer.appendChild(progressText);

    dialog.showModal();

    function searchWord(word) {
        let url = `https://www.weibo.com/ajax/statuses/searchProfile?uid=${uid}&page=1&q=${encodeURIComponent(word)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                wordCounts[word] = data.data.total;
                i++;

                // 更新进度条和进度文本
                progress.value = i;
                progressText.textContent = `${i}/${words.length}`;

                // 如果还有词未搜索，继续搜索
                if (i < words.length) {
                    searchWord(words[i]);
                } else {
                    // 所有词已搜索完，绘制条形图
                    drawChart();
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // 开始搜索第一个词
    searchWord(words[i]);

    function drawChart() {
        // 对词按出现次数从多到少排序
        let sortedWords = Object.keys(wordCounts).sort((a, b) => wordCounts[b] - wordCounts[a]);

        // 清空对话框
        while (dialog.firstChild) {
            dialog.removeChild(dialog.firstChild);
        }

        // 加回标题
        dialog.appendChild(title);

        let canvas = document.createElement('canvas');
        dialog.appendChild(canvas);

        let ctx = canvas.getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedWords.slice(0, 20),
                datasets: [{
                    label: '出现次数',
                    data: sortedWords.slice(0, 20).map(word => wordCounts[word]),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // 如果关键词数量大于20，将剩下的关键词以"{词语名(粗体)}：{出现次数}"的形式显示在图表下方
        if (sortedWords.length > 20) {
            let div = document.createElement('div');
            div.style.marginTop = '20px';
            sortedWords.slice(20).forEach(word => {
                let span = document.createElement('span');
                span.innerHTML = `<b>${word}</b>：${wordCounts[word]} `;
                div.appendChild(span);
            });
            dialog.appendChild(div);
        }

        // 点击遮罩层关闭对话框
        dialog.addEventListener('click', function(event) {
            if (event.target === dialog) {
                dialog.close();
            }
        });
    }
};
