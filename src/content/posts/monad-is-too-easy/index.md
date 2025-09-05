+++
title = "单子实在是太简单了"
published = 2025-09-01
description = '使用 TypeScript 的简明单子解释'
image = 'cover.jpg'
tags = ['Monad', 'TypeScript', 'Cat Theory']
category = 'XITE'
draft = false
lang = ''
+++

# 单子实在是太简单了

你或许在复数场合下的讨论中见到一些 Haskell 用户使用这样讨嫌的话语：

> Monad 就是一个自函子范畴中的幺半群。

但是，笔者（或许和你一样）并不懂 Haskell 语言。此时，你并不知道对方究竟是理解了某些问题的本质，还是在堆砌名词和复制话术。你也不知道 TA 说的东西关乎正在 Web 前端编程的你什么事。如果这是真实的，那本文旨在解决你的问题。

## 先决条件

本文假设你会熟练的 TypeScript 编程，可以听懂一些编程中的高级概念，并且对于类型论有非常浅薄的理解。你不需要有对 TypeScript 类型体操的深入了解。

需要注意的是，本文可能包括一些数学定义。你可能需要作在阅读中浏览维基百科或其他外部资料链接的准备。你同样有可能阅读相关的 TypeScript 文档，或者打开代码编辑器做一些实验。

## 从异步编程开始

你知道 TypeScript 中可以这样异步编程：

```typescript
async () => {
  const result = await getSomeAsync()
  return await getAnotherAsync(result)
}
```

如果你对历史有些了解的话，你还知道可以这样异步编程（通过 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)）：

```typescript
getSomeAsync().then(getAnotherAsync)
```

这看上去不如 `async`/`await` 直观。对大多数人来说，现代方法才是我们想要的。

当然，如果你观察得更仔细一些的话，你或许会注意到 `async` 其实隐式地构造了一个 `Promise<T>` , 而 `await` 做的事情其实就是从这个 `Promise<T>` 中取出 `T` . 我们的异步编程终究没能离开 `Promise` .

### 为什么要有 `Promise`

此时的你或许会开始想：有没有不使用 `Promise` 的异步编程？*有的。* 只不过它的形式可能与你想象的不太一样。

「异步」是什么？如果我们暂时放下建立起的高级抽象，观看异步过程的实现的话，类似于一个「把水烧着，然后去做别的事，等听到水开了，过来把水倒进热水壶中」的操作。我们告诉机器需要做什么，然后并不等待执行完成，而是告诉机器现在可以去做别的工作。执行完成后，机器再回来继续我们告诉它的第一个工作。`async`/`await` 是对这种操作的好的建模。`async` 就相当于「告诉机器，这项任务需要等待」，而 `await` 相当于「告诉机器，现在不必坐等，去做些别的事情」。

不用 `Promise` 怎么告诉机器这样的概念？这不困难。想象我们先有一个阻塞版本的烧水函数：

```typescript
const boil = () => {
  // do something
  return 'boiled'
}
```

我们会写这样的代码：

```typescript
// this blocks current thread
const boiled = boil()
// do some other work
const bottle = new Bottle()
pourInto(bottle, boiled)
```

如果我们想把 `boil` 改成非阻塞的，那么直接使用上面的代码不能够保证在我们「把水倒进热水壶」时「水已经被烧好了」。轮询 `boil` 的完成情况会愚蠢地退化为同步情况。既然我们并不能知道 `boil` 是否完成，我们可以让知道的角色—— `boil` 的实现来判断。但 `boil` 的实现并不能知道我们接下来要做什么。或许你想到了解决方案：给它一个回调在完成后执行。

```typescript
const boil = <T>(next: (_: string) => T) => {
  // do something
  const result = 'boiled'
  return next('boiled')
}

boil((boiled) => {
  const bottle = new Bottle()
  pourInto(bottle, boiled)
})
```

很好！对于用户来说，使用 `boil` 的体验与异步编程一样。我们并不用关心 `boil` 的具体实现，而假装这个函数是异步的（事实上，由于 JavaScript 是单线程的，你完全不会想要手动轮询，而我们使用的异步函数本质上由 JavaScript 运行时的事件循环统一轮询）。从始至终我们没有使用 `Promise` , 只用回调就解决了问题。

### 回调地狱

你掌握了通过回调进行异步编程的技巧。现在有很多异步任务，需要被顺序执行：

```typescript
const task1 = <T>(next: () => T) => {}
const task2 = <T>(next: () => T) => {}
const task3 = <T>(next: () => T) => {}
const task4 = <T>(next: () => T) => {}
const task5 = <T>(next: () => T) => {}
```

于是你写出这样的代码：

```typescript
task1(() => {
  task2(() => {
    task3(() => {
      task4(() => {
        task5(() => {})
      })
    })
  })
})
```

不停地嵌套回调让你的代码变得丑陋。这种现象被称为 **回调地狱** 。为了实现异步编程，你不得不忍受这些恶心的语法噪音，破坏了可读性与可维护性。

