
// 存储相关
MEMORANDUM_KEY = 'my_memorandum'

function setMemorandum (memorandumList) {
  localStorage.setItem(MEMORANDUM_KEY, JSON.stringify(memorandumList))
}

function getMemorandum() {
  return JSON.parse(localStorage.getItem(MEMORANDUM_KEY))
}



// 操作列表
let memorandumListEl = document.querySelector('.memorandum-list')
let memorandumList = getMemorandum() || []

function changeMemorandumList () {
  memorandumListEl.innerHTML = ''

  if (memorandumList.length < 1) memorandumListEl.innerHTML = '暂无记录信息'

  memorandumList.forEach(memorandumItem => {
    memorandumNode = document.createElement('div')
    memorandumNode.innerHTML = `${memorandumItem.memorandum} <br> ${memorandumItem.time} <i class="iconfont icon-delete1" id="${memorandumItem.time}"></i>`
    memorandumListEl.appendChild(memorandumNode)
  })
  addDel()
}

changeMemorandumList(memorandumList)


// 添加备忘录信息
let memorandumTextEl = document.querySelector('.memorandum-text')
let memorandumText = null
memorandumTextEl.addEventListener('input', (event)=> {
   memorandumText = event.target.value
})
memorandumTextEl.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    memorandumList.push({
      memorandum: memorandumText.trim(),
      time: formatDateTime(new Date()).trim()
    })
    memorandumText = null
    event.target.value = null
    setMemorandum(memorandumList)
    changeMemorandumList(memorandumList)
  }
})



// 添加点击删除监听事件的方法
function addDel () {
  delIcons = document.querySelectorAll('.iconfont')
  delIcons.forEach(item => {
    item.addEventListener('click', (event) => {
      memorandumList = memorandumList.filter(memorandumObj => memorandumObj.time !== event.target.id)
      setMemorandum(memorandumList)
      changeMemorandumList(memorandumList)
    })
  })
}


// 格式化日期：yyyy-MM-dd hh:mm:ss
function formatDateTime(date) {
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  if (month < 10) {
    month = `0${month}`
  }
  if (day < 10) {
    day = `0${day}`
  }
  hour = hour.toString().padStart(2, '0')
  minute = minute.toString().padStart(2, '0')
  second = second.toString().padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}


// 监听输入框输入并打开新搜索页
searchInput = document.querySelector('.search-input')
let temp = 'baidu'

baiduItem = document.querySelector('#change-baidu')
baiduItem.addEventListener('click', () => {
  searchInput.placeholder = '百度开发者搜索'
  temp = 'baidu'
  searchInput.value = null
})

googleItem = document.querySelector('#change-google')
googleItem.addEventListener('click', () => {
  searchInput.placeholder = '谷歌搜索'
  temp = 'google'
  searchInput.value = null
})

youdaoItem = document.querySelector('#change-youdao')
youdaoItem.addEventListener('click', () => {
  searchInput.placeholder = '网易有道翻译'
  temp = 'youdao'
  searchInput.value = null
})



searchInput.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    if (temp === 'baidu') {
      window.open(`https://kaifa.baidu.com/searchPage?wd=${event.target.value.trim()}&module=SEARCH`)
    } else if (temp === 'google') {
      window.open(`https://www.google.com.hk/search?q=${event.target.value.trim()}`)
    } else if (temp === 'youdao') {
      window.open(`https://dict.youdao.com/w/eng/${event.target.value.trim()}/#keyfrom=dict2.index`)
    }
 }
})
