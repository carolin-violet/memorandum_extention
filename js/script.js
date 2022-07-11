// 存储备忘录信息
MEMORANDUM_KEY = 'my_memorandum'

function setMemorandum(memorandumList) {
  localStorage.setItem(MEMORANDUM_KEY, JSON.stringify(memorandumList))
}

function getMemorandum() {
  return JSON.parse(localStorage.getItem(MEMORANDUM_KEY))
}

PHOTO_KEY = 'my_extension_photo'

function setPhoto(src) {
  localStorage.setItem(PHOTO_KEY, src)
}

function getPhoto() {
  return localStorage.getItem(PHOTO_KEY)
}

if (getPhoto()) {
  document.querySelector('#bg-image').src = getPhoto()
}



// 操作列表
let memorandumListEl = document.querySelector('.memorandum-list')
let memorandumList = getMemorandum() || []

function changeMemorandumList() {
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
memorandumTextEl.addEventListener('input', (event) => {
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
function addDel() {
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

placeholderObj = {
  "baidu": '百度开发者搜索',
  "google": '谷歌搜索',
  "youdao": '有道中英翻译',
  "csdn": 'csdn搜索',
  "juejin": '掘金搜索',
  'bilibili': "bilibili搜索",
  "youtube": 'youtube搜索',
  "github": 'github搜索',
  "gitee": 'gitee搜索',
  "stackoverflow": 'stackoverflow搜索',
  "zhihu": 'zhihu搜索'
}

searchInput = document.querySelector('.search-input')
let temp = 'baidu'
let searchKey = null

const changeIConList = document.querySelectorAll('.change-icon')
changeIConList.forEach(icon => {
  icon.addEventListener('click', () => {
    searchInput.placeholder = placeholderObj[icon.id.split('-')[1]]
    temp = icon.id.split('-')[1]
    searchInput.value = null
  })
})

function openSearch() {
  switch (temp) {
    case "baidu":
      window.open(`https://kaifa.baidu.com/searchPage?wd=${searchKey}&module=SEARCH`);
      break;
    case 'google':
      window.open(`https://www.google.com.hk/search?q=${searchKey}`);
      break;
    case 'youdao':
      window.open(`https://dict.youdao.com/w/eng/${searchKey}/#keyfrom=dict2.index`);
      break;
    case 'csdn':
      window.open(`https://so.csdn.net/so/search?q=${searchKey}`);
      break;
    case 'juejin':
      window.open(`https://juejin.cn/search?query=${searchKey}`);
      break;
    case 'bilibili':
      window.open(`https://search.bilibili.com/all?keyword=${searchKey}`);
      break;
    case 'youtube':
      window.open(`https://www.youtube.com/results?search_query=${searchKey}`);
      break;
    case 'github':
      window.open(`https://github.com/search?q=${searchKey}`);
      break;
    case 'gitee':
      window.open(`https://search.gitee.com/?skin=rec&type=repository&q=${searchKey}`);
      break;
    case 'stackoverflow':
      window.open(`https://stackoverflow.com/search?q=${searchKey}`);
      break;
    case 'zhihu':
      window.open(`https://www.zhihu.com/search?type=content&q=${searchKey}`);
      break;
  }
}

searchInput.addEventListener('input', (event) => {
  searchKey = event.target.value.trim()
})

searchInput.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    openSearch()
    event.target.value = null
  }
})

document.getElementById('search-icon').addEventListener('click', () => {
  openSearch()
  searchInput.value = null
})

// 更新图片
// 点击整个按钮出发上传按钮
inputEl = document.querySelector('.photo-input')
document.querySelector('#set-photo').addEventListener('click', (event) => {
  inputEl.click()
})

inputEl.addEventListener('change', (event) => {
  const reader = new FileReader()
  reader.readAsDataURL(event.target.files[0])
  reader.onload = function (thePhoto) {
    document.querySelector('#bg-image').src = thePhoto.target.result
    setPhoto(thePhoto.target.result)
  }
})


bgImage = document.querySelector('.bg-image')
searchInput.onfocus = function() {
  bgImage.classList.add('search-focus')
}
searchInput.onblur = function() {
  bgImage.classList.remove('search-focus')
}
memorandumTextEl.onfocus = function() {
  bgImage.classList.add('search-focus')
}
memorandumTextEl.onblur = function() {
  bgImage.classList.remove('search-focus')
}