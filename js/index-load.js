$(() => {
    var num = 0;
    var getwb = 0;
    $.get({
        url: '/signin',
        success: (data) => {
            console.log(data.wbdata.length);
            $('.wbbox').html(
                `<a href="https://weibo.com/p/1005055634753105/home?profile_ftype=1&is_all=1#_0" class="btn btn-success" target="_blank">weibo
            <span class="badge">${data.wbdata.length}</span>
    </a>`
            );
        }
    });
    $.get({
        url: '/jdimg',
        data: { 'num': num },
        success: (data) => {
            let = imgs = data.jdimg;
            console.log(imgs[0]);
            imgs.forEach(el => {
                $('.jdbox').append(
                    `
<a href=${el.imgsrc} class="" target="_blank">
<img src="${el.imgsrc}" alt="" class="imgsize">
</a>`)
            });

        }
    });
    $.get({
        url: '/jddata',
        success: (res) => {
            console.log(res);
        }
    })
    $('.r_btn').on('click', () => {
        num++;
        $('.jdbox').html('');
        $.get({
            url: '/jdimg',
            data: { 'num': num },
            success: (data) => {
                let = imgs = data.jdimg;
                if (imgs.length < 10) {
                    num = -1;
                }
                console.log(imgs[0]);
                imgs.forEach(aa => { $('.jdbox').append(`<a href=${aa.imgsrc} class="" target="_blank"><img src="${aa.imgsrc}" alt="" class="imgsize"></a>`) });
            }
        });
    });
    $('.l_btn').on('click', () => {
        if (num>=1) {
            num--;
            $('.jdbox').html('');
            $.get({
                url: '/jdimg',
                data: { 'num': num },
                success: (data) => {
                    let = imgs = data.jdimg;
                    imgs.forEach(aa => { $('.jdbox').append(`<a href=${aa.imgsrc} class="" target="_blank"><img src="${aa.imgsrc}" alt="" class="imgsize"></a>`) });
                }
            });
        }
    });
    setInterval(() => {
        $.get({
            url: '/signin',
            success: (data) => {
                console.log(data.wbdata.length);
                $('.wbbox').html(
                    `<a href="https://weibo.com/p/1005055634753105/home?profile_ftype=1&is_all=1#_0" class="btn btn-success" target="_blank">weibo
            <span class="badge">${data.wbdata.length}</span>
            </a>`
                );
            }
        })
    }, 300000); //1800000

});