### 展平回调嵌套

`Promise` 就是为了解决这个问题。

这可能有些技巧性，或者并不容易想到。你可以这样认为，`Promise` 之所以能工作，是利用了「带有回调的回调可以被转化成两个回调」这一特性。

```typescript
const task1 = <T>(next: () => T) => {
  // do something
  return next()
}
const task2 = <T, U>(next: (_: T) => U) => {
  const result = /* do something */
  return next(result)
}
task1(() => {
  task2(() => {})
})

const combined = <T, U>(next1: () => T, next2: (_: T) => U) => {
  // do something
  const result = next1()
  return next2(result)
}
combined(
  () => {},
  () => {}
)
```

但在签名中添加回调的数量只会让情况变得更糟。我们想要在签名中用一个类型的参数表示「任意数量的回调」，并且帮我们自动将展平后的回调嵌套起来。这个类型就是 `Promise` . 一个相对标准库的简化版不含 `reject` 的 `Promise` 定义如下。

```typescript
class MyPromise<T> {
  #poll: () => T | null

  private constructor(poll: () => T | null) {
    this.#poll = poll
  }

  static resolve<T>(value: T): MyPromise<T> {
    return new MyPromise(() => value)
  }

  then<U>(next: (_: T) => U | MyPromise<U>): MyPromise<U> {
    const poll = () => {
      const result = this.#poll()
      if (result === null) {
        return null
      }
      const promise = next(result)
      if (promise instanceof MyPromise) {
        return promise.#poll()
      } else {
        return promise
      }
    }
    return new MyPromise(poll)
  }
}
```

其中：

- `#poll: () => T | null` 是我们的（嵌套起来的）轮询函数，`null` 表示尚未完成；

- `static resolve<T>(value: T): MyPromise<T>` 用来构造一个直接返回不必等待的轮询。

`then<U>(next: (_: T) => U | MyPromise<U>): MyPromise<U>` 是最有趣的一部分。我们来看它做了什么：

- 如果当前 `MyPromise` 尚未完成，则新的 `MyPromise` 尚未完成；

- 如果当前 `MyPromise` 完成了，将 `next` 应用于结果并等待新的结果完成。
  
  - 声明为 `U | MyPromise<U>` 是为了兼容普通函数的便利，不必每次手写 `MyPromise.resolve` .

这相当于利用我们刚才提到的特性，将两个函数复合为了一个函数。这样，在不断应用 `then` 时，我们得到的并不是 `MyPromise<MyPromise< /* ... */ >>` 这样的多层嵌套，而始终只有一层 `MyPromise` ! 这就是 `MyPromise` 如何工作的。以下是一个使用 `MyPromise` 的实例，注意标准库的 `Promise` 不允许手动轮询。

```typescript
const task1 = () => {
  // do something
  return MyPromise.resolve('result1')
}
const task2 = (input: string) => {
  console.info(`task2 input is ${input}`)
  return MyPromise.resolve('result2')
}
const task3 = (input: string) => {
  console.info(`task3 input is ${input}`)
  return MyPromise.resolve('result3')
}

task1().then(task2).then(task3).blocking_poll()
```

可以看到，我们现在用链式调用替代了原先的回调嵌套。这极大增加了可读性。通过 `async`/`await` 语法糖，我们可以用现代化的范式异步编程。这种形式被称为单子化 (Monadic) API.

## 其它 TypeScript 单子

`Promise` 并不是唯一的 TypeScript 单子。事实上，单子化 API 在许多语言中相当普遍。例如，我们可以使用数组的 `Array.flatMap` 将嵌套数组展平，而不必写多重循环；`?.` 运算符其实是 Option, 或者说 `T | undefined` 单子的语法糖，它将 `(T | undefined) | undefined` 展平成 `T | undefined` .

我们甚至可以通用地描述一个单子的行为（注意 `unit` 其实应该是静态方法，这里限于 TypeScript 语法）。

```typescript
interface Monad<T> {
  unit(value: T): Monad<T>
  flatMap<U>(fn: (_: T) => Monad<U>): Monad<U>
}
```

对于 `Promise` , `resolve` 就是 `unit` , `then` 就是 `flatMap` .

换句话说，单子的核心就是 `flatMap` : 将一个对 `Monad<T>` 应用 `(_ : T) => Monad<U>` 得到 `Monad<U>` . 配合 `flatMap` 将嵌套的类型展平（从 `Monad<Monad< /* */ >>`）是单子的主要特性。这种特性允许我们方便地通过单子建模代码的某些「效应」，例如异步性、数组（迭代器）、可空性等。严谨地说，这是用来实现 **代数效应** 的方式。

以下文字由 ChatGPT 生成：

> 代数效应是一种 **将副作用（effect）抽象化为操作（operation）** 的方式。
> 
> - 传统副作用：例如打印、读写文件、抛异常、状态修改。
> 
> - 代数效应：把这些副作用当作**可定义的操作**，然后由 **处理器（handler）** 来解释它们的行为。
> 
> 换句话说，你不直接执行副作用，而是**声明“我想要做这个副作用”**，然后由另一个部分来决定如何实现它。

