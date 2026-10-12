---
title: "代码高亮测试"
date: 2026-10-07T00:00:00+08:00
draft: false

categories:
  - 博客

tags:
  - Hugo
  - Markdown
  - 代码
---

# C++

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector<int> nums = {1, 2, 3, 4, 5};

    for (int x : nums) {
        cout << x << endl;
    }

    return 0;
}
```

# Python

```python
import numpy as np

x = np.array([1, 2, 3, 4, 5])

print(x.mean())
```

# Bash

```bash
cd ~/MyBlog/Nanithal.github.io
hugo server -D
```

# TOML

```toml
baseURL = "https://Nanithal.github.io/"
locale = "zh-cn"
theme = "PaperMod"
```