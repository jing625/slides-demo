let $buttons = $('#buttonWrapper > button')
let $slides = $('#slides')
let current = 0
let $images = $slides.children('img')

makeFakeSlides()

bindEvents()
$(previous).on('click', function () {
  goToSlide(current - 1)
})
$(next).on('click', function () {
  goToSlide(current + 1)
})

let timer = setInterval(function () {
  goToSlide(current + 1)
}, 3000)

$('.container').on('mouseenter', function () {
  window.clearInterval(timer)
}).on('mouseleave', function () {
  timer = setInterval(function () {
    goToSlide(current + 1)
  }, 3000)
})

/*-------------*/

function makeFakeSlides () {
  let $firstCopy = $images.eq(0).clone(true)
  let $lastCopy = $images.eq($images.length - 1).clone(true)

  $slides.prepend($lastCopy)
  $slides.append($firstCopy)
}

function bindEvents () {
  $('#buttonWrapper').on('click', 'button', function (e) {
    let $button = $(e.currentTarget)
    let index = $button.index()
    goToSlide(index)
  })
}

function goToSlide (index) {
  if (index > $buttons.length - 1) {
    index = 0
  }else if (index < 0) {
    index = $buttons.length - 1
  }
  if (current === $buttons.length - 1 && index === 0) {
    $slides.css({transform: `translateX(${-($buttons.length + 1)*808}px)`})
      .one('transitionend', function () {
        $slides.hide()
          .offset()
        $slides.css({transform: `translateX(${-(index+1)*808}px)`})
          .show()
      })
  }
  else if (current === 0 && index === $buttons.length - 1) {
    $slides.css({transform: `translateX(0)`})
      .one('transitionend', function () {
        $slides.hide()
          .offset()
        $slides.css({transform: `translateX(${-(index+1)*808}px)`})
          .show()
      })
  }else {
    $slides.css({transform: `translateX(${-(index+1)*808}px)`})
  }
  current = index
}
