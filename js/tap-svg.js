const win = ['123', '159', '147', '258', '357', '369', '456', '789']
let computer = []
let player = []
let odd = false
choose()
let turn
//turn=='o' ? '' : (() => { $('.cover').toggle(); compuerturn() })()
Snap.plugin(function (Snap, Element, Paper, global) {
  Paper.prototype.circlePath = function (cx, cy, r) {
    var p = 'M' + cx + ',' + cy
    p += 'm' + -r + ',0'
    p += 'a' + r + ',' + r + ' 0 1,0 ' + (r * 2) + ',0'
    p += 'a' + r + ',' + r + ' 0 1,0 ' + -(r * 2) + ',0'
    return this.path(p, cx, cy)
  }
})
for (let index = 1; index < 10; index++) {
  $('.gamebox').append(`<div class="box" num=${index}></div>`)
  $(`.box[num=${index}]`).append(`<div class="mask" num=${index}></div>`)
  let w = $('.box').width()
  let h = $('.box').height()
  let test = Snap(w, h)
  test.attr({
    id: index
  })
  let path = test.path('')
  $(`.box[num=${index}]`)[0].appendChild(test.node)
  if (true) {
    $(`.mask[num=${index}]`).mouseover(function () {
      if (!$(`.box[num=${index}]`).hasClass('fill') && !$(`.mask[num=${index}]`).hasClass('isanimate')) {
        if (odd) {
          test.stop()
          test.animate({fill: 'black'}, 100)
          Snap.animate(0, w / 3, function (x) {
            let p1 = [w / 2, x]
            let p2 = [w - x, h / 2]
            let p3 = [w / 2, h - x]
            let p4 = [x, h / 2]
            path.attr({
              d: `M0 0L${space(p1)}L${w} 0L${space(p2)}L${w} ${h}L${space(p3)}L0 ${h}L${space(p4)}Z`
            })
          }, 500, mina.elastic)
          $(`.mask[num=${index}]`).mouseout(function () {
            test.stop()
            $(`.mask[num=${index}]`).off('click')
            $(`.mask[num=${index}]`).addClass('isanimate')
            test.animate({fill: 'white'}, 200)
            Snap.animate(w / 3, 0, function (x) {
              let p1 = [w / 2, x]
              let p2 = [w - x, h / 2]
              let p3 = [w / 2, h - x]
              let p4 = [x, h / 2]
              path.attr({
                d: `M0 0L${space(p1)}L${w} 0L${space(p2)}L${w} ${h}L${space(p3)}L0 ${h}L${space(p4)}Z`
              })
            }, 500, mina.bounce, () => { $(`.mask[num=${index}]`).removeClass('isanimate') })
          }).click(function (ev) {
            //$('.cover').toggle()
            choose('next')
            $(`.mask[num=${index}]`).parent().addClass('fill')
            odd = !odd
            $(`.mask[num=${index}]`).off('mousemove')
            $(`.mask[num=${index}]`).off('mouseout')
            //console.log('doit')
            test.attr({fill: 'black'})
            Snap.animate(0, w / 2 - w / 3, function (x) {
              let p1 = [x, 0]
              let p2 = [w - x, 0]
              let p3 = [w, x]
              let p4 = [w, h - x]
              let p5 = [w - x, h]
              let p6 = [x, h]
              let p7 = [0, h - x]
              let p8 = [0, x]
              path.attr({
                d: `M0 0L${space(p1)}L${space([w / 2, w / 3])}L${space(p2)}L${w} 0L${space(p3)}L${space([w - w / 3, h / 2])}L${space(p4)}L${w} ${h}L${space(p5)}L${space([w / 2, h - w / 3])}L${space(p6)}L0 ${h}L${space(p7)}L${space([w / 3, h / 2])}L${space(p8)}Z`
              })
            }, 800, mina.bounce)
            if (!turn) {
              player.push($(`.mask[num=${index}]`).attr('num'))
              compuerturn()
            }
          })
        } else {
          $(`.mask[num=${index}]`).addClass('isanimate')
          let scr1 = w / 4 + 10
          let scr2 = w / 10
          let circle = test.circlePath(w / 2, h / 2, w / 2)
          let scircle1 = test.circle(w / 2, h / 2, scr1)
          let scircle2 = test.circle(w / 2, h / 2, scr2)
          let scircle = test.group(scircle1, scircle2)
          scircle.attr({
            stroke: '#fff',
            strokeWidth: 10
          })
          circle.attr({
            fill: 'black',
            mask: scircle
          })

          scircle1.animate({r: scr1 * 1.1}, 1000, mina.elastic)
          scircle2.animate({r: scr2 * 1.2}, 800, mina.backout)
          $(`.mask[num=${index}]`).mousemove(function (ev) {
            // //console.log('moving');
            
            let posx = ev.clientX - $(`.box[num=${index}]`).position().left - $(`.gamebox`).offset().left
            let posy = ev.clientY - $(`.box[num=${index}]`).position().top - $(`.gamebox`).offset().top
            let w = $(`.box[num=${index}]`).width()
            let h = $(`.box[num=${index}]`).height()
            
            // //console.log(ev.clientX,$(`.box[num=${index}]`).position().left,$(`.gamebox`).position().left/2,posx,$(`.gamebox`).offset().left);
            if (Snap.path.isPointInside(circle, posx, posy)) {
              //bug
              scircle2.attr({
                cx: w / 2 - (w / 2 - posx) * ((scr1 - scr2) / (w / 1.8)),
                cy: h / 2 - (h / 2 - posy) * ((scr1 - scr2) / (w / 1.8))
              })
            }
          }).mouseout(function () {
            $(`.mask[num=${index}]`).off('click')
            $(`.mask[num=${index}]`).off('mousemove')
            scircle1.animate({r: 0}, 1000, mina.backin, function () {
              scircle1.remove()

              circle.remove()
              $(`svg[id=${index}]>defs`).find('mask').eq(0).remove()
              $(`.mask[num=${index}]`).off('mouseout')
              $(`.mask[num=${index}]`).removeClass('isanimate')
            })
            scircle2.animate({r: 0}, 600, mina.backin, function () { scircle2.remove() })
          }).click(function (ev) {
            choose('next')
            scircle1.stop()
            scircle2.stop()
            test.animate({fill: 'black'}, 500)
            $(`svg[id=${index}]`).css('background', 'black')
            scircle1.attr({r: scr1 * 1.1})
            scircle2.attr({r: scr2 * 1.2})
            $(`.mask[num=${index}]`).off('mousemove')
            $(`.mask[num=${index}]`).off('mouseout')
            scircle1.animate({r: scr1 * 1.4}, 700, mina.backin)
            scircle2.animate({r: scr2 * 3, cx: w / 2, cy: h / 2}, 1000, mina.backin)
            circle.animate({fill: 'white'}, 1000)
            scircle2.attr({
              cx: w / 2,
              cy: h / 2
            })
            //$('.cover').toggle()
            $(`.mask[num=${index}]`).parent().addClass('fill')
            odd = !odd
            if (turn) {
              player.push($(`.mask[num=${index}]`).attr('num'))
              compuerturn()
            }
          })
        }
      } else {
        $(`.mask[num=${index}]`).off('click')
        
        $(`.mask[num=${index}]`).off('mouseout')
      }
    })
  }
}
function space (arr) {
  return arr.join(' ')
}

