const addNewTodo = () => {
  // 取得使用者填寫的值
  const value = $('#todo').val()

  // 檢查 input 有沒有值
  if (!value) {
    alert('請填寫資料')
    return
  }
  
  
  // 插入資料
  $('.todolist__item').append(`<li class="no-completed">
    <input class="todolist__input" type="checkbox" />
    <span>${value}</span>
    <a class="delete" href="#">
      <i class="fa fa-x"></i>
    </a>
  </li>`)

  // 清除代辦
  $('#todo').val('')
}


// 更新已完成項目
const updateCompletedCount = () => {
  const count = $('.todolist__item').find('.completed').length

  $('.todolist__info').find('a').text(count)
}


const deleteTodo = (e) => {
  console.log($(e.target).parent().closest('li'))
  $(e.target).parent().closest('li').remove()
}

// 清除已完成項目
const clearCompletedTodo = () => {
  // 找到 completed 的待辦事項，並移除 .completed class
  $('.todolist__item').find('.completed').remove()

  // 更新已完成項目
  updateCompletedCount()
}


// 監聽
$(() => {

  // 每一條代辦事項 delete 監聽 click 事件
  $('.todolist__item').on('click', '.delete', (e) => deleteTodo(e))

  // 狀態：全部、待完成、已完成
  $('.todolist__tabs li').each(function () {
    $(this).click(function () {
      $(this).siblings().find('a').removeClass('active')
      $(this).find('a').addClass('active')
    })
  })

  // 使用者可以將待辦事項設定成已完成
  // 步驟一：監聽每一個 todo list，前面 checkbox 有被點擊時執行 Function
  $('.todolist__item').on('click', 'input', (e) => {
    console.log(e)
    // 步驟二：每條待辦事項根據條件，加上不同的 class：completed, no-completed
    const li = $(e.target).parent()

    if(li.hasClass('completed')){
      li.removeClass('completed')
      li.addClass('no-completed')
    } else {
      li.removeClass('no-completed')
      li.addClass('completed')
    }
    // 步驟三：更新已完成項目的數字
    const count = $('.todolist__item').find('.completed').length
    $('.todolist__info').find('a').text(count)

  })

  // 篩選全部
  $('.todolist__tabs').on('click', '.all', () => {
    $('.todolist__item').children().show()
  })

  // 篩選待完成
  $('.todolist__tabs').on('click', '.no-completed', () => {
    $('.todolist__item').children().show()
    $('.todolist__item').find('.completed').hide()
  })

  // 篩選已完成
  $('.todolist__tabs').on('click', '.completed', () => {
    $('.todolist__item').children().show()
    $('.todolist__item').find('.no-completed').hide()
  })

})