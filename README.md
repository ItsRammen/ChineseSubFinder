# ChineseSubFinder

The original intention of this project was solely to automate the process of downloading **Chinese** subtitles under **specific conditions** from **third-party** websites or APIs.

> Due to being unable to return to Telegram for a long time (reasons related to +86), the corresponding chat group has been contaminated and there is no more energy to maintain it, so it has been disbanded. CSF currently has no plans to form an official chat group. Please discern relevant information yourself and beware of scams.

## Discontinuation Notice

[Discontinuation Announcement](SeeYou/README.md)

## Foreword

The full-featured version has been removed. Future versions will all be lightweight (Lite). The tag will be retained, but they are effectively the same. Direct downloading from certain subtitle websites is no longer supported (due to server load from increased users). Please use third-party subtitle download services like Subtitle Best. Guidance is available in the program's settings interface.

The latest versions can be found on [Docker Hub](https://hub.docker.com/repository/docker/allanpk716/chinesesubfinder). Unless you have specific needs, please avoid using the **Beta** version.

## Prerequisites

To use the program smoothly, there are certain requirements for the directory structure of movies and series. See the documentation:

- [Recommended Directory Structure for Movies](https://github.com/ChineseSubFinder/ChineseSubFinder/blob/docs/DesignFile/%E7%94%B5%E5%BD%B1%E5%92%8C%E8%BF%9E%E7%BB%AD%E5%89%A7%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84%E7%A4%BA%E4%BE%8B.md) (Link content likely in Chinese)
- [Directory Structure Requirements for Series](https://github.com/ChineseSubFinder/ChineseSubFinder/blob/docs/DesignFile/%E8%BF%9E%E7%BB%AD%E5%89%A7%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84%E8%A6%81%E6%B1%82.md) (Link content likely in Chinese)

## How to use

### How to Deploy

- [Docker Deployment Tutorial](docker/readme.md) (This file is likely in Chinese, we can translate it next)
- [How to Use on Windows](https://github.com/ChineseSubFinder/ChineseSubFinder/blob/docs/DesignFile/v0.20教程/01.如何在Windows上使用.md) (Link content likely in Chinese)
- [Docker ChineseSubFinder--Automatic Chinese Subtitle Download | sleele's Blog - Third-party Tutorial](https://sleele.com/2021/06/25/docker-chinesesubfinder-中文字幕自动下载/) (External link, likely Chinese)

### How to Use

* [Usage Tutorial](https://github.com/ChineseSubFinder/ChineseSubFinder/tree/docs/DesignFile/使用教程) (Link content likely in Chinese)
* [Parameter Startup (Supported after v0.41.x)](https://github.com/ChineseSubFinder/ChineseSubFinder/blob/docs/DesignFile/传参启动/传参启动.md) (Link content likely in Chinese)

### API Documentation

- [External HTTP API](https://github.com/ChineseSubFinder/ChineseSubFinder/tree/docs/DesignFile/ApiKey%E8%AE%BE%E8%AE%A1) (Link content likely in Chinese), and [Examples](https://github.com/ChineseSubFinder/ChineseSubFinder/issues/336)

### Advanced Settings

- [Subtitle Timeline Correction V2](https://github.com/ChineseSubFinder/ChineseSubFinder/blob/docs/DesignFile/%E5%AD%97%E5%B9%95%E6%97%B6%E9%97%B4%E8%BD%B4%E6%A0%A1%E6%AD%A3V2.md) (Needs updating for v0.20.x settings, link content likely in Chinese)

Recommended documentation to understand:

- [Explanation of Subtitle Naming Format](https://github.com/ChineseSubFinder/ChineseSubFinder/blob/docs/DesignFile/%E5%85%B3%E4%BA%8E%E5%AD%97%E5%B9%95%E5%90%8D%E7%A7%B0%E5%91%BD%E5%90%8D%E6%A0%BC%E5%BC%8F%E8%AF%B4%E6%98%8E.md) (Link content likely in Chinese)

If the documentation is not updated in time, or if descriptions are vague or ambiguous, feel free to open an [ISSUE](https://github.com/ChineseSubFinder/ChineseSubFinder/issues).

## FAQ

If you encounter problems, you can first check the issues summarized here. If it's not resolved, you can still ask. [FAQ List](https://github.com/ChineseSubFinder/ChineseSubFinder/blob/docs/DesignFile/%E9%97%AE%E9%A2%98%E5%88%97%E8%A1%A8.md) (Link content likely in Chinese)

## Other Documentation

- [Recommended Scraper Settings](https://github.com/ChineseSubFinder/ChineseSubFinder/blob/docs/DesignFile/%E5%89%8A%E5%88%AE%E5%99%A8%E7%9A%84%E6%8E%A8%E8%8D%90%E8%AE%BE%E7%BD%AE.md) (Link content likely in Chinese)
- [How to Determine if a Video Needs Subtitles Downloaded/Updated](https://github.com/ChineseSubFinder/ChineseSubFinder/blob/docs/DesignFile/%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E8%A7%86%E9%A2%91%E6%98%AF%E5%90%A6%E9%9C%80%E8%A6%81%E4%B8%8B%E8%BD%BD%E3%80%81%E6%9B%B4%E6%96%B0%E5%AD%97%E5%B9%95%E7%9A%84.md) (Link content likely in Chinese)
- [Design](https://github.com/ChineseSubFinder/ChineseSubFinder/blob/docs/DesignFile/%E8%AE%BE%E8%AE%A1.md) (Link content likely in Chinese)
- [Analysis of Subtitle Timeline Correction Feature Implementation (To be completed)](https://github.com/ChineseSubFinder/ChineseSubFinder/blob/docs/DesignFile/字幕时间轴校正功能实现解析/字幕时间轴校正功能实现解析.md) (Link content likely in Chinese)

## How to Compile This Project

*   First, you need to compile the Web part, see `frontend/README.md`
*   Then you can compile the executable program part

> If on Windows, you can download MinGW-w64 from here: [MinGW-w64 - for 32 and 64 bit Windows - Browse /Toolchains targetting Win64 at SourceForge.net](https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win64/)
>
> - [x86_64-posix-seh](https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/8.1.0/threads-posix/seh/x86_64-8.1.0-release-posix-seh-rt_v6-rev0.7z)
>
> The subsequent CGO compilation requires:
>
> 1.  Create variable: `PATH`, set value to: `xx\mingw64\bin`
> 2.  Create variable: `LIB`, set value to: `xx\mingw64\lib`
> 3.  Create variable: `INCLUDE`, set value to: `xx\mingw64\include`
>
> Use `gcc -v` to verify if it's effective.

Run `go mod tidy`, then you need to set `CGO_ENABLED=1`. Find the entry file `cmd\chinesesubfinder\main.go` and you're good to go. :joy:

Compilation code is as follows:

> ```bash
> cd ./cmd/chinesesubfinder \
>  && go build -ldflags="-s -w" -o /app/chinesesubfinder
> ```

Cross-platform compilation is not an issue; the author currently develops on Windows. Since there's no Mac OS available and setting up a VM is tedious, it should work directly there too.

## Version

Please be sure to use the latest version. If the update log here is forgotten (due to laziness), you can check [Releases](https://github.com/ChineseSubFinder/ChineseSubFinder/releases) for the latest version.

> Due to limited spare time, work is done intermittently. I can basically only remember the features of the last two versions...

- v0.42.x Added support for manual subtitle upload, previewing subtitle effects in the Web interface, and rewriting the "Library" refresh logic. -- October 31, 2022
- ...
- Completed the initial version, only supporting movie subtitle downloads -- June 13, 2021

## Acknowledgements

- [iMyon (Myon) ](https://github.com/iMyon) for handling the Web frontend part
- [devome](https://github.com/devome) for helping solve Linux and Docker compilation/deployment related issues
- [宅宅还是度度](https://weibo.com/u/2884534224) for designing the Logo

Thanks to the following projects for their help:

- [Andyfoo/GoSubTitleSearcher: Subtitle search query (Go language version)](https://github.com/Andyfoo/GoSubTitleSearcher)
- [go-rod/rod: A Devtools driver for web automation and scraping](https://github.com/go-rod/rod)
- [ausaki/subfinder: Subtitle finder](https://github.com/ausaki/subfinder)
- [golandscape/sat: High-performance Simplified/Traditional Chinese conversion](https://github.com/golandscape/sat)
- [smacke/ffsubsync: Automagically synchronize subtitles with video](https://github.com/smacke/ffsubsync)
- [shimberger/gohls: A server that exposes a directory for video streaming via web interface](https://github.com/shimberger/gohls)
