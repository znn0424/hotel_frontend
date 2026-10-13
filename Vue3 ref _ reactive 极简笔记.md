# Vue3 ref / reactive 极简笔记

## 一、核心一句话

- **ref**：通用，支持所有类型，代码内需要 **\.value**

- **reactive**：只对象/数组，不需要 \.value，**不支持基础类型**

## 二、使用场景（最实用）

- **单个数据**（数字、字符串、布尔）→ `ref`

- **一组数据/表单** → `reactive`

## 三、写法对比

```ts
// ref（万能）
const count = ref(0)
const form = ref({ name: '' })

// reactive（只能对象/数组）
const form = reactive({ name: '' })
```

## 四、取值赋值区别（最重要）

- **ref**：JS 内必须 `.value`

- **reactive**：直接点属性

- **模板中**：两者都不用 \.value

```ts
// ref
count.value = 10

// reactive
form.name = "test"
```

## 五、致命区别（踩坑点）

- **reactive 不能存基本类型**（number/string 无效）

- **reactive 直接解构会丢失响应式**，需要 `toRefs()`

- **ref 可以整体替换**，reactive 不能整体覆盖对象

## 六、最简记忆口诀

**单值用 ref，表单用 reactive**

**脚本ref加value，模板全部不用加**