## 抽象

让所有 TypeScript 类型构成一个 [范畴](https://zh.wikipedia.org/wiki/%E7%AF%84%E7%96%87_(%E6%95%B8%E5%AD%B8)) $\mathscr T$ . 其中，每一个 TypeScript 类型都是范畴中的对象，每一组 TypeScript 类型之间的函数都是一个 [态射](https://zh.wikipedia.org/wiki/%E6%80%81%E5%B0%84) .

我们考虑这个范畴上的 [自函子](https://zh.wikipedia.org/wiki/%E5%87%BD%E5%AD%90#%E5%AE%9A%E7%BE%A9) 。以 `Promise` 为例：

- 对每一个 TypeScript 类型，都映到了一个 TypeScript 类型；

- 对于函数 `(x: T) => y as U` , 可以构造 `const f = (x: Promise<T>) => x.then((x: T) => y as U) as Promise<U>` 来处理态射;

- 你可以利用 `Promise.then` 验证结合律和单位态射的保持。

因此，在通过 `Promise.then` 提升函数的情况下，`Promise` 构成了一个自函子 $P:\mathscr T \to \mathscr T$ .

在范畴论中，一个 [幺半群 (Monoid)](https://zh.wikipedia.org/wiki/%E5%B9%BA%E5%8D%8A%E7%BE%A4#%E5%92%8C%E7%AF%84%E7%96%87%E8%AB%96%E7%9A%84%E9%97%9C%E4%BF%82) 是一个单对象范畴。通常，我们会将幺半群定义为一个 $(M,*:M\times M \to M, 1:M)$ , 满足：

- $\forall a, b, c \in M, (a * b) * c = a * (b * c)$ ;

- $\forall a \in M, a * 1 = 1 * a = 1$ .

在范畴 $\mathscr C$ 中，我们可以选取一个对象 $M$ , 如果有态射

- $\mu: M \times M \to M$ 作为乘法，满足结合律；

- $\eta: 1 \to M$ 作为单位元。其中 $1$ 是 $\mathscr C$ 的单位对象（满足 [自然同构](https://zh.wikipedia.org/wiki/%E8%87%AA%E7%84%B6%E8%AE%8A%E6%8F%9B#%E5%87%BD%E5%AD%90%E7%AF%84%E7%96%87) $1 \times X \cong X \cong X \times 1$ 对于任意 $X \in \mathrm{Obj}(\mathscr C)$ ）.

那么 $(M,\mu,\eta)$ 就组成一个 **幺半群对象 (Monoid Object)** . 和群一样，我们经常在不需要时记作 $M$ . 对于我们在抽象代数中研究的 [幺半群](https://zh.wikipedia.org/wiki/%E5%B9%BA%E5%8D%8A%E7%BE%A4) ，就是一个集合范畴中的幺半群对象 $(M,\mu,\eta)$ , 其中 $M$ 是群元的集合，$\mu$ 是群的乘法，$\eta$ 是群的单位元。集合范畴的单位对象是单点集 $\left\{ * \right\}$ .

让我们回到 `Promise` . 在自函子范畴 $\mathscr T \to \mathscr T$ 中，考虑：

- `Promise` 这个自函子，或者说类型函数作为对象；

- 对于任何两个 `Promise` 的对象 `Promise` （或者说 `T` $\mapsto$ `Promise<T>` ）, 其乘积 `Promise` $\times$ `Promise` （或者说 `T` $\mapsto$ `Promise<Promise<T>>` ）被 `Promise.then` 展平成 `T` $\mapsto$ `Promise<T>` , 也就是将 `Promise.then` 作为封闭的乘法运算。你可以验证它满足结合律；

- $\mathscr T$ 的单位对象是恒等类型函数 `type Id<T> = T` . 而 `Promise` 的单位元是 `Promise.resolve` : `Id` $\to$ `Promise` .

所以 $(\mathtt{Promise}, \mathtt{then}, \mathtt{resolve})$ 是一个幺半群对象。

> Monad 就是一个自函子范畴中的幺半群。

## 这有什么用

事实上，你完全没有必要了解「自函子范畴中的幺半群」来利用单子化 API. 笔者以为在许多语境下，一些人不合适宜地恰当或不恰当地使用范畴论名词来讨论编程设计，是不利于理解的。最直观的，符合人类直觉的方式就是将单子理解为 `flatMap` , 一个将 `Monad<Monad<T>>` 展平成 `Monad<T>` 的工具。但这带来了一点数学，不是吗？我们可以从更高的抽象层次来设计我们的 API.

单子亦有其局限性。例如，乘法交换律并不总是成立，这会使我们面临类似 `Promise<T[]>` $\ne$ `Promise<T>[]` 的问题，需要我们手动处理。*我们需要更好的代数效应。* 
