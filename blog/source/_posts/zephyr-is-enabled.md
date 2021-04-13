---
title: zephyr 源码分析之IS_ENABLED
date: 2021-04-13 16:34:11
tags:
    - is_enabled
    - zephyr_util
categories:
    - zephyr
    - rtos
---

### 如何在zephyr代码中动态判断kconfig中的config是否enable呢？

zephyr 源码提供了宏IS_ENABLED来判断 某个宏是否定义, 具体实现在[util_macro.h](https://github.com/zephyrproject-rtos/zephyr/blob/master/include/sys/util_macro.h)和[util_internal.h](https://github.com/zephyrproject-rtos/zephyr/blob/master/include/sys/util_internal.h)

```c
/* ####################################################################### */
#define IS_ENABLED(config_macro) Z_IS_ENABLED1(config_macro)
#define Z_IS_ENABLED1(config_macro) Z_IS_ENABLED2(_XXXX##config_macro)
#define _XXXX1 _YYYY,
#define Z_IS_ENABLED2(one_or_two_args) Z_IS_ENABLED3(one_or_two_args 1, 0)
#define Z_IS_ENABLED3(ignore_this, val, ...) val
/* ####################################################################### */
```
举个例子：
当LOG_IMMEDIATE 被enable时，即CONFIG_LOG_IMMEDIATE=y, 执行cmake config之后会生成文件
`<build_dir>/zephyr/include/generated/autoconf.h`,其中有
```c
#define CONFIG_LOG_IMMEDIATE 1
```
IS_ENABLED(CONFIG_LOG_IMMEDIATE) => IS_ENABLED(1) => Z_IS_ENABLED3(_YYYY, 1, 0) => 1
当当LOG_IMMEDIATE 没有被enable时，CONFIG_LOG_IMMEDIATE为空白，则
IS_ENABLED(CONFIG_LOG_IMMEDIATE) => IS_ENABLED() => Z_IS_ENABLED3(_YYYY 1, 0) => 0
如果我们需要动态的判断宏enable之后的操作，只需如果操作:
```c
if (IS_ENABLED(CONFIG_LOG_IMMEDIATE)) {
    // 当ONFIG_LOG_IMMEDIATE enable时的具体代码
}
```

当然这种判断只有在config是bool类型的时候才能用， 如果这个config是一个字符串或者其他数时，IS_EANBLED将不能使用。
