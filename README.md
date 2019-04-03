# iv-components
<main data-v-e187e7b6="" class="el-main page_content_main" id="page_content_main"><div data-v-e187e7b6="" class="doc-title-box"><span data-v-e187e7b6="" id="doc-title-span" class="dn"></span> <h2 data-v-e187e7b6="" id="doc-title">gb-drawer 抽屉</h2></div> <div data-v-e5df71aa="" data-v-e187e7b6="" id="editor-md" class="main-editor markdown-body editormd-html-preview"><link data-v-e5df71aa="" href="static/editor.md/css/editormd.min.css" rel="stylesheet">  <!----><h3 id="h3-u6982u8FF0"><a name="概述" class="reference-link"></a><span class="header-link octicon octicon-link"></span>概述</h3><p>iview中 Drawer 组件的扩展，增加全屏扩展的功能，<a href="https://run.iviewui.com/vGKAZUps" title="查看Demo" target="_blank">查看Demo</a>,效果图如下：</p>
<p><img src="http://help.op110.com.cn/server/../Public/Uploads/2018-12-17/5c17a72d4b1bf.gif" alt=""></p>
<h3 id="h3-u4F7Fu7528"><a name="使用" class="reference-link"></a><span class="header-link octicon octicon-link"></span>使用</h3><pre class="prettyprint linenums prettyprinted" style="padding-left: 5px; background-color: rgb(252, 252, 252); border: 1px solid rgb(225, 225, 232);"><ol class="linenums" style="padding-left: 5px;"><li class="L0" style="list-style-type: none; background-color: rgb(252, 252, 252);"><code style="color: rgb(221, 17, 68);"><span class="kwd">import</span><span class="pln"> </span><span class="typ">GbDrawer</span><span class="pln"> </span><span class="kwd">from</span><span class="pln"> </span><span class="str">'_c/drawer'</span></code></li><li class="L1" style="list-style-type: none; background-color: rgb(252, 252, 252);"><code style="color: rgb(221, 17, 68);"></code></li><li class="L2" style="list-style-type: none; background-color: rgb(252, 252, 252);"><code style="color: rgb(221, 17, 68);"><span class="kwd">export</span><span class="pln"> </span><span class="kwd">default</span><span class="pln"> </span><span class="pun">{</span></code></li><li class="L3" style="list-style-type: none; background-color: rgb(252, 252, 252);"><code style="color: rgb(221, 17, 68);"><span class="pln">    components</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span></code></li><li class="L4" style="list-style-type: none; background-color: rgb(252, 252, 252);"><code style="color: rgb(221, 17, 68);"><span class="pln">        </span><span class="typ">GbDrawer</span></code></li><li class="L5" style="list-style-type: none; background-color: rgb(252, 252, 252);"><code style="color: rgb(221, 17, 68);"><span class="pln">    </span><span class="pun">}</span></code></li><li class="L6" style="list-style-type: none; background-color: rgb(252, 252, 252);"><code style="color: rgb(221, 17, 68);"><span class="pun">}</span></code></li></ol></pre><pre class="prettyprint linenums prettyprinted" style="padding-left: 5px; background-color: rgb(252, 252, 252); border: 1px solid rgb(225, 225, 232);"><ol class="linenums" style="padding-left: 5px;"><li class="L0" style="list-style-type: none; background-color: rgb(252, 252, 252);"><code style="color: rgb(221, 17, 68);"><span class="tag">&lt;gb-drawer&gt;&lt;/gb-drawer&gt;</span></code></li></ol></pre><h3 id="h3-api"><a name="API" class="reference-link"></a><span class="header-link octicon octicon-link"></span>API</h3><blockquote>
<p>API基本同 iview中的 Drawer组件一致，在其基础上新增 <code style="color: rgb(221, 17, 68);">expandable</code> 属性控制展开按钮的显隐，<code style="color: rgb(221, 17, 68);">on-expand-change</code>事件监听展开/收起的回调，并移除<code style="color: rgb(221, 17, 68);">mask-closable</code>、<code style="color: rgb(221, 17, 68);">mask</code>、<code style="color: rgb(221, 17, 68);">mask-style</code>、<code style="color: rgb(221, 17, 68);">transfer</code>、<code style="color: rgb(221, 17, 68);">class-name</code>、<code style="color: rgb(221, 17, 68);">inner</code>等属性</p>
</blockquote>
<h4 id="h4-props-"><a name="Props 属性" class="reference-link"></a><span class="header-link octicon octicon-link"></span>Props 属性</h4><div style="width: 100%;overflow-x: auto;"><table>
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
<td>value</td>
<td>抽屉是否显示，可使用 v-model 双向绑定数据</td>
<td>Boolean</td>
<td>-</td>
</tr>
<tr style="background-color: rgb(255, 255, 255);">
<td>title</td>
<td>抽屉标题，如果使用 slot 自定义了页头，则 title 无效</td>
<td>String</td>
<td>-</td>
</tr>
<tr style="background-color: rgb(255, 255, 255);">
<td>width</td>
<td>抽屉宽度。当其值不大于 100 时以百分比显示，大于 100 时为像素</td>
<td>Number ¦ String</td>
<td>600</td>
</tr>
<tr style="background-color: rgb(255, 255, 255);">
<td>closable</td>
<td>是否显示右上角的关闭按钮</td>
<td>Boolean</td>
<td>true</td>
</tr>
<tr style="background-color: rgb(255, 255, 255);">
<td>styles</td>
<td>抽屉中间层的样式</td>
<td>Object</td>
<td>-</td>
</tr>
<tr style="background-color: rgb(255, 255, 255);">
<td>scrollable</td>
<td>页面是否可以滚动</td>
<td>Boolean</td>
<td>false</td>
</tr>
<tr style="background-color: rgb(255, 255, 255);">
<td>placement</td>
<td>抽屉的方向，可选值为 left 或 right</td>
<td>String</td>
<td>right</td>
</tr>
<tr style="background-color: rgb(255, 255, 255);">
<td>expandable</td>
<td>是否显示右上角可展开的按钮</td>
<td>Boolean</td>
<td>false</td>
</tr>
</tbody>
</table></div>
<h4 id="h4-events-"><a name="Events 事件" class="reference-link"></a><span class="header-link octicon octicon-link"></span>Events 事件</h4><div style="width: 100%;overflow-x: auto;"><table>
<thead>
<tr style="background-color: rgb(64, 158, 255); color: rgb(255, 255, 255);">
<th style="width: 180px;">事件名</th>
<th style="width: 180px;">说明</th>
<th style="width: 180px;">返回值</th>
</tr>
</thead>
<tbody>
<tr style="background-color: rgb(255, 255, 255);">
<td>on-close</td>
<td>关闭抽屉时触发</td>
<td>无</td>
</tr>
<tr style="background-color: rgb(255, 255, 255);">
<td>on-visible-change</td>
<td>显示状态发生变化时触发</td>
<td>true / false</td>
</tr>
<tr style="background-color: rgb(255, 255, 255);">
<td>on-expand-change</td>
<td>抽屉扩展/收缩时触发</td>
<td>true / false</td>
</tr>
</tbody>
</table></div>
<h4 id="h4-slot-"><a name="Slot 插槽" class="reference-link"></a><span class="header-link octicon octicon-link"></span>Slot 插槽</h4><div style="width: 100%;overflow-x: auto;"><table>
<thead>
<tr style="background-color: rgb(64, 158, 255); color: rgb(255, 255, 255);">
<th style="width: 180px;">名称</th>
<th style="width: 180px;">说明</th>
</tr>
</thead>
<tbody>
<tr style="background-color: rgb(255, 255, 255);">
<td>header</td>
<td>自定义标题栏</td>
</tr>
<tr style="background-color: rgb(255, 255, 255);">
<td>footer</td>
<td>自定义底部栏</td>
</tr>
<tr style="background-color: rgb(255, 255, 255);">
<td>close</td>
<td>显示状态发生变化时触发</td>
</tr>
<tr style="background-color: rgb(255, 255, 255);">
<td>默认</td>
<td>抽屉主体内容</td>
</tr>
</tbody>
</table></div>
</div> <div data-v-e187e7b6="" class="doc-author">
              更新：2018-12-17 21:52:20 &nbsp; 编辑：xiaopeng@op110.com
            </div></main>