function compuerturn () {
  let anum = []
  let arrbox = [...Array(9).keys()].map(a => { let aa = a + 1; return aa.toString() }).filter(a => {
    let all = player.concat(computer)
    return all.indexOf(a) == -1
  })
  let pwin = iswin(player)
  let cwin = iswin(computer)
  //console.log(player, computer)
  if (arrbox.length == 0) {
    //console.log('no winner')
    //choose ('newturn')
    setTimeout(()=>{choose ('newturn')},1500)
    
    return
  }
  if (!pwin) {
    //console.log('player win!')
    //choose ('newturn')
    setTimeout(()=>{choose ('newturn')},1500)
    return
  }
  pwin = pwin.filter(a => {
    let aa = !$(`.box[num=${a}]`).hasClass('fill')
    return aa
  })
  cwin = cwin.filter(a => {
    let aa = !$(`.box[num=${a}]`).hasClass('fill')
    return aa
  })
  
  if (pwin.length == 0) {
    let acom = win.filter((a) => {
      let arr = a.split('')
      let num = 0
      computer.forEach(a => {
        arr.indexOf(a) !== -1 ? num++ : ''
      })
      player.forEach(a => {
        arr.indexOf(a) !== -1 ? num = 0 : ''
      })
      return num > 0
    })
    if (acom.length > 0) {
      acom.forEach(a => {
        let aa = a.split('').filter(a => {
          return computer.indexOf(a) == -1
        })
        anum = anum.concat(aa)
      })
    } else {
      anum = anum.concat(pwin)
    }
  } else {
    anum = anum.concat(pwin)
  }

  setTimeout(() => {
    if (cwin.length > 0) {
      let res = cwin[Math.floor(cwin.length * Math.random())]
      computer.push(res)
      $(`.mask[num=${res}]`).trigger('mouseover')
      $(`.mask[num=${res}]`).trigger('click')
      $(`.box[num=${res}]`).addClass('fill')
      iswin(computer)
      choose ('next')
      setTimeout(()=>{choose ('newturn')},1500)
      //console.log('computer win!')
      return
    }
    if (player.length == 1 && computer.length == 0) {
      let com = win.filter((a) => {
        let arr = a.split('')
        return arr.indexOf(player[0]) !== -1
      })
      com.map((a) => {
        let arr = a.split('')
        let minnum = 10
        let res = []
        arr.forEach(element => {
          if (!$(`.box[num=${element}]`).hasClass('fill')) {
            if (Math.abs(element - player[0]) <= minnum) {
              Math.abs(element - player[0]) == minnum ? '' : res = []
              minnum = Math.abs(element - player[0])
              res.push(element)
            }
          }
        })
        anum = anum.concat(res)
      })
    }

    let res = anum.length > 0 ? anum[Math.floor(anum.length * Math.random())] : arrbox[Math.floor(arrbox.length * Math.random())]
    //console.log(anum)
    computer.push(res)
    
    $(`.mask[num=${res}]`).trigger('mouseover')
    $(`.mask[num=${res}]`).trigger('click')
    $(`.box[num=${res}]`).addClass('fill')
    if($(`.box.fill`).length==9){
      
    //console.log('no winner')
    //choose ('newturn')
    setTimeout(()=>{choose ('newturn')},1500)
    
    return
  
    }
  }, 1000)
}

