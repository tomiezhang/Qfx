# Qfx
Qfx是一个微型的动画框架，主要是用来简化js+css动画的开发，在日常工作中，很多时候我们需要用一大堆的脚本去书写js动画，且效果不是很好，Qfx支持以非常便捷的方式实现动画方式，内置十五种缓动方式，支持链式调用等特性，是你快速制作页面动画的有力帮手！

#基本使用方法
1.Qfx('id').show('slow');
2.Qfx('id').show(2000,'swingTo');
3.Qfx('id').show('slow','swingTo',function(){alert('Qfx is run!')});
Qfx支持获取id元素，或者是简单的根据class选择,如Qfx('div.a(0)').show(),表示选择class名为a的第一个元素作为动画对象

#自定义动画go
Qfx('id').go({marginLeft:'400px',fontSize:'16px',backgroundColor:'#f00'},'slow','bounce',function(){alert('done!')});
自定义动画
@param { function/null } 函数或者空值，必选参数
@param { String/Number } 动画持续时间
@param { String & Function  } tween算法
@param { Function } 动画完成的回调

#快速设置显示show
Qfx('id').show('defaults','linear',function(){alert('done!')});
show obj.show(args) 快速设置显示
@param {String/Number} 动画持续时间
@param { String & Function  } tween算法
@param { Function } 动画完成的回调
show(持续时间,缓动方式,完成回调)

#快速设置隐藏hide
Qfx('id').hide(600,'easeOutExpo',function(){alert('done!')});
hide obj.hide(args) 快速设置隐藏
@param {String/Number} 动画持续时间
@param { String & Function  } tween算法
@param { Function } 动画完成的回调
show(持续时间,缓动方式,完成回调)

#快速设置动画延迟delay
Qfx('id').go({marginLeft:'400px',fontSize:'16px',backgroundColor:'#f00'},'slow','bounce',function(){alert('done!')}).delay(500).hide('slow');
delay obj.delay(args) 快速设置动画延迟时间
@param {Number} 延迟多少
delay(延迟时间)

#停止动画stop
Qfx('id').show().stop(true,false);
停止动画
@param { Boolean } 是否清除队列
@param { Boolean } 是否执行当前队列的最后一帧动画
@return { Object }
stop(是否清除队列,是否执行当前队列的最后一帧动画)

#快速设置滑动显示slideDown
Qfx('id').slideDown('defaults','linear',function(){alert('done!')});
show obj.slideDown(args) 快速设置滑动显示
@param {String/Number} 动画持续时间
@param { String & Function  } tween算法
@param { Function } 动画完成的回调
slideDown(持续时间,缓动方式,完成回调)

#快速设置滑动隐藏slideUp
Qfx('id').slideUp('defaults','linear',function(){alert('done!')});
show obj.slideUp(args) 快速设置滑动隐藏
@param {String/Number} 动画持续时间
@param { String & Function  } tween算法
@param { Function } 动画完成的回调
slideUp(持续时间,缓动方式,完成回调)

#快速设置滑动隐藏/显示slideToggle
Qfx('id').slideToggle('defaults','linear',function(){
			Qfx("div.test(8)").slideToggle('slow')
		})
show obj.slideToggle(args) 快速设置滑动隐藏或显示
@param {String/Number} 动画持续时间
@param { String & Function  } tween算法
@param { Function } 动画完成的回调
slideToggle(持续时间,缓动方式,完成回调)

#快速设置透明度显示fadeIn
Qfx('id').fadeIn('defaults','linear',function(){alert('done!')});
show obj.fadeIn(args) 快速设置透明度显示
@param {String/Number} 动画持续时间
@param { String & Function  } tween算法
@param { Function } 动画完成的回调
fadeIn(持续时间,缓动方式,完成回调)

#快速设置透明度隐藏fadeOut
Qfx('id').fadeOut('defaults','linear',function(){alert('done!')});
show obj.fadeOut(args) 快速设置透明度隐藏
@param {String/Number} 动画持续时间
@param { String & Function  } tween算法
@param { Function } 动画完成的回调
fadeOut(持续时间,缓动方式,完成回调)

#缓动方式
Qfx内置了15种缓动方式，您可以根据需要选择自己的动画缓动方式
