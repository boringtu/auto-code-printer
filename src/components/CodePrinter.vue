<!--
	@author: BoringTu
	@email: work@boringtu.com
	@date: 2020/10/30
-->
<template lang="pug">
.codePrinterRoot(ref="win")
	pre {{ code }}#[span.cursor {{ cursor }}]
	//- pre {{ code }}{{ cursor }}
</template>

<script lang="coffee">
export default
	data: ->
		demo: """
mounted: ->
	@visibleLoading = true
	Promise.all [
		@fetchData()
	]
	.then => @visibleLoading = false
	.catch ({ message }) =>
		@visibleLoading = false
		@$notify message
beforeDestroy: ->
	clearInterval @timeoutHandler
methods:
	activateCountdown: ->
		@formatCountdown @cd
		@timeoutHandler = setInterval =>
			if --@cd < 0
				clearInterval @timeoutHandler
				@showInfo()
			else
				@formatCountdown @cd
		, 1000
	formatCountdown: (sec) ->
		formatNum = (n) => if n < 10 then '0' + n else n + ''
		HH = formatNum Math.floor sec / 60 / 60
		mm = formatNum Math.floor sec / 60 % 60
		ss = formatNum Math.floor sec % 60
		@cdText = "\#{ HH }:\#{ mm }:\#{ ss }"
		"""
		code: ''
		cursor: ''
		cursorChar: '▋'
		timeoutHandler: null
		intervalHandler: null
	mounted: ->
		@start()
		# TEST CODE
		# 支持反复调用
		# setTimeout =>
		# 	@stop()
		# 	setTimeout =>
		# 		@start()
		# 	, 2000
		# , 2000
	beforeDestroy: ->
		@stop()
	methods:
		# 开始动画
		start: ->
			cursorChar = @cursorChar
			@cursor = cursorChar
			@stop()
			@code = ''
			demo = @demo
			len = demo.length
			i = 0
			count = 1
			page = 1
			pageSize = 6
			map = 1: yes
			win = @$refs.win
			# 获取随机速度
			getSpeed = =>
				# 随机获取 0 ~ 100 或 0 ~ 40
				s = if Math.floor Math.random() * 2 then 100 else 40
				# + 10 并取整
				Math.floor Math.random() * s + 10
			# 追加打印字符
			showLetter = (str) =>
				count++ if str is '\n'
				@code += str
				# 打印代码动画结束时，使光标闪烁
				unless ++i < len
					return @intervalHandler = setInterval =>
						@cursor = if @cursor is cursorChar then '' else cursorChar
					, 500
				page = 1 + Math.floor count / pageSize
				if count % pageSize - 1 or map[page]
					@timeoutHandler = setTimeout showLetter, getSpeed(), demo[i]
				else
					st = (page - 1) * 14 * 6
					win.velocity scrollTop: st + 'px', 200, =>
						# 解决第一次动画之后每换一次行都会自动触发 scrollY 的问题（模拟手动滚轮一下，即可阻止自动滚动
						win.scroll 0, st - 1
						map[page] = yes
						@timeoutHandler = setTimeout showLetter, getSpeed(), demo[i]
			showLetter demo[i], getSpeed()
		# 结束动画
		stop: ->
			clearTimeout @timeoutHandler
			clearInterval @intervalHandler
			@code = @demo
</script>

<style lang="sass" scoped>
.codePrinterRoot
	text-align: left
	overflow: hidden
	overflow: auto
	height: 400px
	p
		position: fixed
		z-index: 1
		top: 10px
		left: 10px
	pre
		tab-size: 2
		white-space: pre-wrap
		color: #66666d
		font-size: 12px
		line-height: 14px
		padding: 0
		margin: 0
		height: 999999px
		.cursor
			display: inline-block
			vertical-align: middle
</style>
