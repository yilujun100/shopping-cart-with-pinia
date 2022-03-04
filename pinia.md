## Pinia(下一代的 Vuex，简化的概念，更好的 TypeScript 支持)

### Pinia 是什么？

> 一个全新的用于 Vue 的状态管理库。
>
> 下一个版本的 Vuex，也就是 Vuex5.0。
>
> Pinia 已经被纳入官方账户下：https://github.com/vuejs/pinia

Pinia 应该是什么什么样子？（https://github.com/vuejs/rfcs/pull/271）

* 支持两种语法（composition api & options api）
* 没有 mutations。只有 state, getters, and actions（Pinia 极大地简化了 Vuex 的使用）
* 没有嵌套模块，使用扁平式的模块组织方式
* 完整的 TS 支持 （Vuex 对 TS 的支持不友好）
* 代码分割（性能上）



Pinia 核心特性：

* Vue 2 和 Vue 3 都支持
* 支持 Vue DevTools
* 模块热更新
* 支持使用插件扩展 Pinia 功能
* 相比 Vuex 有更好完美的 TypeScript 支持
* 支持服务端渲染



### 核心概念

Pinia 从使用角度和之前的 Vuex 几乎是一样的，比 Vuex 更简单了。

`Store` 是一个保存状态和业务逻辑的实体，它不绑定到组件树。换句话说，它承载全局 state。它有点像一个始终存在的组件，每个人都可以读取和写入。它有三个核心 概念。

* state：类似组件的 `data` ，用来存储全局状态

  ```javascript
  {
    todos: [
      { id: 1, title: 'coding', done: false },
      { id: 2, title: 'playing games', done: true },
      { id: 3, title: 'running', done: false }
    ]
  }
  ```

* getters：类似组件的 `computed` ，根据已有 State 封装派生数据，也具有缓存的特性

  ```javascript
  doneCount() {
    return todos.filter(item => item.done).length;
  }
  ```

* actions：类似组件的 `methods` ，用来封装业务逻辑，同步异步都支持

### 基本示例

Step1: 安装 Pinia 包

```bash
yarn add pinia
```

Step2: 创建一个 Store 容器

```vue
// src/store/counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
	state: () => {
		return { count: 0 };
	},
	getters: {
		double: state => state.count * 2
	},
	actions: {
		increment() {
			// 在 Vuex 中我们需要两步： 1.定义 mutations 2.提交 mutations
			this.count++;
		}
	}
})
```

Step3: 在组件中使用它

```vue
import { useCounterStore } from '@/store/counter';
export default {
	setup() {
		const counterStore = useCounterStore();
		// with autocompletion
		counterStore.$patch({ count: counterStore.count + 1 });
		// or using an action instead
		counterStore.increment();
	}
}
```



### Pinia vs Vuex

关于版本问题：

* Vuex 当前最新版本是 4.x
* Pinia 当前最新版本是 2.x
  * 及支持 Vue 2 也支持 Vue 3
  * 可以认为就是 Vuex 5，因为它的作者是官方的开发人员，并且已经被官方接管了



Pinia API 与 Vuex 4 有很大不同：

* 没有 `mutations`。`mutations` 被认为是非常冗长的。最初带来了 devtools 集成，但这不再是问题。
* 不再有模块的嵌套结构。Pinia 通过设计提供扁平 结构，同时仍然支持 store 之间的交叉组合方式。
* 更好 `TypeScript`支持。无须创建自定义的复杂包装器来支持 TypeScript，所有内容都是类型化的，并且 API 的设计方式尽可能地利用 TS 类型推断。
* 不需要注入、导入函数、调用它们，享受自动补全
* 无须动态添加 stores，默认情况下它们都是动态的。
* 没有命名空间模块。