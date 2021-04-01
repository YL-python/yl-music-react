# yl-music-react-pc

> 学完了王红元老师的 react 教程，想着自己写一个 react 项目，巩固一下 react 的知识
>
> 项目是模仿 [YesPlayMusic ](https://music.qier222.com/#/)，对照已有的功能 自己尽可能的开发

YesPlayMusic 是 Vue 版本的 PC 端 music 项目，本人是采用 React 开发，过程中也遇到了大大小小不少的问题，目前已经发布第一版本，[访问 Demo](http://coderyl.top/yl-music-rp/#/)，同时本人还有采用 Vue 开发的 移动端 music 项目 ，[移动端 Demo](http://coderyl.top/yl-music-vm/)

## 功能

- [x] 使用 `react` 全家桶开发，并且全面使用函数组件采用 `hook`的方式编写
- [x] 推荐歌单
- [x] 分类查看歌单
- [x] 歌单详情
- [x] 播放歌曲
- [x] 歌词展示
- [x] 歌曲控制

## Todo

- [ ] 个人中心（展示喜欢的歌曲，喜欢的歌单，播放历史）
- [ ] 搜索功能（关键字搜索）
- [ ] 数据持久化（上一次播放的内容，用户的喜欢内容）
- [ ] 图标使用 svg 代替
- [ ] 黑白主题（可能 也许 还有其他配色）
- [ ] 歌手相关的内容展示

## 已知存在的 bug

- 加载慢（可是我服务器的带宽就这么多啊 `{{{(>_<)}}}`）
- 纯音乐的歌词以及没有歌词的歌曲 歌词展示没有做
- 在滚动歌词的时候应该禁止歌词自动切换
- 大播放器和小播放器共用了一套逻辑，可是没有复用
- 网页的标题没有根据当前页面内容进行切换

## 依赖的库

```js
yarn add @craco/craco             // 配置服务器 路径别名
yarn add react-router-dom         // react 路由
yarn add react-router-config      // 帮助我们简化路由的配置
yarn add styled-components        // css in js 样式库
yarn add antd                     // antd框架
yarn add @ant-design/icons        // antd框架 的图标
yarn add redux                    // 全局数据管理
yarn add react-redux              // 提供context和provide 将 react 和 redux 结合起来
yarn add redux-thunk              // redux的中间件 使dispatch的时候可以使用函数 做异步请求
yarn add axios                    // 网络请求
yarn add immutable                // 数据拷贝的时候节约性能
yarn add redux-immutable          // 配置服务器 路径别名
yarn add react-transition-group   // 制作动画
yarn add react-lazyload           // 图片懒加载
yarn add dayjs                    // 时间格式化
yarn add better-scroll            // 滚动组件
yarn add redux-persist            // redux 数据持久化
yarn add immer                    // immutable 的一个替代
```

## 目录结构

```js
src
  │  App.js                 // 入口
  │  index.js
  ├─assets                  // 静态资源
  ├─components              // 自定义组件
  │  ├─album-cover          // 歌单简介
  │  ├─button-icon          // 有 button 样式的 图标
  │  ├─button-tone          // 有 button 样式的 图标文字
  │  ├─cover-img            // 封面大图
  │  ├─hidden               // 隐藏组件
  │  ├─playlist-item        // 歌曲简介
  │  ├─scroll               // 滚动
  │  └─yl-header            // 导航
  ├─hooks                   // 自定义hook
  ├─pages                   // 页面资源
  │  ├─explore              // 发现页
  │  │  └─explore-buttons   // 发现页 -- 上边按钮组
  │  ├─home                 // 首页
  │  ├─my                   // 个人中心页面
  │  ├─player-lyric         // 播放器和歌词页面
  │  │  ├─lyric             // 歌词页面
  │  │  │  └─scroll-lyric   // 边上歌词滚动
  │  │  └─player            // 播放器
  │  └─playlist             // 歌单详情
  ├─router                  // 路由
  ├─service                 // 网络请求
  ├─store                   // redux
  └─utils                   // 工具
```

## 做一些笔记

### props

很多全局的数据（`redux`以及路由相关的对象）都是通过`props`传递的，有的时候在子组件中获取不到数据，就要查看父组件 有没有通过 `{...props}`把数据传递给子组件以及子组件有没有接收`props`

### redux

一开始播放页面的数据我是用 `useState`进行内部维护的，后来代码写多了发现一个是只能维护自己的页面，一个是数据不能共用，最最严重的问题是网络请求和 `set`方法都是异步的 不好进行同步控制，甚至做的下拉加载，在 `useState` 写法下，因为有异步延迟，经常会触发多次，导致网络请求多次，后来一不做二不休干脆把所有的异步请求和修改数据的功能全部丢到了`redux`中，很神奇的是居然全部问题都解决了，异步同步的问题，数据共享的问题，以及下拉加载被处罚多次，改成`redux` 写法之后就只会一次了。（弱弱的猜一下应该是`redux`内部的 `dispatch`都执行完了才会 `render`页面）

### styled-components

这个库的坑点好多啊，第一个是在 `ButtonIcon` 组件中，点进去看写法我是用了一个 `Fragment` 包裹了子元素，因为我需要在组件上绑定事件，不用 `Fragment` 包裹的话 `onClick`等等这样的写法就变成`props`传给子组件了，并不是被 react 渲染成真实的`Dom`事件，绑定到`dom`上，百度一圈都没有发现有提及的，猜测是 `styled-components` 这个库渲染的过程会慢 `jsx`解析一步，在`jsx`解析完成之后才把数据渲染到 jsx 上，这个时候就慢了。（`(ಥ _ ಥ)`具体啥情况我也不清楚，只是一个猜测，点开源码密密麻麻的一堆`ts`真的看不懂啊）

### scroll 组件

这里是 对 `batter-scroll` 库进行的二次封装，不过过程中也遇到了很多问题

首先就是 函数式组件不能绑定 `ref`，需要定义函数式组件的时候使用 `forwardRef`包裹，与`memo`同时使用的时候应该是 `memo(forwardRef(function componment))` 这样的写法

在一个就是函数式组件，父组件调用子组件的时候，应该在子组件内部使用 `useImperativeHandle`不然的话，父组件只能访问到子组件的`Dom` 对象，并不能访问子组件的事件，具体写法参考 `scroll`组件

### immer

使用 redux 结合 redux-persist 发现 immutable 类型 redux-persist 并不支持，而且百度了半天都推荐使用 immer，一开始还不是很想使用 immer，但是上 npm 发现 immer 的周下载量大约是 immutable 的一倍了，所以就下定决心开个坑，之后要用 immer 重构一下这个项目。