function iswin (arr) {
  let winbox = []
  let acontinue = true
  win.forEach((a) => {
    let warr = a.split('')
    let num = 0
    for (let index = 0; index < arr.length; index++) {
      if (warr.indexOf(arr[index]) !== -1) {
        warr.splice(warr.indexOf(arr[index]), 1)
        num++
      }
    }
    if (num == 3) {
      acontinue = false
      a.split('').forEach(b=>{$(`.box[num=${b}]`).addClass('cheer')})
      //console.log(a+'..')
      //choose ('next')
    } else if (num == 2) {
      winbox = winbox.concat(warr)
    }
  })
  let next = acontinue ? winbox : acontinue
  return next
}

function haswinner () {
  
  $('.box').removeClass('cheer').each(function(index,el){
    $(el).find('svg').attr('fill','#000')
    setTimeout(() => {
        $(this).find('path').eq(0).attr('d','');
      }, 500);
    if($(this).hasClass('fill')){
      $(this).removeClass('fill')
      $(this).find('svg').each(function(index,el){
        //console.log($(el).attr('fill'))
      
    if ($(el).find('path').length>=2) {
      $(this).find('defs').html('')
      $(el).find('path').eq(1).remove()
      $(this).css('background','white')
      ////console.log($(el).find('path').eq(1),$(this));
    }
    
  })
    }
  })
  computer=[]
  player=[]
  odd = false
  //$('.cover').css('display','none')
  $(`.mask`).off('click')
        
  $(`.mask`).off('mouseout')
  $('.mask').removeClass('isanimate')
}

function choose (info=null){
    //console.log(info)
    switch (info) {
      case null:
        $('.cover').css({'display':'block','background':'black','color':'white'}).html(`<div class='title'>how to play</div>`);
        $('.title').css({'background':'#008C9E','padding-top':'20px','font-weight':'bold'}).append(`<p>选择'O'(先手)或'X'(后手),三个同样的图形在一条线上即可获胜</p>`).find('p').css({'color':'#162219','margin-top':'10px','line-height':'50px'})
        
        break;
      case 'player':
        $('.cover').css({'opacity':'1','display':'block','background':'black','color':'white'}).html(`<div class='title'>You win!!!</div>`);
        break;
      case 'computer':
        $('.cover').css({'opacity':'1','display':'block','background':'black','color':'white'}).html(`<div class='title'>You lose!!!</div>`);
        break;
      case 'nowinner':
        $('.cover').css({'opacity':'1','display':'block','background':'black','color':'white'}).html(`<div class='title'>who win?no one</div>`);
        break;
      case 'newturn':
      
        $('.cover').css({'top':0,'display':'block','opacity':'1','background':'white'})
        
        haswinner ()
        if (!turn) {
          
          compuerturn()
          
        }else{
          setTimeout(()=>{$('.cover').toggle()},500)
        }
        
        
        
        break;
      default:
        $('.cover').css({'opacity':'0','top':0,'background':'white'})
        $('.cover').toggle()
        break;
    }
  

    if (!info) {
      $(`<div class='choose'></div>`).appendTo($('.cover'))
      $('.choose').append(`<div class='left'>o</div><div class='right'>x</div>`)
      $(".left").click(function(){
        turn=true;
        haswinner ()
        $(".right").off('click')
        $(".left").off('click')
        $('.right').html('o')
        let blink = 1;
        let timer = setInterval(()=>{
          blink>3?(()=>{clearInterval(timer);$('.cover').animate({'opacity':'0','top':'-100px'},500,()=>{$('.cover').css('display','none')})})():''
          if (blink%2==1) {
            //console.log(blink);
            setTimeout(() => {
            $('.right').html('--')
            $('.left').html('--')
            }, 100,blink++);
          }else{
            setTimeout(() => {
              $('.right').html('o')
              $('.left').html('o')
            }, 100,blink++);
          }
          
        },200)
        
      })
      $(".right").click(function(){
        haswinner ()
        $(".right").off('click')
        $(".left").off('click')
        turn=false

        $('.left').html('x')
        let blink = 1;
        compuerturn()
        let timer = setInterval(()=>{
          blink>3?(()=>{clearInterval(timer);$('.cover').animate({'opacity':'0','top':'-100px'},500,()=>{})})():''
          if (blink%2==1) {
            ////console.log(blink);
            setTimeout(() => {
            $('.right').html('+')
            $('.left').html('+')
            }, 100,blink++);
          }else{
            setTimeout(() => {
              $('.right').html('x')
              $('.left').html('x')
            }, 100,blink++);
          }
          
        },200)
        
      })
    }else{
      $(".cover").html('').css('top',"0px")
    }
    
    return true;
  
  
  
}


