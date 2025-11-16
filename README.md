# Bubble Card 中文

本仓库是 Bubble Card 的中文翻译分支。<br>
此分支非官方维护，不包含功能变动，仅同步上游更新并进行中文翻译。

原项目地址：https://github.com/Clooos/Bubble-Card<br>
Bubble Card 原项目版权归原作者 Clooos 所有，本分支沿用 MIT License 发布。

本仓库仅对前端文本进行本地化处理，方便中文用户使用。<br>
除了翻译，还只替换了一些类名，使得这个分支可以和原版共存。其他功能、操作逻辑等，均未修改。以及模块商店也使用作者的仓库。<br>
作者更新项目之后，我会在两天左右同步更新，所以你可以放心使用这个分支。

有关翻译的问题，请在此仓库提出，不要在原项目仓库中提交关于此分支的翻译问题。

<details>

<summary>English Ver.</summary>

<br>

This repository is an unofficial Chinese translation fork of Bubble Card.<br>
It contains no functional changes; this fork stays synced with the upstream project and provides a full Chinese localization.

Original project: https://github.com/Clooos/Bubble-Card<br>
All copyrights of Bubble Card belong to the original author, Clooos.<br>
This fork is released under the same MIT License as the upstream project.

Only frontend text has been localized in this repository to improve usability for Chinese-speaking users.<br>
Apart from translation, a few class names have been adjusted to ensure this fork can coexist with the original version.<br>
All other features, functionality, and behaviors remain unchanged.<br>
The module marketplace also continues to use the original author’s module source.

Updates in this fork are usually published within about two days after the upstream project releases a new version.<br>
You can use this Chinese version with confidence.

For any translation-related issues, please open an issue in this repository.<br>
Please do not submit translation issues for this fork to the upstream repository.

</details>

<br>

## 安装

**Home Assistant 最低支持版本：** 2023.9.0

<details>

<summary>使用 HACS 安装（推荐）</summary>

<br>

这种方法可以让你直接在 HACS 主界面获取更新。

1. 如果尚未安装 HACS，请按照 [https://hacs.xyz/docs/setup/download/](https://hacs.xyz/docs/use/download/download/) 上的说明下载
2. 按照 [https://hacs.xyz/docs/configuration/basic](https://hacs.xyz/docs/configuration/basic) 上的说明进行 HACS 初始配置
3. 在侧边栏中进入 HACS
4. 点击右上角的 `...` 按钮，并选择 `Custom repositories`
5. 在弹出的窗口中输入 `https://github.com/Vanadiry/Bubble-Card-zh`
6. 将 `Type` 选择为 `Dashboard`，然后点击 `ADD`。
7. 在 HACS 中搜索 “Bubble Card 中文” 然后点击右下角的按钮进行下载
8. 回到你的仪表板，在右上角点击图标并选择“编辑仪表板”
9. 现在你可以点击右下角的“添加卡片”，搜索 “Bubble Card 中文”

如果不起作用，请尝试清除浏览器缓存。

你也可以一并安装一下原版的 Bubble Card，直接在 HACS 中搜索即可。<br>
虽然原版和此分支的功能完全一样，但可以给原作者加个下载量～

</details>

<details>

<summary>不使用 HACS 安装</summary>

<br>

1. 下载以下文件：[bubble-card-zh.js](https://raw.githubusercontent.com/Vanadiry/Bubble-Card-zh/main/dist/bubble-card-zh.js) 和 [bubble-pop-up-fix-zh.js](https://raw.githubusercontent.com/Vanadiry/Bubble-Card-zh/main/dist/bubble-pop-up-fix-zh.js)
2. 将这些文件放入你的 `<config>/www` 文件夹
3. 在你的仪表板右上角点击 ✏️ 图标，然后选择“编辑仪表板”
4. 点击右上角的 `...` 图标，选择“管理资源”
5. 点击“添加资源”
6. 复制并粘贴 `/local/bubble-card-zh.js?v=1`
7. 选择 “JavaScript 模块”，然后点击“创建”
8. 返回并刷新页面
9. 现在你可以点击右下角的“添加卡片”，搜索 “Bubble Card 中文”
10. 每次更新文件后，你都需要编辑 `/local/bubble-card-zh.js?v=1` 并将版本号修改为更高的数字

如果不起作用，请尝试清除浏览器缓存。

</details>

<br>

## 迁移

如果你已经在用原版 Bubble Card 了，通过下面的步骤，可以方便地迁移到此中文版本（建议同版本迁移）。

进入“编辑仪表盘”，然后点击右上角的 `...` 并进入“原始配置编辑器”，将里面的内容全部拷贝到你喜欢的编辑器中。<br>
将 `custom:bubble-card` 全部替换为 `custom:bubble-card-zh`。<br>
将修改后的内容拷贝回原始配置编辑器，然后保存并刷新页面即可。

## 配置

几乎所有的选项都可以在 Home Assistant 可视化编辑器中配置。<br>
在可视化编辑器中，有足够详细直观的说明，因此配置部分的说明文档就不翻译了。可以前往[原项目仓库](https://github.com/Clooos/Bubble-Card/blob/main/README.md)查看。

你也可以观看[原作者的视频](https://www.youtube.com/watch?v=0hSQOlBxKKI)（YouTube），了解 Bubble Card 的功能。如果你喜欢，订阅作者以帮助增加频道的曝光度，谢谢！

模块是可与 Bubble Card 一起使用的插件，原项目使用 GitHub 的 Discussions 来储存模块相关内容，此分支没有修改，你依然可以使用原版所有[可用的模块](https://github.com/Clooos/Bubble-Card/discussions/categories/share-your-modules)。

<br>

## 帮助

如果某些功能无法正常使用，请随时提交报告。

功能请求，请在这里发起讨论：<br>
此仓库 [Vanadiry/Bubble-Card-zh](https://github.com/Vanadiry/Bubble-Card-zh/discussions/categories/feature-requests) 功能请求讨论区。<br>
或原项目仓库 [Clooos/Bubble-Card](https://github.com/Clooos/Bubble-Card/discussions/categories/feature-requests) 功能请求讨论区。

有疑问，请在这里发起讨论：<br>
此仓库 [Vanadiry/Bubble-Card-zh](https://github.com/Vanadiry/Bubble-Card-zh/discussions/categories/q-a) 问答讨论区。<br>
或原项目仓库 [Clooos/Bubble-Card](https://github.com/Clooos/Bubble-Card/discussions/categories/q-a) 问答讨论区。

<br>

## 捐赠

非常感谢 Bubble Card 作者 Clooos 带来的超好用工具。如果你喜欢 Bubble Card 的工作，任何捐赠都是对 Clooos 的最好支持 🍻<br>
以下捐赠链接均来自 Bubble Card 作者 Clooos。

[![Buy me a beer](https://img.shields.io/badge/Donate-Buy%20me%20a%20beer-yellow?logo=buy-me-a-coffee)](https://www.buymeacoffee.com/clooos) [![PayPal](https://img.shields.io/badge/Donate-PayPal-blue?logo=paypal)](https://www.paypal.com/donate/?business=MRVBV9PLT9ZPL&no_recurring=0&item_name=Hi%2C+I%27m+Clooos+the+creator+of+Bubble+Card.+Thank+you+for+supporting+me+and+my+passion.+You+are+awesome%21+%F0%9F%8D%BB&currency_code=EUR) [![Patreon Clooos](https://img.shields.io/badge/Patreon-Clooos-orange?logo=patreon)](https://www.patreon.com/Clooos)

感谢大家的支持，你们是我最大的动力！
