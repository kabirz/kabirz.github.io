---
title: zephyr 源码分析之COND_CODE_1, COND_CODE_0 和 IF_ENABLED
date: 2021-04-13 17:16:31
tags:
    - condtion
    - zephyr_util
categories:
    - zephyr
    - rtos
---

### COND_CODE_1 和 COND_CODE_0
```c
/* ####################################################################### */ 
#define IF_ENABLED(_flag, _code) \
        COND_CODE_1(_flag, _code, ())
#define _XXXX1 _YYYY,
#define Z_COND_CODE_1(_flag, _if_1_code, _else_code) \
	__COND_CODE(_XXXX##_flag, _if_1_code, _else_code)
// Z_COND_CODE_1(1, (int a = 10;), (int a = 100;))
// _COND_CODE(_YYYY,, (int a = 10;), (int a = 100;))
// __GET_ARG2_DEBRACKET(_YYYY, (int a = 10;), (int a = 100;))
// __DEBRACKET ((int a = 10;)) => int a = 10;

// Z_COND_CODE_1(0, (int a = 10;), (int a = 100;))
// _COND_CODE(_XXXX0, (int a = 10;), (int a = 100;))
// __GET_ARG2_DEBRACKET(_XXXX0 (int a = 10;), (int a = 100;))
// __DEBRACKET ((int a = 100;)) => int a = 100;
#define Z_COND_CODE_0(_flag, _if_0_code, _else_code) \
  __COND_CODE(_ZZZZ##_flag, _if_0_code, _else_code)
// Z_COND_CODE_0(1, (int a = 10;), (int a = 100;))
// _COND_CODE(_ZZZZ1, (int a = 10;), (int a = 100;))
// __GET_ARG2_DEBRACKET(_ZZZZ1 (int a = 10;), (int a = 100;))
// __DEBRACKET ((int a = 100;)) => int a = 100;

// Z_COND_CODE_0(0, (int a = 10;), (int a = 100;))
// _COND_CODE(_YYYY,, (int a = 10;), (int a = 100;))
// __GET_ARG2_DEBRACKET(_YYYY, (int a = 10;), (int a = 100;))
// __DEBRACKET ((int a = 10;)) => int a = 10;
#define _ZZZZ0 _YYYY,
 
#define __COND_CODE(one_or_two_args, _if_code, _else_code) \
  __GET_ARG2_DEBRACKET(one_or_two_args _if_code, _else_code)

#define __GET_ARG2_DEBRACKET(ignore_this, val, ...) __DEBRACKET val
#define __DEBRACKET(...) __VA_ARGS__

/* ####################################################################### */
```
使用IS_ENABLED操作的代码较短时， code看上去会感觉比较臃肿，COND_CODE_1/COND_CODE_0 可以更好的解决这个问题，如(特别要注意2，3行的括号不能忘记)：
```c
uint32_t limit = COND_CODE_1(CONFIG_LOG_IMMEDIATE,
                    (LOG_IMMEDIATE_TEST_MESSAGES_LIMIT),
                    (CONFIG_LOG_BUFFER_SIZE / sizeof(struct log_msg)));

```
当 CONFIG_LOG_IMMEDIATE = 1 时，上述代码同：
```c
uint32_t limit = LOG_IMMEDIATE_TEST_MESSAGES_LIMIT;
```
否则:
```c
uint32_t limit = CONFIG_LOG_BUFFER_SIZE / sizeof(struct log_msg);
```

当我们只有CONFIG_LOG_IMMEDIATE = 1的操作时，则可以使用更简洁的代码
```c
uint32_t limit = IF_ENABLED(CONFIG_LOG_IMMEDIATE, (LOG_IMMEDIATE_TEST_MESSAGES_LIMIT));
```
同样COND_CODE_0的用法和COND_CODE_1相反，不多在举例了。
