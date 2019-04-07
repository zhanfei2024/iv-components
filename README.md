<html>
<body class="">
  <div id="app">
    <div data-v-6a6d0623="" class="hello">
      <div data-v-a30ff500="" data-v-6a6d0623=""></div>
      <div data-v-e187e7b6="" data-v-6a6d0623="" class="hello">
        <div data-v-a30ff500="" data-v-e187e7b6=""></div>
        <section data-v-e187e7b6="" class="el-container">
          <aside data-v-e187e7b6="" class="el-aside el-aside" id="left-side" style="width: 300px;">
            <div data-v-0f2a87b2="" data-v-e187e7b6="" class="hello">
              <ul data-v-0f2a87b2="" role="menubar" class="el-menu" style="background-color: rgb(250, 250, 250);">
                <div data-v-0f2a87b2="" class="el-input">
                  <input autocomplete="off" placeholder="输入关键字后按回车以搜索" type="text" rows="2" validateevent="true"
                    class="el-input__inner">
                </div>
                <li data-v-0f2a87b2="" role="menuitem" aria-haspopup="true" class="el-submenu is-active is-opened"
                  aria-expanded="true">
                  <div class="el-submenu__title" style="padding-left: 20px; background-color: rgb(250, 250, 250);">前端公共组件
                    components<i class="el-submenu__icon-arrow el-icon-arrow-down"></i></div>
                  <ul role="menu" class="el-menu" style="background-color: rgb(250, 250, 250);" data-old-padding-top=""
                    data-old-padding-bottom="" data-old-overflow="">
                    <li data-v-0f2a87b2="" class="el-menu-item-group">
                      <div class="el-menu-item-group__title" style="padding-left: 40px;"></div>
                      <ul>
                        <li data-v-0f2a87b2="" role="menuitem" tabindex="-1" class="el-menu-item"
                          style="padding-left: 40px; background-color: rgb(250, 250, 250);">iv-view-image （全屏图片预览）</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </aside>
          <section data-v-e187e7b6="" class="el-container right-side is-vertical" id="right-side">
            <header data-v-e187e7b6="" class="el-header" style="height: 60px;">
              <div data-v-e187e7b6="" class="header-left"><i data-v-e187e7b6="" id="header-left-btn"
                  class="el-icon-menu header-left-btn"></i></div>
              <div data-v-e187e7b6="" class="header-right">
              </div>
            </header>
            <main data-v-e187e7b6="" class="el-main page_content_main" id="page_content_main">
              <div data-v-e187e7b6="" class="doc-title-box"><span data-v-e187e7b6="" id="doc-title-span"
                  class="dn"></span>
                <h2 data-v-e187e7b6="" id="doc-title">iv-view-image （全屏图片预览）</h2>
              </div>
              <div data-v-e5df71aa="" data-v-e187e7b6="" id="editor-md"
                class="main-editor markdown-body editormd-html-preview">
                <link data-v-e5df71aa="" href="static/editor.md/css/editormd.min.css" rel="stylesheet">
                <h3 id="h3-u6982u8FF0"><a name="概述" class="reference-link"></a><span
                    class="header-link octicon octicon-link"></span>概述</h3>
                <p>配合iview跑马灯实现图片预览，组件存放路径 <code
                    style="color: rgb(221, 17, 68);">src/components/iv-view-image</code><br>
                    在http://localhost:8080/viewImage，可以查看demo演示</p>
                <h3 id="h3--"><a name="使用方式 (已注册全局组件)" class="reference-link"></a><span
                    class="header-link octicon octicon-link"></span>使用方式 (已注册全局组件)</h3>
                <pre class="prettyprint linenums prettyprinted"
                  style="padding-left: 5px; background-color: rgb(252, 252, 252); border: 1px solid rgb(225, 225, 232);"><ol class="linenums" style="padding-left: 5px;"><li class="L0" style="list-style-type: none; background-color: rgb(252, 252, 252);"><code style="color: rgb(221, 17, 68);"><span class="pln"> </span><span class="com">// 文件内直接使用</span></code></li><li class="L1" style="list-style-type: none; background-color: rgb(252, 252, 252);"><code style="color: rgb(221, 17, 68);"><span class="pln"> </span><span class="pun">&lt;</span><span class="pln">iv</span><span class="pun">-</span><span class="pln">view</span><span class="pun">-</span><span class="pln">img </span><span class="pun">/&gt;</span></code></li></ol></pre>
                <h3 id="h3-props-"><a name="props 属性" class="reference-link"></a><span
                    class="header-link octicon octicon-link"></span>props 属性</h3>
                <div style="width: 100%;overflow-x: auto;">
                  <table>
                    <thead>
                      <tr style="background-color: rgb(64, 158, 255); color: rgb(255, 255, 255);">
                        <th style="width: 180px;">属性</th>
                        <th style="width: 180px;">说明</th>
                        <th style="width: 180px;">类型</th>
                        <th style="width: 180px;">默认值</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="background-color: rgb(255, 255, 255);">
                        <td>interval</td>
                        <td>自动播放间隔时间</td>
                        <td>Number</td>
                        <td>3000</td>
                      </tr>
                      <tr style="background-color: rgb(255, 255, 255);">
                        <td>value</td>
                        <td>控制显示或隐藏，可用v-model</td>
                        <td>Boolean</td>
                        <td>false</td>
                      </tr>
                      <tr style="background-color: rgb(255, 255, 255);">
                        <td>view-value</td>
                        <td>从索引开始显示图片</td>
                        <td>number</td>
                        <td>0</td>
                      </tr>
                      <tr style="background-color: rgb(255, 255, 255);">
                        <td>toolbar</td>
                        <td>是否在顶部显示title</td>
                        <td>[Boolean, Number]</td>
                        <td>true</td>
                      </tr>
                      <tr style="background-color: rgb(255, 255, 255);">
                        <td>title</td>
                        <td>图片名字显示</td>
                        <td>[Boolean, Number]</td>
                        <td>true</td>
                      </tr>
                      <tr style="background-color: rgb(255, 255, 255);">
                        <td>navbar</td>
                        <td>导航栏显示</td>
                        <td>[Boolean, Number]</td>
                        <td>true</td>
                      </tr>
                      <tr style="background-color: rgb(255, 255, 255);">
                        <td>minZoomRatio</td>
                        <td>最小缩放比例</td>
                        <td>Number</td>
                        <td>0.1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>详细看: <a href="https://github.com/fengyuanchen/viewerjs#options"
                    target="_blank">https://github.com/fengyuanchen/viewerjs#options</a></p>
                <h3 id="h3-event-"><a name="event 事件" class="reference-link"></a><span
                    class="header-link octicon octicon-link"></span>event 事件</h3>
                <div style="width: 100%;overflow-x: auto;">
                  <table>
                    <thead>
                      <tr style="background-color: rgb(64, 158, 255); color: rgb(255, 255, 255);">
                        <th style="width: 180px;">属性</th>
                        <th style="width: 180px;">说明</th>
                        <th style="width: 180px;">返回值</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="background-color: rgb(255, 255, 255);">
                        <td>on-close</td>
                        <td>关闭右上角事件</td>
                        <td>图片组件实例</td>
                      </tr>
                      <tr style="background-color: rgb(255, 255, 255);">
                        <td>on-change</td>
                        <td>切换图片时触发，激活的索引，原索引，当前data对象，图片实例</td>
                        <td>oldValue, value, itme, this</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h3 id="h3-slot-"><a name="slot 插槽" class="reference-link"></a><span
                    class="header-link octicon octicon-link"></span>slot 插槽</h3>
                <div style="width: 100%;overflow-x: auto;">
                  <table>
                    <thead>
                      <tr style="background-color: rgb(64, 158, 255); color: rgb(255, 255, 255);">
                        <th style="width: 180px;">属性</th>
                        <th style="width: 180px;">说明</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="background-color: rgb(255, 255, 255);">
                        <td>fixRight</td>
                        <td>自定义右上角关闭内容</td>
                      </tr>
                      <tr style="background-color: rgb(255, 255, 255);">
                        <td>noDataSlot</td>
                        <td>当data数据为空时自定义内容</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div data-v-e187e7b6="" class="doc-author">
                &nbsp; 编辑：zhanfei2024
              </div>
            </main>
          </section>
        <div data-v-c285ea70="" data-v-e187e7b6="" class="gotop-box" style="display: none;"><i data-v-c285ea70=""
            title="回到顶部" class="el-icon-caret-top"></i></div>
        <div data-v-e187e7b6="" class="el-dialog__wrapper text-center" style="display: none;">
        </div>
        <div data-v-400dcdbb="" data-v-e187e7b6=""></div>
      </div>
      <div data-v-400dcdbb="" data-v-6a6d0623=""></div>
    </div>
  </div>
</body>

</html>
